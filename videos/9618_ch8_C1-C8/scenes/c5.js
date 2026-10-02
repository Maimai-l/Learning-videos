// C5 DBMS features and software tools

scene('C5_01', 'C5_01', t => {
  defn('c5:dbms', 'Database management system (DBMS):', 'systems software for the definition, creation and manipulation of a database.',
    X0, 200, { size: 40, alpha: A(t, S('C5_01', '数据库管理系统')) });
  ['entry', 'storage', 'alteration', 'deletion'].forEach((w, i) => chip('c5:op' + i, w, 420 + i * 360, 450, { size: 36, align: 'center', alpha: A(t, S('C5_01', ['录入', '存储、', '修改和', '删除都'][i])) }));
  txt('c5:man', 'all managed by the DBMS', W / 2, 640, { size: 38, weight: 700, align: 'center', color: COL.pk, alpha: A(t, S('C5_01', '都由 DBMS 管理')) });
});

scene('C5_02', 'C5_03', t => {
  txt('c5:dd', 'Data dictionary', X0, 165, { size: 44, weight: 700 });
  rich('c5:ddp', '{b|Purpose:} it stores metadata about the database // data about the data in the database // data about the structure of the database.',
    X0, 200, { size: 32, alpha: A(t, S('C5_02', '它的作用是')) });
  rich('c5:ddp2', 'It identifies the characteristics of the data that will be stored.', X0, 300, { size: 32, alpha: A(t, S('C5_02', '它规定了')) });
  const items = ['table names', 'field / attribute names', 'data types', 'validation rules', 'primary keys', 'foreign keys', 'relationships', 'views', 'indexes'];
  const ps = ['表名', '字段名', '数据类型', '验证规则', '主键', '外键', '关系', '视图', '索引'];
  txt('c5:ct', 'Contents', X0, 410, { size: 32, weight: 700, color: COL.mute, alpha: A(t, T('C5_03')) });
  items.forEach((s, i) => chip('c5:it' + i, s, X0 + (i % 3) * 420, 430 + Math.floor(i / 3) * 70, { size: 30, alpha: A(t, S('C5_03', ps[i])) }));
  const n1 = A(t, S('C5_03', '如果题目已经给出某些项')), n2 = A(t, S('C5_03', 'metadata 这个词本身'));
  rich('c5:n1', 'When the question already names some items (for example table names and field names), the answer must give {b|other} items.', 1400, 430, { size: 28, maxW: 410, alpha: n1 });
  rich('c5:n2', '{err|"Metadata"} is not accepted as an example of an item.', 1400, 680, { size: 28, maxW: 410, alpha: n2 });
});

scene('C5_04', 'C5_04', t => {
  const a = A(t, T('C5_04'));
  box(X0, 200, 520, 330, { fill: '#FFFFFF', stroke: COL.ink, lw: 3, alpha: a });
  txt('c5:ddb', 'Data dictionary', X0 + 260, 250, { size: 32, weight: 700, align: 'center', alpha: a });
  ['tables', 'attributes', 'relationships', 'validation rules'].forEach((s, i) => txt('c5:dd' + i, s, X0 + 40, 310 + i * 52, { size: 30, alpha: a }));
  const d = A(t, S('C5_04', 'DBMS 根据这些定义'));
  arrow(X0 + 540, 365, 790, 365, { alpha: d, w: 4 });
  box(810, 290, 300, 150, { fill: '#FFFFFF', stroke: COL.pk, lw: 3, alpha: d });
  txt('c5:dbmsb', 'DBMS', 960, 382, { size: 44, weight: 700, color: COL.pk, align: 'center', alpha: d });
  const c = A(t, S('C5_04', '检查每一次录入'));
  arrow(1130, 365, 1300, 365, { alpha: c, w: 4 });
  txt('c5:chk', 'checks each entry', 1215, 490, { size: 26, color: COL.mute, align: 'center', alpha: c });
  box(1320, 290, 380, 150, { fill: '#FFFFFF', stroke: COL.rule, lw: 3, alpha: c });
  txt('c5:ent', 'each entry', 1470, 382, { size: 36, align: 'center', alpha: c });
  tick(1660, 360, 40, K(t, S('C5_04', '检查每一次录入', .4), S('C5_04', '检查每一次录入', 1)));
  const r = A(t, S('C5_04', '因此有助于保证'));
  txt('c5:res', 'accurate, complete, consistent', W / 2, 650, { size: 44, weight: 700, color: COL.ok, align: 'center', alpha: r });
  rich('c5:why', 'The data dictionary holds the definitions of tables, attributes, relationships and validation rules in one place, and the DBMS checks every entry against them, which helps to ensure the data is accurate, complete and consistent.',
    X0, 720, { size: 28, color: COL.mute, alpha: r });
});

scene('C5_05', 'C5_05', t => {
  defn('c5:dm', 'Data modelling:', 'the analysis and definition of the data structures required in a database, to produce a data model.', X0, 220, { size: 40, alpha: A(t, T('C5_05')) });
  const e = A(t, S('C5_05', 'E-R 图就是一种数据模型'));
  const b1 = erBox('c5:b1', 'CUSTOMER', 700, 560, { alpha: e }), b2 = erBox('c5:b2', 'SHOP_ORDER', 1220, 560, { alpha: e });
  erLine(b1, b2, 'one', 'many', { alpha: e });
  txt('c5:erm', 'E-R diagram = a data model', W / 2, 720, { size: 38, weight: 700, align: 'center', alpha: e });
});

scene('C5_06', 'C5_06', t => {
  txt('c5:ls', 'Logical schema', X0, 170, { size: 44, weight: 700 });
  list('c5:lsl', [
    'a data model for a specific database that is independent of the DBMS used to build that database // a model of a database that is not specific to one DBMS;',
    'the overview / conceptual design of the database structure; it models the problem by using methods such as an E-R diagram;',
    'it is used to design the physical structure.',
  ], X0, 230, { size: 34, gap: 30, num: false, alphas: [A(t, T('C5_06')), A(t, S('C5_06', '它是数据库结构的概念设计')), A(t, S('C5_06', '并用于设计物理结构'))] });
});

scene('C5_07', 'C5_07', t => {
  txt('c5:di', 'Ways a DBMS supports data integrity', X0, 170, { size: 44, weight: 700 });
  ['validation', 'enforcing referential integrity', 'cascade update / delete', 'ensuring the database is normalised'].forEach((s, i) =>
    chip('c5:di' + i, s, X0 + (i % 2) * 820, 260 + Math.floor(i / 2) * 120, { size: 36, alpha: A(t, S('C5_07', ['验证', '实施参照完整性', '级联更新和删除', '确保数据库已经规范化'][i])) }));
});

scene('C5_08', 'C5_09', t => {
  const rows = [
    ['{b|Authentication} (usernames and passwords, biometrics, two-factor authentication)', 'prevents unauthorised access to the data', S('C5_08', '认证，authentication')],
    ['{b|Access rights}: different users / accounts are given different permissions, e.g. read only, read / write, full access or no access', 'only those with the correct permissions can read or edit the data', S('C5_08', '访问权限，access rights')],
    ['{b|Views}: different users are able to see different parts of the database', 'they only see what they need to see, e.g. managers can only see the data for their own shop(s)', S('C5_09', '视图，views')],
    ['{b|Backup / recovery procedures}: copies of the database are taken automatically on a regular basis and stored off site', 'the data can be recovered if lost', S('C5_09', '备份与恢复')],
    ['{b|Record and table locking}', 'prevents simultaneous access to data, so updates are not lost', S('C5_09', '记录和表锁定')],
    ['{b|Encryption}: the data is turned into ciphertext', 'it cannot be understood without the decryption key', S('C5_09', '加密，encryption')],
  ];
  const size = 27, lw = 860, rx = X0 + lw + 60, rw = X1 - rx;
  txt('c5:sh1', 'Method', X0, 140, { size: 30, weight: 700, color: COL.mute }); txt('c5:sh2', 'How it protects the data', rx, 140, { size: 30, weight: 700, color: COL.mute });
  line(X0, 158, X1, 158, { color: COL.rule, w: 2 });
  let y = 170;
  rows.forEach(([l, r, at], i) => {
    const a = A(t, at), h = Math.max(rich('', l, 0, 0, { size, maxW: lw, dry: true }).h, rich('', r, 0, 0, { size, maxW: rw, dry: true }).h);
    rich('c5:sl' + i, l, X0, y, { size, maxW: lw, alpha: a }); rich('c5:sr' + i, r, rx, y, { size, maxW: rw, alpha: a, color: COL.ok });
    y += h + 14; line(X0, y - 7, X1, y - 7, { color: COL.rule, w: 1, alpha: a });
  });
});

scene('C5_10', 'C5_10', t => {
  defn('c5:dev', 'Developer interface:', 'a software tool that allows the user to create items such as tables, forms and reports.', X0, 150, { size: 36, alpha: A(t, T('C5_10')) });
  [['tables', ['create / modify / delete tables and other database objects', 'set up / modify relationships'], '它可以创建、修改、删除表'],
    ['forms', ['create a form for data input', 'add tools such as drop-down boxes and buttons to a form'], '创建数据输入窗体'],
    ['reports', ['design a report to show the output in an organised manner', 'add a menu to enable users to choose different actions / run different queries'], '设计报表']].forEach(([h, items, p], i) => {
    const a = A(t, S('C5_10', p)), x = X0 + i * 580;
    box(x, 300, 540, 500, { fill: '#FFFFFF', stroke: COL.rule, alpha: a });
    txt('c5:gh' + i, h, x + 30, 360, { size: 38, weight: 700, color: COL.pk, alpha: a });
    list('c5:gl' + i, items, x + 30, 400, { size: 30, maxW: 480, num: false, gap: 22, alphas: [a, a] });
  });
});

scene('C5_11', 'C5_11', t => {
  defn('c5:qp', 'Query processor:', 'software that processes and executes queries written in SQL.', X0, 150, { size: 36, alpha: A(t, T('C5_11')) });
  const flow = (id, y, items, w) => {
    let x = X0;
    items.forEach(([s, at, col], i) => {
      const a = A(t, at);
      if (i > 0) arrow(x - 70, y + 50, x - 10, y + 50, { alpha: a, w: 3.5 });
      box(x, y, w, 100, { fill: '#FFFFFF', stroke: col || COL.ink, lw: 3, alpha: a });
      rich(`${id}:${i}`, s, x + w / 2, y + 30, { size: 28, weight: 700, align: 'center', maxW: w - 20, alpha: a });
      x += w + 80;
    });
  };
  flow('c5:f1', 330, [['DDL statement', S('C5_11', 'DDL 语句由')], ['DDL interpreter', S('C5_11', 'DDL 解释器解释'), COL.pk], ['data dictionary', S('C5_11', '并记录到数据字典中')]], 330);
  flow('c5:f2', 560, [['DML statement', S('C5_11', 'DML 语句由')], ['DML compiler', S('C5_11', 'DML 编译器'), COL.pk], ['low-level instructions', S('C5_11', '编译成低级指令')], ['query evaluation engine', S('C5_11', '最后由查询求值引擎'), COL.pk]], 360);
  txt('c5:opt', 'optimises the query', X0 + 440 + 180, 700, { size: 28, color: COL.pk, align: 'center', alpha: A(t, S('C5_11', '编译器同时优化查询')) });
});

scene('C5_12', 'C5_14', t => {
  const q = qcard('c5:q', X0, 120, MW, 's23_12 2(a) [4]',
    'A horse riding school uses a database, Lessons, to store data about lesson bookings. This database is created and managed using a Database Management System (DBMS). Complete the table by writing down the missing names and descriptions.',
    { alpha: A(t, T('C5_12')), size: 30 });
  const rows = [
    ['Data dictionary', 'Data about the data in the database // metadata for a database', 1, S('C5_13', 'Data dictionary 的描述')],
    ['Query processor', 'Software that processes and executes queries written in SQL', 1, S('C5_13', 'Query processor 的描述')],
    ['Logical schema', 'A model of a database that is not specific to one DBMS', 0, S('C5_14', '名称是 logical schema')],
    ['Developer interface', 'A software tool that allows the user to create items such as tables, forms and reports', 0, S('C5_14', '名称是 developer interface')],
  ];
  const ta = A(t, S('C5_12', '表格中两行只给出名称')), x = X0, nw = 400, y0 = q.y + q.h + 30, rh = 84;
  box(x, y0, MW, rh * 5, { fill: '#FFFFFF', stroke: COL.rule, r: 8, alpha: ta });
  box(x, y0, MW, rh, { fill: '#ECE8DF', r: 8, alpha: ta });
  txt('c5:th1', 'Name', x + 24, y0 + 54, { size: 30, weight: 700, alpha: ta }); txt('c5:th2', 'Description', x + nw + 24, y0 + 54, { size: 30, weight: 700, alpha: ta });
  line(x + nw, y0, x + nw, y0 + rh * 5, { color: COL.rule, w: 1.5, alpha: ta });
  rows.forEach(([n, d, gapIsDesc, at], i) => {
    const y = y0 + rh * (i + 1), f = A(t, at);
    line(x, y, x + MW, y, { color: COL.rule, w: 1.5, alpha: ta });
    if (gapIsDesc) {
      txt('c5:rn' + i, n, x + 24, y + 54, { size: 30, alpha: ta });
      rich('c5:rd' + i, d, x + nw + 24, y + 18, { size: 30, maxW: MW - nw - 48, color: COL.ok, alpha: f });
    } else {
      txt('c5:rn' + i, n, x + 24, y + 54, { size: 30, weight: 700, color: COL.ok, alpha: f });
      rich('c5:rd' + i, d, x + nw + 24, y + 18, { size: 30, maxW: MW - nw - 48, alpha: ta });
    }
  });
  txt('c5:mk', '1 mark for each correct feature or description', X1, y0 + rh * 5 + 50, { size: 28, color: COL.ok, align: 'right', alpha: A(t, S('C5_14', '每格一分')) });
});
