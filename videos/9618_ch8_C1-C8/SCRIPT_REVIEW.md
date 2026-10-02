# Script review

Model `edge-tts`, voice `zh-CN-YunjianNeural`.

| id | concept | narration (say) | on screen (show) | pause |
|---|---|---|---|---|
| S000 |  | 本视频讲解剑桥 9618 第八章，数据库，Databases。内容分为八个部分：文件方式的局限，术语和键，关系与 E-R 图，规范化，DBMS 的功能，SQL 的数据定义，SQL 查询，以及数据维护。每个部分最后都会完成一道真题。 | Title 9618 Chapter 8 Databases; list of eight parts C1–C8 | 1.0 |
| C1_01 | C1 | 第一部分，文件方式的局限，以及关系数据库如何解决这些局限。先看一个使用文件的例子。一家公司有两个程序：工资程序读写工资文件，销售程序读写销售文件。员工姓名和员工编号在两个文件中都有存储。 | Payroll program → payroll file; sales program → sales file; StaffName and StaffNumber highlighted in both | 0.6 |
| C1_02 | C1 | 同一份数据存储了多次，这就是数据冗余，data redundancy。答题时写作：There is more data redundancy, because the same data is stored many times in the separate files used by different applications, so storage space is wasted. | Duplicated fields highlighted; limitation 1 wording appears | 0.6 |
| C1_03 | C1 | 员工姓名在两个文件中的存储格式不同。如果工资程序修改了某位员工的编号，而销售程序没有修改，两个文件对同一位员工就保存了不同的值。这是数据不一致，data inconsistency，也就是数据完整性变差。原因是：重复的数据可能以不同方式存储，一处更新时其他地方没有同时更新。 | StaffNumber changed in payroll file only; two different values marked; limitation 2 wording | 0.6 |
| C1_04 | C1 | 员工编号在一个文件中是第五个字段，在另一个文件中是第二个字段。每个程序都是按照自己文件的记录结构编写的。所以数据结构一旦改变，所有访问这些数据的程序都必须重写。这叫程序与数据相互依赖，program-data dependence。 | Record layouts: StaffNumber at field 5 vs field 2; limitation 3 wording | 0.6 |
| C1_05 | C1 | 另外两项局限：复杂的搜索和查询不容易执行，因为每次都要编写新的程序；可能缺乏隐私保护，因为难以实现用户视图。 | Limitations 4 and 5 added to the list | 0.6 |
| C1_06 | C1 | 数据库是结构化的数据集合，可以被不同的应用程序访问。关系数据库，relational database，把数据存放在相互独立的表中，各表之间通过键相互连接。下面逐条看它如何解决上述局限。 | Definitions of database and relational database; two linked tables | 0.6 |
| C1_07 | C1 | 第一，数据冗余减少，因为表与表相互连接，每个数据项只存储一次。Data redundancy is reduced, because linked tables mean that each data item is stored only once. | Advantage 1 paired with limitation 1 | 0.6 |
| C1_08 | C1 | 第二，数据一致性得到保持，数据完整性提高，因为只存储一次的数据只需要更新一次，相互连接的数据不会在两张表中录入成不同的值，并且可以强制实施参照完整性。 | Advantage 2 paired with limitation 2 | 0.6 |
| C1_09 | C1 | 第三，程序与数据相互独立，program-data independence。数据与软件分开，数据结构的改变由 DBMS 管理，程序不需要重写，查询也不依赖于数据的结构。 | Advantage 3 paired with limitation 3 | 0.6 |
| C1_10 | C1 | 此外，复杂查询更容易执行；可以提供不同的视图，views，使用户只能看到数据库中特定的部分；通过记录锁定，record locking，可以实现多个用户同时访问。 | Advantages 4, 5, 6 | 0.6 |
| C1_11 | C1 | 答题格式。在 describe 或 explain 类题目中，分数成对给出：一分给局限或优点的名称，一分给后面 because 引出的原因。所以每一条都先写名称，再写原因。 | Format: [name] because [reason] → 1 mark + 1 mark | 0.8 |
| C1_12 | C1 | 真题，2023 年冬季卷 11，第 3 题 b 小题，3 分。一位店长设计了关系数据库来存储顾客订单。写出关系数据库相对于文件方式的三项优点。 | Question w23_11 3(b) [3] | 0.6 |
| C1_13 | C1 | 指令词是 identify，只要求写出名称，每点一分，最多三分。可以写：Reduced data redundancy；Improved data integrity, consistency, or referential integrity；Allows for program-data independence。写 Allows for views，或 Complex queries can be executed，同样得分。 | Mark scheme bullets; three chosen answers ticked | 1.2 |
| C2_01 | C2 | 第二部分，关系数据库的术语、键和参照完整性。实体，entity，是可以存储数据的对象，例如一个人、一个地点、一个事件或一件物品。现实中的一个实体在数据库中用一张表来表示。 | Definition of entity; examples | 0.6 |
| C2_02 | C2 | 表，table，是数据库中一组相似的数据，每一行对应实体的一个实例，每一列对应一个属性。属性，attribute，是关于实体存储的单个数据项，例如顾客的出生日期。 | CUSTOMER table drawn; a row and a column labelled | 0.6 |
| C2_03 | C2 | 表中的一列也称为字段，field。一行称为记录，record，也称为元组，tuple，即实体在表中的一个实例。 | Column labelled field; row labelled record / tuple | 0.6 |
| C2_04 | C2 | 表的设计写成表名加括号，括号内列出属性，主键加下划线。例如 CUSTOMER，括号内是 CustomerID、FirstName、LastName，其中 CustomerID 带下划线。 | CUSTOMER(CustomerID underlined, FirstName, LastName) | 0.6 |
| C2_05 | C2 | 主键，primary key，是用来唯一标识每条记录的属性或属性组合。可以作为主键的属性称为候选键，candidate key：在这个属性或最小属性组上，任何两个元组的值都不相同。主键是被选中的那个候选键。 | Definitions of primary key and candidate key | 0.6 |
| C2_06 | C2 | 例如元素表 ELEMENTS，包含 Symbol、Name 和 AtomicWeight。每种元素的这三项都各不相同，所以三个属性都是候选键。如果选择 Symbol 作为主键，Name 和 AtomicWeight 就是次键，secondary key，即没有被选为主键的候选键。多数表只有一个候选键，它就成为主键。 | ELEMENTS table with sample rows; Symbol → PK, Name and AtomicWeight → secondary keys | 0.6 |
| C2_07 | C2 | 有时单个属性不能唯一标识记录。在 FILM_ACTOR 表中，一位演员出演多部电影，一部电影有多位演员，所以 ActorID 和 FilmID 单独都不唯一。但同一位演员不会在同一部电影中出现两次，所以这一对值是唯一的。由两个或更多属性共同组成的主键，称为复合主键，composite primary key。 | FILM_ACTOR rows: repeated ActorIDs, repeated FilmIDs, unique pairs; both underlined | 0.6 |
| C2_08 | C2 | 外键，foreign key，是一张表中的字段，它与另一张表的主键相连接。识别方法：对每个不属于主键的属性，检查它是否是另一张表的主键。如果是，它在这张表中就是外键，并引用那张表。同一个属性名可以在一张表中是主键，在另一张表中是外键。 | Definition of foreign key; method steps 1–3 | 0.6 |
| C2_09 | C2 | 参照完整性，referential integrity。STUDENT 表中有外键 ClassID，CLASS 表的主键是 ClassID，CLASS 表还存储了老师姓名和教室位置。如果某个学生的 ClassID 是 7D，而 CLASS 表中没有 7D 班，这个学生就没有对应的老师和教室。 | STUDENT and CLASS tables; a STUDENT row with ClassID 7D has no matching CLASS row | 0.6 |
| C2_10 | C2 | 所以参照完整性的含义是：确保每个外键都有对应的主键，外键的值不能指向不存在的数据。它防止孤立记录，orphaned records，即指向另一张表中已不存在条目的记录。它还通过级联更新和级联删除，使一处的修改反映到所有相关记录中。 | Referential integrity bullet points | 0.6 |
| C2_11 | C2 | 数据完整性，data integrity，是确保数据一致的方法，例如实施参照完整性、级联更新和删除，以及验证和校验规则。索引，index，是由表中一列或多列建立的数据结构，用来加快数据的查找。 | Definitions of data integrity and index | 0.6 |
| C2_12 | C2 | 如果题目要求用数据库中的例子给出定义，先写定义，再写出这个数据库中具体的表或属性。例如：Foreign key, a field in one table that is linked to a primary key in another table, e.g. CustomerID in the table RENTAL。 | Example answer with e.g. part highlighted | 0.8 |
| C2_13 | C2 | 真题，2021 年冬季卷 11 和卷 13，第 5 题 a 小题，2 分。Javier 用数据库 CARS 管理汽车门店。三张表是 SHOP、MANAGER 和 CAR。判断四个字段分别是主键还是外键。 | Question w21_11 5(a); three table designs; empty tick table | 0.6 |
| C2_14 | C2 | MANAGER 表中的 ManagerID 带下划线，是主键。SHOP 表中的 ManagerID 没有下划线，但它是 MANAGER 表的主键，所以在 SHOP 中是外键。 | Ticks for rows 1 and 2 | 0.6 |
| C2_15 | C2 | CAR 表中的 RegistrationNumber 带下划线，是主键。CAR 表中的 ShopID 是 SHOP 表的主键，所以在 CAR 中是外键。四项全对得两分，对两项或三项得一分。 | Ticks for rows 3 and 4; mark rule | 1.2 |
| C3_01 | C3 | 第三部分，关系和 E-R 图。当一张表中有外键指向另一张表的主键时，两张表之间就形成了关系，relationship。关系的类型有四种：一对一，一对多，多对一，多对多。 | Definition; 1:1, 1:M, M:1, M:M | 0.6 |
| C3_02 | C3 | 以 STUDENT 和 CLASS 为例。同一个 ClassID 值在 STUDENT 表中出现多次，因为一个班有多名学生；而在 CLASS 表中只出现一次。所以 CLASS 与 STUDENT 是一对多，反过来 STUDENT 与 CLASS 是多对一。 | ClassID 7A appears many times in STUDENT, once in CLASS | 0.6 |
| C3_03 | C3 | 一对多关系的实现方式是：一方的表的主键，作为外键出现在多方的表中。因此，含有外键的表位于多的一方。 | 1:M implementation statement | 0.6 |
| C3_04 | C3 | 一对一关系也是把一张表的主键作为外键放入另一张表，例如 EMPLOYEE 表的主键作为外键放入 LOGIN_DATA 表。区别在于，这个外键值在所在的表中只能出现一次，因为每位员工只有一条登录记录。 | EMPLOYEE and LOGIN_DATA; each EmployeeID once | 0.6 |
| C3_05 | C3 | 为什么一个外键只能实现一的那一端？外键字段在每一行中只保存一个值，所以一行只能指向另一张表中的一行。如果要实现多对多，每一行都需要保存多个值，这就形成了重复组。 | One row → one value → one referenced row; M:M would need many values in one row | 0.6 |
| C3_06 | C3 | 因此，多对多关系不能在规范化的关系数据库中直接实现。解决办法是在两张表之间建立连接表，linking table。连接表包含两张表各自的主键作为外键，这两个外键通常组成它的复合主键。连接表把每一对值存为单独的一行，原来的多对多关系就变成了两个一对多关系。 | M:M replaced by linking table with two foreign keys forming composite PK; two 1:M lines | 0.8 |
| C3_07 | C3 | E-R 图，entity-relationship diagram，是用图形表示数据库及其实体之间关系的方法。每个实体是一个方框，标上表名。每个关系是两个方框之间的一条线，多的一端画鸦脚，crow's foot，即三条短线；一的一端是单线。 | Two boxes with a line; crow's foot at the many end | 0.6 |
| C3_08 | C3 | 关系还可以是可选的，即零或一、零或多；也可以是必需的，即恰好一个、一或多。关系类型加上可选或必需，合起来就是关系的基数，cardinality。 | Optional and mandatory notations; cardinality | 0.6 |
| C3_09 | C3 | 由表结构判断关系，步骤如下。第一，列出所有外键。第二，每个外键画一条线，连接含有它的表和它引用的表。第三，含外键的表在多的一方，鸦脚画在这一端。第四，如果外键值在表中只能出现一次，关系是一对一。第五，主键由两个外键组成的表是连接表，它的两条线都是多端，它连接的两张表之间是多对多关系。 | Method steps 1–5 | 0.8 |
| C3_10 | C3 | 例如五张表：CUSTOMER，SHOP_ORDER，ITEM，SUPPLIER，ORDER_ITEM。SHOP_ORDER 中有外键 CustomerID，所以 CUSTOMER 到 SHOP_ORDER 是一对多。ITEM 中有外键 SupplierID，所以 SUPPLIER 到 ITEM 是一对多。 | Five table designs; first two lines drawn | 0.6 |
| C3_11 | C3 | ORDER_ITEM 的主键由 ItemNumber 和 OrderNo 组成，两者都是外键，所以它是连接表。SHOP_ORDER 到 ORDER_ITEM 是一对多，ORDER_ITEM 到 ITEM 是多对一。订单与商品之间的多对多关系，就通过这张连接表实现。 | Remaining two lines; complete E-R diagram | 0.6 |
| C3_12 | C3 | 根据文字描述举例时：一对一，例如顾客与支付信息，或顾客与登录信息；一对多，例如顾客与订单；多对多，例如订单与产品，或顾客与产品。 | Example list from a shop description | 0.6 |
| C3_13 | C3 | 描述两张表之间的关系，要写两点。第一，关系类型，并从两个方向说明，例如：one member of staff can have many devices; each device can only be with one member of staff。第二，键，例如：the primary key StaffID in STAFF links to the foreign key StaffID in DEVICE。 | Answer format: type both directions + keys | 0.8 |
| C3_14 | C3 | 真题，2025 年冬季卷 12，第 4 题 a 小题，2 分。数据库 SHIPPING 存储船只和集装箱的数据，有两张表：CONTAINER 和 SHIP。描述两张表之间的关系，并提到主键和外键。 | Question w25_12 4(a); two table designs | 0.6 |
| C3_15 | C3 | CONTAINER 表中有 ShipID，没有下划线，它是 SHIP 表的主键，所以在 CONTAINER 中是外键。含外键的 CONTAINER 位于多的一方。答案第一点：The relationship between SHIP and CONTAINER is one-to-many。第二点：The primary key ShipID in the SHIP table is linked to the foreign key ShipID in the CONTAINER table。每点一分。 | ShipID highlighted in both; E-R line SHIP 1 — M CONTAINER; mark scheme bullets | 1.2 |
| C4_01 | C4 | 第四部分，规范化到第三范式。先看不规范化会带来什么问题。学校把所有数据放在一张表中，每新增一条学生记录，都必须同时写入老师的姓名、地址、执照编号、出生日期，以及教室位置。 | One wide STUDENT table with teacher and class columns repeated | 0.6 |
| C4_02 | C4 | 如果 Khan 老师离职，所有包含他信息的记录都必须修改。如果 7B 班的学生全部离校，关于 7B 班的全部信息也随之丢失。这些问题都来自同一个原因：关于一个实体的数据，例如老师或班级，被存放在关于另一个实体，即学生的行中。 | Rows with Mr Khan highlighted; rows of 7B removed and class data lost | 0.6 |
| C4_03 | C4 | 规范化，normalisation，是把要存储的数据组织成两张或更多的表以及表之间的关系，使数据冗余降到最低的过程。 | Definition of normalisation | 0.6 |
| C4_04 | C4 | 第一范式，1NF：没有重复的属性组，数据是原子的。第二范式，2NF：表已是 1NF，并且所有属性都完全依赖于主键或复合主键，即没有部分依赖。第三范式，3NF：表已是 2NF，并且所有属性完全依赖于主键而不依赖其他属性，即没有非键依赖，也称没有传递依赖。 | Definitions of 1NF, 2NF, 3NF | 0.8 |
| C4_05 | C4 | 每个阶段的任务：从 0NF 到 1NF，去除重复的属性组；从 1NF 到 2NF，去除部分键依赖；从 2NF 到 3NF，去除非键依赖。在 3NF 中，每个属性都依赖于键，依赖于整个键，并且只依赖于键，英文是 the key, the whole key and nothing but the key。 | Three stage tasks; summary sentence | 0.6 |
| C4_06 | C4 | 注意：部分依赖只可能在主键是复合主键时出现。如果一个 1NF 表的主键只有一个属性，它已经是 2NF。另外，规范化的数据库中没有多对多关系。 | Two notes | 0.6 |
| C4_07 | C4 | 下面用学校的例子完整做一遍。未规范化的 STUDENT 表，主键是 StudentID。每名学生学习几门科目，每门科目有科目老师，所以 SubjectName 和 SubjectTeacher 在表中重复出现了三次。 | 0NF design of STUDENT with SubjectName, SubjectTeacher ×3 | 0.6 |
| C4_08 | C4 | 到 1NF。重复组是 SubjectName 和 SubjectTeacher。把它移到新表 STUDENTSUBJECT，同时带上原表的主键 StudentID，它在新表中是外键。一名学生有多门科目，所以新表需要复合主键，由 StudentID 和 SubjectName 组成。 | Repeating group moved; STUDENT and STUDENTSUBJECT(StudentID, SubjectName underlined, SubjectTeacher) | 0.6 |
| C4_09 | C4 | 到 2NF。检查每张有复合主键的表，看是否有属性只依赖于主键的一部分。在 STUDENTSUBJECT 中，SubjectTeacher 只依赖于 SubjectName，与 StudentID 无关，这是部分依赖。把 SubjectTeacher 移到新表 SUBJECT，它的主键是 SubjectName。 | Arrow SubjectTeacher ← SubjectName; new SUBJECT table | 0.6 |
| C4_10 | C4 | 到 3NF。检查每张表中是否有非键属性依赖于另一个非键属性。在 STUDENT 表中，Location 和 TeacherName 依赖于 ClassID；LicenceNumber、Address 和 TeacherDateOfBirth 依赖于老师。 | Dependency arrows inside STUDENT | 0.6 |
| C4_11 | C4 | 把每组属性移到新表，新表的主键是它们所依赖的属性，这个属性留在原表中作为外键。老师姓名可能重复，所以用 LicenceNumber 作为老师表的主键。班主任和科目老师都是老师，所以存放在同一张 TEACHER 表中。 | CLASS and TEACHER tables created; SUBJECT now references LicenceNumber | 0.6 |
| C4_12 | C4 | 最终结果是五张表：STUDENT，CLASS，TEACHER，STUDENTSUBJECT，SUBJECT。检查：每张表都有带下划线的主键；每个外键都与另一张表的主键对应；除了用于连接的键，每个原有属性只出现在一张表中。 | Final five 3NF tables with keys underlined; check list | 1.0 |
| C4_13 | C4 | 如何论证一个数据库处于 3NF：没有重复的属性组；每个字段都完全依赖于所在表的主键，并给出例子，例如 all fields in CUSTOMER are fully dependent on CustomerID；没有非键依赖；没有多对多关系。 | Justification points | 0.6 |
| C4_14 | C4 | 把表变为 1NF 的答题要点：指出重复的属性组并写出名称；确保每个字段是原子的，例如把 StudentName 拆分为 FirstName 和 LastName；确定表的主键。 | 1NF answer points | 0.6 |
| C4_15 | C4 | 根据文字描述设计 3NF 表结构。第一，每个实体一张表，配一个合适的主键，通常是 ID 字段，名字或标题不适合作为主键，并把只描述这个实体的属性放进它的表。第二，两个实体之间是多对多时，增加连接表，包含两个实体的主键作为外键，一个合适的主键，以及属于这一对的属性，例如分数或日期。 | Design method steps | 0.6 |
| C4_16 | C4 | 例如一个测验网站，每个用户玩多个测验，每次得到一个分数。USER 表，主键 Username；QUIZ 表，主键 QuizID；连接表 USER_QUIZ，复合主键 Username 和 QuizID，再加 Score。分数属于用户与测验这一对，所以放在连接表中。 | USER, QUIZ, USER_QUIZ designs | 0.6 |
| C4_17 | C4 | 真题，2023 年夏季卷 13，第 4 题 c 小题，4 分。一家店向顾客出租汽车，租赁数据库没有规范化。BOOKING 表包含 CarRegistration、StartDate、EndDate、CarModel、CarColour、CustomerFirstName；CUSTOMER 表包含 CustomerFirstName、CustomerLastName、EmailAddress、TelephoneNumber。写出 3NF 的设计，使用给定的字段名，并给主键加下划线。 | Question s23_13 4(c); two unnormalised designs | 0.6 |
| C4_18 | C4 | 分析。CarModel 和 CarColour 描述的是汽车，依赖于 CarRegistration，而不是依赖于预订，所以汽车需要单独一张 CAR 表，主键是 CarRegistration。顾客的名字不适合作为主键，所以 CUSTOMER 表增加 CustomerID 作为主键。 | CarModel, CarColour → CarRegistration; CAR table; CUSTOMER gets CustomerID | 0.6 |
| C4_19 | C4 | BOOKING 表增加主键 BookingID，并包含 CarRegistration 和 CustomerID 作为外键，再加上 StartDate 和 EndDate。 | Final BOOKING, CAR, CUSTOMER designs | 0.6 |
| C4_20 | C4 | 评分要点，每点一分：只有三张表，分别对应顾客、预订和汽车，并有合适的标识；每张表都有合适的主键并加下划线；BOOKING 表包含 CAR 和 CUSTOMER 的主键作为外键；所有原有字段都在正确的表中。 | Mark scheme bullets ticked against the answer | 1.2 |
| C5_01 | C5 | 第五部分，DBMS 的功能和软件工具。数据库管理系统，database management system，简称 DBMS，是用于定义、创建和操作数据库的系统软件。数据的录入、存储、修改和删除都由 DBMS 管理。 | Definition of DBMS | 0.6 |
| C5_02 | C5 | 数据字典，data dictionary。它的作用是存储数据库的元数据，即关于数据库中数据的数据，或关于数据库结构的数据。它规定了将要存储的数据有哪些特征。 | Data dictionary purpose | 0.6 |
| C5_03 | C5 | 数据字典的内容包括：表名，字段名，数据类型，验证规则，主键，外键，关系，视图，索引。注意两点：如果题目已经给出某些项，例如表名和字段名，答案必须写其他项；metadata 这个词本身不能作为一项内容得分。 | Contents list; two notes highlighted | 0.6 |
| C5_04 | C5 | 数据字典把表、属性、关系和验证规则的定义集中存放在一处，DBMS 根据这些定义检查每一次录入，因此有助于保证数据准确、完整、一致。 | Definitions → DBMS checks each entry | 0.6 |
| C5_05 | C5 | 数据建模，data modelling，是分析和定义数据库所需的数据结构，从而得到数据模型。E-R 图就是一种数据模型。 | Definition of data modelling | 0.6 |
| C5_06 | C5 | 逻辑模式，logical schema，是某个具体数据库的数据模型，它与用来构建这个数据库的 DBMS 无关，也就是不特定于某一个 DBMS。它是数据库结构的概念设计，用 E-R 图等方法对问题建模，并用于设计物理结构。 | Logical schema points | 0.6 |
| C5_07 | C5 | DBMS 支持数据完整性的方式：验证，实施参照完整性，级联更新和删除，确保数据库已经规范化。 | Four ways | 0.6 |
| C5_08 | C5 | 数据安全措施，每一条都写措施加它如何保护数据。认证，authentication，例如用户名和密码、生物识别、双因素认证，可以防止未经授权访问数据。访问权限，access rights，不同用户被授予不同权限，例如只读、读写、完全访问或无权访问，因此只有具备正确权限的人才能读取或编辑数据。 | Security: authentication, access rights | 0.6 |
| C5_09 | C5 | 视图，views，不同用户只能看到数据库的不同部分，例如经理只能看到自己门店的数据。备份与恢复，定期自动复制数据库并存放在异地，数据丢失时可以恢复。记录和表锁定，防止同时访问数据，避免更新丢失。加密，encryption，把数据转换成密文，没有解密密钥就无法理解。 | Security: views, backup, locking, encryption | 0.6 |
| C5_10 | C5 | 开发者界面，developer interface，是让用户创建表、窗体和报表等对象的软件工具。它可以创建、修改、删除表和其他数据库对象，并设置关系；创建数据输入窗体，在窗体中加入下拉框和按钮；设计报表，有条理地显示输出，并添加菜单供用户选择不同的操作或查询。 | Developer interface functions | 0.6 |
| C5_11 | C5 | 查询处理器，query processor，是处理和执行 SQL 查询的软件。它的工作过程是：DDL 语句由 DDL 解释器解释，并记录到数据字典中；DML 语句由 DML 编译器编译成低级指令，编译器同时优化查询；最后由查询求值引擎执行这些指令。 | Flow: DDL → interpreter → data dictionary; DML → compiler (optimise) → evaluation engine | 0.6 |
| C5_12 | C5 | 真题，2023 年夏季卷 12，第 2 题 a 小题，4 分。一所马术学校用 DBMS 管理数据库 Lessons。表格中两行只给出名称，数据字典和查询处理器；两行只给出描述。补全缺少的名称和描述。 | Question s23_12 2(a); four-row table with gaps | 0.6 |
| C5_13 | C5 | Data dictionary 的描述：data about the data in the database，或 metadata for a database。Query processor 的描述：software that processes and executes queries written in SQL。 | Rows 1–2 filled | 0.6 |
| C5_14 | C5 | 描述是不特定于某一个 DBMS 的数据库模型，名称是 logical schema。描述是让用户创建表、窗体和报表等对象的软件工具，名称是 developer interface。每格一分。 | Rows 3–4 filled; 1 mark each | 1.2 |
| C6_01 | C6 | 第六部分，SQL 作为数据定义语言。数据定义语言，data definition language，简称 DDL，用来创建、修改和删除构成数据库的数据结构。数据操作语言，data manipulation language，简称 DML，用来添加、修改、删除和检索数据库中存储的数据。DDL 作用于数据库的结构，DML 作用于其中的数据。SQL，即结构化查询语言，是这两者共同的工业标准语言。 | DDL vs DML; SQL | 0.6 |
| C6_02 | C6 | DDL 命令：CREATE DATABASE，创建数据库；CREATE TABLE，创建表定义；ALTER TABLE，修改表定义；PRIMARY KEY，为表添加主键；FOREIGN KEY 加 REFERENCES，为表添加外键。 | DDL commands list | 0.6 |
| C6_03 | C6 | 数据类型：CHARACTER，定长文本；VARCHAR，变长文本；BOOLEAN，真或假；INTEGER，整数；REAL，带小数的数，FLOAT 和 CURRENCY 也可以；DATE，日期，通常格式为年月日；TIME，时间，格式为时分秒。NOT NULL 是一个约束，表示字段必须有值，用于主键字段和其他必填字段。 | Data types table; NOT NULL | 0.6 |
| C6_04 | C6 | 根据样例数据选择类型：含字母的 ID，例如 ST23-56，或以零开头的 ID，例如 00956124，用 VARCHAR；计数或整数，例如卧室数量、数量、级别，用 INTEGER；带小数点的值或金额，例如 1000.00，用 REAL；是或否、TRUE 或 FALSE，用 BOOLEAN；日期用 DATE，时间用 TIME。 | Sample values → type | 0.6 |
| C6_05 | C6 | 创建数据库：CREATE DATABASE SHOPORDERS，以分号结束。 | CREATE DATABASE SHOPORDERS; | 0.6 |
| C6_06 | C6 | 创建表的步骤。第一，写 CREATE TABLE 和表名，然后写左括号。第二，每个字段写一行：字段名与表设计完全一致，加数据类型，需要时加 NOT NULL，行末加逗号。第三，写 PRIMARY KEY，括号内是主键字段；复合主键则写两个字段，用逗号分隔。第四，每个外键写 FOREIGN KEY，括号内是字段，然后写 REFERENCES，表名，括号内是字段。第五，闭合括号，以分号结束。 | Steps 1–5 beside an empty template | 0.6 |
| C6_07 | C6 | 例如表 STUDENT_TEST，样例数据是 StudentID 12，TestID A1，Mark 50。StudentID 是整数，用 INTEGER；TestID 含字母，用 VARCHAR；Mark 是整数，用 INTEGER。主键是 StudentID 和 TestID 组成的复合主键。TestID 是外键，引用 TEST 表的 TestID；StudentID 也是外键，引用 STUDENT 表的 StudentID。 | CREATE TABLE STUDENT_TEST script written line by line | 0.6 |
| C6_08 | C6 | 在已有的表中增加字段：ALTER TABLE 表名，然后 ADD 字段名和数据类型，多个字段用逗号分隔。例如 ALTER TABLE CAMERA_DATA，ADD NumberStored INTEGER，逗号，LastUsed DATE。 | ALTER TABLE CAMERA_DATA ADD NumberStored INTEGER, LastUsed DATE; | 0.6 |
| C6_09 | C6 | 在已有的表中连接外键：ALTER TABLE EVENT，ADD FOREIGN KEY，括号内 PlayerID，REFERENCES PLAYER，括号内 PlayerID。 | ALTER TABLE EVENT ADD FOREIGN KEY(PlayerID) REFERENCES PLAYER(PlayerID); | 0.6 |
| C6_10 | C6 | 找错题中常见的错误：DATABASE 是一个词，不能写成 DATA BASE；NONULL 应写作 NOT NULL；括号内除最后一行外，每个字段行都以逗号结束；主键字段要写在括号中；外键要写出所引用的表和字段；字段名要与表设计一致，例如 TheLevel 改为 Level；数据类型要与样例数据相符，例如 00123 这样的 ID 用 VARCHAR 而不是 INT。 | Error → correction table | 0.8 |
| C6_11 | C6 | 真题，2024 年夏季卷 12，第 4 题 b 小题，3 分。考试局用数据库 RECORDS 存储考试成绩。EXAM 表包含 ExamID、Subject、Level、TotalMarks，并给出了样例数据。编写 SQL 脚本定义表 EXAM。 | Question s24_12 4(b); EXAM design and sample data table | 0.6 |
| C6_12 | C6 | 先根据样例数据选类型。ExamID 是 00956124 这样以零开头的编号，用 VARCHAR；它是主键，加 NOT NULL。Subject 是文本，用 VARCHAR。Level 是 2 或 3，TotalMarks 是 75、120 这样的整数，都用 INT。 | Each column of sample data → type | 0.6 |
| C6_13 | C6 | 脚本是：CREATE TABLE EXAM，左括号；ExamID VARCHAR NOT NULL，逗号；Subject VARCHAR，逗号；Level INT，逗号；TotalMarks INT，逗号；PRIMARY KEY，括号内 ExamID；右括号，分号。 | Script written line by line | 0.6 |
| C6_14 | C6 | 评分三点，每点一分：创建 EXAM 表，并有左右括号；所有字段的数据类型合适，行末有逗号；ExamID 设为主键。 | Mark scheme bullets ticked | 1.2 |
| C7_01 | C7 | 第七部分，SQL 作为数据操作语言：查询。SELECT 加 FROM 从数据库中取出数据，查询总是以 SELECT 开头。WHERE 只保留满足条件的行。ORDER BY 按指定的列排序，默认是升序 ASC，DESC 是降序。 | SELECT, FROM, WHERE, ORDER BY | 0.6 |
| C7_02 | C7 | 例如：班级 7A 所有学生的名和姓，按姓的字母顺序排列。SELECT FirstName, SecondName，FROM STUDENT，WHERE ClassID 等于 7A，ORDER BY SecondName。7A 是文本，要加引号。 | One-table example query | 0.6 |
| C7_03 | C7 | 条件中值的写法：文本加引号，例如 TestID 等于加引号的 A7；数字和 TRUE、FALSE 不加引号，例如 Paid 等于 FALSE；日期按数据库的格式写，例如用井号括起来；日期范围用两个比较加 AND 连接，或者用 BETWEEN。 | Value formats; date range example | 0.6 |
| C7_04 | C7 | LIKE 配合通配符百分号，匹配以指定字符开头的文本，例如 WHERE CameraID LIKE 加引号的 CAN 百分号。AND 要求两个条件都成立，OR 要求至少一个成立。同一字段允许两个值时，用 OR 连接，例如 HorseLevel 等于 Intermediate，OR HorseLevel 等于 Beginner。 | LIKE 'CAN%'; AND vs OR example | 0.6 |
| C7_05 | C7 | 聚合函数：SUM 返回一列所有值的总和；COUNT 统计该列不为空的行数；AVG 返回数值列的平均值。题目说 total 用 SUM，说 number of 用 COUNT，说 average 用 AVG。AS 为结果列命名，例如 COUNT OrderID AS NotCollected。题目要求合适的标题或字段名时，AS 有一分。 | SUM, COUNT, AVG; question word → function; AS | 0.6 |
| C7_06 | C7 | GROUP BY 把数据分组，使聚合函数对每一组给出一个结果。例如每家门店在售汽车的数量：SELECT COUNT RegistrationNumber，FROM CAR，GROUP BY ShopID。 | Grouped example; rows grouped by ShopID with counts | 0.6 |
| C7_07 | C7 | 两表查询。如果不写连接条件，第一张表的每一行都会与第二张表的每一行组合。连接条件只保留外键与主键相匹配的行对，也就是真正属于同一事物的行。 | All row pairs → only matching pairs kept | 0.6 |
| C7_08 | C7 | 连接有两种写法。第一种：FROM 表一，逗号，表二，WHERE 表一点键等于表二点键，再用 AND 加其他条件。第二种：FROM 表一 INNER JOIN 表二，ON 表一点键等于表二点键，再写 WHERE 其他条件。一个脚本只用其中一种，不要混用。连接条件是一张表的主键等于另一张表的外键。字段名在两张表中都存在时，前面要加表名，例如 CUSTOMER 点 CustomerID。 | Two join forms side by side | 0.6 |
| C7_09 | C7 | 写查询的步骤。第一，SELECT 列出题目要求返回的字段；要求总和、数量或平均值时加聚合函数和 AS。第二，FROM 列出包含返回字段和条件字段的表；两张表时按主键等于外键连接。第三，WHERE 写出各个条件，用 AND 或 OR 连接。第四，题目出现 for each 或 each 时，GROUP BY 标识每一组的字段，这个字段也要选出。第五，题目给出顺序时用 ORDER BY，降序加 DESC。第六，以分号结束。 | Steps 1–6 | 0.8 |
| C7_10 | C7 | 例如：船名为 Caledonia 的船上有多少个集装箱。ShipName 在 SHIP 表，ContainerID 在 CONTAINER 表，所以要连接两张表。SELECT COUNT ContainerID，FROM CONTAINER INNER JOIN SHIP，ON CONTAINER 点 ShipID 等于 SHIP 点 ShipID，WHERE ShipName 等于加引号的 Caledonia。 | Two-table example query | 0.6 |
| C7_11 | C7 | 再看一个例子：每位顾客未付订单的顾客编号、姓名和总费用。SELECT CUSTOMER 点 CustomerID，CUSTOMER 点 Name，SUM ORDER 点 TotalCost AS TotalOwed；FROM CUSTOMER, ORDER；WHERE 两表的 CustomerID 相等，AND ORDER 点 Paid 等于 FALSE；GROUP BY CUSTOMER 点 CustomerID。题目说每位顾客，所以按 CustomerID 分组；FALSE 不加引号。 | Grouped two-table example query | 0.6 |
| C7_12 | C7 | 找错题。一个脚本要统计 2023 年 9 月 9 日有课的初级骑手人数。常见错误有四个：题目要求人数，SUM 应改为 COUNT；连接条件中每个字段前要加表名，即 STUDENT 点 StudentID 等于 LESSON 点 StudentID；所有条件都必须成立，OR 应改为 AND；文本值 Beginner 要加引号。 | Faulty script with four errors marked and corrected | 0.8 |
| C7_13 | C7 | 真题，2022 年夏季卷 11，第 4 题 c 小题第二问，3 分。老师用数据库 MARKS 存储学生的测验成绩，有三张表：STUDENT，TEST，STUDENT_TEST。编写 SQL 脚本，求测验 A7 中学生的平均分。 | Question s22_11 4(c)(ii); three table designs | 0.6 |
| C7_14 | C7 | 求平均用 AVG。分数 Mark 在 STUDENT_TEST 表中，测验编号 TestID 也在这张表中，所以只用一张表。脚本是：SELECT AVG Mark，FROM STUDENT_TEST，WHERE TestID 等于加引号的 A7，分号。 | Mark and TestID highlighted in STUDENT_TEST; script written | 0.6 |
| C7_15 | C7 | 评分三点，每点一分：AVG Mark；SELECT 和 FROM STUDENT_TEST；WHERE 子句。 | Mark scheme bullets ticked | 1.2 |
| C8_01 | C8 | 第八部分，数据维护。INSERT INTO 向表中添加新行；UPDATE 编辑表中的行；DELETE FROM 从表中删除行。 | Three commands | 0.6 |
| C8_02 | C8 | INSERT 中，值的顺序与表设计中字段的顺序相同。文本加引号，数字和 TRUE、FALSE 不加引号。由数字组成但存为文本的 ID，例如 002323，也要加引号。如果在表名后面列出字段名，值就按所列的顺序给出；没有为所有字段提供值时使用这种写法。 | Two INSERT forms; quotes highlighted | 0.6 |
| C8_03 | C8 | 例如：INSERT INTO CAR，VALUES，括号内依次是 123AA、Tiger、Lioness、10500、12BSTREET。其中 10500 是数字，不加引号，其余都是文本，加引号。 | INSERT INTO CAR example | 0.6 |
| C8_04 | C8 | 修改已有的行：UPDATE 表名，SET 字段等于新值，多个字段用逗号分隔，WHERE 条件选出要修改的行。例如 UPDATE CHARACTER，SET Level 等于 3，逗号，Money 等于 10000.00，WHERE CharacterID 等于加引号的 0002。 | UPDATE example | 0.6 |
| C8_05 | C8 | 删除行：DELETE FROM 表名，WHERE 条件。例如 DELETE FROM PLACEMENT，WHERE Complete 等于 TRUE。注意，DELETE FROM 不写 WHERE，会删除表中的所有行。 | DELETE example; warning | 0.6 |
| C8_06 | C8 | 真题，2022 年冬季卷 12，第 5 题 b 小题，3 分。数据库 GARDEN 中有 TREE 表，字段依次是 TreeID、ScientificName、MaxHeight、FastGrowing。编写 SQL 脚本，添加一条记录：TreeID 为 LOW_1276，ScientificName 为 Salix_Alba，MaxHeight 为 30.00，FastGrowing 为 TRUE。 | Question w22_12 5(b); TREE design and data table | 0.6 |
| C8_07 | C8 | TreeID 和 ScientificName 是文本，加引号；MaxHeight 是数字，FastGrowing 是布尔值，都不加引号。值的顺序与表设计一致。脚本是：INSERT INTO TREE，VALUES，括号内依次是 LOW_1276、Salix_Alba、30.00、TRUE，分号。也可以在 TREE 后面先列出四个字段名。 | Both options written | 0.6 |
| C8_08 | C8 | 评分三点，每点一分：INSERT INTO TREE；VALUES 括号和正确的值；值的顺序正确。 | Mark scheme bullets ticked | 1.0 |
| S999 |  | 第八章数据库的内容到此结束。 | End card | 1.5 |

Estimated length: 31.2 min (at 4.5 spoken characters per second).
