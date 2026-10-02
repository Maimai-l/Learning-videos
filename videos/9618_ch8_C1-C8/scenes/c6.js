// C6 SQL as a DDL

scene('C6_01', 'C6_01', t => {
  [['DDL', 'Data definition language (DDL): a language used to create, modify and remove the data structures that form a database.', 'works on the structure of the database', '数据定义语言，data definition language', 'DDL 作用于数据库的结构'],
    ['DML', 'Data manipulation language (DML): a language used to add, modify, delete and retrieve the data stored in a relational database.', 'works on the data stored in it', '数据操作语言', 'DML 作用于其中的数据']].forEach(([n, d, tag, p, pt], i) => {
    const a = A(t, S('C6_01', p)), x = X0 + i * 870;
    box(x, 150, 830, 420, { fill: '#FFFFFF', stroke: COL.rule, alpha: a });
    txt('c6:n' + i, n, x + 30, 220, { size: 48, weight: 700, color: COL.pk, alpha: a });
    rich('c6:d' + i, d, x + 30, 250, { size: 32, maxW: 770, alpha: a });
    txt('c6:tag' + i, tag, x + 30, 530, { size: 32, weight: 700, color: COL.fk, alpha: A(t, S('C6_01', pt)) });
  });
  const s = A(t, S('C6_01', 'SQL，即结构化查询语言'));
  box(X0, 620, MW, 120, { fill: '#FFFFFF', stroke: COL.ink, lw: 2, alpha: s });
  rich('c6:sql', '{b|Structured query language (SQL)} is the industry standard language used for both.', W / 2, 655, { size: 36, align: 'center', alpha: s });
});

scene('C6_02', 'C6_02', t => {
  txt('c6:ct', 'DDL commands', X0, 170, { size: 40, weight: 700 });
  [['CREATE DATABASE', 'creates a database'], ['CREATE TABLE', 'creates a table definition'], ['ALTER TABLE', 'changes the definition of a table'],
    ['PRIMARY KEY', 'adds a primary key to a table'], ['FOREIGN KEY ... REFERENCES ...', 'adds a foreign key to a table']].forEach(([c, d], i) => {
    const a = A(t, S('C6_02', ['CREATE DATABASE', 'CREATE TABLE', 'ALTER TABLE', 'PRIMARY KEY', 'FOREIGN KEY'][i])), y = 230 + i * 110;
    box(X0, y, 720, 80, { fill: COL.code, r: 10, alpha: a });
    txt('c6:c' + i, c, X0 + 24, y + 52, { size: 32, weight: 700, mono: true, alpha: a });
    txt('c6:cd' + i, d, X0 + 780, y + 52, { size: 34, alpha: a });
  });
});

scene('C6_03', 'C6_03', t => {
  const rows = [['CHARACTER (CHAR)', 'fixed length text', 'CHARACTER'], ['VARCHAR(n)', 'variable length text', 'VARCHAR'], ['BOOLEAN', 'True or False', 'BOOLEAN'],
    ['INTEGER (INT)', 'whole number', 'INTEGER'], ['REAL', 'number with decimal places; FLOAT and CURRENCY are also accepted', 'REAL'],
    ['DATE', 'a date, usually formatted as YYYY-MM-DD', 'DATE'], ['TIME', 'a time, usually formatted as HH:MM:SS', 'TIME']];
  txt('c6:dt', 'Data types', X0, 160, { size: 40, weight: 700 });
  rows.forEach(([c, d, p], i) => {
    const a = A(t, S('C6_03', p)), y = 190 + i * 72;
    txt('c6:t' + i, c, X0, y + 48, { size: 32, weight: 700, mono: true, color: COL.pk, alpha: a });
    txt('c6:td' + i, d, X0 + 420, y + 48, { size: 32, alpha: a });
    line(X0, y + 66, X1, y + 66, { color: COL.rule, w: 1, alpha: a });
  });
  const n = A(t, S('C6_03', 'NOT NULL'));
  box(X0, 720, MW, 110, { fill: '#FFFFFF', stroke: COL.ink, lw: 2, alpha: n });
  rich('c6:nn', '{m,b|NOT NULL}: a constraint that means the field must contain a value. It is used for primary key fields and other required fields.', X0 + 30, 744, { size: 30, maxW: MW - 60, alpha: n });
});

scene('C6_04', 'C6_04', t => {
  txt('c6:ch', 'Choosing a data type from sample data', X0, 160, { size: 40, weight: 700 });
  let c6y = 210;
  [['An ID that contains letters: {m|ST23-56}, {m|15B5L}', 'VARCHAR', '含字母的 ID'], ['An ID that starts with zeros: {m|{hl|00}956124}, {m|{hl|0}001}', 'VARCHAR', '以零开头的 ID'],
    ['A count or whole number: {m|Bedrooms}, {m|Quantity}, {m|Level}', 'INTEGER', '计数或整数'],
    ['A value with a decimal point or an amount of money: {m|MonthlyCost 1000.00}, {m|SellingPrice 2.20}', 'REAL', '带小数点的值'],
    ['Yes / No or TRUE / FALSE values', 'BOOLEAN', '是或否'], ['Dates; times', 'DATE; TIME', '日期用 DATE']].forEach(([l, r, p], i) => {
    const a = A(t, S('C6_04', p)), y = c6y;
    c6y += Math.max(rich('', l, 0, 0, { size: 32, maxW: 1150, dry: true }).h, 46) + 34;
    rich('c6:sl' + i, l.replace('{m|{hl|00}956124}', '{m,hl|00}{m|956124}').replace('{m|{hl|0}001}', '{m,hl|0}{m|001}'), X0, y, { size: 32, maxW: 1150, alpha: a });
    txt('c6:sa' + i, '→', 1300, y + 32, { size: 34, color: COL.mute, alpha: a });
    txt('c6:sr' + i, r, 1380, y + 34, { size: 36, weight: 700, mono: true, color: COL.pk, alpha: a });
  });
});

scene('C6_05', 'C6_05', t => {
  txt('c6:cdb', 'Create a database', X0, 200, { size: 40, weight: 700, alpha: A(t, T('C6_05')) });
  code('c6:cdbc', ['CREATE DATABASE SHOPORDERS;'], X0, 320, { size: 48, alpha: A(t, T('C6_05')) });
});

scene('C6_06', 'C6_06', t => {
  const ps = ['第一', '第二', '第三', '第四', '第五'].map(p => S('C6_06', p));
  const cur = i => A(t, ps[i]) * (i < 4 ? 1 - prog(t, ps[i + 1], ps[i + 1] + .3) : 1);
  list('c6:steps', [
    'Write {m|CREATE TABLE} and the table name, then an opening bracket.',
    'Write one line for each field: the field name exactly as in the table design, its data type, and NOT NULL where appropriate, with a comma at the end of the line.',
    'Write {m|PRIMARY KEY(} and the primary key field, then {m|)}. For a composite key, write both fields separated by a comma.',
    'For each foreign key, write {m|FOREIGN KEY(} field {m|) REFERENCES} table {m|(} field {m|)}.',
    'Close the bracket and end with a semicolon.',
  ], X0, 150, { size: 30, maxW: 880, gap: 20, alphas: ps.map(p => A(t, p)) });
  const h = { 1: cur(0), 2: cur(1), 3: cur(2), 4: cur(3), 5: cur(4) };
  code('c6:tpl', ['{h1|CREATE TABLE name(}', '{h2|  Field TYPE NOT NULL,}', '{h3|  PRIMARY KEY(Field),}', '{h4|  FOREIGN KEY(Field) REFERENCES TABLE(Field)}', '{h5|);}'],
    1050, 170, { size: 26, h, w: 760 });
});

scene('C6_07', 'C6_07', t => {
  const a = A(t, T('C6_07'));
  txt('c6:stn', 'STUDENT_TEST  sample data', X0, 175, { size: 28, weight: 700, mono: true, alpha: a });
  const g = grid('c6:sd', X0, 190, { cols: [{ h: 'StudentID', w: 220 }, { h: 'TestID', w: 220 }, { h: 'Mark', w: 220 }], rows: [['12', 'A1', '50']], size: 30, rh: 62 }, { alpha: a });
  const tp = [['INTEGER', 'StudentID 是整数'], ['VARCHAR', 'TestID 含字母'], ['INTEGER', 'Mark 是整数']];
  tp.forEach(([s, p], i) => { const c = g.cell(0, i); txt('c6:ty' + i, s, c.x + c.w / 2, c.y + c.h + 50, { size: 30, weight: 700, mono: true, color: COL.pk, align: 'center', alpha: A(t, S('C6_07', p)) }); });
  const at = [T('C6_07', .5), S('C6_07', 'StudentID 是整数'), S('C6_07', 'TestID 含字母'), S('C6_07', 'Mark 是整数'), S('C6_07', '主键是'), S('C6_07', 'TestID 是外键'), S('C6_07', 'StudentID 也是外键')];
  code('c6:ct', ['CREATE TABLE STUDENT_TEST(', '  StudentID INTEGER,', '  TestID VARCHAR,', '  Mark INTEGER,', '  PRIMARY KEY({blue|StudentID}, {blue|TestID}),',
    '  FOREIGN KEY({orange|TestID}) REFERENCES TEST(TestID),', '  FOREIGN KEY({orange|StudentID}) REFERENCES STUDENT(StudentID));'], X0, 400, { size: 32, show: i => A(t, at[i]), w: 1300 });
  rich('c6:cpk', '{blue|composite primary key}', 1460, 400 + 24 + 4 * 48, { size: 28, alpha: A(t, S('C6_07', '主键是')) });
});

scene('C6_08', 'C6_09', t => {
  txt('c6:add', 'Add a field to an existing table', X0, 170, { size: 38, weight: 700, alpha: A(t, T('C6_08')) });
  code('c6:addg', ['ALTER TABLE {mute|table}', 'ADD {mute|field type}, {mute|field type};'], X0, 210, { size: 32, alpha: A(t, T('C6_08')) });
  const ex = A(t, S('C6_08', '例如 ALTER TABLE CAMERA_DATA'));
  code('c6:adde', ['ALTER TABLE CAMERA_DATA', 'ADD NumberStored INTEGER{h1|,} LastUsed DATE;'], X0 + 760, 210, { size: 32, alpha: ex, h: { 1: A(t, S('C6_08', '逗号，LastUsed')) } });
  txt('c6:fk', 'Link a foreign key in an existing table', X0, 540, { size: 38, weight: 700, alpha: A(t, T('C6_09')) });
  code('c6:fkc', ['ALTER TABLE EVENT', 'ADD FOREIGN KEY({orange|PlayerID}) REFERENCES PLAYER({blue|PlayerID});'], X0, 580, { size: 32, show: i => i === 0 ? A(t, T('C6_09')) : A(t, S('C6_09', 'ADD FOREIGN KEY')) });
});

scene('C6_10', 'C6_10', t => {
  const rows = [['{err|CREATE DATA BASE}', 'CREATE DATABASE SCHOOLDATA;', 'DATABASE 是一个词'], ['{err|NONULL}', 'NOT NULL', 'NONULL'],
    ['{sans|a field line without a comma}', '{sans|each field line except the last line in the brackets ends with a comma}', '括号内除最后一行外'],
    ['{sans|primary key field not in brackets}', 'PRIMARY KEY(CharacterID)', '主键字段要写在括号中'],
    ['{sans|foreign key without the referenced table and field}', 'FOREIGN KEY(PlayerID) REFERENCES PLAYER(PlayerID)', '外键要写出'],
    ['{err|TheLevel} INT', 'Level INT', '字段名要与表设计一致'], ['ID 00123 as {err|INT}', 'VARCHAR', '数据类型要与样例数据相符']];
  txt('c6:eh', 'Error', X0, 150, { size: 30, weight: 700, color: COL.mute }); txt('c6:ch2', 'Correction', 820, 150, { size: 30, weight: 700, color: COL.mute });
  line(X0, 166, X1, 166, { color: COL.rule, w: 2 });
  let y = 180;
  rows.forEach(([l, r, p], i) => {
    const a = A(t, S('C6_10', p)), size = 27;
    const hl = rich('', r, 0, 0, { size, mono: !r.startsWith('{sans'), maxW: 990, dry: true }).h;
    rich('c6:el' + i, l.replace(/\{sans\|([^}]*)\}/, '$1'), X0, y, { size, mono: !l.startsWith('{sans'), maxW: 660, alpha: a });
    rich('c6:er' + i, r.replace(/\{sans\|([^}]*)\}/, '$1'), 820, y, { size, mono: !r.startsWith('{sans'), maxW: 990, color: COL.ok, alpha: a });
    y += Math.max(hl, size * 1.42) + 22; line(X0, y - 11, X1, y - 11, { color: COL.rule, w: 1, alpha: a });
  });
});

scene('C6_11', 'C6_13', t => {
  const q = qcard('c6:q', X0, 120, MW, 's24_12 4(b) [3]',
    'An assessment board wants to store the marks students achieved in exams in a database named RECORDS. Write a Structured Query Language (SQL) script to define the table EXAM.',
    { alpha: A(t, T('C6_11')), size: 30 });
  const y0 = q.y + q.h + 18;
  design('c6:d1', 'EXAM({pk|ExamID}, Subject, Level, TotalMarks)', X0, y0, { size: 28, alpha: A(t, S('C6_11', 'EXAM 表包含')) });
  design('c6:d2', 'EXAM_QUESTION({pk|ExamQuestionID}, ExamID, QuestionNumber, Question, MaxMark)', X0, y0 + 46, { size: 28, alpha: A(t, S('C6_11', 'EXAM 表包含')) });
  const zA = A(t, S('C6_12', 'ExamID 是')), lA = A(t, S('C6_12', 'Level 是 2 或 3')), mA = A(t, S('C6_12', 'TotalMarks 是 75'));
  const rows = [['00956124', 'Computer Science', '2', '75'], ['00956125', 'Computer Science', '3', '120'], ['00956126', 'Mathematics', '2', '100'],
    ['00956127', 'Mathematics', '3', '150'], ['00956128', 'Physics', '2', '70'], ['00956129', 'Physics', '3', '80']];
  const g = grid('c6:ex', X0, y0 + 110, { cols: [{ h: 'ExamID', w: 200 }, { h: 'Subject', w: 330 }, { h: 'Level', w: 130 }, { h: 'TotalMarks', w: 210 }], rows, size: 26, rh: 46 },
    { alpha: A(t, S('C6_11', '并给出了样例数据')), cellHL: (r, c) => c === 0 ? zA : c === 2 ? lA : c === 3 ? mA : 0 });
  const ty = [['VARCHAR NOT NULL', S('C6_12', '它是主键')], ['VARCHAR', S('C6_12', 'Subject 是文本')], ['INT', S('C6_12', 'Level 是 2 或 3')], ['INT', S('C6_12', 'TotalMarks 是 75')]];
  txt('c6:ty0a', 'VARCHAR', g.cell(5, 0).x + 100, g.y + g.h + 40, { size: 26, weight: 700, mono: true, color: COL.pk, align: 'center', alpha: zA });
  ty.forEach(([s, at], i) => { if (i === 0) { txt('c6:ty0b', 'NOT NULL', g.cell(5, 0).x + 100, g.y + g.h + 76, { size: 26, weight: 700, mono: true, color: COL.pk, align: 'center', alpha: A(t, at) }); return; }
    const c = g.cell(5, i); txt('c6:ty' + i, s, c.x + c.w / 2, g.y + g.h + 40, { size: 26, weight: 700, mono: true, color: COL.pk, align: 'center', alpha: A(t, at) }); });
  const at = ['CREATE TABLE EXAM', 'ExamID VARCHAR', 'Subject VARCHAR', 'Level INT', 'TotalMarks INT', 'PRIMARY KEY'].map(p => S('C6_13', p));
  code('c6:sc', ['CREATE TABLE EXAM(', '  ExamID varchar NOT NULL,', '  Subject varchar,', '  Level int,', '  TotalMarks int,', '  PRIMARY KEY(ExamID));'],
    1050, y0 + 110, { size: 30, show: i => A(t, at[i]), w: 760 });
});

scene('C6_14', 'C6_14', t => {
  const ps = ['创建 EXAM 表', '所有字段的数据类型合适', 'ExamID 设为主键'].map(p => S('C6_14', p));
  const h = { 1: A(t, ps[0]), 2: A(t, ps[1]), 3: A(t, ps[2]) };
  code('c6:sc2', ['{h1|CREATE TABLE EXAM(}', '  {h2|ExamID varchar NOT NULL,}', '  {h2|Subject varchar,}', '  {h2|Level int,}', '  {h2|TotalMarks int,}', '  {h3|PRIMARY KEY(ExamID)}{h1|)};'],
    X0, 130, { size: 32, h });
  mscheme('c6:ms', X0, 520, MW, ['Creating table EXAM with opening and closing brackets', 'All fields with appropriate data types and commas at end of lines', 'ExamID as primary key'],
    { title: 'Mark scheme  (1 mark each)', size: 32, alpha: A(t, T('C6_14')), ticks: ps.map(p => A(t, p)) });
});
