# 分镜：9618 第八章 Databases（C1–C8）

来源：`lessons/9618_ch8/lesson_plan_9618_ch8.md`，`script.json`，时间取自 `timeline.json`（全片 31 分 27 秒，116 段，30 fps）。
表中“时间”为该段开始至结束（含段后停顿），格式为 分:秒。“画面”一栏中，引号内的英文是屏幕上出现的原文，均取自课程计划；“说到……时”指该元素出现的时刻，制作时按该词在本段中的位置换算成时间。

## 一、总体设计

### 画面结构（1920×1080）

| 区域 | 位置 | 内容 |
|---|---|---|
| 顶栏 | y 0–72 | 左：“9618 Ch 8 Databases”；中：当前部分，例如“C2 Relational database terminology, keys and referential integrity”；右：部分进度点 C1–C8，当前部分实心 |
| 主区域 | y 72–910 | 本段讲解的图表、定义、代码 |
| 字幕带 | y 910–1080 | 旁白字幕 |

### 字幕

- 每段的 `say` 文本全部显示为字幕，内容与 `script.json` 一致（下划线等符号照原文显示）。
- 在中文标点（，。；：）处切分为字幕条，每条不超过一行（约 34 个汉字宽，英文按宽度计算）；超过一行的长英文句在单词边界处再切分。
- 每条字幕的显示时间按其字数占本段字数的比例，在本段开始至语音结束（`start` 至 `speech_end`）之间分配。段后停顿期间保留最后一条。
- 样式：浅色半透明底条，文字 40 px，深色，居中；英文部分使用同一字体，不加引号以外的标记。

### 外观（`assets/style/` 中没有参考图，以下由我选定）

| 用途 | 颜色 | 说明 |
|---|---|---|
| 背景 | #F7F5F0 | 浅米色 |
| 正文 | #1F2328 | 深灰 |
| 次要文字、占位格 | #8A8F98 / #E3DED3 | 未在课程计划中给出具体值的数据格，用浅灰条表示，不写任何值 |
| 主键 | #2F6F9F 蓝 | 主键字段蓝色并加下划线，全片一致 |
| 外键 | #D08A1E 橙 | 外键字段橙色，全片一致 |
| 得分点、正确 | #3F7F4A 绿 | 评分要点的勾、正确写法 |
| 错误 | #B03A2E 红 | 错误写法加删除线 |
| 强调底色 | #F2C14E（35% 透明度） | 当前讲到的字段或词 |

字体：中文和英文正文用 Noto Sans CJK SC；表结构、SQL、数据类型用 DejaVu Sans Mono。两种字体文件复制到视频文件夹内，页面不依赖网络。

### 反复出现的组件

- **部分标题卡**：每部分第一段开头约 2 秒，主区域中央显示“Cn”和英文部分名（课程计划 `name`），下方一行中文名，然后缩入顶栏。
- **表结构**：`TABLE(<u>Key</u>, Field, ...)`，等宽字体，主键蓝色下划线，外键橙色。
- **数据表**：网格，表头深色；课程计划给出的值照写，未给出的值用浅灰条。
- **SQL 代码块**：浅灰底，关键字加粗；逐行出现时，与旁白读到的子句同步。
- **E-R 图**：圆角方框写表名；“多”端为鸦脚（三条短线），“一”端为单线。
- **真题卡**：左上角标签“真题”，其后为题号与分值（例如“w23_11 3(b) [3]”），下面是英文题干（课程计划原文）。
- **评分卡**：标题“Mark scheme”，列出课程计划中的评分要点；得分的要点在旁白提到时打绿色勾。
- **答题格式框**：细边框，左上角标签“答题格式”。

## 二、分段

### 片头

| 段 | 时间 | 画面 |
|---|---|---|
| S000 | 0:00.6–0:20.3 | 大标题“9618 Chapter 8 Databases”，副标题“第八章 数据库”。说到“内容分为八个部分”时，下方逐行出现 C1–C8：每行为英文部分名（课程计划 `name`）加中文短名（文件方式的局限 / 术语和键 / 关系与 E-R 图 / 规范化 / DBMS 的功能 / SQL 的数据定义 / SQL 查询 / 数据维护），与旁白列举同步。说到“真题”时底部出现“每部分最后：一道真题”。 |

### C1 Limitations of a file-based approach and how a relational database overcomes them

| 段 | 时间 | 画面 |
|---|---|---|
| C1_01 | 0:20.3–0:38.5 | 部分标题卡。随后：左侧“Payroll program”方框，箭头指向“Payroll file”，文件内画一条记录（6 个字段格）；右侧“Sales program”方框，箭头指向“Sales file”，同样一条记录。字段格中只标出 StaffName 和 StaffNumber，其余为浅灰格。Payroll 记录中 StaffName 在第 1 格、StaffNumber 在第 5 格；Sales 记录中 StaffName 在第 1 格、StaffNumber 在第 2 格。说到“在两个文件中都有存储”时，两文件的 StaffName、StaffNumber 格加强调底色。 |
| C1_02 | 0:38.5–0:51.7 | 两文件中相同字段之间画连线，标“data redundancy 数据冗余”。下方出现局限框 1：“There is more data redundancy, because the same data is stored many times in the separate files used by different applications, so storage space is wasted.”名称部分（There is more data redundancy）加粗，because 之后为常规字重。 |
| C1_03 | 0:51.7–1:15.4 | 两个 StaffName 格旁标注“格式不同”。说到“修改了某位员工的编号”时，Payroll 的 StaffNumber 格闪烁并标“已更新”，Sales 的 StaffNumber 格标“未更新”，两格之间出现红色“≠”。标“data inconsistency 数据不一致”。下方出现局限框 2：“There is more data inconsistency // worse data integrity, because duplicated data might be stored differently // when data is updated in one place, it is not updated everywhere.” |
| C1_04 | 1:15.4–1:34.4 | 两条记录上方标字段序号 1–6；Payroll 的第 5 格、Sales 的第 2 格（StaffNumber）强调。说到“数据结构一旦改变”时，一条记录的字段格调换位置，两个程序方框变红并标“must be rewritten”。下方出现局限框 3：“There is program-data dependence, because any change to the structure of the data means the programs that access that data have to be re-written.” |
| C1_05 | 1:34.4–1:44.1 | 上方示意图移除。局限 1–3 缩为只有名称的列表，其下依次加入局限 4：“It is not easy to perform complex searches / queries, because a new program has to be written each time.”和局限 5：“There could be a lack of privacy, as user views cannot easily be implemented.” |
| C1_06 | 1:44.1–1:59.7 | 两条定义：“A database is a structured collection of items of data that can be accessed by different application programs.”“A relational database stores data in separate tables that are linked to each other by keys.”下方画两张相连的表：STUDENT(<u>StudentID</u>, ..., ClassID) 与 CLASS(<u>ClassID</u>, TeacherName, Location)，ClassID 之间连线。 |
| C1_07 | 1:59.7–2:10.8 | 两栏对照，左栏标题“File-based limitation”，右栏“Relational database advantage”。第 1 行：左“data redundancy”，右“Data redundancy is reduced, because linked tables mean that each data item is stored only once.” |
| C1_08 | 2:10.8–2:24.4 | 第 2 行：左“data inconsistency”，右“Data consistency is maintained // data integrity is improved, because data stored only once only needs to be updated once // linked data cannot be entered differently in two tables // referential integrity can be enforced.”与旁白同步依次出现三个原因。（课程计划原文的节选：省略了旁白没有提到的“changes in one table will automatically update in another”。） |
| C1_09 | 2:24.4–2:36.4 | 第 3 行：左“program-data dependence”，右“There is program-data independence, because the data is separate from the software, so changes to the structure of the data are managed by the DBMS and do not require programs to be re-written; queries are not dependent on the structure of the data.” |
| C1_10 | 2:36.4–2:48.5 | 第 4–6 行：“complex searches” 对 “Complex queries are easier to run.”；“lack of privacy” 对 “Different views can be provided, so users can only see specific aspects of the database.”；第 6 行左栏空，右栏 “Multiple concurrent access is possible, through record locking.” |
| C1_11 | 2:48.5–3:01.8 | 答题格式框：“[name] because [reason]”，下方箭头标“1 mark + 1 mark”。以局限 1 为例：名称部分下方标“1 mark”，because 部分下方标“1 mark”。 |
| C1_12 | 3:01.8–3:14.8 | 真题卡“w23_11 3(b) [3]”：“A shop manager has designed a relational database to store customer orders. Identify three advantages of a relational database compared to a file-based approach.” |
| C1_13 | 3:14.8–3:32.9 | 题干中“Identify”加强调，旁标“只写名称，每点 1 分，最多 3 分”。评分卡列出 5 点：Reduced data redundancy / Improved data integrity / consistency / referential integrity / Allows for views / improved privacy / Allows for program-data independence / Complex queries can be executed。说到前三个答案时，第 1、2、4 点依次打勾；说到“同样得分”时，第 3、5 点显示浅绿勾。 |

### C2 Relational database terminology, keys and referential integrity

| 段 | 时间 | 画面 |
|---|---|---|
| C2_01 | 3:32.9–3:48.9 | 部分标题卡。定义：“Entity: an object about which data can be stored, for example a person, place, event or thing; a real-life object that is represented as a table.”下方四个标签 person / place / event / thing，然后箭头“entity → table”。 |
| C2_02 | 3:48.9–4:02.1 | 画 CUSTOMER 表网格：表头 CustomerID、FirstName、LastName，3 行浅灰占位。说到“每一行”时一行加框，标“one instance of an entity”；说到“每一列”时一列加框，标“attribute”。定义：“Table: a group of similar data, in a database, with rows for each instance of an entity and columns for each attribute.”“Attribute: an individual data item stored about an entity, for example a customer's date of birth.” |
| C2_03 | 4:02.1–4:10.8 | 同一表：列框旁标“field”，行框旁标“record / tuple”。 |
| C2_04 | 4:10.8–4:23.0 | 网格上移缩小，下方写出表结构 CUSTOMER(<u>CustomerID</u>, FirstName, LastName)，说到“带下划线”时主键下划线从左向右画出（蓝色）。 |
| C2_05 | 4:23.0–4:39.8 | 定义：“Primary key: the unique attribute / combination of attributes used to identify the record / tuple.”“Candidate key: an attribute or smallest set of attributes in a table where no tuple has the same value // an attribute that could be a primary key.”说到“被选中的那个候选键”时，出现示意：候选键集合中一个被选出，标“primary key”。 |
| C2_06 | 4:39.8–5:00.1 | 表结构 ELEMENTS(Symbol, Name, AtomicWeight)，三个属性下方都标“candidate key”。说到“选择 Symbol 作为主键”时，Symbol 变蓝加下划线；Name、AtomicWeight 改标“secondary key”。最后一行：“Most tables have only one candidate key, and it becomes the primary key.” |
| C2_07 | 5:00.1–5:22.6 | FILM_ACTOR 网格两列 ActorID、FilmID，4 行示意值：A1/F1、A1/F2、A2/F1、A2/F3（示意值，课程计划中无具体值）。说到“ActorID 和 FilmID 单独都不唯一”时，A1 的两行、F1 的两行分别加强调；说到“这一对值是唯一的”时，每行整体加框。表结构 FILM_ACTOR(<u>ActorID</u>, <u>FilmID</u>)，标“composite primary key”。 |
| C2_08 | 5:22.6–5:43.1 | 定义：“Foreign key: a field in one table that is linked to the primary key in another table.”方法三步依次出现（课程计划 C2 Method 1–3）。示例：SHOP(<u>ShopID</u>, ManagerID, ...) 与 MANAGER(<u>ManagerID</u>, ...)，SHOP 中 ManagerID 橙色，箭头指向 MANAGER 中的蓝色 ManagerID。 |
| C2_09 | 5:43.1–6:00.4 | 两个网格：STUDENT(StudentID, ..., ClassID) 与 CLASS(ClassID, TeacherName, Location)。CLASS 中有 7A、7B 两行（其余格浅灰）。STUDENT 中一行的 ClassID 为 7D。说到“没有 7D 班”时，从 7D 引出的箭头在 CLASS 中找不到对应行，箭头末端为红色“?”，TeacherName、Location 处显示“—”。 |
| C2_10 | 6:00.4–6:20.2 | 标题“Referential integrity”。依次出现三条：“ensures that every foreign key has a corresponding primary key // a foreign key value cannot refer to data that does not exist”；“stops orphaned records, which are records that point to an entry in another table that no longer exists”；“makes sure that if data is changed in one place the change is reflected in all related records (cascading update / delete)”。 |
| C2_11 | 6:20.2–6:35.9 | 定义：“Data integrity: methods of making sure the data is consistent, for example enforcing referential integrity, cascading update / delete, and validation / verification rules.”“Index: a data structure built from one or more columns in a table to speed up searching for data.” |
| C2_12 | 6:35.9–6:50.2 | 答题格式框：“Foreign key: a field in one table that is linked to a primary key in another table, e.g. CustomerID in the table RENTAL”。定义部分标“定义”，“e.g. CustomerID in the table RENTAL”加强调并标“本数据库中的例子”。 |
| C2_13 | 6:50.2–7:05.1 | 真题卡“w21_11 5(a), w21_13 5(a) [2]”，题干（课程计划原文前三句）。三个表结构：SHOP(<u>ShopID</u>, ManagerID, Address, Town, TelephoneNumber)；MANAGER(<u>ManagerID</u>, FirstName, LastName, DateOfBirth, Wage)；CAR(<u>RegistrationNumber</u>, Make, Model, NumberOfMiles, ShopID)。右侧空白勾选表：Table / Field name / Primary Key (PK) / Foreign Key (FK)，4 行。此段中外键暂不着色。 |
| C2_14 | 7:05.1–7:14.6 | MANAGER 的 ManagerID 下划线加强调 → 第 1 行 PK 打勾。SHOP 中 ManagerID 变橙，箭头指向 MANAGER → 第 2 行 FK 打勾。 |
| C2_15 | 7:14.6–7:27.1 | CAR 的 RegistrationNumber 加强调 → 第 3 行 PK 打勾。CAR 中 ShopID 变橙，箭头指向 SHOP → 第 4 行 FK 打勾。评分规则：“1 mark for 2 or 3 correct ticks, 2 marks for 4 correct ticks”。 |

### C3 Relationships and E-R diagrams

| 段 | 时间 | 画面 |
|---|---|---|
| C3_01 | 7:27.1–7:40.9 | 部分标题卡。定义：“A relationship is formed when one table in a database has a foreign key that refers to a primary key in another table.”四个标签依次出现：1:1、1:M、M:1、M:M。 |
| C3_02 | 7:40.9–7:55.6 | STUDENT 网格（StudentID 浅灰，ClassID 列：7A、7A、7A、7B）与 CLASS 网格（ClassID：7A、7B）。说到“出现多次”时，STUDENT 中三个 7A 加强调并连线到 CLASS 中唯一的 7A。下方：“CLASS 1 : M STUDENT”，再出现“STUDENT M : 1 CLASS”。 |
| C3_03 | 7:55.6–8:04.8 | 陈述：“A one-to-many relationship is implemented by the primary key in the table on the "one" side being a foreign key in the table on the "many" side.”下方中文结论框：“含有外键的表 = 多的一方”。 |
| C3_04 | 8:04.8–8:20.3 | EMPLOYEE(<u>EmployeeID</u>, ...) 与 LOGIN_DATA(..., EmployeeID)，EmployeeID 在 LOGIN_DATA 中为橙色，箭头连接。LOGIN_DATA 网格中 EmployeeID 列为 E1、E2、E3（示意值），每个只出现一次。E-R：EMPLOYEE 1 — 1 LOGIN_DATA（两端单线）。 |
| C3_05 | 8:20.3–8:35.9 | STUDENT 一行的 ClassID 格放大：格内只有一个值，箭头指向 CLASS 的一行。说到“每一行都需要保存多个值”时，该格内出现两个值并被红色删除线划掉，标“repeating group 重复组”。 |
| C3_06 | 8:35.9–8:58.5 | ACTOR 与 FILM 两个方框之间一条两端鸦脚的线（M:M），说到“不能直接实现”时打红叉。中间插入 FILM_ACTOR 方框，内写 FILM_ACTOR(<u>ActorID</u>, <u>FilmID</u>)，两个字段同时为蓝色下划线和橙色外框（主键兼外键），标“linking table”。原线替换为两条 1:M 线，鸦脚都在 FILM_ACTOR 一端。 |
| C3_07 | 8:58.5–9:15.4 | E-R 图画法说明：两个方框（表名），一条线；说到“鸦脚”时，“多”端画出三条短线并标“many”；“一”端标“one”。 |
| C3_08 | 9:15.4–9:27.2 | 四种端点记号并排：zero or one、zero or many（optional）；exactly one、one or many（mandatory）。下方：“type + optional / mandatory = cardinality”。 |
| C3_09 | 9:27.2–9:54.9 | 方法五步依次出现（课程计划 C3 Method 1–5 的英文原文），每步出现时与旁白同步。 |
| C3_10 | 9:54.9–10:10.1 | 左侧五个表结构：CUSTOMER(<u>CustomerID</u>, ...)；SHOP_ORDER(<u>OrderNo</u>, CustomerID, OrderDate)；ITEM(<u>ItemNumber</u>, SupplierID, ...)；SUPPLIER(<u>SupplierID</u>, ...)；ORDER_ITEM(<u>ItemNumber</u>, <u>OrderNo</u>, Quantity)。右侧五个方框。说到 CustomerID 时，SHOP_ORDER 中 CustomerID 变橙，画 CUSTOMER — SHOP_ORDER 线，鸦脚在 SHOP_ORDER；说到 SupplierID 时同理画 SUPPLIER — ITEM。 |
| C3_11 | 10:10.1–10:26.1 | ORDER_ITEM 中 ItemNumber、OrderNo 变橙（保留蓝色下划线），方框标“linking table”。画 SHOP_ORDER — ORDER_ITEM、ORDER_ITEM — ITEM 两条线，鸦脚都在 ORDER_ITEM。最后在 SHOP_ORDER 与 ITEM 之间出现虚线标注“M:M, implemented by ORDER_ITEM”。 |
| C3_12 | 10:26.1–10:38.1 | 三栏：one-to-one：customer – payment details // customer – login details；one-to-many：customer – order；many-to-many：order – product // customer – product。随旁白依次出现。 |
| C3_13 | 10:38.1–10:55.2 | 答题格式框，两点：1. type, in both directions：“one member of staff can have many devices; each device can only be with one member of staff”；2. keys：“the primary key StaffID in STAFF links to the foreign key StaffID in DEVICE”。 |
| C3_14 | 10:55.2–11:09.7 | 真题卡“w25_12 4(a) [2]”，题干原文；两个表结构：CONTAINER(<u>ContainerID</u>, Type, Weight, OwnerName, ShipID)；SHIP(<u>ShipID</u>, Type, Capacity, ShipName)。 |
| C3_15 | 11:09.7–11:30.4 | CONTAINER 中 ShipID 变橙，SHIP 中 ShipID 蓝色加强调，箭头连接。E-R：SHIP — CONTAINER，鸦脚在 CONTAINER，标 1 和 M。评分卡两点：“The relationship between SHIP and CONTAINER is one-to-many (1:M)”；“The primary key ShipID in the SHIP table is linked to the foreign key ShipID in the CONTAINER table”，随旁白打勾，旁标“1 mark each”。 |

### C4 Normalisation to 3NF

| 段 | 时间 | 画面 |
|---|---|---|
| C4_01 | 11:30.4–11:46.5 | 部分标题卡。一张宽表网格，表头：StudentID、FirstName、SecondName、ClassID、Location、TeacherName、LicenceNumber、Address、TeacherDateOfBirth。4 行：学生信息格浅灰；TeacherName 列各行为“Mr Khan”或浅灰，ClassID 列有 7B。说到“必须同时写入”时，Location 至 TeacherDateOfBirth 这五列加强调。 |
| C4_02 | 11:46.5–12:04.9 | 说到 Khan 老师时，所有“Mr Khan”行加红框，标“every record must be changed”。说到 7B 班时，ClassID 为 7B 的行淡出，旁标“details about class 7B are lost”。底部结论：“data about one entity (a teacher or a class) is stored in rows about another entity (a student)”。 |
| C4_03 | 12:04.9–12:14.3 | 定义：“Normalisation: the process of organising data to be stored in a database into two or more tables and relationships between the tables, so that data redundancy is minimised.” |
| C4_04 | 12:14.3–12:37.8 | 三层阶梯，从下到上 1NF、2NF、3NF，每层写定义（课程计划原文），随旁白逐层出现。 |
| C4_05 | 12:37.8–12:57.7 | 0NF → 1NF → 2NF → 3NF 三个箭头，分别标“remove any repeating groups of attributes”“remove any partial key dependencies”“remove any non-key dependencies”。底部：“the key, the whole key and nothing but the key”。 |
| C4_06 | 12:57.7–13:10.5 | 两条注意：“A partial dependency can only exist when the primary key is composite. A table in 1NF whose primary key is a single attribute is already in 2NF.”“A normalised database has no many-to-many relationships.” |
| C4_07 | 13:10.5–13:25.4 | 0NF 表结构（课程计划原文，分三行排）：STUDENT(<u>StudentID</u>, FirstName, SecondName, DateOfBirth, SubjectName, SubjectTeacher, SubjectName, SubjectTeacher, SubjectName, SubjectTeacher, ClassID, Location, TeacherName, LicenceNumber, Address, TeacherDateOfBirth)。说到“重复出现了三次”时，三组 SubjectName, SubjectTeacher 加强调并标 ×3。左上角阶段标签“0NF”。 |
| C4_08 | 13:25.4–13:41.9 | 阶段标签变为“1NF”。三组重复字段合并为一组移出，与 StudentID 一起组成新表 STUDENTSUBJECT(<u>StudentID</u>, <u>SubjectName</u>, SubjectTeacher)，StudentID 同时标橙（外键）。原表变为 STUDENT(<u>StudentID</u>, FirstName, SecondName, DateOfBirth, ClassID, Location, TeacherName, LicenceNumber, Address, TeacherDateOfBirth)。说到“复合主键”时两个主键下划线画出。 |
| C4_09 | 13:41.9–14:00.3 | 阶段标签“2NF”。STUDENTSUBJECT 中画依赖箭头 SubjectName → SubjectTeacher，StudentID 与 SubjectTeacher 之间标“no dependency”，标“partial dependency”。SubjectTeacher 移出到 SUBJECT(<u>SubjectName</u>, SubjectTeacher)，STUDENTSUBJECT 变为 STUDENTSUBJECT(<u>StudentID</u>, <u>SubjectName</u>)。 |
| C4_10 | 14:00.3–14:14.2 | 阶段标签“3NF”。STUDENT 表结构中画依赖：ClassID → Location, TeacherName；teacher → LicenceNumber, Address, TeacherDateOfBirth（用括号把这三项框住，标“depend on the teacher”）。 |
| C4_11 | 14:14.2–14:30.9 | 两组字段移出：CLASS(<u>ClassID</u>, Location, LicenceNumber)；TEACHER(<u>LicenceNumber</u>, TeacherName, Address, TeacherDateOfBirth)。STUDENT 中 ClassID 变橙；CLASS 中 LicenceNumber 变橙。说到“老师姓名可能重复”时，旁标“Teacher names might not be unique → LicenceNumber”。说到“存放在同一张 TEACHER 表中”时，SUBJECT 中 SubjectTeacher 替换为橙色 LicenceNumber，箭头指向 TEACHER。 |
| C4_12 | 14:30.9–14:47.5 | 最终五张表（课程计划 Method 第 4 步原文）排成两列，外键橙色，主键蓝色下划线。右侧检查清单三条，随旁白依次打勾：every table has an underlined primary key / every foreign key matches the primary key of another table / every original attribute appears in exactly one table, except keys used to link tables。 |
| C4_13 | 14:47.5–15:01.8 | 标题“Justify 3NF”。四点依次出现：no repeating groups of attributes；each field is fully dependent on the primary key of its table, e.g. “all fields in CUSTOMER are fully dependent on CustomerID”；no non-key dependencies；no many-to-many relationships。 |
| C4_14 | 15:01.8–15:13.4 | 标题“Put a table into 1NF”。三点：identify the repeating groups of attributes (name them)；ensure each field is atomic；identify the primary key。说到 StudentName 时，一个“StudentName”格分成“FirstName”“LastName”两格。 |
| C4_15 | 15:13.4–15:38.1 | 标题“Design a 3NF database from a description”。两步（课程计划 Method 第 1、2 步原文），说到“名字或标题不适合作为主键”时该句加强调。 |
| C4_16 | 15:38.1–15:56.0 | 三个表结构：USER(<u>Username</u>, Email, DateOfBirth, Rating)；QUIZ(<u>QuizID</u>, Date, Filename)；USER_QUIZ(<u>Username</u>, <u>QuizID</u>, Score)。E-R：USER — USER_QUIZ — QUIZ，鸦脚都在 USER_QUIZ。说到“分数属于用户与测验这一对”时，Score 加强调。 |
| C4_17 | 15:56.0–16:21.9 | 真题卡“s23_13 4(c) [4]”，题干原文；两个未规范化表结构（无下划线）：BOOKING (CarRegistration, StartDate, EndDate, CarModel, CarColour, CustomerFirstName)；CUSTOMER (CustomerFirstName, CustomerLastName, EmailAddress, TelephoneNumber)。随旁白读到的字段名依次加强调。 |
| C4_18 | 16:21.9–16:38.5 | BOOKING 中 CarModel、CarColour 画箭头指向 CarRegistration，标“describe the car”。这三项移出组成 CAR (<u>CarRegistration</u>, CarModel, CarColour)。说到“名字不适合作为主键”时，CustomerFirstName 旁标红色“✗ primary key”，CUSTOMER 前面加入蓝色下划线的新字段 CustomerID（标“new”）。 |
| C4_19 | 16:38.5–16:46.1 | BOOKING 改为 BOOKING (<u>BookingID</u>, CarRegistration, CustomerID, StartDate, EndDate)，CarRegistration、CustomerID 橙色，分别有箭头指向 CAR、CUSTOMER。三张表为课程计划“Example answer”原文。 |
| C4_20 | 16:46.1–17:02.0 | 评分卡四点（课程计划原文），旁标“1 mark each”，随旁白依次打勾；每打一勾，答案中对应部分短暂加强调（三张表名 / 三个主键 / 两个外键 / 全部原字段）。 |

### C5 DBMS features and software tools

| 段 | 时间 | 画面 |
|---|---|---|
| C5_01 | 17:02.0–17:17.6 | 部分标题卡。定义：“Database management system (DBMS): systems software for the definition, creation and manipulation of a database.”下方四个标签：entry、storage、alteration、deletion，标“managed by the DBMS”。 |
| C5_02 | 17:17.6–17:31.3 | 标题“Data dictionary”，作用：“it stores metadata about the database // data about the data in the database // data about the structure of the database. It identifies the characteristics of the data that will be stored.” |
| C5_03 | 17:31.3–17:49.4 | 内容清单九项依次出现：table names; field / attribute names; data types; validation rules; primary keys; foreign keys; relationships; views; indexes。说到“注意两点”时出现两条提示：已给出的项不能再写；“Metadata”加红色删除线，标“not accepted as an item”。 |
| C5_04 | 17:49.4–18:01.2 | 流程图：左“Data dictionary”方框，内列 tables、attributes、relationships、validation rules → 中“DBMS”方框 → 右“each entry”被检查（勾）→ 结果“accurate, complete, consistent”。 |
| C5_05 | 18:01.2–18:10.5 | 定义：“Data modelling: the analysis and definition of the data structures required in a database, to produce a data model.”下方一个小 E-R 图，标“E-R diagram = a data model”。 |
| C5_06 | 18:10.5–18:27.3 | 标题“Logical schema”，三点：“a data model for a specific database that is independent of the DBMS used to build that database // a model of a database that is not specific to one DBMS”；“the overview / conceptual design of the database structure; it models the problem by using methods such as an E-R diagram”；“it is used to design the physical structure”。 |
| C5_07 | 18:27.3–18:35.5 | 标题“DBMS and data integrity”，四个标签：validation；enforcing referential integrity；cascade update / delete；ensuring the database is normalised。 |
| C5_08 | 18:35.5–18:59.3 | 两栏表“Method / How it protects the data”。第 1 行 Authentication (usernames and passwords, biometrics, two-factor authentication) / prevents unauthorised access to the data。第 2 行 Access rights (read only, read / write, full access, no access) / only those with the correct permissions can read or edit the data。 |
| C5_09 | 18:59.3–19:22.8 | 同一表继续：Views / users only see what they need to see, e.g. managers can only see the data for their own shop(s)；Backup / recovery / copies taken automatically on a regular basis and stored off site, so the data can be recovered if lost；Record and table locking / prevents simultaneous access to data, so updates are not lost；Encryption / data turned into ciphertext, cannot be understood without the decryption key。 |
| C5_10 | 19:22.8–19:44.7 | 定义：“Developer interface: a software tool that allows the user to create items such as tables, forms and reports.”三组功能依次出现：tables（create / modify / delete tables and other database objects; set up / modify relationships）；forms（create a form for data input; add drop-down boxes and buttons）；reports（design a report to show the output in an organised manner; add a menu to choose different actions / run different queries）。 |
| C5_11 | 19:44.7–20:03.5 | 定义：“Query processor: software that processes and executes queries written in SQL.”流程图两行：DDL statement → DDL interpreter → data dictionary；DML statement → DML compiler（标“optimises”）→ low-level instructions → query evaluation engine。随旁白逐个方框出现。 |
| C5_12 | 20:03.5–20:20.2 | 真题卡“s23_12 2(a) [4]”，题干原文。两栏表 Name / Description，四行：Data dictionary / 空；Query processor / 空；空 / “A model of a database that is not specific to one DBMS.”；空 / “A software tool that allows the user to create items such as tables, forms and reports.” |
| C5_13 | 20:20.2–20:30.2 | 第 1 行描述填入“Data about the data in the database // metadata for a database”，第 2 行填入“Software that processes and executes queries written in SQL”，绿色。 |
| C5_14 | 20:30.2–20:44.2 | 第 3 行名称填入“Logical schema”，第 4 行填入“Developer interface”，绿色。旁标“1 mark for each correct feature or description”。 |

### C6 SQL as a DDL

| 段 | 时间 | 画面 |
|---|---|---|
| C6_01 | 20:44.2–21:13.8 | 部分标题卡。两栏：DDL（定义原文，下标“structure”）与 DML（定义原文，下标“data”）。下方横跨两栏：“SQL: the industry standard language used for both”。 |
| C6_02 | 21:13.8–21:25.9 | 五条命令（等宽字体）与说明：CREATE DATABASE / CREATE TABLE / ALTER TABLE / PRIMARY KEY / FOREIGN KEY ... REFERENCES ...，随旁白逐条出现。 |
| C6_03 | 21:25.9–21:47.3 | 数据类型表：CHARACTER (CHAR) fixed length text；VARCHAR(n) variable length text；BOOLEAN True or False；INTEGER (INT) whole number；REAL number with decimal places（旁注 FLOAT, CURRENCY also accepted）；DATE YYYY-MM-DD；TIME HH:MM:SS。最后一行单独：“NOT NULL: the field must contain a value (primary key fields and other required fields)”。 |
| C6_04 | 21:47.3–22:09.4 | 样例值 → 类型：ST23-56, 15B5L → VARCHAR；00956124, 0001 → VARCHAR（开头的 0 加强调）；Bedrooms, Quantity, Level → INTEGER；1000.00, 2.20 → REAL；TRUE / FALSE → BOOLEAN；dates → DATE，times → TIME。 |
| C6_05 | 22:09.4–22:13.6 | 代码：`CREATE DATABASE SHOPORDERS;` |
| C6_06 | 22:13.6–22:44.4 | 左侧五步（课程计划原文），右侧空模板：`CREATE TABLE name(` / `  Field TYPE NOT NULL,` / `  PRIMARY KEY(Field),` / `  FOREIGN KEY(Field) REFERENCES TABLE(Field));` 每说一步，模板中对应行加强调。 |
| C6_07 | 22:44.4–23:07.7 | 样例数据小表：StudentID 12 / TestID A1 / Mark 50，下方标类型 INTEGER / VARCHAR / INTEGER。右侧代码逐行出现（课程计划原文）：CREATE TABLE STUDENT_TEST( … FOREIGN KEY(StudentID) REFERENCES STUDENT(StudentID));。PRIMARY KEY 行中两字段蓝色，FOREIGN KEY 行中字段橙色。 |
| C6_08 | 23:07.7–23:20.6 | 代码：`ALTER TABLE CAMERA_DATA` / `ADD NumberStored INTEGER, LastUsed DATE;`，说到“逗号”时逗号加强调。 |
| C6_09 | 23:20.6–23:28.5 | 代码：`ALTER TABLE EVENT` / `ADD FOREIGN KEY(PlayerID) REFERENCES PLAYER(PlayerID);` |
| C6_10 | 23:28.5–23:53.1 | 两栏表“Error / Correction”，七行随旁白出现：CREATE DATA BASE → CREATE DATABASE SCHOOLDATA;；NONULL → NOT NULL；missing comma → each field line except the last ends with a comma；PRIMARY KEY CharacterID → PRIMARY KEY(CharacterID)；FOREIGN KEY(PlayerID) → FOREIGN KEY(PlayerID) REFERENCES PLAYER(PlayerID)；TheLevel INT → Level INT；00123 as INT → VARCHAR。错误一栏红色删除线。 |
| C6_11 | 23:53.1–24:10.0 | 真题卡“s24_12 4(b) [3]”，题干原文；表结构 EXAM(<u>ExamID</u>, Subject, Level, TotalMarks)、EXAM_QUESTION(<u>ExamQuestionID</u>, ExamID, QuestionNumber, Question, MaxMark)；样例数据表六行（课程计划原文）。 |
| C6_12 | 24:10.0–24:27.7 | 样例数据表每列下方标类型：ExamID → VARCHAR + NOT NULL（00956124 开头的 00 加强调）；Subject → VARCHAR；Level → INT（2、3 加强调）；TotalMarks → INT（75、120 加强调）。 |
| C6_13 | 24:27.7–24:41.3 | 代码逐行出现（课程计划例子，分行排）：`CREATE TABLE EXAM(` / `  ExamID varchar NOT NULL,` / `  Subject varchar,` / `  Level int,` / `  TotalMarks int,` / `  PRIMARY KEY(ExamID));` |
| C6_14 | 24:41.3–24:51.5 | 评分卡三点（课程计划原文），随旁白打勾；每勾对应代码部分加强调（括号 / 类型与逗号 / PRIMARY KEY 行）。 |

### C7 SQL as a DML: queries

| 段 | 时间 | 画面 |
|---|---|---|
| C7_01 | 24:51.5–25:08.4 | 部分标题卡。四条：SELECT ... FROM ...（fetches data; queries always begin with SELECT）；WHERE（only rows that match a condition）；ORDER BY（ASC default, DESC descending）。 |
| C7_02 | 25:08.4–25:21.6 | 题意一行：“first and second names of all students in class 7A, in alphabetical order of second name”。代码逐子句出现：`SELECT FirstName, SecondName` / `FROM STUDENT` / `WHERE ClassID = '7A'` / `ORDER BY SecondName;`。说到“要加引号”时 '7A' 的引号加强调。 |
| C7_03 | 25:21.6–25:37.6 | 四行示例：`TestID = "A7"`（text: quotes）；`Paid = FALSE`（number / TRUE / FALSE: no quotes）；`#01/01/2023#`（date）；`DateSent >= #01/01/2023# AND DateSent <= #31/12/2023#`，旁注 “or BETWEEN”。 |
| C7_04 | 25:37.6–25:56.7 | `WHERE CameraID LIKE 'CAN%'`，% 加强调，标“starts with CAN”。下方 AND：both true；OR：at least one true。示例：`WHERE HorseLevel = "Intermediate" OR HorseLevel = "Beginner"`。 |
| C7_05 | 25:56.7–26:17.5 | 三行：SUM（sum of all values in the column）/ COUNT（number of rows where the column is not NULL）/ AVG（average of a numeric column）。对应：“total → SUM”“number of → COUNT”“average → AVG”。下方 `COUNT(OrderID) AS NotCollected`，AS 加强调，旁注“appropriate title / suitable field name → 1 mark for AS”。 |
| C7_06 | 26:17.5–26:28.4 | 代码：`SELECT COUNT(RegistrationNumber) FROM CAR GROUP BY ShopID;`。示意：CAR 的行按 ShopID 分成三组（颜色区分，值用浅灰），每组右侧出现一个结果格，标“one result for each group”。 |
| C7_07 | 26:28.4–26:41.5 | 两张小表（各两行，用颜色表示键值）。先画出全部四种行组合，标“every row × every row”；说到“连接条件”时，不匹配的两种组合淡出，保留的两对标“foreign key = primary key”。 |
| C7_08 | 26:41.5–27:10.8 | 两栏代码：`FROM T1, T2 WHERE T1.Key = T2.Key AND <other conditions>`；`FROM T1 INNER JOIN T2 ON T1.Key = T2.Key WHERE <other conditions>`。中间标“use one, not a mix of both”。下方：“join condition: primary key = foreign key”；`CUSTOMER.CustomerID`，表名部分加强调。 |
| C7_09 | 27:10.8–27:43.9 | 六步（课程计划 Method 原文），逐条出现；第 4 步中“for each / each”加强调。 |
| C7_10 | 27:43.9–28:02.2 | 题意：“the number of containers for the ship with the name Caledonia”。上方小字表结构：CONTAINER(…, ShipID)、SHIP(<u>ShipID</u>, …, ShipName)，ShipName 和 ContainerID 加强调。代码逐行：`SELECT COUNT(ContainerID)` / `FROM CONTAINER INNER JOIN SHIP` / `ON CONTAINER.ShipID = SHIP.ShipID` / `WHERE ShipName = "Caledonia";` |
| C7_11 | 28:02.2–28:24.5 | 题意：“the customer ID, name and total cost of each customer's unpaid orders”。代码逐行（课程计划原文，至 `GROUP BY CUSTOMER.CustomerID;`）。说到“按 CustomerID 分组”时，题意中的“each customer”与 GROUP BY 行同时加强调；说到“FALSE 不加引号”时 FALSE 加强调。 |
| C7_12 | 28:24.5–28:46.2 | 题意：“count beginner riders with a lesson on 09/09/2023”。两栏表“Error / Correction”，四行随旁白出现：SUM → COUNT（number of riders）；field without table name → `WHERE STUDENT.StudentID = LESSON.StudentID`；OR → AND（all conditions must be true）；Beginner without quotes → `STUDENT.RiderLevel = "Beginner"`。（课程计划未给出完整错误脚本，只显示这四处。） |
| C7_13 | 28:46.2–29:02.3 | 真题卡“s22_11 4(c)(ii) [3]”，题干原文；表结构 STUDENT(<u>StudentID</u>, FirstName, LastName)、TEST(<u>TestID</u>, Description, TotalMarks)、STUDENT_TEST(<u>StudentID</u>, <u>TestID</u>, Mark)。 |
| C7_14 | 29:02.3–29:16.5 | “average”→ AVG。STUDENT_TEST 中 Mark、TestID 加强调，标“one table”。代码逐行：`SELECT AVG(Mark)` / `FROM STUDENT_TEST` / `WHERE TestID = "A7";` |
| C7_15 | 29:16.5–29:22.8 | 评分卡三点：AVG(Mark) / SELECT and FROM STUDENT_TEST / WHERE clause，随旁白打勾，代码对应部分加强调。 |

### C8 SQL as a DML: maintenance (INSERT, UPDATE, DELETE)

| 段 | 时间 | 画面 |
|---|---|---|
| C8_01 | 29:22.8–29:31.2 | 部分标题卡。三条：INSERT INTO（adds new row(s)）；UPDATE（edits row(s)）；DELETE FROM（removes row(s)）。 |
| C8_02 | 29:31.2–29:52.5 | 规则：“values in the same order as the fields in the table design”；text in quotes，numbers and TRUE / FALSE without。第二种写法：`INSERT INTO PRODUCT (ProductID, ProductName, QuantityInBox, Cost, SupplierID)` / `VALUES ("002323", "Blue ball point 2 mm", 50, 5.00, "SFX223");`，"002323" 的引号加强调；字段名列表与值之间用细线一一对应。 |
| C8_03 | 29:52.5–30:06.1 | 代码：`INSERT INTO CAR` / `VALUES ("123AA", "Tiger", "Lioness", 10500, "12BSTREET");`。10500 下标“number: no quotes”，其余值下标“text”。 |
| C8_04 | 30:06.1–30:21.8 | 代码逐行：`UPDATE CHARACTER` / `SET Level = 3, Money = 10000.00` / `WHERE CharacterID = "0002";`，逗号加强调。 |
| C8_05 | 30:21.8–30:32.2 | 代码：`DELETE FROM PLACEMENT` / `WHERE Complete = TRUE;`。说到“不写 WHERE”时，WHERE 行淡出，表示所有行的示意网格全部变红，标“DELETE FROM without WHERE deletes every row of the table”。 |
| C8_06 | 30:32.2–30:53.7 | 真题卡“w22_12 5(b) [3]”，题干原文；表结构 OWNER(<u>OwnerID</u>, FirstName, TelephoneNo, TreeID, TreePosition)、TREE(<u>TreeID</u>, ScientificName, MaxHeight, FastGrowing)；数据表 TreeID LOW_1276 / ScientificName Salix_Alba / MaxHeight 30.00 / FastGrowing TRUE。 |
| C8_07 | 30:53.7–31:15.1 | 数据表每个值旁标 text / number / BOOLEAN。代码 Option 2 逐项出现：`INSERT INTO TREE VALUES ('LOW_1276', 'Salix_Alba', 30.00, TRUE);`。说到“也可以”时，上方出现 Option 1：`INSERT INTO TREE (TreeID, ScientificName, MaxHeight, FastGrowing) VALUES ('LOW_1276', 'Salix_Alba', 30.00, TRUE);` |
| C8_08 | 31:15.1–31:21.9 | 评分卡三点：INSERT INTO TREE / VALUES ( ) and correct values / Values in correct order，随旁白打勾。 |

### 片尾

| 段 | 时间 | 画面 |
|---|---|---|
| S999 | 31:21.9–31:25.8 | “9618 Chapter 8 Databases”，C1–C8 进度点全部实心，最后淡出。 |

## 三、与 `script.json` 的 `show` 说明不同之处

1. **C1_01、C1_04：** 课程计划没有给出工资文件和销售文件的其他字段，只画出 StaffName、StaffNumber，其余字段格为浅灰。课程计划只说员工编号“在一个文件中是第五个字段，在另一个文件中是第二个字段”，没有指定哪个文件，这里定为工资文件第 5 个、销售文件第 2 个。
2. **C1_03：** 课程计划没有给出姓名的两种格式和编号的具体值，所以只用“格式不同”“已更新 / 未更新”和“≠”表示，不写具体值。
3. **C2_06：** `show` 写有“sample rows”，但课程计划没有 ELEMENTS 的数据行，因此只显示表结构。
4. **C2_07、C3_04：** A1、F1、E1 等是示意值，不是课程计划中的数据。如果你不希望出现示意值，可以改为浅灰格。
5. **C3_06：** 多对多的例子用 ACTOR、FILM 和连接表 FILM_ACTOR，与 C2_07 一致。课程计划中这一段没有指定例子。
6. **C7_12：** 课程计划只有四处错误的更正，没有完整的错误脚本，因此画面是“错误 / 更正”对照表，而不是在完整脚本上逐处标出。
7. **C6_13：** 代码使用课程计划例子中的小写 `varchar`、`int`，与旁白读出的大写只在写法上不同，SQL 中两者等价。
