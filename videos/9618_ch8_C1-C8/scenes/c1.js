// C1 Limitations of a file-based approach and how a relational database overcomes them

// file diagram used in C1_01 to C1_04: two programs, each with its file record of 6 fields
const C1F = (() => {
  const cw = 136, ch = 70, y = 335, xs = [110, 994];
  // field layouts: payroll has StaffName in field 1 and StaffNumber in field 5; sales has them in fields 1 and 2
  const fields = [{ 0: 'StaffName', 4: 'StaffNumber' }, { 0: 'StaffName', 1: 'StaffNumber' }];
  const cell = (f, i) => ({ x: xs[f] + i * cw, y, w: cw, h: ch, cx: xs[f] + i * cw + cw / 2 });
  return { cw, ch, y, xs, fields, cell, names: ['Payroll', 'Sales'] };
})();
function c1Files(t, o = {}) {
  const { hl = () => 0, order = null, red = 0, nums = 0, alphaF = [1, 1] } = o;
  for (let f = 0; f < 2; f++) {
    const a = alphaF[f]; if (a <= 0) continue;
    const x0 = C1F.xs[f], wRec = C1F.cw * 6, cx = x0 + wRec / 2;
    box(cx - 190, 140, 380, 72, { fill: '#FFFFFF', stroke: red > 0 ? COL.err : COL.ink, lw: 3, alpha: a });
    txt(`c1f:p${f}`, `${C1F.names[f]} program`, cx, 188, { size: 30, weight: 700, align: 'center', alpha: a, color: red > 0 ? COL.err : COL.ink });
    arrow(cx, 214, cx, 252, { alpha: a });
    txt(`c1f:f${f}`, `${C1F.names[f]} file`, x0, 285, { size: 28, weight: 700, alpha: a });
    for (let i = 0; i < 6; i++) {
      // position of field i (order lets the C1_04 restructuring move a field)
      const pos = order && f === 0 ? order(i) : i, x = x0 + pos * C1F.cw;
      const k = hl(f, i);
      box(x, C1F.y, C1F.cw, C1F.ch, { fill: k > 0 ? '#FCEFC9' : '#FFFFFF', stroke: COL.rule, r: 4, alpha: a });
      if (k > 0) box(x + 3, C1F.y + 3, C1F.cw - 6, C1F.ch - 6, { stroke: '#E0A915', lw: 3, r: 4, alpha: a * k });
      const name = C1F.fields[f][i];
      if (name) txt(`c1f:${f}${i}`, name, x + C1F.cw / 2, C1F.y + 44, { size: 19, mono: true, align: 'center', alpha: a });
      else box(x + 24, C1F.y + 30, C1F.cw - 48, 12, { fill: COL.ph, r: 4, alpha: a });
      if (nums > 0) txt(`c1f:n${f}${i}`, String(pos + 1), x + C1F.cw / 2, C1F.y - 8, { size: 22, color: COL.mute, align: 'center', alpha: a * nums });
    }
  }
}
// limitation box at the bottom of the C1_01-C1_04 scene
function c1Lim(id, n, s, t, at, until) {
  const a = Math.min(A(t, at), until ? 1 - prog(t, until - .3, until) : 1); if (a <= 0) return;
  box(X0, 580, MW, 300, { fill: '#FFFFFF', stroke: COL.rule, r: 14, alpha: a });
  chip(id + ':n', `Limitation ${n}`, X0 + 28, 600, { size: 24, weight: 700, alpha: a });
  rich(id, s, X0 + 28, 666, { size: 32, maxW: MW - 56, alpha: a });
}

scene('C1_01', 'C1_04', t => {
  const show = [A(t, S('C1_01', '工资程序读写工资文件')), A(t, S('C1_01', '销售程序读写销售文件'))];
  const both = A(t, S('C1_01', '员工姓名和员工编号'));
  const nameHL = Math.min(both, 1 - prog(t, T('C1_04'), T('C1_04', .4)));
  const p5 = A(t, S('C1_04', '第五个字段')), p2 = A(t, S('C1_04', '第二个字段'));
  const restr = K(t, S('C1_04', '所以数据结构一旦改变'), S('C1_04', '所以数据结构一旦改变', .8));
  c1Files(t, {
    alphaF: show,
    hl: (f, i) => {
      if (t >= T('C1_04')) return (f === 0 && i === 4) ? p5 : (f === 1 && i === 1) ? p2 : 0;
      return C1F.fields[f][i] ? nameHL : 0;
    },
    // fields 4 and 5 (index 3, 4) swap places when the structure changes
    order: i => i === 3 ? lerp(3, 4, restr) : i === 4 ? lerp(4, 3, restr) : i,
    nums: A(t, T('C1_04')),
    red: t >= S('C1_04', '都必须重写') ? 1 : 0,
  });
  // C1_02: redundancy
  const r1 = Math.min(A(t, T('C1_02')), 1 - prog(t, T('C1_03'), T('C1_03', .3)));
  txt('c1:red', 'data redundancy 数据冗余', W / 2, 490, { size: 34, weight: 700, align: 'center', alpha: r1 });
  // C1_03: inconsistency
  const out3 = 1 - prog(t, T('C1_04'), T('C1_04', .3));
  const fmt = Math.min(A(t, T('C1_03')), out3);
  txt('c1:fmt0', '格式不同', C1F.cell(0, 0).cx, 440, { size: 26, color: COL.err, align: 'center', alpha: fmt });
  txt('c1:fmt1', '格式不同', C1F.cell(1, 0).cx, 440, { size: 26, color: COL.err, align: 'center', alpha: fmt });
  const upd = Math.min(A(t, S('C1_03', '如果工资程序修改了')), out3), noUpd = Math.min(A(t, S('C1_03', '而销售程序没有修改')), out3);
  txt('c1:upd', '已更新', C1F.cell(0, 4).cx, 440, { size: 26, weight: 700, color: COL.ok, align: 'center', alpha: upd });
  txt('c1:noupd', '未更新', C1F.cell(1, 1).cx, 440, { size: 26, weight: 700, color: COL.err, align: 'center', alpha: noUpd });
  const ne = Math.min(A(t, S('C1_03', '保存了不同的值')), out3);
  txt('c1:ne', '≠', (C1F.cell(0, 4).cx + C1F.cell(1, 1).cx) / 2, 450, { size: 64, weight: 700, color: COL.err, align: 'center', alpha: ne });
  txt('c1:inc', 'data inconsistency 数据不一致', W / 2, 530, { size: 34, weight: 700, align: 'center', alpha: Math.min(A(t, S('C1_03', '这是数据不一致')), out3) });
  // C1_04: dependence
  txt('c1:rw', 'must be rewritten', W / 2, 188, { size: 30, weight: 700, color: COL.err, align: 'center', alpha: A(t, S('C1_04', '都必须重写')) });
  // limitation boxes
  c1Lim('c1:l1', 1, '{b|There is more data redundancy}, because the same data is stored many times in the separate files used by different applications, so storage space is wasted.',
    t, S('C1_02', '答题时写作'), T('C1_03'));
  c1Lim('c1:l2', 2, '{b|There is more data inconsistency // worse data integrity}, because duplicated data might be stored differently // when data is updated in one place, it is not updated everywhere.',
    t, S('C1_03', '原因是'), T('C1_04'));
  c1Lim('c1:l3', 3, '{b|There is program-data dependence}, because any change to the structure of the data means the programs that access that data have to be re-written.',
    t, S('C1_04', '这叫程序与数据相互依赖'));
});

scene('C1_05', 'C1_05', t => {
  txt('c1:limT', 'Limitations of a file-based approach', X0, 170, { size: 40, weight: 700 });
  list('c1:lims', [
    '{b|There is more data redundancy}',
    '{b|There is more data inconsistency // worse data integrity}',
    '{b|There is program-data dependence}',
    '{b|It is not easy to perform complex searches / queries}, because a new program has to be written each time.',
    '{b|There could be a lack of privacy}, as user views cannot easily be implemented.',
  ], X0, 220, { size: 34, gap: 22, alphas: [1, 1, 1, A(t, S('C1_05', '复杂的搜索')), A(t, S('C1_05', '可能缺乏隐私保护'))] });
});

scene('C1_06', 'C1_06', t => {
  defn('c1:db', 'Database:', 'A database is a structured collection of items of data that can be accessed by different application programs.',
    X0, 150, { size: 34, alpha: A(t, S('C1_06', '数据库是结构化的数据集合')) });
  defn('c1:rdb', 'Relational database:', 'A relational database stores data in separate tables that are linked to each other by keys.',
    X0, 290, { size: 34, alpha: A(t, S('C1_06', '关系数据库，relational database')) });
  const a = A(t, S('C1_06', '各表之间通过键相互连接'));
  const s = design('c1:st', 'STUDENT({pk|StudentID}, ..., {fk,@k|ClassID})', 200, 520, { size: 36, alpha: a });
  const c = design('c1:cl', 'CLASS({pk,@k|ClassID}, TeacherName, Location)', 1020, 520, { size: 36, alpha: a });
  const p = s.anchors.k, q = c.anchors.k;
  if (p && q) elbow(p.x + p.w / 2, p.y + p.h + 6, q.x + q.w / 2, q.y + q.h + 8, p.y + p.h + 90,
    { k: K(t, S('C1_06', '各表之间通过键相互连接', .4), S('C1_06', '各表之间通过键相互连接', 1.4)), color: COL.fk });
});

scene('C1_07', 'C1_10', t => {
  const rows = [
    ['data redundancy', 'Data redundancy is reduced, because linked tables mean that each data item is stored only once.', T('C1_07')],
    ['data inconsistency', 'Data consistency is maintained // data integrity is improved, because {h1|data stored only once only needs to be updated once} // {h2|linked data cannot be entered differently in two tables} // {h3|referential integrity can be enforced}.', T('C1_08')],
    ['program-data dependence', 'There is program-data independence, because the data is separate from the software, so changes to the structure of the data are managed by the DBMS and do not require programs to be re-written; queries are not dependent on the structure of the data.', T('C1_09')],
    ['complex searches / queries', 'Complex queries are easier to run.', S('C1_10', '复杂查询更容易执行')],
    ['lack of privacy', 'Different views can be provided, so users can only see specific aspects of the database.', S('C1_10', '可以提供不同的视图')],
    ['', 'Multiple concurrent access is possible, through record locking.', S('C1_10', '通过记录锁定')],
  ];
  const lx = X0, rx = 620, rw = X1 - rx, size = 28;
  txt('c1:hl', 'File-based limitation', lx, 150, { size: 30, weight: 700, color: COL.mute });
  txt('c1:hr', 'Relational database advantage', rx, 150, { size: 30, weight: 700, color: COL.mute });
  line(X0, 170, X1, 170, { color: COL.rule, w: 2 });
  const h = { 1: A(t, S('C1_08', '只存储一次的数据只需要更新一次')), 2: A(t, S('C1_08', '相互连接的数据不会')), 3: A(t, S('C1_08', '并且可以强制实施参照完整性')) };
  let y = 186;
  rows.forEach(([l, r, at], i) => {
    const a = A(t, at), hh = rich('', r, 0, 0, { size, maxW: rw, dry: true }).h;
    if (l) { rich('c1:cl' + i, l, lx, y, { size, color: COL.err, alpha: a, maxW: 440 }); txt('c1:ar' + i, '→', 570, y + size, { size, color: COL.mute, alpha: a }); }
    rich('c1:cr' + i, r, rx, y, { size, maxW: rw, alpha: a, h });
    y += hh + 18;
  });
});

scene('C1_11', 'C1_11', t => {
  fmtbox('c1:fmt', X0, 150, MW, 700, { alpha: A(t, T('C1_11')) });
  rich('c1:f1', '{b|[name]} because {b|[reason]}', W / 2, 210, { size: 48, align: 'center', alpha: A(t, T('C1_11')) });
  txt('c1:f2', '1 mark  +  1 mark', W / 2, 360, { size: 40, weight: 700, color: COL.ok, align: 'center', alpha: A(t, S('C1_11', '分数成对给出')) });
  const ex = A(t, S('C1_11', '所以每一条都先写名称'));
  txt('c1:exl', 'e.g.', X0 + 40, 480, { size: 30, color: COL.mute, alpha: ex });
  rich('c1:ex1', '{b|There is more data redundancy},', X0 + 40, 500, { size: 34, alpha: ex });
  rich('c1:ex2', 'because the same data is stored many times in the separate files used by different applications, so storage space is wasted.', X0 + 40, 600, { size: 34, maxW: 1260, alpha: ex });
  chip('c1:m1', '1 mark: name', 1500, 500, { size: 28, color: COL.ok, stroke: COL.ok, alpha: Math.min(ex, A(t, S('C1_11', '一分给局限或优点的名称'))) });
  chip('c1:m2', '1 mark: because', 1460, 610, { size: 28, color: COL.ok, stroke: COL.ok, alpha: Math.min(ex, A(t, S('C1_11', '一分给后面 because'))) });
});

scene('C1_12', 'C1_13', t => {
  const q = qcard('c1:q', X0, 130, MW, 'w23_11 3(b) [3]',
    'A shop manager has designed a relational database to store customer orders. {h1|Identify} three advantages of a relational database compared to a file-based approach.',
    { alpha: A(t, T('C1_12')), size: 32, h: { 1: A(t, T('C1_13')) } });
  chip('c1:id', '只写名称，每点 1 分，最多 3 分', X0, q.y + q.h + 18, { size: 28, weight: 700, alpha: A(t, S('C1_13', '只要求写出名称')) });
  const soft = A(t, S('C1_13', '同样得分'));
  mscheme('c1:ms', X0, q.y + q.h + 100, MW, [
    'Reduced data redundancy', 'Improved data integrity / consistency / referential integrity', 'Allows for views / improved privacy',
    'Allows for program-data independence', 'Complex queries can be executed'],
    { alpha: A(t, T('C1_13', .5)), size: 32, title: 'Mark scheme  (1 mark for each bullet point, max 3)',
      ticks: [A(t, S('C1_13', 'Reduced data redundancy')), A(t, S('C1_13', 'Improved data integrity')), -1, A(t, S('C1_13', 'Allows for program-data independence')), -1],
      soft: [-1, -1, soft, -1, soft] });
});
