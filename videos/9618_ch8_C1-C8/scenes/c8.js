// C8 SQL as a DML: maintenance (INSERT, UPDATE, DELETE)

scene('C8_01', 'C8_01', t => {
  [['INSERT INTO', 'adds new row(s) to a table', 'INSERT INTO 向表中'], ['UPDATE', 'edits row(s) in a table', 'UPDATE 编辑'], ['DELETE FROM', 'removes row(s) from a table', 'DELETE FROM 从表中']].forEach(([c, d, p], i) => {
    const a = A(t, S('C8_01', p)), y = 220 + i * 150;
    box(X0, y, 420, 90, { fill: COL.code, r: 10, alpha: a });
    txt('c8:c' + i, c, X0 + 24, y + 60, { size: 40, weight: 700, mono: true, alpha: a });
    txt('c8:d' + i, d, X0 + 480, y + 60, { size: 38, alpha: a });
  });
});

scene('C8_02', 'C8_02', t => {
  list('c8:r', ['In INSERT, the values are written in the {b|same order as the fields in the table design}.',
    'Text values are in quotation marks; numbers and TRUE / FALSE are not.',
    'An ID made of digits that is stored as text, such as "002323", is in quotation marks.'],
  X0, 150, { size: 32, gap: 16, num: false, alphas: [A(t, T('C8_02')), A(t, S('C8_02', '文本加引号')), A(t, S('C8_02', '由数字组成但存为文本的 ID'))] });
  const n = A(t, S('C8_02', '如果在表名后面列出字段名'));
  txt('c8:named', 'Naming the fields: the values follow in that order', X0, 450, { size: 32, weight: 700, alpha: n });
  code('c8:ins2', ['INSERT INTO PRODUCT (ProductID, ProductName, QuantityInBox, Cost, SupplierID)', 'VALUES ({h1|"002323"}, "Blue ball point 2 mm", 50, 5.00, "SFX223");'], X0, 475, { size: 28, alpha: n, h: { 1: n } });
  txt('c8:notall', 'used when values are not given for all fields', X0, 700, { size: 32, color: COL.fk, weight: 700, alpha: A(t, S('C8_02', '没有为所有字段提供值时')) });
});

scene('C8_03', 'C8_03', t => {
  const a = A(t, T('C8_03'));
  const c = code('c8:car', ['INSERT INTO CAR', 'VALUES ({@a|"123AA"}, {@b|"Tiger"}, {@c|"Lioness"}, {@d|10500}, {@e|"12BSTREET"});'], X0, 220, { size: 40, alpha: a });
  const num = A(t, S('C8_03', '其中 10500 是数字')), tx = A(t, S('C8_03', '其余都是文本'));
  for (const k of ['a', 'b', 'c', 'd', 'e']) {
    const b = c.anchors[k]; if (!b) continue;
    const isN = k === 'd';
    txt('c8:l' + k, isN ? 'number: no quotes' : 'text', b.x + b.w / 2, c.y + c.h + 50 + (isN ? 50 : 0), { size: 28, weight: 700, align: 'center', color: isN ? COL.pk : COL.fk, alpha: isN ? num : tx });
    line(b.x + b.w / 2, c.y + c.h + 6, b.x + b.w / 2, c.y + c.h + 18 + (isN ? 50 : 0), { color: COL.mute, w: 2, alpha: isN ? num : tx });
  }
});

scene('C8_04', 'C8_04', t => {
  code('c8:upg', ['UPDATE {mute|table}', 'SET {mute|field = value}, {mute|field = value}', 'WHERE {mute|condition};'], X0, 160, { size: 36, alpha: A(t, T('C8_04')) });
  const e = A(t, S('C8_04', '例如 UPDATE CHARACTER'));
  code('c8:upe', ['UPDATE CHARACTER', 'SET Level = 3{h1|,} Money = 10000.00', 'WHERE CharacterID = "0002";'], X0, 460, { size: 40, alpha: e, h: { 1: A(t, S('C8_04', '逗号，Money')) } });
  txt('c8:where', 'WHERE selects the row(s) to change', 1100, 620, { size: 30, color: COL.fk, weight: 700, alpha: A(t, S('C8_04', 'WHERE CharacterID')) });
});

scene('C8_05', 'C8_05', t => {
  const e = A(t, S('C8_05', '例如 DELETE FROM PLACEMENT')), w = A(t, S('C8_05', '注意'));
  code('c8:del', ['DELETE FROM PLACEMENT', 'WHERE Complete = TRUE;'], X0, 180, { size: 44, alpha: e, show: i => i === 1 ? 1 - .75 * w : 1 });
  if (w > 0) cross(X0 + 300, 180 + 24 + 66 + 26, 50, K(t, S('C8_05', '不写 WHERE'), S('C8_05', '不写 WHERE', .5)));
  const g = grid('c8:pl', 1050, 180, { cols: [{ h: '...', w: 300 }, { h: 'Complete', w: 260 }], rows: [[null, null], [null, null], [null, null], [null, null], [null, null]], size: 28, rh: 58 },
    { alpha: A(t, S('C8_05', '例如 DELETE FROM PLACEMENT')), rowBox: () => K(t, S('C8_05', '会删除表中的所有行'), S('C8_05', '会删除表中的所有行', .6)), rowBoxColor: COL.err });
  txt('c8:pln', 'PLACEMENT', 1050, 165, { size: 26, weight: 700, mono: true, alpha: e });
  rich('c8:warn', '{red,b|DELETE FROM without WHERE deletes every row of the table.}', X0, 620, { size: 38, alpha: A(t, S('C8_05', '会删除表中的所有行')) });
  return g;
});

scene('C8_06', 'C8_06', t => {
  const q = qcard('c8:q', X0, 120, MW, 'w22_12 5(b) [3]',
    'A relational database, GARDEN, has the following tables. Write the Structured Query Language (SQL) script to add a new record in the table TREE to store the following data.',
    { alpha: A(t, T('C8_06')), size: 30 });
  const y0 = q.y + q.h + 20, dA = A(t, S('C8_06', '数据库 GARDEN 中有 TREE 表'));
  design('c8:d1', 'OWNER({pk|OwnerID}, FirstName, TelephoneNo, TreeID, TreePosition)', X0, y0, { size: 28, alpha: dA });
  design('c8:d2', 'TREE({pk|TreeID}, ScientificName, MaxHeight, FastGrowing)', X0, y0 + 46, { size: 28, alpha: dA, h: { 1: 0 } });
  grid('c8:data', X0, y0 + 120, { cols: [{ h: 'Attribute', w: 320 }, { h: 'Value', w: 300 }], rows: [['TreeID', 'LOW_1276'], ['ScientificName', 'Salix_Alba'], ['MaxHeight', '30.00'], ['FastGrowing', 'TRUE']], size: 28, rh: 54 },
    { alpha: A(t, S('C8_06', '添加一条记录')) });
});

scene('C8_07', 'C8_07', t => {
  const g = grid('c8:data2', X0, 140, { cols: [{ h: 'Attribute', w: 320 }, { h: 'Value', w: 300 }], rows: [['TreeID', 'LOW_1276'], ['ScientificName', 'Salix_Alba'], ['MaxHeight', '30.00'], ['FastGrowing', 'TRUE']], size: 28, rh: 54 });
  [['text: quotes', COL.fk, 'TreeID 和 ScientificName 是文本'], ['text: quotes', COL.fk, 'TreeID 和 ScientificName 是文本'], ['number: no quotes', COL.pk, 'MaxHeight 是数字'], ['BOOLEAN: no quotes', COL.pk, 'FastGrowing 是布尔值']].forEach(([s, c, p], r) => {
    const b = g.cell(r, 1); txt('c8:ty' + r, s, b.x + b.w + 30, b.y + 36, { size: 28, weight: 700, color: c, alpha: A(t, S('C8_07', p)) });
  });
  txt('c8:ord', 'values in the same order as the table design', 1150, 230, { size: 28, color: COL.mute, alpha: A(t, S('C8_07', '值的顺序与表设计一致')) });
  const o2 = A(t, S('C8_07', '脚本是')), o1 = A(t, S('C8_07', '也可以在 TREE 后面'));
  txt('c8:op2', 'Option 2', X0, 480, { size: 28, weight: 700, color: COL.mute, alpha: o2 });
  code('c8:c2', ['INSERT INTO TREE', "VALUES ('LOW_1276', 'Salix_Alba', 30.00, TRUE);"], X0, 500, { size: 32, alpha: o2 });
  txt('c8:op1', 'Option 1', X0, 690, { size: 28, weight: 700, color: COL.mute, alpha: o1 });
  code('c8:c1', ['INSERT INTO TREE (TreeID, ScientificName, MaxHeight, FastGrowing)', "VALUES ('LOW_1276', 'Salix_Alba', 30.00, TRUE);"], X0, 710, { size: 32, alpha: o1 });
});

scene('C8_08', 'C8_08', t => {
  const ps = ['INSERT INTO TREE', 'VALUES 括号', '值的顺序正确'].map(p => S('C8_08', p)), mk = ps.map(p => A(t, p));
  code('c8:c3', ['{h1|INSERT INTO TREE}', "{h2|VALUES ('LOW_1276', 'Salix_Alba', 30.00, TRUE)};"], X0, 150, { size: 36, h: { 1: mk[0], 2: mk[1] } });
  txt('c8:order', 'TreeID, ScientificName, MaxHeight, FastGrowing', X0, 380, { size: 30, mono: true, color: COL.pk, alpha: mk[2] });
  mscheme('c8:ms', X0, 450, MW, ['INSERT INTO TREE', 'VALUES ( ) and correct values', 'Values in correct order'], { title: 'Mark scheme  (1 mark for each bullet point)', size: 32, ticks: mk });
});
