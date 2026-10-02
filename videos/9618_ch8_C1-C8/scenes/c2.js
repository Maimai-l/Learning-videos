// C2 Relational database terminology, keys and referential integrity

scene('C2_01', 'C2_01', t => {
  defn('c2:ent', 'Entity:', 'an object about which data can be stored, for example a person, place, event or thing; a real-life object that is represented as a table.',
    X0, 160, { size: 36, alpha: A(t, S('C2_01', '实体，entity')) });
  ['person', 'place', 'event', 'thing'].forEach((w, i) => {
    chip('c2:e' + i, w, 420 + i * 280, 380, { size: 34, align: 'center', alpha: A(t, S('C2_01', ['例如一个人', '一个地点', '一个事件', '一件物品'][i])) });
  });
  const a = A(t, S('C2_01', '现实中的一个实体'));
  txt('c2:e2t', 'entity', 760, 620, { size: 48, weight: 700, align: 'center', alpha: a });
  arrow(860, 605, 1040, 605, { alpha: a, k: K(t, S('C2_01', '现实中的一个实体'), S('C2_01', '现实中的一个实体', .6)) });
  txt('c2:e2t2', 'table', 1140, 620, { size: 48, weight: 700, align: 'center', alpha: A(t, S('C2_01', '用一张表来表示')) });
});

scene('C2_02', 'C2_04', t => {
  const g0 = { cols: [{ h: 'CustomerID', w: 260 }, { h: 'FirstName', w: 240 }, { h: 'LastName', w: 240 }], rows: [[null, null, null], [null, null, null], [null, null, null]], size: 28, rh: 62 };
  const gx = 590, gy = 190;
  const rowK = A(t, S('C2_02', '每一行对应')), colK = A(t, S('C2_02', '每一列对应'));
  grid('c2:cust', gx, gy, g0, { alpha: A(t, T('C2_02')), rowBox: r => r === 1 ? rowK : 0, colBox: c => c === 1 ? colK : 0, rowBoxColor: COL.pk, colBoxColor: COL.fk });
  const rec = A(t, S('C2_03', '一行称为记录')), fld = A(t, S('C2_03', '字段，field'));
  const rowY = gy + 62 * 2 + 40;
  txt('c2:rowl', 'one instance of an entity', gx - 24, rowY, { size: 28, color: COL.pk, align: 'right', alpha: rowK * (1 - rec) });
  txt('c2:rowl2', 'record / tuple', gx - 24, rowY, { size: 30, weight: 700, color: COL.pk, align: 'right', alpha: rec });
  txt('c2:coll', 'attribute', gx + 260 + 120, gy - 14, { size: 28, color: COL.fk, align: 'center', alpha: colK * (1 - fld) });
  txt('c2:coll2', 'field', gx + 260 + 120, gy - 14, { size: 30, weight: 700, color: COL.fk, align: 'center', alpha: fld });
  defn('c2:tab', 'Table:', 'a group of similar data, in a database, with rows for each instance of an entity and columns for each attribute.',
    X0, 490, { size: 32, alpha: A(t, S('C2_02', '表，table')) });
  defn('c2:att', 'Attribute:', "an individual data item stored about an entity, for example a customer's date of birth.",
    X0, 600, { size: 32, alpha: A(t, S('C2_02', '属性，attribute')) });
  design('c2:gen', 'TABLENAME(Attribute1, Attribute2, ...)', X0, 700, { size: 34, color: COL.mute, alpha: A(t, T('C2_04')) });
  const d = design('c2:ex', 'CUSTOMER({blue,@k|CustomerID}, FirstName, LastName)', X0, 780, { size: 40, alpha: A(t, S('C2_04', '例如 CUSTOMER')) });
  const u = K(t, S('C2_04', '其中 CustomerID 带下划线'), S('C2_04', '其中 CustomerID 带下划线', .7)), k = d.anchors.k;
  if (k && u > 0) box(k.x, k.y + 40 * 1.12, k.w * u, 3.5, { fill: COL.pk, r: 1 });
});

scene('C2_05', 'C2_05', t => {
  defn('c2:pk', 'Primary key:', 'the unique attribute / combination of attributes used to identify the record / tuple.', X0, 160, { size: 34, alpha: A(t, T('C2_05')) });
  defn('c2:ck', 'Candidate key:', 'an attribute or smallest set of attributes in a table where no tuple has the same value // an attribute that could be a primary key.',
    X0, 280, { size: 34, alpha: A(t, S('C2_05', '可以作为主键的属性称为候选键')) });
  const a = A(t, S('C2_05', '主键是被选中的那个候选键')), sel = A(t, S('C2_05', '主键是被选中的那个候选键', .8));
  [0, 1, 2].forEach(i => {
    const on = i === 1 ? sel : 0;
    chip('c2:cand' + i, 'candidate key', 600 + i * 360, 560, { size: 32, align: 'center', alpha: a, stroke: on > 0 ? COL.pk : COL.rule, color: on > 0 ? COL.pk : COL.ink, weight: on > 0 ? 700 : 400 });
  });
  txt('c2:chosen', 'primary key', 960, 690, { size: 38, weight: 700, color: COL.pk, align: 'center', alpha: sel });
  arrow(960, 625, 960, 650, { color: COL.pk, alpha: sel });
});

scene('C2_06', 'C2_06', t => {
  const pkAt = S('C2_06', '如果选择 Symbol 作为主键'), secAt = S('C2_06', '就是次键');
  const d = design('c2:el', 'ELEMENTS({@s,' + (t >= pkAt ? 'blue' : 'b') + '|Symbol}, {@n|Name}, {@w|AtomicWeight})', W / 2, 200, { size: 48, align: 'center', alpha: A(t, T('C2_06')) });
  const ck = A(t, S('C2_06', '所以三个属性都是候选键')), pk = A(t, pkAt), sec = A(t, secAt);
  const s = d.anchors.s; if (s && pk > 0) box(s.x, s.y + 48 * 1.12, s.w * K(t, pkAt, pkAt + .6), 4, { fill: COL.pk, r: 1 });
  [['s', pk, 'primary key', COL.pk], ['n', sec, 'secondary key', COL.mute], ['w', sec, 'secondary key', COL.mute]].forEach(([n, k, lab, c]) => {
    const b = d.anchors[n]; if (!b) return;
    const ly = b.y + (n === 'n' ? 190 : 130);      // Name is short: its label goes on a second row
    if (n === 'n') line(b.x + b.w / 2, b.y + b.h + 8, b.x + b.w / 2, ly - 34, { w: 2, color: COL.mute, alpha: Math.max(ck, k) });
    txt('c2:ck' + n, 'candidate key', b.x + b.w / 2, ly, { size: 28, align: 'center', alpha: ck * (1 - k) });
    txt('c2:lab' + n, lab, b.x + b.w / 2, ly, { size: 30, weight: 700, align: 'center', color: c, alpha: k });
  });
  defn('c2:sk', 'Secondary key:', 'a candidate key that has not been chosen as the primary key.', X0, 500, { size: 34, alpha: A(t, S('C2_06', '即没有被选为主键的候选键')) });
  rich('c2:most', 'Most tables have only one candidate key, and it becomes the primary key.', X0, 620, { size: 34, alpha: A(t, S('C2_06', '多数表只有一个候选键')) });
});

scene('C2_07', 'C2_07', t => {
  const notU = A(t, S('C2_07', '所以 ActorID 和 FilmID 单独都不唯一')), pair = A(t, S('C2_07', '所以这一对值是唯一的'));
  const single = notU * (1 - pair);
  const rows = [['A1', 'F1'], ['A1', 'F2'], ['A2', 'F1'], ['A2', 'F3']];
  grid('c2:fa', 300, 160, { cols: [{ h: 'ActorID', w: 240 }, { h: 'FilmID', w: 240 }], rows, size: 30, rh: 64 }, {
    alpha: A(t, S('C2_07', '在 FILM_ACTOR 表中')),
    cellHL: (r, c) => (c === 0 && r < 2) || (c === 1 && (r === 0 || r === 2)) ? single : 0,
    rowBox: () => pair });
  txt('c2:fa:n', 'FILM_ACTOR', 300, 145, { size: 30, weight: 700, mono: true, alpha: A(t, S('C2_07', '在 FILM_ACTOR 表中')) });
  txt('c2:fa:note', '示意值', 300 + 480 + 20, 160 + 64 * 5 - 16, { size: 22, color: COL.mute, alpha: A(t, S('C2_07', '在 FILM_ACTOR 表中')) });
  rich('c2:fa1', 'one actor → many films', 1000, 190, { size: 32, alpha: A(t, S('C2_07', '一位演员出演多部电影')) });
  rich('c2:fa2', 'one film → many actors', 1000, 250, { size: 32, alpha: A(t, S('C2_07', '一部电影有多位演员')) });
  rich('c2:fa3', '{red|ActorID alone: not unique}', 1000, 330, { size: 32, alpha: notU });
  rich('c2:fa4', '{red|FilmID alone: not unique}', 1000, 390, { size: 32, alpha: notU });
  rich('c2:fa5', '{ok,b|(ActorID, FilmID): unique}', 1000, 470, { size: 32, alpha: pair });
  const c = A(t, S('C2_07', '由两个或更多属性'));
  design('c2:fad', 'FILM_ACTOR({pk|ActorID}, {pk|FilmID})', X0, 610, { size: 40, alpha: c });
  defn('c2:cpk', 'Composite primary key:', 'two or more attributes that together form the primary key.', X0, 700, { size: 34, alpha: A(t, S('C2_07', '称为复合主键')) });
});

scene('C2_08', 'C2_08', t => {
  defn('c2:fk', 'Foreign key:', 'a field in one table that is linked to the primary key in another table.', X0, 150, { size: 34, alpha: A(t, T('C2_08')) });
  list('c2:fkm', [
    'The underlined attribute(s) in a table form its primary key.',
    'For each attribute that is not part of the primary key, check whether it is the primary key of another table. If it is, it is a foreign key in this table and it references that other table.',
    'The same attribute name can be a primary key in one table and a foreign key in another.',
  ], X0, 240, { size: 30, alphas: [A(t, S('C2_08', '识别方法')), A(t, S('C2_08', '对每个不属于主键的属性')), A(t, S('C2_08', '同一个属性名'))] });
  const a = A(t, S('C2_08', '同一个属性名', .6));
  const s = design('c2:shop', 'SHOP({pk|ShopID}, {fk,@a|ManagerID}, ...)', 200, 620, { size: 36, alpha: a });
  const m = design('c2:man', 'MANAGER({pk,@b|ManagerID}, ...)', 1100, 620, { size: 36, alpha: a });
  const p = s.anchors.a, q = m.anchors.b;
  if (p && q) elbow(p.x + p.w / 2, p.y + p.h + 8, q.x + q.w / 2, q.y + q.h + 10, p.y + p.h + 80, { color: COL.fk, k: K(t, S('C2_08', '在另一张表中是外键'), S('C2_08', '在另一张表中是外键', 1)) });
  txt('c2:fkl', 'foreign key in SHOP', 200 + 300, 800, { size: 26, color: COL.fk, alpha: A(t, S('C2_08', '在另一张表中是外键')) });
  txt('c2:pkl', 'primary key of MANAGER', 1100 + 200, 800, { size: 26, color: COL.pk, alpha: A(t, S('C2_08', '在另一张表中是外键')) });
});

scene('C2_09', 'C2_09', t => {
  txt('c2:ri', 'Referential integrity', X0, 160, { size: 40, weight: 700, alpha: A(t, T('C2_09')) });
  const sA = A(t, S('C2_09', 'STUDENT 表中有外键 ClassID')), cA = A(t, S('C2_09', 'CLASS 表的主键是 ClassID'));
  const d7 = A(t, S('C2_09', '如果某个学生的 ClassID 是 7D')), miss = A(t, S('C2_09', '而 CLASS 表中没有 7D 班'));
  const sg = grid('c2:stu', X0, 260, { cols: [{ h: 'StudentID', w: 220 }, { h: '...', w: 110 }, { h: 'ClassID', w: 190, st: 'fk' }],
    rows: [[null, '', '7A'], [null, '', '7B'], [null, '', '7D']], size: 28, rh: 62 },
    { alpha: sA, cellHL: (r, c) => r === 2 && c === 2 ? d7 : 0, cellColor: (r, c) => r === 2 && c === 2 && miss > 0 ? COL.err : null });
  txt('c2:stu:n', 'STUDENT', X0, 245, { size: 28, weight: 700, mono: true, alpha: sA });
  const tl = A(t, S('C2_09', '还存储了老师姓名和教室位置'));
  const cg = grid('c2:cls', 1000, 260, { cols: [{ h: 'ClassID', w: 190, st: 'pk' }, { h: 'TeacherName', w: 260 }, { h: 'Location', w: 220 }],
    rows: [['7A', null, null], ['7B', null, null]], size: 28, rh: 62 }, { alpha: cA, colHL: c => c > 0 ? tl * (1 - miss) : 0 });
  txt('c2:cls:n', 'CLASS', 1000, 245, { size: 28, weight: 700, mono: true, alpha: cA });
  const from = sg.cell(2, 2), yMiss = cg.y + 62 * 3 + 31;
  arrow(from.x + from.w + 8, from.y + 31, 960, yMiss, { color: COL.err, k: K(t, S('C2_09', '而 CLASS 表中没有 7D 班'), S('C2_09', '而 CLASS 表中没有 7D 班', .6)) });
  box(1000, cg.y + 62 * 3, 670, 62, { stroke: COL.err, dash: [10, 8], r: 8, alpha: miss });
  txt('c2:q', '?', 1090, yMiss + 14, { size: 44, weight: 700, color: COL.err, align: 'center', alpha: miss });
  txt('c2:d1', '—', 1190 + 130, yMiss + 12, { size: 34, color: COL.err, align: 'center', alpha: miss });
  txt('c2:d2', '—', 1450 + 110, yMiss + 12, { size: 34, color: COL.err, align: 'center', alpha: miss });
  rich('c2:no', '{red|no class 7D → no teacher, no location}', 1000, 600, { size: 32, alpha: A(t, S('C2_09', '这个学生就没有对应的老师和教室')) });
});

scene('C2_10', 'C2_11', t => {
  txt('c2:ri2', 'Referential integrity', X0, 160, { size: 40, weight: 700 });
  list('c2:ril', [
    'ensures that every foreign key has a corresponding primary key // a foreign key value cannot refer to data that does not exist;',
    'stops orphaned records, which are records that point to an entry in another table that no longer exists;',
    'makes sure that if data is changed in one place the change is reflected in all related records (cascading update / delete).',
  ], X0, 200, { size: 32, num: false, gap: 18, alphas: [A(t, S('C2_10', '确保每个外键')), A(t, S('C2_10', '它防止孤立记录')), A(t, S('C2_10', '它还通过级联更新'))] });
  defn('c2:di', 'Data integrity:', 'methods of making sure the data is consistent, for example enforcing referential integrity, cascading update / delete, and validation / verification rules.',
    X0, 560, { size: 32, alpha: A(t, T('C2_11')) });
  defn('c2:ix', 'Index:', 'a data structure built from one or more columns in a table to speed up searching for data.', X0, 710, { size: 32, alpha: A(t, S('C2_11', '索引，index')) });
});

scene('C2_12', 'C2_12', t => {
  fmtbox('c2:fmt', X0, 170, MW, 560, { alpha: A(t, T('C2_12')) });
  list('c2:fmtl', ['the definition', 'a specific table or attribute from the given database'], X0 + 40, 220,
    { size: 32, alphas: [A(t, S('C2_12', '先写定义')), A(t, S('C2_12', '再写出这个数据库中具体的表或属性'))] });
  const ex = A(t, S('C2_12', '例如：Foreign key'));
  const r = rich('c2:fmtex', '{b|Foreign key}: a field in one table that is linked to a primary key in another table, {h1,@e|e.g. CustomerID in the table RENTAL}',
    X0 + 40, 420, { size: 36, maxW: MW - 80, alpha: ex, h: { 1: A(t, S('C2_12', 'e.g. CustomerID')) } });
  const e = r.anchors.e;
  if (e) txt('c2:fmtel', '本数据库中的例子', e.x + e.w, e.y + e.h + 50, { size: 28, color: COL.fk, weight: 700, align: 'right', alpha: A(t, S('C2_12', 'e.g. CustomerID')) });
});

scene('C2_13', 'C2_15', t => {
  const q = qcard('c2:q', X0, 120, MW, 'w21_11 5(a), w21_13 5(a) [2]',
    'Javier owns many shops that sell cars. He employs several managers who are each in charge of one or more shops. He uses the relational database CARS to store the data about his business.',
    { alpha: A(t, T('C2_13')), size: 30 });
  const fkM = t >= S('C2_14', 'SHOP 表中的 ManagerID'), fkS = t >= S('C2_15', 'CAR 表中的 ShopID');
  const h = { 1: A(t, T('C2_14')) * (1 - prog(t, T('C2_15'), T('C2_15', .3))), 2: A(t, S('C2_14', 'SHOP 表中的 ManagerID')) * (1 - prog(t, T('C2_15'), T('C2_15', .3))),
    3: A(t, T('C2_15')), 4: A(t, S('C2_15', 'CAR 表中的 ShopID')) };
  const dA = A(t, S('C2_13', '三张表是')), y0 = q.y + q.h + 20;
  design('c2:d1', `SHOP({pk,h4|ShopID}, {${fkM ? 'fk,' : ''}h2|ManagerID}, Address, Town, TelephoneNumber)`, X0, y0, { size: 30, alpha: dA, h });
  design('c2:d2', 'MANAGER({pk,h1|ManagerID}, FirstName, LastName, DateOfBirth, Wage)', X0, y0 + 52, { size: 30, alpha: dA, h });
  design('c2:d3', `CAR({pk,h3|RegistrationNumber}, Make, Model, NumberOfMiles, {${fkS ? 'fk,' : ''}h4|ShopID})`, X0, y0 + 104, { size: 30, alpha: dA, h });
  const g = grid('c2:tk', X0, y0 + 180, { cols: [{ h: 'Table', w: 220 }, { h: 'Field name', w: 380 }, { h: 'Primary Key (PK)', w: 300 }, { h: 'Foreign Key (FK)', w: 300 }],
    rows: [['MANAGER', 'ManagerID', '', ''], ['SHOP', 'ManagerID', '', ''], ['CAR', 'RegistrationNumber', '', ''], ['CAR', 'ShopID', '', '']], size: 28, rh: 60 },
    { alpha: A(t, S('C2_13', '判断四个字段')) });
  const ticks = [[0, 2, S('C2_14', '是主键')], [1, 3, S('C2_14', '所以在 SHOP 中是外键')], [2, 2, S('C2_15', '是主键')], [3, 3, S('C2_15', '所以在 CAR 中是外键')]];
  for (const [r, c, at] of ticks) { const b = g.cell(r, c); tick(b.x + b.w / 2, b.y + b.h / 2, 36, K(t, at, at + .5)); }
  rich('c2:rule', '1 mark for 2 or 3 correct ticks, 2 marks for 4 correct ticks', g.x + g.w + 40, g.y + 60, { size: 28, color: COL.ok, maxW: X1 - g.x - g.w - 40, alpha: A(t, S('C2_15', '四项全对')) });
});
