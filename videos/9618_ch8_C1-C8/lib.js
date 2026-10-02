// lib.js: drawing helpers, timing, top bar and subtitles for this video. Scenes are in scenes/*.js.
// CONTRACT (render.mjs relies on it): draw(frame) depends only on the frame number. All times come from
// TIMELINE (timeline.js) and SAY (say.js); nothing tied to speech is typed in seconds.

const W = 1920, H = 1080;
const TL = window.TIMELINE, SAY = window.SAY;
const FPS = TL.fps, FRAMES = TL.frames, DUR = TL.duration;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');

const COL = {
  bg: '#F7F5F0', ink: '#1F2328', mute: '#8A8F98', ph: '#E3DED3', rule: '#D6D0C4', card: '#FFFFFF', code: '#EEEBE4',
  pk: '#2F6F9F', fk: '#D08A1E', ok: '#3F7F4A', err: '#B03A2E', hi: 'rgba(242,193,78,.45)', okSoft: '#9CC39F',
};
const SANS = '"NotoSC", sans-serif', MONO = '"DVMono", "NotoSC", monospace';
const font = (size, weight = 400, mono = false) => `${weight} ${size}px ${mono ? MONO : SANS}`;

// main area (between the top bar and the subtitle band)
const X0 = 110, X1 = 1810, Y0 = 104, Y1 = 900, MW = X1 - X0;

// ---------- maths ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const easeOut = k => 1 - Math.pow(1 - clamp(k), 3);
const ease = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };

// ---------- timeline ----------
const SEG = Object.fromEntries(TL.segments.map(s => [s.id, s]));
const seg = id => { const s = SEG[id]; if (!s) throw new Error('unknown segment ' + id); return s; };
const T = (id, k = 0) => seg(id).start + k;           // segment start
const E = (id, k = 0) => seg(id).speech_end + k;      // end of speech
const END = (id, k = 0) => seg(id).end + k;           // end including the pause

// Estimated time at which a phrase of the narration is spoken: characters are weighted (Chinese character 1,
// English word by length, punctuation as a short pause) and the speech time of the segment is shared out.
function charWeights(s) {
  const w = new Array(s.length).fill(0);
  const re = /[A-Za-z][A-Za-z'’-]*|[0-9]/g; let m;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (/[㐀-鿿]/.test(c)) w[i] = 1;
    else if (/[，。；：？！]/.test(c)) w[i] = 1.2;
    else if (c === '、') w[i] = .6;
  }
  while ((m = re.exec(s))) {
    const word = m[0], tot = /[0-9]/.test(word) ? 1 : .6 + .12 * word.length;
    for (let j = 0; j < word.length; j++) w[m.index + j] = tot / word.length;
  }
  return w;
}
const CUM = {};
function cum(id) {
  if (CUM[id]) return CUM[id];
  const w = charWeights(SAY[id]), c = [0];
  for (const x of w) c.push(c[c.length - 1] + x);
  return (CUM[id] = c);
}
// S(id, phrase, k): time at which `phrase` starts in segment id's narration (throws if the phrase is not there)
function S(id, phrase, k = 0) {
  const i = SAY[id].indexOf(phrase);
  if (i < 0) throw new Error(`phrase "${phrase}" not in ${id}`);
  const c = cum(id);
  return T(id) + (E(id) - T(id)) * c[i] / c[c.length - 1] + k;
}
// S2: time at which `phrase` ends
function S2(id, phrase, k = 0) {
  const i = SAY[id].indexOf(phrase);
  if (i < 0) throw new Error(`phrase "${phrase}" not in ${id}`);
  const c = cum(id);
  return T(id) + (E(id) - T(id)) * c[i + phrase.length] / c[c.length - 1] + k;
}
// appear factor for an element shown at time `at`
const A = (t, at, d = .4) => easeOut(prog(t, at - .12, at - .12 + d));
// progress of an action between two times
const K = (t, a, b) => ease(prog(t, a, b));

// ---------- layout registry (scripts/layout-check.mjs) ----------
let LAYOUT = [];
function claim(id, kind, x, y, w, h) {
  const m = ctx.getTransform(), p = m.transformPoint(new DOMPoint(x, y)), q = m.transformPoint(new DOMPoint(x + w, y + h));
  LAYOUT.push({ id, kind, x: Math.min(p.x, q.x), y: Math.min(p.y, q.y), w: Math.abs(q.x - p.x), h: Math.abs(q.y - p.y) });
}

// ---------- plain text ----------
function txt(id, s, x, y, o = {}) {
  const { size = 36, weight = 400, color = COL.ink, align = 'left', alpha = 1, mono = false, base = 'alphabetic' } = o;
  ctx.save(); ctx.font = font(size, weight, mono); const w = ctx.measureText(s).width;
  if (alpha > 0) {
    ctx.globalAlpha *= alpha; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = base;
    ctx.fillText(s, x, y);
    const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    if (alpha > .05) claim(id, 'text', x0, y - size * .88, w, size * 1.12);
  }
  ctx.restore();
  return w;
}

// ---------- rich text ----------
// Markup: {style,style|text}. Styles: b (bold), m (mono), pk (primary key: blue, underlined), fk (foreign key: orange),
// pkfk (orange, blue underline), blue / orange / red (colour only), ok (green), err (red, struck through), mute (grey), ul (underline),
// hl (highlighted), h1..h9 (highlight whose progress is o.h[n]), @name (record the box of this run as anchor `name`).
const SQLKW = /\b(CREATE|TABLE|DATABASE|ALTER|ADD|PRIMARY|FOREIGN|KEY|REFERENCES|SELECT|FROM|WHERE|ORDER(?= BY)|GROUP(?= BY)|BY|INNER|JOIN|ON|AND|OR|AS|COUNT|SUM|AVG|INSERT|INTO|VALUES|UPDATE|SET|DELETE|NOT|NULL|LIKE|BETWEEN|DESC|ASC)\b/g;
function parse(markup, sql) {
  const runs = [], re = /\{([^|{}]+)\|([^{}]*)\}/g; let last = 0, m;
  const push = (text, st) => {
    if (!text) return;
    if (!sql) { runs.push({ text, st }); return; }
    let p = 0, k; SQLKW.lastIndex = 0;
    while ((k = SQLKW.exec(text))) {
      if (k.index > p) runs.push({ text: text.slice(p, k.index), st });
      runs.push({ text: k[0], st: new Set([...st, 'b']) }); p = k.index + k[0].length;
    }
    if (p < text.length) runs.push({ text: text.slice(p), st });
  };
  while ((m = re.exec(markup))) {
    push(markup.slice(last, m.index), new Set());
    push(m[2], new Set(m[1].split(',').map(s => s.trim())));
    last = m.index + m[0].length;
  }
  push(markup.slice(last), new Set());
  return runs;
}
const CJK = /[㐀-鿿　-〿＀-￯“”‘’]/;
function atoms(run) {
  const out = [], re = /[㐀-鿿　-〿＀-￯“”]|[^\s㐀-鿿　-〿＀-￯“”]+\s*|\s+/g; let m;
  while ((m = re.exec(run.text))) out.push(m[0]);
  return out;
}
function runFont(st, b) {
  return font(b.size, st.has('b') ? 700 : b.weight, st.has('m') || b.mono);
}
function layoutRich(markup, maxW, b) {
  const runs = parse(markup, b.sql), lines = [[]]; let x = 0;
  for (const r of runs) {
    ctx.font = runFont(r.st, b);
    for (const a of atoms(r)) {
      if (a === '\n') continue;
      const w = ctx.measureText(a).width, wTrim = ctx.measureText(a.trimEnd()).width;
      const startPunct = /^[，。；：、）)！？,.;:]/.test(a);
      if (x > 0 && x + wTrim > maxW && !startPunct) { lines.push([]); x = 0; if (!a.trim()) continue; }
      lines[lines.length - 1].push({ text: a, st: r.st, x, w, wTrim }); x += w;
    }
  }
  return lines;
}
// rich(id, markup, x, y, o) -> {w, h, anchors}. y is the top of the first line. o: size, weight, color, mono, sql,
// maxW, lh (line height factor), alpha, h {n: progress}, align ('left' | 'center'), dry (measure only).
function rich(id, markup, x, y, o = {}) {
  const b = { size: 36, weight: 400, color: COL.ink, mono: false, sql: false, maxW: MW, lh: 1.42, alpha: 1, h: {}, align: 'left', ...o };
  ctx.save();
  const lines = layoutRich(markup, b.maxW, b), LH = b.size * b.lh, anchors = {};
  let wMax = 0;
  for (const ln of lines) { const last = ln[ln.length - 1]; if (last) wMax = Math.max(wMax, last.x + last.wTrim); }
  const res = { w: wMax, h: lines.length * LH, lines: lines.length, anchors };
  if (b.dry || b.alpha <= 0) { ctx.restore(); if (b.dry) return res; }
  else {
    ctx.globalAlpha *= b.alpha; ctx.textBaseline = 'alphabetic';
    lines.forEach((ln, i) => {
      if (!ln.length) return;
      const lw = ln[ln.length - 1].x + ln[ln.length - 1].wTrim, ox = b.align === 'center' ? x - lw / 2 : x;
      const top = y + i * LH, base = top + b.size * .98;
      // highlights first (one rectangle per run of equal highlight on this line)
      const hlOf = a => { for (const s of a.st) { if (s === 'hl') return 1; if (/^h\d$/.test(s)) return b.h[s.slice(1)] || 0; } return 0; };
      let j = 0;
      while (j < ln.length) {
        const k = hlOf(ln[j]); let e = j; while (e + 1 < ln.length && hlOf(ln[e + 1]) === k && k > 0) e++;
        if (k > 0) {
          const x0 = ox + ln[j].x, w = ln[e].x + ln[e].wTrim - ln[j].x;
          ctx.save(); ctx.fillStyle = COL.hi; ctx.beginPath(); ctx.roundRect(x0 - 6, top + b.size * .08, (w + 12) * k, b.size * 1.2, 6); ctx.fill(); ctx.restore();
        }
        j = e + 1;
      }
      for (const a of ln) {
        const st = a.st, ax = ox + a.x;
        ctx.font = runFont(st, b);
        let c = b.color;
        if (st.has('pk')) c = COL.pk; if (st.has('fk') || st.has('pkfk')) c = COL.fk; if (st.has('ok')) c = COL.ok;
        if (st.has('err')) c = COL.err; if (st.has('mute')) c = COL.mute; if (st.has('red')) c = COL.err; if (st.has('blue')) c = COL.pk; if (st.has('orange')) c = COL.fk;
        ctx.fillStyle = c; ctx.fillText(a.text, ax, base);
        const tw = a.wTrim;
        if (st.has('pk') || st.has('pkfk') || st.has('ul')) {
          ctx.fillStyle = st.has('ul') ? c : COL.pk; ctx.fillRect(ax, base + b.size * .14, tw, Math.max(2, b.size * .07));
        }
        if (st.has('err')) { ctx.fillStyle = COL.err; ctx.fillRect(ax, base - b.size * .32, tw, Math.max(2, b.size * .06)); }
        for (const s of st) if (s[0] === '@') {
          const n = s.slice(1), bx = { x: ax, y: top, w: tw, h: b.size * 1.3 };
          if (!anchors[n]) anchors[n] = bx;
          else { const p = anchors[n]; const x1 = Math.max(p.x + p.w, bx.x + bx.w), y1 = Math.max(p.y + p.h, bx.y + bx.h); p.x = Math.min(p.x, bx.x); p.y = Math.min(p.y, bx.y); p.w = x1 - p.x; p.h = y1 - p.y; }
        }
      }
      if (b.alpha > .05) claim(id + ':' + i, 'text', ox, top + b.size * .1, lw, b.size * 1.15);
    });
    ctx.restore();
  }
  // anchors are also wanted when the text is invisible (for arrows drawn later)
  if (b.alpha <= 0) {
    lines.forEach((ln, i) => {
      const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].wTrim : 0, ox = b.align === 'center' ? x - lw / 2 : x, top = y + i * LH;
      for (const a of ln) for (const s of a.st) if (s[0] === '@') { const n = s.slice(1); if (!anchors[n]) anchors[n] = { x: ox + a.x, y: top, w: a.wTrim, h: b.size * 1.3 }; }
    });
  }
  return res;
}
// a table design such as CUSTOMER({pk|CustomerID}, FirstName)
const design = (id, s, x, y, o = {}) => rich(id, s, x, y, { size: 32, mono: true, ...o });

// ---------- shapes ----------
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function box(x, y, w, h, o = {}) {
  const { fill = null, stroke = null, lw = 2, r = 12, alpha = 1, dash = null } = o; if (alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; rr(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.stroke(); }
  ctx.restore();
}
function line(x0, y0, x1, y1, o = {}) {
  const { w = 3, color = COL.ink, k = 1, dash = null, alpha = 1 } = o; if (k <= 0 || alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); ctx.stroke(); ctx.restore();
}
function arrow(x0, y0, x1, y1, o = {}) {
  const { w = 3, color = COL.ink, k = 1, head = 16, alpha = 1, dash = null } = o; if (k <= 0 || alpha <= 0) return;
  const xe = lerp(x0, x1, k), ye = lerp(y0, y1, k), ang = Math.atan2(ye - y0, xe - x0);
  line(x0, y0, xe - Math.cos(ang) * head * .6, ye - Math.sin(ang) * head * .6, { w, color, dash, alpha });
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(xe, ye);
  ctx.lineTo(xe - Math.cos(ang - .42) * head, ye - Math.sin(ang - .42) * head);
  ctx.lineTo(xe - Math.cos(ang + .42) * head, ye - Math.sin(ang + .42) * head); ctx.closePath(); ctx.fill(); ctx.restore();
}
// an arrow that bends: from (x0,y0) vertically by `dy`, horizontally to x1, then to y1
function elbow(x0, y0, x1, y1, ymid, o = {}) {
  const { k = 1, color = COL.ink, w = 3, alpha = 1 } = o; if (k <= 0 || alpha <= 0) return;
  const L1 = Math.abs(ymid - y0), L2 = Math.abs(x1 - x0), L3 = Math.abs(y1 - ymid), L = L1 + L2 + L3, d = k * L;
  line(x0, y0, x0, lerp(y0, ymid, clamp(d / L1)), { color, w, alpha });
  if (d > L1) line(x0, ymid, lerp(x0, x1, clamp((d - L1) / L2)), ymid, { color, w, alpha });
  if (d > L1 + L2) arrow(x1, ymid, x1, y1, { color, w, alpha, k: clamp((d - L1 - L2) / L3) });
}
function tick(x, y, s, k, color = COL.ok, alpha = 1) {
  if (k <= 0 || alpha <= 0) return;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.lineWidth = s * .16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const p = [[x - s * .45, y], [x - s * .12, y + s * .32], [x + s * .5, y - s * .42]];
  const l1 = Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]), l2 = Math.hypot(p[2][0] - p[1][0], p[2][1] - p[1][1]), d = k * (l1 + l2);
  ctx.beginPath(); ctx.moveTo(...p[0]);
  if (d <= l1) ctx.lineTo(lerp(p[0][0], p[1][0], d / l1), lerp(p[0][1], p[1][1], d / l1));
  else { ctx.lineTo(...p[1]); ctx.lineTo(lerp(p[1][0], p[2][0], (d - l1) / l2), lerp(p[1][1], p[2][1], (d - l1) / l2)); }
  ctx.stroke(); ctx.restore();
}
function cross(x, y, s, k, color = COL.err, alpha = 1) {
  if (k <= 0 || alpha <= 0) return;
  line(x - s / 2, y - s / 2, x + s / 2, y + s / 2, { color, w: s * .14, k: clamp(k * 2), alpha });
  line(x + s / 2, y - s / 2, x - s / 2, y + s / 2, { color, w: s * .14, k: clamp(k * 2 - 1), alpha });
}
// a rounded label; returns its width
function chip(id, s, x, y, o = {}) {
  const { size = 30, color = COL.ink, fill = '#FFFFFF', stroke = COL.rule, alpha = 1, weight = 400, align = 'left', mono = false, pad = 18 } = o;
  ctx.save(); ctx.font = font(size, weight, mono); const w = ctx.measureText(s).width + pad * 2; ctx.restore();
  const x0 = align === 'center' ? x - w / 2 : x;
  box(x0, y, w, size * 1.6, { fill, stroke, r: size * .4, alpha });
  txt(id, s, x0 + pad, y + size * 1.13, { size, color, alpha, weight, mono });
  return w;
}

// curved arrow from (x0,y0) to (x1,y1); bend > 0 bulges upwards (screen), k draws it on
function curveArrow(x0, y0, x1, y1, bend, o = {}) {
  const { k = 1, color = COL.ink, w = 3, alpha = 1, head = 14, dash = null } = o; if (k <= 0 || alpha <= 0) return;
  const cx = (x0 + x1) / 2, cy = Math.min(y0, y1) - bend, n = 40, m = Math.max(1, Math.round(n * k));
  const P = u => [(1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * cx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * cy + u * u * y1];
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x0, y0); for (let i = 1; i <= m; i++) ctx.lineTo(...P(i / n * (k >= 1 ? 1 : 1))); ctx.stroke(); ctx.restore();
  if (k >= 1) { const [ax, ay] = P(.96); arrow(ax, ay, x1, y1, { color, w, head, alpha }); }
}
// a row of field boxes: names[i] is markup; returns the boxes
function fieldRow(id, names, x, y, o = {}) {
  const { size = 22, gap = 10, alpha = 1, pad = 12, fills = [] } = o, out = [];
  let xx = x;
  names.forEach((n, i) => {
    const w = rich('', n, 0, 0, { size, mono: true, maxW: 1e4, dry: true }).w + pad * 2, h = size * 2;
    out.push({ x: xx, y, w, h, cx: xx + w / 2 });
    if (alpha > 0) {
      box(xx, y, w, h, { fill: fills[i] || '#FFFFFF', stroke: COL.rule, r: 6, alpha });
      rich(`${id}:${i}`, n, xx + pad, y + (h - size * 1.3) / 2, { size, mono: true, maxW: 1e4, alpha });
    }
    xx += w + gap;
  });
  return out;
}

// ---------- E-R diagrams ----------
function erBox(id, name, cx, cy, o = {}) {
  const { alpha = 1, w = null, size = 30, stroke = COL.ink, fill = '#FFFFFF', hl = 0 } = o;
  ctx.save(); ctx.font = font(size, 700, true); const bw = w || ctx.measureText(name).width + 56; ctx.restore();
  const bh = size * 2.2, b = { x: cx - bw / 2, y: cy - bh / 2, w: bw, h: bh, cx, cy };
  if (alpha <= 0) return b;          // geometry is still returned, for lines drawn to this box later
  box(b.x, b.y, bw, bh, { fill: hl > 0 ? '#FCEFC9' : fill, stroke, lw: 3, r: 10, alpha });
  txt(id, name, cx, cy + size * .36, { size, weight: 700, mono: true, align: 'center', alpha });
  return b;
}
// the point where the segment from the centre of box b towards (x,y) leaves the box
function edge(b, x, y) {
  const dx = x - b.cx, dy = y - b.cy, sx = (b.w / 2) / Math.abs(dx || 1e-9), sy = (b.h / 2) / Math.abs(dy || 1e-9), s = Math.min(sx, sy);
  return [b.cx + dx * s, b.cy + dy * s];
}
// end marks: 'one' (plain), 'many' (crow's foot), 'zeroOne', 'zeroMany', 'exactlyOne', 'oneMany'
function endMark(x, y, ang, kind, o) {
  const { color = COL.ink, w = 3, alpha = 1 } = o, c = Math.cos(ang), s = Math.sin(ang), px = -s, py = c;
  const at = d => [x - c * d, y - s * d];
  const bar = d => { const [bx, by] = at(d); line(bx + px * 16, by + py * 16, bx - px * 16, by - py * 16, { color, w, alpha }); };
  const crow = () => { const [bx, by] = at(34); for (const k of [-1, 0, 1]) line(bx, by, x + px * 18 * k, y + py * 18 * k, { color, w, alpha }); };
  const circle = d => { const [bx, by] = at(d); ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.lineWidth = w; ctx.fillStyle = COL.bg; ctx.beginPath(); ctx.arc(bx, by, 11, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); };
  if (kind === 'many') crow();
  if (kind === 'zeroOne') { bar(14); circle(42); }
  if (kind === 'zeroMany') { crow(); circle(50); }
  if (kind === 'exactlyOne') { bar(14); bar(26); }
  if (kind === 'oneMany') { crow(); bar(46); }
}
// erLine(b0, b1, end0, end1, o): line between two boxes; ends drawn once the line is complete
function erLine(b0, b1, end0, end1, o = {}) {
  const { k = 1, alpha = 1, color = COL.ink, w = 3, dash = null } = o; if (!b0 || !b1 || k <= 0 || alpha <= 0) return;
  const [x0, y0] = edge(b0, b1.cx, b1.cy), [x1, y1] = edge(b1, b0.cx, b0.cy);
  line(x0, y0, x1, y1, { k, color, w, alpha, dash });
  const m = clamp((k - .85) / .15) * alpha;
  if (m > 0) { endMark(x0, y0, Math.atan2(y0 - y1, x0 - x1), end0, { color, w, alpha: m }); endMark(x1, y1, Math.atan2(y1 - y0, x1 - x0), end1, { color, w, alpha: m }); }
  return { x0, y0, x1, y1, mx: (x0 + x1) / 2, my: (y0 + y1) / 2 };
}

// ---------- data grid ----------
// grid(id, x, y, spec, o): spec {cols: [{h, w, st}], rows: [[cell...]], size, rh}. A cell is markup text,
// null (grey placeholder bar) or '' (empty). o: alpha, rowA(r), cellHL(r,c), rowBox(r), colBox(c), cellColor(r,c),
// cellText(r,c) (override). Returns {x, y, w, h, cell(r,c), row(r), col(c)}.
function grid(id, x, y, spec, o = {}) {
  const size = spec.size || 28, rh = spec.rh || Math.round(size * 2), cols = spec.cols, rows = spec.rows;
  const xs = [x]; for (const c of cols) xs.push(xs[xs.length - 1] + c.w);
  const w = xs[xs.length - 1] - x, h = rh * (rows.length + 1);
  const g = { x, y, w, h, rh, cell: (r, c) => ({ x: xs[c], y: y + rh * (r + 1), w: cols[c].w, h: rh }),
    row: r => ({ x, y: y + rh * (r + 1), w, h: rh }), col: c => ({ x: xs[c], y, w: cols[c].w, h }) };
  const alpha = o.alpha ?? 1; if (alpha <= 0) return g;
  ctx.save(); ctx.globalAlpha *= alpha;
  box(x, y, w, h, { fill: '#FFFFFF', stroke: COL.rule, r: 8 });
  box(x, y, w, rh, { fill: '#ECE8DF', r: 8 }); ctx.fillStyle = '#ECE8DF'; ctx.fillRect(x, y + rh / 2, w, rh / 2);
  cols.forEach((c, i) => {
    const hk = o.colHL ? o.colHL(i) : 0;
    if (hk > 0) box(xs[i] + 2, y + 2, c.w - 4, h - 4, { fill: COL.hi, r: 6, alpha: hk });
    rich(`${id}:h${i}`, c.st ? `{${c.st},b|${c.h}}` : `{b|${c.h}}`, xs[i] + 14, y + (rh - size * 1.3) / 2, { size, mono: true, maxW: 1e4 });
  });
  rows.forEach((row, r) => {
    const ra = o.rowA ? o.rowA(r) : 1; if (ra <= 0) return;
    ctx.save(); ctx.globalAlpha *= ra;
    const ry = y + rh * (r + 1);
    line(x, ry, x + w, ry, { w: 1.5, color: COL.rule });
    row.forEach((v, c) => {
      const hk = o.cellHL ? o.cellHL(r, c) : 0;
      if (hk > 0) box(xs[c] + 4, ry + 4, cols[c].w - 8, rh - 8, { fill: COL.hi, r: 6, alpha: hk });
      const val = o.cellText ? (o.cellText(r, c) ?? v) : v;
      if (val === null) box(xs[c] + 14, ry + rh * .38, Math.min(cols[c].w - 28, 120), rh * .24, { fill: COL.ph, r: 5 });
      else if (val !== '') rich(`${id}:${r},${c}`, val, xs[c] + 14, ry + (rh - size * 1.3) / 2,
        { size, mono: true, maxW: 1e4, color: o.cellColor ? o.cellColor(r, c) || COL.ink : COL.ink });
    });
    ctx.restore();
  });
  for (let i = 1; i < cols.length; i++) line(xs[i], y, xs[i], y + h, { w: 1.5, color: COL.rule });
  if (o.rowBox) rows.forEach((_, r) => { const k = o.rowBox(r); if (k > 0) box(x - 4, y + rh * (r + 1) - 2, w + 8, rh + 4, { stroke: o.rowBoxColor || COL.pk, lw: 4, r: 8, alpha: k }); });
  if (o.colBox) cols.forEach((_, c) => { const k = o.colBox(c); if (k > 0) box(xs[c] - 2, y - 4, cols[c].w + 4, h + 8, { stroke: o.colBoxColor || COL.fk, lw: 4, r: 8, alpha: k }); });
  ctx.restore();
  return g;
}

// ---------- code block ----------
// code(id, lines, x, y, o): lines are markup strings; SQL keywords are bold. o.show(i) gives each line's alpha.
function code(id, lines, x, y, o = {}) {
  const { size = 32, alpha = 1, show = () => 1, w = null, h = {}, pad = 24, sql = true } = o;
  const LH = size * 1.5;
  let wMax = 0; for (const l of lines) wMax = Math.max(wMax, rich('', l, 0, 0, { size, mono: true, sql, maxW: 1e5, dry: true }).w);
  const bw = w || wMax + pad * 2, bh = lines.length * LH + pad * 2 - (LH - size * 1.3);
  const res = { x, y, w: bw, h: bh, anchors: {} };
  let vis = 0; for (let i = 0; i < lines.length; i++) vis = Math.max(vis, show(i));
  if (alpha <= 0 || vis <= 0) return res;
  box(x, y, bw, bh, { fill: COL.code, r: 10, alpha: alpha * vis });
  lines.forEach((l, i) => {
    const a = show(i) * alpha;
    const r = rich(`${id}:${i}`, l, x + pad, y + pad + i * LH, { size, mono: true, sql, maxW: 1e5, alpha: a, h, dy: 0 });
    Object.assign(res.anchors, r.anchors);
  });
  return res;
}

// ---------- cards ----------
// question card: tag 真题 and the question code, then the question text
function qcard(id, x, y, w, label, body, o = {}) {
  const { alpha = 1, size = 30, h = {} } = o;
  const inner = w - 56, bh = rich('', body, 0, 0, { size, maxW: inner, dry: true }).h;
  const H_ = 28 + 48 + 18 + bh + 22;
  if (alpha <= 0) return { x, y, w, h: H_ };
  box(x, y, w, H_, { fill: COL.card, stroke: COL.rule, r: 14, alpha });
  const cw = chip(id + ':tag', '真题', x + 28, y + 24, { size: 26, fill: COL.ink, stroke: null, color: '#FFFFFF', alpha, weight: 700 });
  txt(id + ':label', label, x + 28 + cw + 18, y + 59, { size: 32, weight: 700, mono: true, alpha });
  rich(id + ':body', body, x + 28, y + 28 + 48 + 18, { size, maxW: inner, alpha, h });
  return { x, y, w, h: H_ };
}
// mark scheme card: items (markup) with ticks; ticks[i] in 0..1 (negative = none), soft[i] for a light tick
function mscheme(id, x, y, w, items, o = {}) {
  const { alpha = 1, size = 30, ticks = [], soft = [], title = 'Mark scheme', note = null, h = {} } = o;
  const inner = w - 110, heights = items.map(s => rich('', s, 0, 0, { size, maxW: inner, dry: true }).h);
  const noteH = note ? rich('', note, 0, 0, { size: 26, maxW: w - 56, dry: true }).h + 14 : 0;
  const H_ = 24 + 44 + 12 + heights.reduce((a, b) => a + b + 10, 0) + noteH + 16;
  if (alpha <= 0) return { x, y, w, h: H_ };
  box(x, y, w, H_, { fill: COL.card, stroke: COL.ok, lw: 2.5, r: 14, alpha });
  txt(id + ':title', title, x + 28, y + 56, { size: 30, weight: 700, color: COL.ok, alpha });
  let yy = y + 24 + 44 + 12;
  items.forEach((s, i) => {
    dot(x + 36, yy + size * .72, size * .12, alpha);
    rich(`${id}:${i}`, s, x + 56, yy, { size, maxW: inner, alpha, h });
    if ((ticks[i] ?? -1) > 0) tick(x + w - 34, yy + size * .7, 34, ticks[i], COL.ok, alpha);
    if ((soft[i] ?? -1) > 0) tick(x + w - 34, yy + size * .7, 34, soft[i], COL.okSoft, alpha);
    yy += heights[i] + 10;
  });
  if (note) rich(id + ':note', note, x + 28, yy + 4, { size: 26, color: COL.mute, maxW: w - 56, alpha });
  return { x, y, w, h: H_ };
}
function dot(x, y, r, alpha = 1) {
  if (alpha <= 0) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = COL.mute; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
}
// framed answer-format box with a label in the corner
function fmtbox(id, x, y, w, hh, o = {}) {
  const { alpha = 1, label = '答题格式' } = o; if (alpha <= 0) return;
  box(x, y, w, hh, { stroke: COL.ink, lw: 2, r: 12, alpha });
  chip(id + ':label', label, x + 22, y - 22, { size: 24, fill: COL.bg, stroke: COL.ink, alpha, weight: 700 });
}
// definition: bold term, then the body
const defn = (id, term, body, x, y, o = {}) => rich(id, `{b|${term}} ${body}`, x, y, o);
// a numbered list; returns total height. items: markup; alphas: per item
function list(id, items, x, y, o = {}) {
  const { size = 32, maxW = MW, alphas = [], gap = 14, num = true, h = {}, color = COL.ink } = o; let yy = y;
  items.forEach((s, i) => {
    const a = alphas[i] ?? 1, lab = `${i + 1}.`;
    const ht = rich('', s, 0, 0, { size, maxW: maxW - 52, dry: true }).h;
    if (a > 0) {
      if (num) txt(`${id}:n${i}`, lab, x, yy + size * .98, { size, weight: 700, color: COL.mute, alpha: a });
      else dot(x + 12, yy + size * .72, size * .13, a);
      rich(`${id}:${i}`, s, x + 52, yy, { size, maxW: maxW - 52, alpha: a, h, color });
    }
    yy += ht + gap;
  });
  return yy - y;
}

// ---------- concept names (lesson plan) ----------
const CONCEPTS = {
  C1: ['Limitations of a file-based approach and how a relational database overcomes them', '文件方式的局限'],
  C2: ['Relational database terminology, keys and referential integrity', '术语和键'],
  C3: ['Relationships and E-R diagrams', '关系与 E-R 图'],
  C4: ['Normalisation to 3NF', '规范化'],
  C5: ['DBMS features and software tools', 'DBMS 的功能'],
  C6: ['SQL as a DDL', 'SQL 的数据定义'],
  C7: ['SQL as a DML: queries', 'SQL 查询'],
  C8: ['SQL as a DML: maintenance (INSERT, UPDATE, DELETE)', '数据维护'],
};
const FIRST = {}; for (const s of TL.segments) if (s.concept && !FIRST[s.concept]) FIRST[s.concept] = s.id;

function topBar(t, concept) {
  ctx.fillStyle = '#EFEBE3'; ctx.fillRect(0, 0, W, 72); line(0, 72, W, 72, { w: 1.5, color: COL.rule });
  txt('bar:l', '9618 Ch 8 Databases', 40, 46, { size: 26, weight: 700, color: COL.mute });
  if (concept) {
    const name = `${concept}  ${CONCEPTS[concept][0]}`;
    ctx.save(); ctx.font = font(26, 400); let s = name; while (ctx.measureText(s).width > 1080) s = s.slice(0, -2); if (s !== name) s += '…'; ctx.restore();
    txt('bar:c', s, 400, 46, { size: 26, color: COL.ink });
  }
  Object.keys(CONCEPTS).forEach((c, i) => {
    const x = 1560 + i * 40, on = concept && c <= concept;
    ctx.save(); ctx.beginPath(); ctx.arc(x, 36, 9, 0, 7); ctx.lineWidth = 2; ctx.strokeStyle = COL.mute; ctx.fillStyle = c === concept ? COL.ink : on ? COL.mute : 'transparent';
    ctx.fill(); ctx.stroke(); ctx.restore();
  });
}
// section title card at the start of each concept: 2.4 s, then fades
function titleCard(t) {
  for (const [c, id] of Object.entries(FIRST)) {
    const a = 1 - prog(t, T(id, 2.4), T(id, 2.9)), b = prog(t, T(id, -.35), T(id));
    const k = Math.min(a, b); if (k <= 0) continue;
    ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = COL.bg; ctx.fillRect(0, 73, W, 836);
    txt('card:c', c, W / 2, 400, { size: 120, weight: 700, align: 'center', color: COL.pk });
    rich('card:n', CONCEPTS[c][0], W / 2, 470, { size: 48, weight: 700, align: 'center', maxW: 1500 });
    const nh = rich('', CONCEPTS[c][0], 0, 0, { size: 48, maxW: 1500, dry: true }).h;
    txt('card:z', CONCEPTS[c][1], W / 2, 470 + nh + 60, { size: 40, align: 'center', color: COL.mute });
    ctx.restore();
  }
}

// ---------- subtitles ----------
const SUBS = {};      // id -> [{text, t0}]
const SUB_SIZE = 40, SUB_W = 1640;
function subLines(id) {
  if (SUBS[id]) return SUBS[id];
  const s = SAY[id]; ctx.save(); ctx.font = font(SUB_SIZE, 500);
  const fits = x => ctx.measureText(x).width <= SUB_W;
  // pieces end at Chinese punctuation; a piece too long for one line is split at spaces or between characters
  const pieces = [], re = /[^，。；：？！]+[，。；：？！]?/g; let m;
  while ((m = re.exec(s))) {
    let p = m[0], off = m.index;
    while (!fits(p.replace(/[，。；：]$/, ''))) {
      let cut = p.length - 1; while (cut > 0 && !fits(p.slice(0, cut))) cut--;
      // break after a space, 、 or comma; never inside an English word
      let at = -1; for (let j = cut; j > cut * .3; j--) if (/[ 、,，]/.test(p[j - 1])) { at = j; break; }
      if (at < 0) { at = cut; while (at > 1 && /[A-Za-z0-9_]/.test(p[at]) && /[A-Za-z0-9_]/.test(p[at - 1])) at--; if (at <= 1) at = cut; }
      pieces.push({ text: p.slice(0, at), off }); p = p.slice(at); off += at;
    }
    pieces.push({ text: p, off });
  }
  // merge pieces into lines as long as they fit
  const lines = [];
  for (const p of pieces) {
    const last = lines[lines.length - 1];
    if (last && /[，、]$/.test(last.text) && fits((last.text + p.text).replace(/[，。；：]$/, ''))) last.text += p.text;
    else lines.push({ ...p });
  }
  ctx.restore();
  const c = cum(id), tot = c[c.length - 1];
  return (SUBS[id] = lines.map(l => ({ text: l.text.replace(/[，。；：]$/, '').trim(), t0: T(id) + (E(id) - T(id)) * c[l.off] / tot })));
}
function subtitles(t) {
  const sg = TL.segments.find(s => t >= s.start && t < s.end); if (!sg) return;
  const ls = subLines(sg.id); let cur = ls[0];
  for (const l of ls) if (t >= l.t0) cur = l;
  if (!cur || !cur.text) return;
  ctx.save(); ctx.font = font(SUB_SIZE, 500); const w = ctx.measureText(cur.text).width; ctx.restore();
  box(W / 2 - w / 2 - 28, 948, w + 56, 74, { fill: 'rgba(31,35,40,.82)', r: 12 });
  txt('sub', cur.text, W / 2, 999, { size: SUB_SIZE, weight: 500, color: '#FFFFFF', align: 'center' });
}

// ---------- scenes ----------
// scene(first, last, fn): fn(t) draws the main area from the start of segment `first` to the end of `last`.
const SCENES = [];
function scene(a, b, fn) { SCENES.push({ a, b, fn }); }
function sceneAt(t) {
  for (let i = SCENES.length - 1; i >= 0; i--) if (t >= T(SCENES[i].a)) return i;
  return 0;
}
function draw(frame) {
  const t = frame / FPS; LAYOUT = [];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, W, H);
  const i = sceneAt(t), sc = SCENES[i], fade = prog(t, T(sc.a), T(sc.a, .35));
  if (fade < 1 && i > 0) { ctx.save(); ctx.globalAlpha = 1 - fade; SCENES[i - 1].fn(t); ctx.restore(); LAYOUT = []; }
  ctx.save(); ctx.globalAlpha = i > 0 ? fade : 1; sc.fn(t); ctx.restore();
  const concept = seg(sc.a).concept;
  if (concept) topBar(t, concept);
  titleCard(t);
  subtitles(t);
  const edgeK = Math.min(prog(t, 0, .4), 1 - prog(t, DUR - .8, DUR));
  if (edgeK < 1) { ctx.save(); ctx.globalAlpha = 1 - edgeK; ctx.fillStyle = COL.bg; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  window.LAYOUT = LAYOUT;
}
window.draw = draw; window.FRAMES = FRAMES; window.FPS = FPS;
window.CUES = TL.segments.map(s => s.start);
