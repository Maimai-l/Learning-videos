// C3 Relationships and E-R diagrams

scene('C3_01', 'C3_01', t => {
  rich('c3:def', '{b|Relationship}: formed when one table in a database has a foreign key that refers to a primary key in another table.',
    X0, 170, { size: 36, alpha: A(t, S('C3_01', '当一张表中有外键')) });
  [['1:1', 'one-to-one', '一对一，'], ['1:M', 'one-to-many', '一对多，'], ['M:1', 'many-to-one', '多对一，'], ['M:M', 'many-to-many', '多对多。']].forEach(([a, b, p], i) => {
    const al = A(t, S('C3_01', p)), x = 260 + i * 400;
    txt('c3:t' + i, a, x, 470, { size: 64, weight: 700, mono: true, align: 'center', color: COL.pk, alpha: al });
    txt('c3:tn' + i, b, x, 530, { size: 30, align: 'center', alpha: al });
  });
});

scene('C3_02', 'C3_02', t => {
  const a = A(t, S('C3_02', '以 STUDENT 和 CLASS 为例')), many = A(t, S('C3_02', '出现多次')), once = A(t, S('C3_02', '而在 CLASS 表中只出现一次'));
  const sg = grid('c3:stu', 200, 190, { cols: [{ h: 'StudentID', w: 240 }, { h: 'ClassID', w: 200, st: 'fk' }],
    rows: [[null, '7A'], [null, '7A'], [null, '7A'], [null, '7B']], size: 28, rh: 60 }, { alpha: a, cellHL: (r, c) => c === 1 && r < 3 ? many : 0 });
  txt('c3:stu:n', 'STUDENT', 200, 175, { size: 28, weight: 700, mono: true, alpha: a });
  const cg = grid('c3:cls', 1200, 250, { cols: [{ h: 'ClassID', w: 200, st: 'pk' }, { h: 'TeacherName', w: 260 }],
    rows: [['7A', null], ['7B', null]], size: 28, rh: 60 }, { alpha: a, cellHL: (r, c) => c === 0 && r === 0 ? once : 0 });
  txt('c3:cls:n', 'CLASS', 1200, 235, { size: 28, weight: 700, mono: true, alpha: a });
  const to = cg.cell(0, 0);
  for (let r = 0; r < 3; r++) { const f = sg.cell(r, 1); line(f.x + f.w + 6, f.y + 30, to.x - 6, to.y + 30, { color: COL.fk, w: 2.5, k: K(t, S('C3_02', '而在 CLASS 表中只出现一次', r * .15), S('C3_02', '而在 CLASS 表中只出现一次', .6 + r * .15)) }); }
  const c1 = A(t, S('C3_02', '所以 CLASS 与 STUDENT 是一对多')), c2 = A(t, S('C3_02', '反过来'));
  txt('c3:r1', 'CLASS 1 : M STUDENT', X0 + 90, 620, { size: 40, weight: 700, mono: true, alpha: c1 });
  txt('c3:r2', 'STUDENT M : 1 CLASS', X0 + 90, 690, { size: 40, weight: 700, mono: true, alpha: c2 });
  const b1 = erBox('c3:e1', 'CLASS', 1150, 760, { alpha: c1 }), b2 = erBox('c3:e2', 'STUDENT', 1600, 760, { alpha: c1 });
  erLine(b1, b2, 'one', 'many', { alpha: c1, k: K(t, S('C3_02', '所以 CLASS 与 STUDENT 是一对多'), S('C3_02', '所以 CLASS 与 STUDENT 是一对多', .6)) });
});

scene('C3_03', 'C3_03', t => {
  rich('c3:imp', 'A one-to-many relationship is implemented by the {blue|primary key} in the table on the "one" side being a {orange|foreign key} in the table on the "many" side.',
    X0, 220, { size: 40, alpha: A(t, T('C3_03')) });
  const a = A(t, S('C3_03', '因此，含有外键的表位于多的一方'));
  box(560, 480, 800, 120, { fill: '#FFFFFF', stroke: COL.fk, lw: 3, alpha: a });
  txt('c3:imp2', '含有外键的表 = 多的一方', W / 2, 558, { size: 44, weight: 700, align: 'center', alpha: a });
});

scene('C3_04', 'C3_04', t => {
  const a = A(t, S('C3_04', '例如 EMPLOYEE'));
  design('c3:emp', 'EMPLOYEE({pk|EmployeeID}, ...)', X0, 170, { size: 36, alpha: a });
  design('c3:log', 'LOGIN_DATA(..., {fk|EmployeeID})', 1000, 170, { size: 36, alpha: a });
  const g = A(t, S('C3_04', '区别在于')), once = A(t, S('C3_04', '只能出现一次'));
  grid('c3:lg', 1000, 290, { cols: [{ h: '...', w: 160 }, { h: 'EmployeeID', w: 260, st: 'fk' }], rows: [[null, 'E1'], [null, 'E2'], [null, 'E3']], size: 28, rh: 60 },
    { alpha: g, cellHL: (r, c) => c === 1 ? once : 0 });
  txt('c3:lg:n', 'LOGIN_DATA', 1000, 275, { size: 28, weight: 700, mono: true, alpha: g });
  txt('c3:lg:note', '示意值', 1440, 520, { size: 22, color: COL.mute, alpha: g });
  rich('c3:once', 'each EmployeeID appears {b|only once} in LOGIN_DATA', 1000, 560, { size: 30, alpha: once });
  const e = A(t, S('C3_04', '因为每位员工只有一条登录记录'));
  const b1 = erBox('c3:e1', 'EMPLOYEE', 500, 760, { alpha: e }), b2 = erBox('c3:e2', 'LOGIN_DATA', 1100, 760, { alpha: e });
  erLine(b1, b2, 'one', 'one', { alpha: e, k: K(t, S('C3_04', '因为每位员工只有一条登录记录'), S('C3_04', '因为每位员工只有一条登录记录', .6)) });
  txt('c3:11', '1 : 1', 800, 730, { size: 34, weight: 700, mono: true, align: 'center', color: COL.pk, alpha: e });
});

scene('C3_05', 'C3_05', t => {
  txt('c3:why', 'A foreign key field holds one value in each row.', X0, 160, { size: 36, weight: 700, alpha: A(t, S('C3_05', '外键字段在每一行中只保存一个值')) });
  const a = A(t, S('C3_05', '外键字段在每一行中只保存一个值'));
  const sg = grid('c3:s1', 200, 260, { cols: [{ h: 'StudentID', w: 240 }, { h: 'ClassID', w: 200, st: 'fk' }], rows: [[null, '7A']], size: 28, rh: 60 }, { alpha: a, cellHL: (r, c) => c === 1 ? a : 0 });
  txt('c3:s1:n', 'STUDENT', 200, 245, { size: 28, weight: 700, mono: true, alpha: a });
  const cg = grid('c3:c1', 1100, 260, { cols: [{ h: 'ClassID', w: 200, st: 'pk' }, { h: 'TeacherName', w: 260 }], rows: [['7A', null], ['7B', null]], size: 28, rh: 60 }, { alpha: a });
  txt('c3:c1:n', 'CLASS', 1100, 245, { size: 28, weight: 700, mono: true, alpha: a });
  const f = sg.cell(0, 1), to = cg.row(0);
  arrow(f.x + f.w + 8, f.y + 30, to.x - 8, to.y + 30, { color: COL.fk, k: K(t, S('C3_05', '所以一行只能指向另一张表中的一行'), S('C3_05', '所以一行只能指向另一张表中的一行', .7)) });
  txt('c3:one', 'one row → one row', 640, 470, { size: 32, color: COL.fk, alpha: A(t, S('C3_05', '所以一行只能指向另一张表中的一行')) });
  const m = A(t, S('C3_05', '如果要实现多对多'));
  grid('c3:s2', 200, 590, { cols: [{ h: 'StudentID', w: 240 }, { h: 'ClassID', w: 260, st: 'fk' }], rows: [[null, '{err|7A, 7B}']], size: 28, rh: 60 }, { alpha: m });
  txt('c3:rg', 'repeating group 重复组', 760, 690, { size: 38, weight: 700, color: COL.err, alpha: A(t, S('C3_05', '这就形成了重复组')) });
});

scene('C3_06', 'C3_06', t => {
  const link = S('C3_06', '解决办法是在两张表之间建立连接表'), two = S('C3_06', '原来的多对多关系就变成了两个一对多关系');
  const ba = erBox('c3:a', 'ACTOR', 420, 280), bf = erBox('c3:f', 'FILM', 1500, 280);
  const old = 1 - prog(t, link, link + .5);
  const l = erLine(ba, bf, 'many', 'many', { alpha: old });
  if (l) cross(l.mx, l.my, 60, K(t, S('C3_06', '不能在规范化的关系数据库中直接实现'), S('C3_06', '不能在规范化的关系数据库中直接实现', .5)), COL.err, old);
  txt('c3:mm', 'M : M', 960, 250, { size: 32, weight: 700, mono: true, align: 'center', alpha: old });
  const la = A(t, link), bl = erBox('c3:l', 'FILM_ACTOR', 960, 560, { alpha: la });
  txt('c3:ll', 'linking table', 960, 640, { size: 30, weight: 700, color: COL.pk, align: 'center', alpha: A(t, S('C3_06', 'linking table')) });
  erLine(ba, bl, 'one', 'many', { k: K(t, two, two + .6) }); erLine(bf, bl, 'one', 'many', { k: K(t, two, two + .6) });
  design('c3:ld', 'FILM_ACTOR({pkfk|ActorID}, {pkfk|FilmID})', W / 2, 700, { size: 36, align: 'center', alpha: A(t, S('C3_06', '连接表包含两张表各自的主键作为外键')) });
  txt('c3:ld2', 'two foreign keys = composite primary key', W / 2, 820, { size: 30, color: COL.mute, align: 'center', alpha: A(t, S('C3_06', '这两个外键通常组成它的复合主键')) });
  txt('c3:2x', '1 : M', 640, 450, { size: 30, weight: 700, mono: true, align: 'center', alpha: A(t, two) });
  txt('c3:2y', '1 : M', 1280, 450, { size: 30, weight: 700, mono: true, align: 'center', alpha: A(t, two) });
});

scene('C3_07', 'C3_07', t => {
  rich('c3:er', '{b|E-R diagram}: a graphical representation of a database and the relationships between the entities.', X0, 170, { size: 36, alpha: A(t, T('C3_07')) });
  const bx = A(t, S('C3_07', '每个实体是一个方框'));
  const b1 = erBox('c3:b1', 'CLASS', 560, 520, { alpha: bx, size: 36 }), b2 = erBox('c3:b2', 'STUDENT', 1360, 520, { alpha: bx, size: 36 });
  const crow = t >= S('C3_07', '多的一端画鸦脚');
  const l = erLine(b1, b2, 'one', crow ? 'many' : 'one', { k: K(t, S('C3_07', '每个关系是两个方框之间的一条线'), S('C3_07', '每个关系是两个方框之间的一条线', .8)) });
  txt('c3:many', "many: crow's foot", 1250, 640, { size: 30, weight: 700, color: COL.fk, align: 'right', alpha: A(t, S('C3_07', '多的一端画鸦脚')) });
  txt('c3:one', 'one: single line', 690, 640, { size: 30, weight: 700, color: COL.pk, alpha: A(t, S('C3_07', '一的一端是单线')) });
});

scene('C3_08', 'C3_08', t => {
  const rows = [['zero or one', 'zeroOne', '零或一', 'optional'], ['zero or many', 'zeroMany', '零或多', 'optional'], ['exactly one', 'exactlyOne', '恰好一个', 'mandatory'], ['one or many', 'oneMany', '一或多', 'mandatory']];
  rows.forEach(([lab, kind, p, grp], i) => {
    const a = A(t, S('C3_08', p)), y = 210 + i * 120;
    txt('c3:c' + i, lab, 360, y + 12, { size: 36, weight: 700, alpha: a });
    txt('c3:g' + i, grp, 700, y + 12, { size: 30, color: COL.mute, alpha: a });
    line(1000, y, 1400, y, { alpha: a, w: 3 }); endMark(1400, y, 0, kind, { alpha: a });
    box(1400, y - 40, 120, 80, { fill: '#FFFFFF', stroke: COL.ink, lw: 3, r: 8, alpha: a });
  });
  rich('c3:card', 'type + optional / mandatory = {b|cardinality}', W / 2, 720, { size: 40, align: 'center', alpha: A(t, S('C3_08', '合起来就是关系的基数')) });
});

scene('C3_09', 'C3_09', t => {
  txt('c3:mt', 'Finding the relationships in a set of table designs', X0, 160, { size: 38, weight: 700 });
  list('c3:m', [
    'List every foreign key.',
    'For each foreign key, draw one line between the table that contains it and the table it references.',
    'The table that contains the foreign key is on the "many" side; the table where that attribute is the primary key is on the "one" side. Put the crow\'s foot at the table that contains the foreign key.',
    'If the foreign key value can appear only once in its table (for example each employee has exactly one login record), the relationship is one-to-one.',
    'A table whose primary key is made of two foreign keys is a linking table. It has a many end on both of its lines, and the two tables it links have a many-to-many relationship with each other.',
  ], X0, 200, { size: 30, gap: 16, alphas: ['第一', '第二', '第三', '第四', '第五'].map(p => A(t, S('C3_09', p))) });
});

scene('C3_10', 'C3_11', t => {
  const fkC = t >= S('C3_10', 'SHOP_ORDER 中有外键 CustomerID'), fkS = t >= S('C3_10', 'ITEM 中有外键 SupplierID'), lk = t >= S('C3_11', '两者都是外键');
  const d = [
    'CUSTOMER({pk|CustomerID}, ...)',
    `SHOP_ORDER({pk|OrderNo}, {${fkC ? 'fk' : 'b'}|CustomerID}, OrderDate)`,
    `ITEM({pk|ItemNumber}, {${fkS ? 'fk' : 'b'}|SupplierID}, ...)`,
    'SUPPLIER({pk|SupplierID}, ...)',
    `ORDER_ITEM({${lk ? 'pkfk' : 'pk'}|ItemNumber}, {${lk ? 'pkfk' : 'pk'}|OrderNo}, Quantity)`,
  ];
  d.forEach((s, i) => design('c3:d' + i, s, X0, 170 + i * 70, { size: 28, alpha: A(t, T('C3_10', i * .25)) }));
  const a = A(t, T('C3_10', .5));
  const bc = erBox('c3:bc', 'CUSTOMER', 1080, 200, { alpha: a }), bs = erBox('c3:bs', 'SUPPLIER', 1620, 200, { alpha: a });
  const bo = erBox('c3:bo', 'SHOP_ORDER', 1080, 480, { alpha: a }), bi = erBox('c3:bi', 'ITEM', 1620, 480, { alpha: a });
  const bl = erBox('c3:bl', 'ORDER_ITEM', 1350, 760, { alpha: a, hl: lk ? 1 : 0 });
  const go = p => K(t, p, p + .7);
  erLine(bc, bo, 'one', 'many', { k: go(S('C3_10', '所以 CUSTOMER 到 SHOP_ORDER 是一对多')) });
  erLine(bs, bi, 'one', 'many', { k: go(S('C3_10', '所以 SUPPLIER 到 ITEM 是一对多')) });
  erLine(bo, bl, 'one', 'many', { k: go(S('C3_11', 'SHOP_ORDER 到 ORDER_ITEM 是一对多')) });
  erLine(bi, bl, 'one', 'many', { k: go(S('C3_11', 'ORDER_ITEM 到 ITEM 是多对一')) });
  txt('c3:lt', 'linking table', 1350, 850, { size: 28, weight: 700, color: COL.pk, align: 'center', alpha: A(t, S('C3_11', '所以它是连接表')) });
  const mm = A(t, S('C3_11', '订单与商品之间的多对多关系'));
  line(bo.x + bo.w + 10, 480, bi.x - 10, 480, { dash: [10, 10], color: COL.mute, alpha: mm, w: 2.5 });
  txt('c3:mm', 'M:M, implemented by ORDER_ITEM', 1350, 430, { size: 24, color: COL.mute, align: 'center', alpha: mm });
});

scene('C3_12', 'C3_12', t => {
  txt('c3:ext', 'Examples from a shop with customers, payment details, login details, orders and products', X0, 160, { size: 32, weight: 700, color: COL.mute });
  [['one-to-one', 'customer – payment details\n// customer – login details', '一对一'], ['one-to-many', 'customer – order', '一对多'], ['many-to-many', 'order – product\n// customer – product', '多对多']].forEach(([h, b, p], i) => {
    const a = A(t, S('C3_12', p)), x = X0 + i * 580;
    box(x, 230, 540, 330, { fill: '#FFFFFF', stroke: COL.rule, alpha: a });
    txt('c3:eh' + i, h, x + 30, 290, { size: 36, weight: 700, color: COL.pk, alpha: a });
    b.split('\n').forEach((s, j) => txt(`c3:eb${i}${j}`, s, x + 30, 370 + j * 60, { size: 32, alpha: a }));
  });
});

scene('C3_13', 'C3_13', t => {
  fmtbox('c3:fmt', X0, 170, MW, 560, { alpha: A(t, T('C3_13')) });
  list('c3:fl', [
    '{b|the type, in both directions}: "one member of staff can have many devices; each device can only be with one member of staff"',
    '{b|the keys}: "the primary key StaffID in STAFF links to the foreign key StaffID in DEVICE"',
  ], X0 + 40, 230, { size: 34, maxW: MW - 80, gap: 40, alphas: [A(t, S('C3_13', '第一')), A(t, S('C3_13', '第二'))] });
});

scene('C3_14', 'C3_15', t => {
  const q = qcard('c3:q', X0, 120, MW, 'w25_12 4(a) [2]',
    'A relational database, SHIPPING, stores data about the ships in a company and the containers that are carried on the ships. Describe the relationship between the two tables. Refer to the primary and foreign keys in your answer.',
    { alpha: A(t, T('C3_14')), size: 30 });
  const fk = t >= T('C3_15'), h = { 1: A(t, T('C3_15')), 2: A(t, S('C3_15', '它是 SHIP 表的主键')) }, dA = A(t, S('C3_14', '有两张表'));
  const y0 = q.y + q.h + 24;
  design('c3:dc', `CONTAINER({pk|ContainerID}, Type, Weight, OwnerName, {${fk ? 'fk,' : ''}h1|ShipID})`, X0, y0, { size: 30, alpha: dA, h });
  design('c3:ds', 'SHIP({pk,h2|ShipID}, Type, Capacity, ShipName)', X0, y0 + 56, { size: 30, alpha: dA, h });
  const e = A(t, S('C3_15', '含外键的 CONTAINER 位于多的一方'));
  const b1 = erBox('c3:s', 'SHIP', 1330, y0 + 46, { alpha: e }), b2 = erBox('c3:c', 'CONTAINER', 1680, y0 + 46, { alpha: e });
  const l = erLine(b1, b2, 'one', 'many', { alpha: e, k: K(t, S('C3_15', '含外键的 CONTAINER 位于多的一方'), S('C3_15', '含外键的 CONTAINER 位于多的一方', .6)) });
  if (l) { txt('c3:1', '1', l.x0 + 14, l.y0 - 14, { size: 26, weight: 700, alpha: e }); txt('c3:m', 'M', l.x1 - 50, l.y0 - 18, { size: 26, weight: 700, alpha: e }); }
  mscheme('c3:ms', X0, y0 + 150, MW, [
    'The relationship between SHIP and CONTAINER is one-to-many (1:M)',
    'The primary key ShipID in the SHIP table is linked to the foreign key ShipID in the CONTAINER table'],
    { alpha: A(t, S('C3_15', '答案第一点')), size: 32, title: 'Mark scheme  (1 mark per bullet point, max 2 marks)',
      ticks: [A(t, S('C3_15', 'The relationship between SHIP')), A(t, S('C3_15', 'The primary key ShipID'))] });
});
