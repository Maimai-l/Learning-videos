// C4 Normalisation to 3NF

scene('C4_01', 'C4_02', t => {
  const cols = [['StudentID', 160], ['FirstName', 160], ['SecondName', 170], ['ClassID', 130], ['Location', 150], ['TeacherName', 190], ['LicenceNumber', 210], ['Address', 140], ['TeacherDateOfBirth', 290]]
    .map(([h, w]) => ({ h, w }));
  const rows = [[null, null, null, '7A', null, 'Mr Khan', null, null, null], [null, null, null, '7A', null, 'Mr Khan', null, null, null],
    [null, null, null, '7B', null, null, null, null, null], [null, null, null, '7B', null, null, null, null, null]];
  const a = A(t, S('C4_01', '学校把所有数据放在一张表中')), rep = A(t, S('C4_01', '都必须同时写入'));
  const khan = A(t, S('C4_02', '如果 Khan 老师离职')), lost = K(t, S('C4_02', '关于 7B 班的全部信息也随之丢失'), S('C4_02', '关于 7B 班的全部信息也随之丢失', .8));
  txt('c4:st', 'STUDENT', X0, 195, { size: 26, weight: 700, mono: true, alpha: a });
  grid('c4:wide', X0, 210, { cols, rows, size: 21, rh: 54 }, {
    alpha: a, colHL: c => c >= 4 ? rep * (1 - khan) : 0, rowBox: r => r < 2 ? khan : 0, rowBoxColor: COL.err,
    rowA: r => r >= 2 ? 1 - .85 * lost : 1 });
  rich('c4:k', '{red|Mr Khan leaves → every record containing his details must be changed}', X0, 520, { size: 32, alpha: A(t, S('C4_02', '所有包含他信息的记录都必须修改')) });
  rich('c4:7b', '{red|all students of class 7B leave → all the details about class 7B are lost}', X0, 580, { size: 32, alpha: A(t, S('C4_02', '关于 7B 班的全部信息也随之丢失')) });
  const c = A(t, S('C4_02', '这些问题都来自同一个原因'));
  box(X0, 680, MW, 110, { fill: '#FFFFFF', stroke: COL.ink, lw: 2, alpha: c });
  rich('c4:why', 'data about one entity (a teacher or a class) is stored in rows about another entity (a student)', W / 2, 712, { size: 34, weight: 700, align: 'center', alpha: c });
});

scene('C4_03', 'C4_03', t => {
  defn('c4:norm', 'Normalisation:', 'the process of organising data to be stored in a database into two or more tables and relationships between the tables, so that {h1|data redundancy is minimised}.',
    X0, 300, { size: 40, alpha: A(t, T('C4_03')), h: { 1: A(t, S('C4_03', '使数据冗余降到最低')) } });
});

scene('C4_04', 'C4_04', t => {
  const st = [
    ['3NF', 'the table is in 2NF and all attributes are fully dependent on the primary key and no other attributes // there are no non-key dependencies // no transitive dependencies.', '第三范式'],
    ['2NF', 'the table is in 1NF and all attributes are fully dependent on the (composite) primary key // there are no partial (key) dependencies.', '第二范式'],
    ['1NF', 'there are no repeating groups of attributes // data is atomic.', '第一范式'],
  ];
  st.forEach(([n, d, p], i) => {
    const a = A(t, S('C4_04', p)), x = X0 + (2 - i) * 0 + (2 - i) * 120, y = 140 + i * 250, w = MW - (2 - i) * 120;
    box(x, y, w, 220, { fill: '#FFFFFF', stroke: COL.pk, lw: 2.5, alpha: a });
    txt('c4:n' + i, n, x + 30, y + 72, { size: 48, weight: 700, color: COL.pk, alpha: a });
    rich('c4:d' + i, d, x + 170, y + 32, { size: 32, maxW: w - 200, alpha: a });
  });
});

scene('C4_05', 'C4_05', t => {
  const xs = [200, 680, 1160, 1640], tasks = ['remove any repeating groups of attributes', 'remove any partial key dependencies', 'remove any non-key dependencies'];
  const ps = ['从 0NF 到 1NF', '从 1NF 到 2NF', '从 2NF 到 3NF'];
  ['0NF', '1NF', '2NF', '3NF'].forEach((n, i) => {
    const a = i === 0 ? A(t, T('C4_05')) : A(t, S('C4_05', ps[i - 1]));
    txt('c4:s' + i, n, xs[i], 290, { size: 56, weight: 700, align: 'center', color: COL.pk, alpha: a });
  });
  tasks.forEach((s, i) => {
    const a = A(t, S('C4_05', ps[i]));
    arrow(xs[i] + 80, 272, xs[i + 1] - 80, 272, { alpha: a, w: 4, k: K(t, S('C4_05', ps[i]), S('C4_05', ps[i], .5)) });
    rich('c4:tk' + i, s, (xs[i] + xs[i + 1]) / 2, 330, { size: 30, align: 'center', maxW: 400, alpha: a });
  });
  const s = A(t, S('C4_05', 'the key, the whole key'));
  box(X0 + 200, 600, MW - 400, 120, { fill: '#FFFFFF', stroke: COL.ink, lw: 2, alpha: s });
  txt('c4:key', 'the key, the whole key and nothing but the key', W / 2, 678, { size: 44, weight: 700, align: 'center', alpha: s });
});

scene('C4_06', 'C4_06', t => {
  list('c4:notes', [
    'A partial dependency can only exist when the primary key is composite. A table in 1NF whose primary key is a single attribute is already in 2NF.',
    'A normalised database has no many-to-many relationships.',
  ], X0, 220, { size: 38, gap: 50, num: false, alphas: [A(t, T('C4_06')), A(t, S('C4_06', '另外'))] });
});

const stage = (t, s, at) => chip('c4:stage', s, X0, 110, { size: 32, weight: 700, fill: COL.pk, stroke: null, color: '#FFFFFF', alpha: A(t, at) });

scene('C4_07', 'C4_07', t => {
  stage(t, '0NF', T('C4_07'));
  const h = { 1: A(t, S('C4_07', '所以 SubjectName 和 SubjectTeacher')) };
  design('c4:0nf', 'STUDENT({pk|StudentID}, FirstName, SecondName, DateOfBirth, {h1|SubjectName, SubjectTeacher}, {h1|SubjectName, SubjectTeacher}, {h1|SubjectName, SubjectTeacher}, ClassID, Location, TeacherName, LicenceNumber, Address, TeacherDateOfBirth)',
    X0, 230, { size: 34, lh: 1.7, alpha: A(t, S('C4_07', '未规范化的 STUDENT 表')), h });
  rich('c4:rg', 'repeating group: {b|SubjectName, SubjectTeacher}  × 3', X0, 560, { size: 36, alpha: A(t, S('C4_07', '重复出现了三次')) });
});

scene('C4_08', 'C4_08', t => {
  stage(t, '1NF', T('C4_08'));
  design('c4:1s', 'STUDENT({pk|StudentID}, FirstName, SecondName, DateOfBirth, ClassID, Location, TeacherName, LicenceNumber, Address, TeacherDateOfBirth)',
    X0, 210, { size: 30, alpha: A(t, T('C4_08')) });
  rich('c4:rg2', 'repeating group: {b|SubjectName, SubjectTeacher}', X0, 360, { size: 32, color: COL.mute, alpha: A(t, S('C4_08', '重复组是')) });
  const comp = t >= S('C4_08', '所以新表需要复合主键');
  design('c4:1ss', comp ? 'STUDENTSUBJECT({pkfk|StudentID}, {pk|SubjectName}, SubjectTeacher)' : 'STUDENTSUBJECT({fk|StudentID}, SubjectName, SubjectTeacher)',
    X0, 450, { size: 40, alpha: A(t, S('C4_08', '把它移到新表 STUDENTSUBJECT')) });
  rich('c4:fk1', '{orange|StudentID: the primary key of STUDENT, a foreign key here}', X0, 560, { size: 30, alpha: A(t, S('C4_08', '它在新表中是外键')) });
  rich('c4:cpk', '{blue|one student has many subjects → composite primary key (StudentID, SubjectName)}', X0, 620, { size: 30, alpha: A(t, S('C4_08', '所以新表需要复合主键')) });
});

scene('C4_09', 'C4_09', t => {
  stage(t, '2NF', T('C4_09'));
  txt('c4:chk', 'check each table with a composite primary key for attributes that depend on only part of the key', X0, 230, { size: 30, color: COL.mute, alpha: A(t, T('C4_09')) });
  const d = design('c4:ss', 'STUDENTSUBJECT({pkfk,@a|StudentID}, {pk,@b|SubjectName}, {@c|SubjectTeacher})', X0, 380, { size: 44, alpha: A(t, S('C4_09', '在 STUDENTSUBJECT 中')) });
  const { a, b, c } = d.anchors;
  if (b && c) curveArrow(b.x + b.w / 2, b.y + 4, c.x + c.w / 2, c.y + 4, 70, { color: COL.pk, w: 3.5, k: K(t, S('C4_09', 'SubjectTeacher 只依赖于 SubjectName'), S('C4_09', 'SubjectTeacher 只依赖于 SubjectName', .8)) });
  if (a && c) {
    const k = A(t, S('C4_09', '与 StudentID 无关'));
    line(a.x + a.w / 2, a.y + a.h + 6, a.x + a.w / 2, a.y + a.h + 50, { color: COL.err, dash: [8, 8], alpha: k });
    line(a.x + a.w / 2, a.y + a.h + 50, c.x + c.w / 2, a.y + a.h + 50, { color: COL.err, dash: [8, 8], alpha: k });
    line(c.x + c.w / 2, a.y + a.h + 50, c.x + c.w / 2, c.y + c.h + 6, { color: COL.err, dash: [8, 8], alpha: k });
    txt('c4:nod', 'no dependency', (a.x + c.x + c.w) / 2, a.y + a.h + 90, { size: 28, color: COL.err, align: 'center', alpha: k });
  }
  if (b) txt('c4:pd', 'partial dependency', b.x + b.w + 20, b.y - 70, { size: 30, weight: 700, color: COL.pk, alpha: A(t, S('C4_09', '这是部分依赖')) });
  const r = A(t, S('C4_09', '把 SubjectTeacher 移到新表 SUBJECT'));
  design('c4:ss2', 'STUDENTSUBJECT({pkfk|StudentID}, {pk|SubjectName})', X0, 650, { size: 38, alpha: r });
  design('c4:sub', 'SUBJECT({pk|SubjectName}, SubjectTeacher)', X0, 730, { size: 38, alpha: r });
});

scene('C4_10', 'C4_10', t => {
  stage(t, '3NF', T('C4_10'));
  txt('c4:chk3', 'check each table for non-key attributes that depend on another non-key attribute', X0, 230, { size: 30, color: COL.mute, alpha: A(t, T('C4_10')) });
  txt('c4:stn', 'STUDENT', X0, 440, { size: 26, weight: 700, mono: true, alpha: A(t, S('C4_10', '在 STUDENT 表中')) });
  const names = ['{pk|StudentID}', 'FirstName', 'SecondName', 'DateOfBirth', 'ClassID', 'Location', 'TeacherName', 'LicenceNumber', 'Address', 'TeacherDateOfBirth'];
  const fb = fieldRow('c4:f', names, X0, 460, { size: 21, alpha: A(t, S('C4_10', '在 STUDENT 表中')) });
  const p1 = S('C4_10', 'Location 和 TeacherName 依赖于 ClassID');
  [5, 6].forEach((j, n) => curveArrow(fb[4].cx, fb[4].y - 4, fb[j].cx, fb[j].y - 4, 60 + n * 40, { color: COL.pk, w: 3, k: K(t, p1 + n * .2, p1 + .8 + n * .2) }));
  txt('c4:dep1', 'depend on ClassID', fb[5].x, 340, { size: 28, weight: 700, color: COL.pk, alpha: A(t, p1, .5) });
  const p2 = S('C4_10', 'LicenceNumber、Address 和 TeacherDateOfBirth 依赖于老师'), k2 = A(t, p2);
  const x0 = fb[7].x, x1 = fb[9].x + fb[9].w, yb = fb[7].y + fb[7].h + 16;
  line(x0, yb, x0, yb + 20, { color: COL.fk, alpha: k2 }); line(x0, yb + 20, x1, yb + 20, { color: COL.fk, alpha: k2 }); line(x1, yb, x1, yb + 20, { color: COL.fk, alpha: k2 });
  txt('c4:dep2', 'depend on the teacher', (x0 + x1) / 2, yb + 70, { size: 28, weight: 700, color: COL.fk, align: 'center', alpha: k2 });
});

scene('C4_11', 'C4_11', t => {
  stage(t, '3NF', T('C4_11') - 1);
  const subj = t >= S('C4_11', '所以存放在同一张 TEACHER 表中');
  design('c4:a1', 'STUDENT({pk|StudentID}, FirstName, SecondName, DateOfBirth, {fk|ClassID})', X0, 200, { size: 32 });
  design('c4:a2', 'CLASS({pk|ClassID}, Location, {fk|LicenceNumber})', X0, 265, { size: 32, alpha: A(t, T('C4_11')) });
  design('c4:a3', 'TEACHER({pk|LicenceNumber}, TeacherName, Address, TeacherDateOfBirth)', X0, 330, { size: 32, alpha: A(t, T('C4_11', .3)) });
  design('c4:a4', subj ? 'SUBJECT({pk|SubjectName}, {fk,hl|LicenceNumber})' : 'SUBJECT({pk|SubjectName}, SubjectTeacher)', X0, 395, { size: 32, alpha: A(t, T('C4_11', .6)) });
  rich('c4:rule', 'new table: its primary key is the attribute the group depends on; that attribute stays in the original table as a {orange|foreign key}', X0, 490, { size: 30, alpha: A(t, T('C4_11')) });
  rich('c4:lic', 'Teacher names might not be unique → {b|LicenceNumber} is the primary key of TEACHER', X0, 620, { size: 32, alpha: A(t, S('C4_11', '老师姓名可能重复')) });
  rich('c4:one', 'class teachers and subject teachers are both teachers → one {b|TEACHER} table', X0, 690, { size: 32, alpha: A(t, S('C4_11', '班主任和科目老师都是老师')) });
});

scene('C4_12', 'C4_12', t => {
  const a = A(t, T('C4_12'));
  ['STUDENT({pk|StudentID}, FirstName, SecondName, DateOfBirth, {fk|ClassID})', 'CLASS({pk|ClassID}, Location, {fk|LicenceNumber})',
    'TEACHER({pk|LicenceNumber}, TeacherName, Address, TeacherDateOfBirth)', 'STUDENTSUBJECT({pkfk|StudentID}, {pkfk|SubjectName})', 'SUBJECT({pk|SubjectName}, {fk|LicenceNumber})']
    .forEach((s, i) => design('c4:f' + i, s, X0, 130 + i * 60, { size: 30, alpha: A(t, T('C4_12', i * .3)) }));
  mscheme('c4:chk', X0, 470, MW, [
    'every table has an underlined primary key', 'every foreign key matches the primary key of another table',
    'every original attribute appears in exactly one table, except keys used to link tables'],
    { title: 'Check', size: 32, alpha: A(t, S('C4_12', '检查')),
      ticks: [A(t, S('C4_12', '每张表都有带下划线的主键')), A(t, S('C4_12', '每个外键都与另一张表的主键对应')), A(t, S('C4_12', '除了用于连接的键'))] });
  return a;
});

scene('C4_13', 'C4_13', t => {
  txt('c4:jt', 'Justify that a database is in 3NF', X0, 170, { size: 40, weight: 700 });
  list('c4:j', ['there are no repeating groups of attributes',
    'each field is fully dependent on the primary key of its table, e.g. "all fields in CUSTOMER are fully dependent on CustomerID"',
    'there are no non-key dependencies', 'there are no many-to-many relationships'],
    X0, 230, { size: 36, gap: 26, num: false, alphas: ['没有重复的属性组', '每个字段都完全依赖于', '没有非键依赖', '没有多对多关系'].map(p => A(t, S('C4_13', p))) });
});

scene('C4_14', 'C4_14', t => {
  txt('c4:1t', 'Put a table into 1NF', X0, 170, { size: 40, weight: 700 });
  list('c4:1n', ['identify the repeating groups of attributes (name them)', 'ensure each field is atomic', 'identify the primary key for the table'],
    X0, 230, { size: 36, gap: 22, alphas: ['指出重复的属性组', '确保每个字段是原子的', '确定表的主键'].map(p => A(t, S('C4_14', p))) });
  const p = S('C4_14', '例如把 StudentName 拆分为'), a = A(t, p), sp = K(t, p + .8, p + 1.6);
  const one = fieldRow('c4:sn', ['StudentName'], W / 2 - 130, 560, { size: 32, alpha: a });
  const nw = prog(sp, .35, 1);
  fieldRow('c4:sn2', ['FirstName'], W / 2 - 300, 710, { size: 32, alpha: a * nw });
  fieldRow('c4:sn3', ['LastName'], W / 2 + 80, 710, { size: 32, alpha: a * nw });
  arrow(W / 2, 640, W / 2 - 180, 700, { alpha: a * nw, color: COL.mute }); arrow(W / 2, 640, W / 2 + 180, 700, { alpha: a * nw, color: COL.mute });
  return one;
});

scene('C4_15', 'C4_15', t => {
  txt('c4:dt', 'Designing a 3NF database from a written description', X0, 170, { size: 40, weight: 700 });
  list('c4:ds', [
    'Make one table for each entity, with a suitable primary key {h1|(an ID field; a name or title is not a suitable primary key)}, and put each attribute that describes only that entity in its table.',
    'Where two entities have a many-to-many relationship, add a linking table whose fields include the primary key of each entity as a foreign key, a suitable primary key (composite or a new ID), and the attributes that belong to the pair, such as a score or a date.',
  ], X0, 240, { size: 34, gap: 40, alphas: [A(t, S('C4_15', '第一')), A(t, S('C4_15', '第二'))], h: { 1: A(t, S('C4_15', '名字或标题不适合作为主键')) } });
});

scene('C4_16', 'C4_16', t => {
  const h = { 1: A(t, S('C4_16', '分数属于用户与测验这一对')) };
  design('c4:u', 'USER({pk|Username}, Email, DateOfBirth, Rating)', X0, 170, { size: 34, alpha: A(t, S('C4_16', 'USER 表')) });
  design('c4:q', 'QUIZ({pk|QuizID}, Date, Filename)', X0, 240, { size: 34, alpha: A(t, S('C4_16', 'QUIZ 表')) });
  design('c4:uq', 'USER_QUIZ({pkfk|Username}, {pkfk|QuizID}, {h1|Score})', X0, 310, { size: 34, alpha: A(t, S('C4_16', '连接表 USER_QUIZ')), h });
  const e = A(t, S('C4_16', '连接表 USER_QUIZ'));
  const b1 = erBox('c4:b1', 'USER', 480, 620, { alpha: e }), b2 = erBox('c4:b2', 'USER_QUIZ', 960, 620, { alpha: e }), b3 = erBox('c4:b3', 'QUIZ', 1440, 620, { alpha: e });
  const go = K(t, S('C4_16', '连接表 USER_QUIZ', .5), S('C4_16', '连接表 USER_QUIZ', 1.2));
  erLine(b1, b2, 'one', 'many', { k: go, alpha: e }); erLine(b3, b2, 'one', 'many', { k: go, alpha: e });
  txt('c4:sc', 'Score belongs to the pair (user, quiz)', 960, 760, { size: 32, weight: 700, align: 'center', alpha: h[1] });
});

scene('C4_17', 'C4_19', t => {
  const q = qcard('c4:q', X0, 120, MW, 's23_13 4(c) [4]',
    'A shop rents cars to customers. The car rental database is not normalised. Write a normalised database design for this database. All tables must be in Third Normal Form (3NF). Use the field names given and underline the primary key fields.',
    { alpha: A(t, T('C4_17')), size: 30 });
  const y0 = q.y + q.h + 20, an = T('C4_18'), h = { 1: A(t, an) * (1 - prog(t, T('C4_19'), T('C4_19', .3))), 2: A(t, an, .4) * (1 - prog(t, T('C4_19'), T('C4_19', .3))), 3: A(t, S('C4_18', '顾客的名字不适合作为主键')) * (1 - prog(t, T('C4_19'), T('C4_19', .3))) };
  design('c4:ob', 'BOOKING (CarRegistration, StartDate, EndDate, {h1|CarModel, CarColour}, CustomerFirstName)'.replace('(CarRegistration', '({h2|CarRegistration}'), X0, y0, { size: 28, alpha: A(t, S('C4_17', 'BOOKING 表包含')), h });
  design('c4:oc', 'CUSTOMER ({h3|CustomerFirstName}, CustomerLastName, EmailAddress, TelephoneNumber)', X0, y0 + 50, { size: 28, alpha: A(t, S('C4_17', 'CUSTOMER 表包含')), h });
  txt('c4:car', 'CarModel, CarColour describe the car → they depend on CarRegistration', X0, y0 + 150, { size: 28, color: COL.pk, alpha: A(t, an) * (1 - prog(t, T('C4_19'), T('C4_19', .3))) });
  txt('c4:nm', 'a first name is not a suitable primary key', X0, y0 + 195, { size: 28, color: COL.err, alpha: h[3] });
  const ya = y0 + 240;
  txt('c4:ans', 'Answer', X0, ya + 10, { size: 28, weight: 700, color: COL.mute, alpha: A(t, S('C4_18', '所以汽车需要单独一张 CAR 表')) });
  design('c4:n3', 'BOOKING ({pk|BookingID}, {fk|CarRegistration}, {fk|CustomerID}, StartDate, EndDate)', X0, ya + 30, { size: 30, alpha: A(t, T('C4_19')) });
  design('c4:n1', 'CAR ({pk|CarRegistration}, CarModel, CarColour)', X0, ya + 90, { size: 30, alpha: A(t, S('C4_18', '所以汽车需要单独一张 CAR 表')) });
  const nc = A(t, S('C4_18', '所以 CUSTOMER 表增加 CustomerID 作为主键'));
  const d = design('c4:n2', 'CUSTOMER ({pk,@n|CustomerID}, CustomerFirstName, CustomerLastName, EmailAddress, TelephoneNumber)', X0, ya + 150, { size: 30, alpha: nc });
  if (d.anchors.n) chip('c4:new', 'new', d.anchors.n.x + 30, ya + 200, { size: 22, color: COL.pk, stroke: COL.pk, alpha: nc * (1 - prog(t, T('C4_19'), T('C4_19', .3))) });
});

scene('C4_20', 'C4_20', t => {
  const ps = ['只有三张表', '每张表都有合适的主键', 'BOOKING 表包含', '所有原有字段'].map(p => S('C4_20', p));
  const hk = i => A(t, ps[i]) * (i < 3 ? 1 - prog(t, ps[i + 1], ps[i + 1] + .3) : 1 - prog(t, E('C4_20'), E('C4_20', .3)));
  const h = { 1: hk(0), 2: hk(1), 3: hk(2), 4: hk(3) };
  design('c4:e1', '{h1|BOOKING} ({pk,h2|BookingID}, {fk,h3|CarRegistration}, {fk,h3|CustomerID}, {h4|StartDate, EndDate})', X0, 130, { size: 30, h });
  design('c4:e2', '{h1|CAR} ({pk,h2|CarRegistration}, {h4|CarModel, CarColour})', X0, 190, { size: 30, h });
  design('c4:e3', '{h1|CUSTOMER} ({pk,h2|CustomerID}, {h4|CustomerFirstName, CustomerLastName, EmailAddress, TelephoneNumber})', X0, 250, { size: 30, h });
  mscheme('c4:ms', X0, 350, MW, [
    'Only 3 tables with appropriate identifiers (i.e. one table for customer, one for booking and one for car)',
    'Appropriate Primary key in each table underlined',
    'Booking table includes Primary key from car and Primary key from customer as Foreign keys',
    'All original fields are in correct tables'], { title: 'Mark scheme  (1 mark each)', size: 32, alpha: A(t, T('C4_20')), ticks: ps.map(p => A(t, p)) });
});
