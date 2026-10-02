// C7 SQL as a DML: queries

scene('C7_01', 'C7_01', t => {
  [['SELECT ... FROM ...', 'fetches data from a database. Queries always begin with SELECT.', 'SELECT 加 FROM'],
    ['WHERE', 'includes only rows in a query that match a given condition.', 'WHERE 只保留'],
    ['ORDER BY', 'sorts the results by a given column alphabetically or numerically; ASC (ascending) is the default, DESC gives descending order.', 'ORDER BY 按指定的列排序']].forEach(([c, d, p], i) => {
    const a = A(t, S('C7_01', p)), y = 180 + i * 170;
    box(X0, y, 480, 84, { fill: COL.code, r: 10, alpha: a });
    txt('c7:c' + i, c, X0 + 24, y + 54, { size: 36, weight: 700, mono: true, alpha: a });
    rich('c7:cd' + i, d, X0 + 540, y + 8, { size: 34, maxW: MW - 540, alpha: a });
  });
});

scene('C7_02', 'C7_02', t => {
  rich('c7:task', '{b|Task:} the first and second names of all students in class 7A, in alphabetical order of second name', X0, 160, { size: 34, alpha: A(t, T('C7_02')) });
  const at = ['SELECT FirstName', 'FROM STUDENT', 'WHERE ClassID', 'ORDER BY SecondName'].map(p => S('C7_02', p));
  code('c7:q1', ['SELECT FirstName, SecondName', 'FROM STUDENT', "WHERE ClassID = {h1|'}7A{h1|'}", 'ORDER BY SecondName;'], X0, 280, { size: 44, show: i => A(t, at[i]), h: { 1: A(t, S('C7_02', '7A 是文本')) } });
  txt('c7:quote', "text value → quotation marks", 1100, 470, { size: 34, weight: 700, color: COL.fk, alpha: A(t, S('C7_02', '7A 是文本')) });
});

scene('C7_03', 'C7_03', t => {
  txt('c7:vt', 'Writing values in conditions', X0, 160, { size: 40, weight: 700 });
  [['Text values are in quotation marks', 'TestID = "A7"   or   \'A7\'', '文本加引号'],
    ['Numbers and TRUE / FALSE are written without quotation marks', 'Paid = FALSE', '数字和 TRUE'],
    ['Dates are written in the format of the database', '#01/01/2023#', '日期按数据库的格式写'],
    ['A date range: two comparisons joined by AND, or BETWEEN', 'DateSent >= #01/01/2023# AND DateSent <= #31/12/2023#', '日期范围用两个比较']].forEach(([l, c, p], i) => {
    const a = A(t, S('C7_03', p)), y = 200 + i * 160;
    txt('c7:vl' + i, l, X0, y + 30, { size: 32, alpha: a });
    code('c7:vc' + i, [c], X0, y + 50, { size: 32, alpha: a });
  });
});

scene('C7_04', 'C7_04', t => {
  code('c7:like', ["WHERE CameraID LIKE 'CAN{h1|%}'"], X0, 160, { size: 44, alpha: A(t, T('C7_04')), h: { 1: A(t, S('C7_04', '百分号')) } });
  txt('c7:likel', 'matches text that starts with CAN', 1000, 220, { size: 34, color: COL.fk, weight: 700, alpha: A(t, S('C7_04', '匹配以指定字符开头的文本')) });
  rich('c7:and', '{m,b|AND}: both conditions must be true', X0, 360, { size: 36, alpha: A(t, S('C7_04', 'AND 要求两个条件都成立')) });
  rich('c7:or', '{m,b|OR}: at least one condition must be true', X0, 430, { size: 36, alpha: A(t, S('C7_04', 'OR 要求至少一个成立')) });
  const e = A(t, S('C7_04', '同一字段允许两个值时'));
  txt('c7:same', 'Two values allowed for the same field are joined with OR:', X0, 590, { size: 32, alpha: e });
  code('c7:orx', ['WHERE HorseLevel = "Intermediate" {h1|OR} HorseLevel = "Beginner"'], X0, 620, { size: 36, alpha: e, h: { 1: e } });
});

scene('C7_05', 'C7_05', t => {
  [['SUM', 'returns the sum of all the values in the column', 'total', 'SUM 返回', '题目说 total'],
    ['COUNT', 'counts the number of rows where the column is not NULL', 'number of', 'COUNT 统计', '说 number of'],
    ['AVG', 'returns the average value for a column with a numeric data type', 'average', 'AVG 返回', '说 average']].forEach(([f, d, w, p, pw], i) => {
    const a = A(t, S('C7_05', p)), y = 150 + i * 100;
    txt('c7:af' + i, f, X0, y + 50, { size: 38, weight: 700, mono: true, color: COL.pk, alpha: a });
    txt('c7:ad' + i, d, X0 + 180, y + 50, { size: 32, alpha: a });
    rich('c7:aw' + i, `question says "{b|${w}}" → {m,b|${f}}`, 1350, y + 14, { size: 30, alpha: A(t, S('C7_05', pw)) });
  });
  const as = A(t, S('C7_05', 'AS 为结果列命名'));
  txt('c7:ast', 'AS gives a name to a column of the result', X0, 520, { size: 32, alpha: as });
  code('c7:asc', ['COUNT(OrderID) {h1|AS NotCollected}'], X0, 545, { size: 40, alpha: as, h: { 1: as } });
  rich('c7:asm', 'A question that asks for "an appropriate title" or "a suitable field name" has a {ok,b|mark for AS}.', X0, 700, { size: 32, alpha: A(t, S('C7_05', '题目要求合适的标题')) });
});

scene('C7_06', 'C7_06', t => {
  rich('c7:gb', '{m,b|GROUP BY}: arranges data into groups, so that an aggregate function gives one result for each group.', X0, 150, { size: 34, alpha: A(t, T('C7_06')) });
  const e = A(t, S('C7_06', '例如每家门店'));
  code('c7:gbc', ['SELECT COUNT(RegistrationNumber)', 'FROM CAR', 'GROUP BY ShopID;'], X0, 300, { size: 36, alpha: e });
  const groups = [[0, 2, '#2F6F9F'], [2, 5, '#D08A1E'], [5, 6, '#3F7F4A']], gx = 1000, gy = 300, rh = 54;
  txt('c7:car', 'CAR', gx, gy - 14, { size: 26, weight: 700, mono: true, alpha: e });
  groups.forEach(([a, b, c], gi) => {
    for (let r = a; r < b; r++) {
      box(gx, gy + r * rh, 300, rh - 6, { fill: '#FFFFFF', stroke: COL.rule, r: 6, alpha: e });
      box(gx + 16, gy + r * rh + 18, 140, 12, { fill: COL.ph, r: 4, alpha: e });
      box(gx + 190, gy + r * rh + 12, 90, 24, { fill: c, r: 6, alpha: e * .85 });
    }
    const k = A(t, S('C7_06', '例如每家门店', 1.2 + gi * .5)), y0 = gy + a * rh, y1 = gy + b * rh - 6;
    line(gx + 320, y0, gx + 320, y1, { color: c, w: 4, alpha: k });
    arrow(gx + 330, (y0 + y1) / 2, gx + 430, (y0 + y1) / 2, { color: c, alpha: k });
    box(gx + 440, (y0 + y1) / 2 - 22, 180, 44, { fill: '#FFFFFF', stroke: c, lw: 2.5, r: 8, alpha: k });
    txt('c7:res' + gi, 'one count', gx + 530, (y0 + y1) / 2 + 9, { size: 24, align: 'center', color: c, alpha: k });
  });
  txt('c7:shop', 'ShopID', gx + 235, gy - 14, { size: 22, mono: true, color: COL.mute, align: 'center', alpha: e });
  txt('c7:one', 'one result for each group', gx + 530, gy + 6 * rh + 40, { size: 28, weight: 700, align: 'center', alpha: A(t, S('C7_06', '例如每家门店', 2.8)) });
});

scene('C7_07', 'C7_07', t => {
  const a = A(t, T('C7_07')), cA = '#2F6F9F', cB = '#3F7F4A';
  const tbl = (id, name, x, keys, label) => {
    txt(id, name, x, 220, { size: 28, weight: 700, mono: true, alpha: a });
    keys.forEach((c, i) => { box(x, 240 + i * 70, 300, 60, { fill: '#FFFFFF', stroke: COL.rule, r: 8, alpha: a });
      box(x + 16, 262 + i * 70, 120, 14, { fill: COL.ph, r: 4, alpha: a }); box(x + 190, 254 + i * 70, 90, 32, { fill: c, r: 6, alpha: a * .85 });
      txt(`${id}:k${i}`, label, x + 235, 278 + i * 70, { size: 18, color: '#FFFFFF', align: 'center', alpha: a }); });
  };
  tbl('c7:t1', 'CUSTOMER', X0, [cA, cB], 'PK');
  tbl('c7:t2b', 'ORDER', X0 + 380, [cA, cB], 'FK');
  const all = A(t, S('C7_07', '第一张表的每一行都会与第二张表的每一行组合')), keep = A(t, S('C7_07', '连接条件只保留'));
  txt('c7:all', 'every row × every row', 1000, 220, { size: 30, weight: 700, alpha: all });
  [[cA, cA], [cA, cB], [cB, cA], [cB, cB]].forEach(([p, q], i) => {
    const match = p === q, al = all * (match ? 1 : 1 - .8 * keep), y = 240 + i * 74;
    box(1000, y, 420, 62, { fill: '#FFFFFF', stroke: match && keep > 0 ? COL.ok : COL.rule, lw: match ? 3 : 2, r: 8, alpha: al });
    box(1020, y + 16, 90, 30, { fill: p, r: 6, alpha: al * .85 }); box(1140, y + 16, 90, 30, { fill: q, r: 6, alpha: al * .85 });
    if (!match) cross(1340, y + 31, 30, keep, COL.err, all);
    else tick(1340, y + 31, 34, keep);
  });
  rich('c7:keep', 'join condition: {b|foreign key = primary key} → only the rows that belong together', 1000, 560, { size: 30, maxW: 800, alpha: keep });
});

scene('C7_08', 'C7_08', t => {
  txt('c7:j1', 'Form 1', X0, 160, { size: 30, weight: 700, color: COL.mute, alpha: A(t, S('C7_08', '第一种')) });
  code('c7:j1c', ['FROM T1, T2', 'WHERE {h1|T1.Key = T2.Key}', 'AND <other conditions>'], X0, 180, { size: 34, alpha: A(t, S('C7_08', '第一种')), h: { 1: A(t, S('C7_08', '连接条件是一张表的主键')) } });
  txt('c7:j2', 'Form 2', 960, 160, { size: 30, weight: 700, color: COL.mute, alpha: A(t, S('C7_08', '第二种')) });
  code('c7:j2c', ['FROM T1 INNER JOIN T2', 'ON {h1|T1.Key = T2.Key}', 'WHERE <other conditions>'], 960, 180, { size: 34, alpha: A(t, S('C7_08', '第二种')), h: { 1: A(t, S('C7_08', '连接条件是一张表的主键')) } });
  txt('c7:one', 'a script uses one of them, not a mix of both', W / 2, 460, { size: 34, weight: 700, color: COL.err, align: 'center', alpha: A(t, S('C7_08', '一个脚本只用其中一种')) });
  rich('c7:pkfk', 'join condition: the {blue|primary key} in one table = the {orange|foreign key} in the other', W / 2, 520, { size: 34, align: 'center', alpha: A(t, S('C7_08', '连接条件是一张表的主键')) });
  const d = A(t, S('C7_08', '字段名在两张表中都存在时'));
  txt('c7:both', 'a field name that appears in both tables is written with its table name:', W / 2, 680, { size: 32, align: 'center', alpha: d });
  code('c7:dot', ['{h1|CUSTOMER.}CustomerID'], W / 2 - 230, 710, { size: 40, alpha: d, h: { 1: d } });
});

scene('C7_09', 'C7_09', t => {
  txt('c7:st', 'Steps to write a query', X0, 160, { size: 40, weight: 700 });
  list('c7:sl', [
    '{m,b|SELECT}: list the fields the question asks to return; add the aggregate function and AS name if the question asks for a total, a number or an average.',
    '{m,b|FROM}: list the table(s) that contain the returned fields and the fields in the conditions. If there are two tables, join them on primary key = foreign key.',
    '{m,b|WHERE}: write each condition, joined by AND or OR.',
    '{m,b|GROUP BY}: if the question says {hl|"for each" or "each"}, group by the field that identifies each group, and that field is also selected.',
    '{m,b|ORDER BY}: if the question gives an order, sort by that field, with DESC for descending.',
    'End with a semicolon.',
  ], X0, 200, { size: 30, gap: 16, alphas: ['第一', '第二', '第三', '第四', '第五', '第六'].map(p => A(t, S('C7_09', p))) });
});

scene('C7_10', 'C7_10', t => {
  rich('c7:t10', '{b|Task:} the number of containers for the ship with the name Caledonia', X0, 150, { size: 34, alpha: A(t, T('C7_10')) });
  const h = { 1: A(t, S('C7_10', 'ShipName 在 SHIP 表')), 2: A(t, S('C7_10', 'ContainerID 在 CONTAINER 表')) };
  design('c7:dc', 'CONTAINER({pk,h2|ContainerID}, Type, Weight, OwnerName, {fk|ShipID})', X0, 240, { size: 28, alpha: A(t, S('C7_10', 'ShipName 在 SHIP 表')), h });
  design('c7:ds', 'SHIP({pk|ShipID}, Type, Capacity, {h1|ShipName})', X0, 290, { size: 28, alpha: A(t, S('C7_10', 'ShipName 在 SHIP 表')), h });
  txt('c7:two', 'two tables → join them', 1300, 300, { size: 30, weight: 700, color: COL.fk, alpha: A(t, S('C7_10', '所以要连接两张表')) });
  const at = ['SELECT COUNT ContainerID', 'FROM CONTAINER INNER JOIN SHIP', 'ON CONTAINER 点 ShipID', 'WHERE ShipName'].map(p => S('C7_10', p));
  code('c7:q10', ['SELECT COUNT(ContainerID)', 'FROM CONTAINER INNER JOIN SHIP', 'ON CONTAINER.ShipID = SHIP.ShipID', 'WHERE ShipName = "Caledonia";'], X0, 380, { size: 40, show: i => A(t, at[i]) });
});

scene('C7_11', 'C7_11', t => {
  const g = A(t, S('C7_11', '题目说每位顾客')), f = A(t, S('C7_11', 'FALSE 不加引号'));
  rich('c7:t11', "{b|Task:} the customer ID, name and total cost of {h1|each customer's} unpaid orders", X0, 150, { size: 34, alpha: A(t, T('C7_11')), h: { 1: g } });
  const at = ['SELECT CUSTOMER 点 CustomerID', 'FROM CUSTOMER, ORDER', 'WHERE 两表的', 'AND ORDER 点 Paid', 'GROUP BY CUSTOMER'].map(p => S('C7_11', p));
  code('c7:q11', ['SELECT CUSTOMER.CustomerID, CUSTOMER.Name, SUM(ORDER.TotalCost) AS TotalOwed', 'FROM CUSTOMER, ORDER', 'WHERE CUSTOMER.CustomerID = ORDER.CustomerID',
    'AND ORDER.Paid = {h3|FALSE}', '{h2|GROUP BY CUSTOMER.CustomerID};'], X0, 260, { size: 34, show: i => A(t, at[i]), h: { 2: g, 3: f } });
  txt('c7:each', '"each customer" → GROUP BY CustomerID', X0, 640, { size: 32, weight: 700, color: COL.fk, alpha: g });
  txt('c7:false', 'FALSE: no quotation marks', X0, 700, { size: 32, weight: 700, color: COL.fk, alpha: f });
});

scene('C7_12', 'C7_12', t => {
  rich('c7:t12', '{b|Script meant to count beginner riders with a lesson on 09/09/2023}: find and correct the errors', X0, 150, { size: 34, alpha: A(t, S('C7_12', '一个脚本要统计')) });
  txt('c7:eh', 'Error', X0, 260, { size: 30, weight: 700, color: COL.mute }); txt('c7:ch', 'Correction', 780, 260, { size: 30, weight: 700, color: COL.mute });
  line(X0, 276, X1, 276, { color: COL.rule, w: 2 });
  [['{m,err|SUM}', '{m|COUNT}   (the question asks for a number of riders)', 'SUM 应改为 COUNT'],
    ['field names without table names in the join', '{m|WHERE STUDENT.StudentID = LESSON.StudentID}', '连接条件中每个字段前要加表名'],
    ['{m,err|OR}', '{m|AND}   (all conditions must be true)', 'OR 应改为 AND'],
    ['text value Beginner without quotation marks', '{m|STUDENT.RiderLevel = "Beginner"}', '文本值 Beginner 要加引号']].forEach(([l, r, p], i) => {
    const a = A(t, S('C7_12', p)), y = 296 + i * 120;
    rich('c7:el' + i, l, X0, y, { size: 30, maxW: 620, alpha: a });
    rich('c7:er' + i, r, 780, y, { size: 30, maxW: 1030, color: COL.ok, alpha: a });
    line(X0, y + 100, X1, y + 100, { color: COL.rule, w: 1, alpha: a });
  });
});

scene('C7_13', 'C7_15', t => {
  const q = qcard('c7:q', X0, 120, MW, 's22_11 4(c)(ii) [3]',
    'A teacher uses a relational database, MARKS, to store data about students and their test marks. Write a Structured Query Language (SQL) script to find the {h1|average} mark of students in test A7.',
    { alpha: A(t, T('C7_13')), size: 30, h: { 1: A(t, T('C7_14')) } });
  const y0 = q.y + q.h + 30, h = { 2: A(t, S('C7_14', '分数 Mark 在 STUDENT_TEST 表中')), 3: A(t, S('C7_14', '测验编号 TestID')) };
  const dA = A(t, S('C7_13', '有三张表'));
  design('c7:d1', 'STUDENT({pk|StudentID}, FirstName, LastName)', X0, y0, { size: 30, alpha: dA });
  design('c7:d2', 'TEST({pk|TestID}, Description, TotalMarks)', X0, y0 + 56, { size: 30, alpha: dA });
  design('c7:d3', 'STUDENT_TEST({pkfk|StudentID}, {pkfk,h3|TestID}, {h2|Mark})', X0, y0 + 112, { size: 30, alpha: dA, h });
  txt('c7:one', 'one table', X0, y0 + 200, { size: 28, weight: 700, color: COL.fk, alpha: A(t, S('C7_14', '所以只用一张表')) });
  txt('c7:avg', 'average → AVG', 1000, y0 + 30, { size: 30, weight: 700, color: COL.pk, alpha: A(t, T('C7_14')) });
  const at = ['SELECT AVG Mark', 'FROM STUDENT_TEST', 'WHERE TestID'].map(p => S('C7_14', p));
  const ps = ['AVG Mark', 'SELECT 和 FROM', 'WHERE 子句'].map(p => S('C7_15', p)), mk = ps.map(p => A(t, p));
  code('c7:q14', ['SELECT {h4|AVG(Mark)}', '{h5|FROM STUDENT_TEST}', '{h6|WHERE TestID = "A7"};'], 1000, y0 + 60, { size: 34, show: i => A(t, at[i]), h: { 4: mk[0], 5: mk[1], 6: mk[2] } });
  mscheme('c7:ms', X0, y0 + 270, MW, ['AVG(Mark)', 'SELECT and FROM STUDENT_TEST', 'WHERE clause'], { title: 'Mark scheme  (1 mark for each point)', size: 32, alpha: A(t, T('C7_15')), ticks: mk });
});
