---
syllabus: 9618
chapter: 8
title: Databases
answer_language: en
concepts:
  - id: C1
    name: "Limitations of a file-based approach and how a relational database overcomes them"
    marks: 20
    parts: [文件方式的三项基本局限（冗余、不一致、程序与数据相互依赖）, 关系数据库对每项局限的解决办法, 其他优点（复杂查询、视图、并发访问）, 答题格式：先写名称再写原因]
  - id: C2
    name: "Relational database terminology, keys and referential integrity"
    marks: 49
    parts: [实体、表、属性、字段、记录、元组, 候选键、主键、复合主键、次键, 外键及如何在表结构中识别主键和外键, 参照完整性与数据完整性, 索引]
  - id: C3
    name: "Relationships and E-R diagrams"
    marks: 54
    parts: [关系的四种类型, 用主键和外键实现一对多和一对一关系, 多对多关系不能直接实现及连接表, 由表结构判断关系类型并画 E-R 图, 描述关系的答题格式]
  - id: C4
    name: "Normalisation to 3NF"
    marks: 56
    parts: [未规范化表带来的问题, 1NF、2NF、3NF 的定义和各阶段要去除的内容, 学校数据库从 0NF 到 3NF 的完整过程, 判断并论证一个设计是否为 3NF, 根据文字描述设计 3NF 表结构]
  - id: C5
    name: "DBMS features and software tools"
    marks: 59
    parts: [DBMS 的定义, 数据字典的作用和内容, 数据建模与逻辑模式, DBMS 对数据完整性的支持, 数据安全措施, 开发者界面, 查询处理器]
  - id: C6
    name: "SQL as a DDL"
    marks: 62
    parts: [DDL 与 DML 的区别, 数据类型及如何根据样例数据选择类型, CREATE DATABASE, CREATE TABLE（含主键、复合主键、外键）, ALTER TABLE 增加字段和外键, 常见语法错误]
  - id: C7
    name: "SQL as a DML: queries"
    marks: 108
    parts: [单表 SELECT、FROM、WHERE、ORDER BY, 条件的写法（AND、OR、LIKE、日期范围、文本与布尔值）, 聚合函数 SUM、COUNT、AVG 与 AS, GROUP BY, 两表连接的两种写法, 查询中的常见错误]
  - id: C8
    name: "SQL as a DML: maintenance (INSERT, UPDATE, DELETE)"
    marks: 17
    parts: [INSERT INTO, UPDATE ... SET, DELETE FROM]
---

## C1 Limitations of a file-based approach and how a relational database overcomes them

Prerequisites: 文件由记录组成、记录由字段组成；应用程序读写文件中的数据。

Knowledge
- A database is a structured collection of items of data that can be accessed by different application programs.
- A relational database stores data in separate tables that are linked to each other by keys.
- Limitations of a file-based approach, each written as the limitation followed by its reason:
  - There is more data redundancy, because the same data is stored many times in the separate files used by different applications, so storage space is wasted.
  - There is more data inconsistency // worse data integrity, because duplicated data might be stored differently // when data is updated in one place, it is not updated everywhere.
  - There is program-data dependence, because any change to the structure of the data means the programs that access that data have to be re-written.
  - It is not easy to perform complex searches / queries, because a new program has to be written each time.
  - There could be a lack of privacy, as user views cannot easily be implemented.
- Advantages of a relational database, each written as the advantage followed by its reason:
  - Data redundancy is reduced, because linked tables mean that each data item is stored only once.
  - Data consistency is maintained // data integrity is improved, because data stored only once only needs to be updated once // changes in one table will automatically update in another // linked data cannot be entered differently in two tables // referential integrity can be enforced.
  - There is program-data independence, because the data is separate from the software, so changes to the structure of the data are managed by the DBMS and do not require programs to be re-written; queries are not dependent on the structure of the data.
  - Complex queries are easier to run.
  - Different views can be provided, so users can only see specific aspects of the database.
  - Multiple concurrent access is possible, through record locking.
- In a "describe" or "explain" question, marks are given in pairs: one mark for naming the limitation or advantage, one mark for the "because" that follows it.

Reasoning
- A business keeps a payroll file used by the payroll program and a sales file used by the sales program. The staff name and staff number are stored in both files. The staff name is stored in a different format in each file, and the staff number is the fifth field in one record and the second field in the other. If the payroll program changes a staff number and the sales program does not, the two files hold different values for the same member of staff. Each program is written for the exact record structure of its own file, so if one program changes that structure, every other program that reads the file must be rewritten.

Question

**w23_11 3(b) [3]** A shop manager has designed a relational database to store customer orders. Identify three advantages of a relational database compared to a file-based approach.
1 mark for each bullet point (max 3)
• Reduced data redundancy
• Improved data integrity / consistency / referential integrity
• Allows for views / improved privacy
• Allows for program-data independence
• Complex queries can be executed

## C2 Relational database terminology, keys and referential integrity

Prerequisites: C1。

Knowledge
- Entity: an object about which data can be stored, for example a person, place, event or thing; a real-life object that is represented as a table.
- Table: a group of similar data, in a database, with rows for each instance of an entity and columns for each attribute.
- Attribute: an individual data item stored about an entity, for example a customer's date of birth.
- Field: a column / attribute in a table.
- Record: a row in a table.
- Tuple: a single row / record in a table // one instance of an entity in a table.
- Candidate key: an attribute or smallest set of attributes in a table where no tuple has the same value // an attribute that could be a primary key.
- Primary key: the unique attribute / combination of attributes used to identify the record / tuple. It is a special case of a candidate key.
- Composite primary key: two or more attributes that together form the primary key. It is used when no single attribute uniquely identifies each tuple by itself.
- Secondary key: a candidate key that has not been chosen as the primary key // an alternative key used as well as the primary key to locate specific data.
- Foreign key: a field in one table that is linked to the primary key in another table.
- Referential integrity:
  - ensures that every foreign key has a corresponding primary key // a foreign key value cannot refer to data that does not exist;
  - makes sure that if data is changed in one place the change is reflected in all related records (cascading update / delete);
  - stops orphaned records, which are records that point to an entry in another table that no longer exists;
  - ensures that the data in the database is consistent / up to date;
  - prevents records from being added / deleted / modified incorrectly;
  - makes sure queries return accurate and complete results.
- Data integrity: methods of making sure the data is consistent, for example enforcing referential integrity, cascading update / delete, and validation / verification rules.
- Index: a data structure built from one or more columns in a table to speed up searching for data.
- When a question asks for a definition "using an example from the database", give the definition and then name a specific table or attribute from the given database, for example "Foreign key: a field in one table that is linked to a primary key in another table, e.g. CustomerID in the table RENTAL".

Method
- A table design is written as TABLENAME(Attribute1, Attribute2, ...), with the primary key underlined, for example CUSTOMER(<u>CustomerID</u>, FirstName, LastName).
- To identify the keys in a set of table designs:
  1. The underlined attribute(s) in a table form its primary key.
  2. For each attribute that is not part of the primary key, check whether it is the primary key of another table. If it is, it is a foreign key in this table and it references that other table.
  3. The same attribute name can be a primary key in one table and a foreign key in another. In SHOP(<u>ShopID</u>, ManagerID, ...) and MANAGER(<u>ManagerID</u>, ...), ManagerID is the primary key of MANAGER and a foreign key in SHOP.
- To identify a candidate key, find an attribute other than the primary key whose value is different in every tuple, for example SerialNumber in TELESCOPE(<u>TelescopeID</u>, CompanyID, SerialNumber), or CardNumber in a table of payment cards.

Reasoning
- In a table ELEMENTS(Symbol, Name, AtomicWeight), every attribute is different for each element, so all three are candidate keys. If Symbol is chosen as the primary key, Name and AtomicWeight are secondary keys. Most tables have only one candidate key, and it becomes the primary key.
- In FILM_ACTOR(<u>ActorID</u>, <u>FilmID</u>), one actor appears in many films and one film has many actors, so neither ActorID nor FilmID is unique by itself. One actor cannot appear in the same film twice, so the pair is unique and forms the primary key.
- In STUDENT(<u>StudentID</u>, ..., ClassID) and CLASS(<u>ClassID</u>, TeacherName, Location), only values of ClassID stored in CLASS may be used in STUDENT; a student with ClassID 7D when there is no class 7D would have no teacher or location.

Question

**w21_11 5(a), w21_13 5(a) [2]** Javier owns many shops that sell cars. He employs several managers who are each in charge of one or more shops. He uses the relational database CARS to store the data about his business. Part of the database is shown:
SHOP(<u>ShopID</u>, ManagerID, Address, Town, TelephoneNumber)
MANAGER(<u>ManagerID</u>, FirstName, LastName, DateOfBirth, Wage)
CAR(<u>RegistrationNumber</u>, Make, Model, NumberOfMiles, ShopID)
Tick (✓) one box in each row to identify whether each field is a primary key or a foreign key. The rows are: MANAGER ManagerID; SHOP ManagerID; CAR RegistrationNumber; CAR ShopID. The columns are Primary key and Foreign key.

1 mark for 2 or 3 correct ticks, 2 marks for 4 correct ticks

| Table | Field name | Primary Key (PK) | Foreign Key (FK) |
|---|---|---|---|
| MANAGER | ManagerID | ✓ | |
| SHOP | ManagerID | | ✓ |
| CAR | RegistrationNumber | ✓ | |
| CAR | ShopID | | ✓ |

## C3 Relationships and E-R diagrams

Prerequisites: C2（主键、外键、复合主键）。

Knowledge
- A relationship is formed when one table in a database has a foreign key that refers to a primary key in another table.
- Types (degree) of relationship: one-to-one (1:1), one-to-many (1:M), many-to-one (M:1), many-to-many (M:M).
- A one-to-many relationship is implemented by the primary key in the table on the "one" side being a foreign key in the table on the "many" side.
- A one-to-one relationship is implemented by the primary key in one table being a foreign key in the other, for example the primary key in EMPLOYEE is a foreign key in LOGIN_DATA.
- A many-to-many relationship cannot be directly implemented in a normalised relational database. It is removed by creating a linking table between the two tables. The linking table contains the primary key of each of the two tables as a foreign key, and the two foreign keys usually form its composite primary key. The many-to-many relationship becomes two one-to-many relationships, each from one of the original tables to the linking table.
- An entity-relationship (E-R) diagram is a graphical representation of a database and the relationships between the entities. Each entity is a box labelled with the table name. Each relationship is a line between two boxes; the "many" end of the line has a crow's foot (three short lines) and the "one" end is a single line.
- A relationship can also be optional (zero or one, zero or many) or mandatory (exactly one, one or many). The type of relationship together with whether it is optional or mandatory gives its cardinality.
- To describe a relationship between two tables, state:
  - the type, in both directions, for example "one member of staff can have many devices; each device can only be with one member of staff";
  - the keys, for example "the primary key StaffID in STAFF links to the foreign key StaffID in DEVICE".

Method
- To find the relationships in a set of table designs:
  1. List every foreign key (C2 Method).
  2. For each foreign key, draw one line between the table that contains it and the table it references.
  3. The table that contains the foreign key is on the "many" side; the table where that attribute is the primary key is on the "one" side. Put the crow's foot at the table that contains the foreign key.
  4. If the foreign key value can appear only once in its table (for example each employee has exactly one login record), the relationship is one-to-one.
  5. A table whose primary key is made of two foreign keys is a linking table. It has a many end on both of its lines, and the two tables it links have a many-to-many relationship with each other.
- Example: CUSTOMER(<u>CustomerID</u>, ...), SHOP_ORDER(<u>OrderNo</u>, CustomerID, OrderDate), ITEM(<u>ItemNumber</u>, SupplierID, ...), SUPPLIER(<u>SupplierID</u>, ...), ORDER_ITEM(<u>ItemNumber</u>, <u>OrderNo</u>, Quantity). Relationships: CUSTOMER to SHOP_ORDER is 1:M; SUPPLIER to ITEM is 1:M; SHOP_ORDER to ORDER_ITEM is 1:M; ORDER_ITEM to ITEM is M:1.
- To give examples of relationships from a written description of a business (a shop with customers, payment details, login details, orders and products): one-to-one, customer to payment details // customer to login details; one-to-many, customer to order; many-to-many, order to product // customer to product.

Reasoning
- The relationship between STUDENT and CLASS is many-to-one because one value of ClassID appears many times in STUDENT (many students in a class) but only once in CLASS.
- A foreign key field holds one value in each row. A row of one table can therefore refer to only one row of the other table, which is why a single foreign key can only implement the "one" end. For a many-to-many relationship each side would need to hold many values in one row, which is a repeating group; the linking table stores each pair as its own row instead.

Question

**w25_12 4(a) [2]** A relational database, SHIPPING, stores data about the ships in a company and the containers that are carried on the ships. The database has the following tables:
CONTAINER(<u>ContainerID</u>, Type, Weight, OwnerName, ShipID)
SHIP(<u>ShipID</u>, Type, Capacity, ShipName)
Describe the relationship between the two tables. Refer to the primary and foreign keys in your answer.
1 mark per bullet point, max 2 marks
• The relationship between SHIP and CONTAINER is one-to-many (1:M)
• The primary key ShipID in the SHIP table is linked to the foreign key ShipID in the CONTAINER table

## C4 Normalisation to 3NF

Prerequisites: C2（主键、复合主键、外键）、C3（一对多关系、连接表、多对多关系）。

Knowledge
- Normalisation: the process of organising data to be stored in a database into two or more tables and relationships between the tables, so that data redundancy is minimised.
- First normal form (1NF): there are no repeating groups of attributes // data is atomic.
- Second normal form (2NF): the table is in 1NF and all attributes are fully dependent on the (composite) primary key // there are no partial (key) dependencies.
- Third normal form (3NF): the table is in 2NF and all attributes are fully dependent on the primary key and no other attributes // there are no non-key dependencies // no transitive dependencies.
- In 3NF, every attribute depends on the key, the whole key and nothing but the key.
- Task at each stage:
  - 0NF to 1NF: remove any repeating groups of attributes.
  - 1NF to 2NF: remove any partial key dependencies.
  - 2NF to 3NF: remove any non-key dependencies.
- A normalised database has no many-to-many relationships.
- A partial dependency can only exist when the primary key is composite. A table in 1NF whose primary key is a single attribute is already in 2NF.
- To justify that a database is in 3NF: there are no repeating groups of attributes; each field is fully dependent on the primary key of its table (give an example, such as "all fields in CUSTOMER are fully dependent on CustomerID"); there are no non-key dependencies; there are no many-to-many relationships.
- To put a table into 1NF: identify the repeating groups of attributes (name them); ensure each field is atomic (for example StudentName should be split into FirstName and LastName); identify the primary key for the table.

Method
- Normalising a database, shown on the school example.
  1. Write the un-normalised design and its primary key. Each student studies several subjects, each with a subject teacher:
     STUDENT(<u>StudentID</u>, FirstName, SecondName, DateOfBirth, SubjectName, SubjectTeacher, SubjectName, SubjectTeacher, SubjectName, SubjectTeacher, ClassID, Location, TeacherName, LicenceNumber, Address, TeacherDateOfBirth)
  2. To reach 1NF, find the repeating group (SubjectName, SubjectTeacher). Move it to a new table together with the primary key of the original table, which becomes a foreign key. The new table needs a composite primary key, because one student has many subjects:
     STUDENT(<u>StudentID</u>, FirstName, SecondName, DateOfBirth, ClassID, Location, TeacherName, LicenceNumber, Address, TeacherDateOfBirth)
     STUDENTSUBJECT(<u>StudentID</u>, <u>SubjectName</u>, SubjectTeacher)
  3. To reach 2NF, check each table with a composite primary key for attributes that depend on only part of the key. SubjectTeacher depends only on SubjectName, not on StudentID. Move SubjectTeacher to a new table whose primary key is that part of the key:
     STUDENTSUBJECT(<u>StudentID</u>, <u>SubjectName</u>)
     SUBJECT(<u>SubjectName</u>, SubjectTeacher)
  4. To reach 3NF, check each table for non-key attributes that depend on another non-key attribute. In STUDENT, Location and TeacherName depend on ClassID, and LicenceNumber, Address and TeacherDateOfBirth depend on the teacher. Move each group to a new table whose primary key is the attribute they depend on, and leave that attribute in the original table as a foreign key. Teacher names might not be unique, so LicenceNumber is used as the teacher's primary key; class teachers and subject teachers are both teachers, so they are stored in one table:
     STUDENT(<u>StudentID</u>, FirstName, SecondName, DateOfBirth, ClassID)
     CLASS(<u>ClassID</u>, Location, LicenceNumber)
     TEACHER(<u>LicenceNumber</u>, TeacherName, Address, TeacherDateOfBirth)
     STUDENTSUBJECT(<u>StudentID</u>, <u>SubjectName</u>)
     SUBJECT(<u>SubjectName</u>, LicenceNumber)
  5. Check the result: every table has an underlined primary key; every foreign key matches the primary key of another table; every original attribute appears in exactly one table, except keys used to link tables.
- Designing a 3NF database from a written description:
  1. Make one table for each entity, with a suitable primary key (an ID field; a name or title is not a suitable primary key), and put each attribute that describes only that entity in its table.
  2. Where two entities have a many-to-many relationship, add a linking table whose fields include the primary key of each entity as a foreign key, a suitable primary key (composite or a new ID), and the attributes that belong to the pair, such as a score or a date.
  3. Example: a quiz website where each user plays many quizzes and gets a score for each: USER(<u>Username</u>, Email, DateOfBirth, Rating); QUIZ(<u>QuizID</u>, Date, Filename); USER_QUIZ(<u>Username</u>, <u>QuizID</u>, Score).

Reasoning
- When the school data is held in one table, every new student record must also contain the teacher's name, address, licence number, date of birth and the classroom location. If Mr Khan leaves, every record containing his details must be changed. If all the students of class 7B leave, all the details about class 7B are lost. Each of these problems comes from data about one entity (a teacher or a class) being stored in rows about another entity (a student).
- An order table cannot also hold the order items: each order would only be able to have one item, or the table would contain repeated groups of attributes and would not be in 1NF.

Question

**s23_13 4(c) [4]** A shop rents cars to customers. The shop uses a relational database to store information about the rentals. The car rental database is not normalised. The current database design is:
BOOKING (CarRegistration, StartDate, EndDate, CarModel, CarColour, CustomerFirstName)
CUSTOMER (CustomerFirstName, CustomerLastName, EmailAddress, TelephoneNumber)
Write a normalised database design for this database. All tables must be in Third Normal Form (3NF). Use the field names given and underline the primary key fields.
1 mark each
• Only 3 tables with appropriate identifiers (i.e. one table for customer, one for booking and one for car)
• Appropriate Primary key in each table underlined
• Booking table includes Primary key from car and Primary key from customer as Foreign keys
• All original fields are in correct tables
Example answer:
BOOKING (<u>BookingID</u>, CarRegistration, CustomerID, StartDate, EndDate)
CAR (<u>CarRegistration</u>, CarModel, CarColour)
CUSTOMER (<u>CustomerID</u>, CustomerFirstName, CustomerLastName, EmailAddress, TelephoneNumber)

## C5 DBMS features and software tools

Prerequisites: C1、C3（E-R 图）。

Knowledge
- Database management system (DBMS): systems software for the definition, creation and manipulation of a database. The entry, storage, alteration and deletion of data are all managed by the DBMS.
- Data dictionary:
  - Purpose: it stores metadata about the database // data about the data in the database // data about the structure of the database. It identifies the characteristics of the data that will be stored.
  - Contents: table names; field / attribute names; data types; validation rules; primary keys; foreign keys; relationships; views; indexes.
  - When the question already names some items (for example table names and field names), the answer must give other items. "Metadata" is not accepted as an example of an item.
- Data modelling: the analysis and definition of the data structures required in a database, to produce a data model. An E-R diagram is an example of a data model.
- Logical schema:
  - a data model for a specific database that is independent of the DBMS used to build that database // a model of a database that is not specific to one DBMS;
  - the overview / conceptual design of the database structure; it models the problem by using methods such as an E-R diagram;
  - it is used to design the physical structure;
  - it is the DBMS feature that describes the relationship between data and its structure.
- Ways a DBMS supports data integrity: validation; enforcing referential integrity; cascade update / delete; ensuring the database is normalised.
- Data security methods, each written as the method followed by how it protects the data:
  - Authentication (usernames and passwords, biometrics, two-factor authentication), which prevents unauthorised access to the data.
  - Access rights: different users / accounts are given different permissions, for example read only, read / write, full access or no access, for different tables, so only those with the correct permissions can read or edit the data.
  - Views: different users are able to see different parts of the database, so they only see what they need to see, for example managers can only see the data for their own shop(s).
  - Backup / recovery procedures: copies of the database are taken automatically on a regular basis and stored off site, so the data can be recovered if lost.
  - Record and table locking, which prevents simultaneous access to data, so updates are not lost.
  - Encryption: the data is turned into ciphertext, so it cannot be understood without the decryption key.
- Developer interface: a software tool that allows the user to create items such as tables, forms and reports. It allows the user to:
  - create / modify / delete tables and other database objects, and set up / modify relationships;
  - create a form for data input, and add tools such as drop-down boxes and buttons to a form;
  - design a report to show the output in an organised manner, and add a menu to enable users to choose different actions / run different queries.
- Query processor: software that processes and executes queries written in SQL // software that allows the user to enter criteria, then searches for the data that meets the criteria and organises the results to be displayed to the user.

Method
- How the query processor handles a query: DDL statements are interpreted by the DDL interpreter and recorded in the data dictionary; DML statements are compiled by the DML compiler into low-level instructions, and the compiler also optimises the query; the query evaluation engine executes those instructions.

Reasoning
- The data dictionary holds the definitions of tables, attributes, relationships and validation rules in one place, and the DBMS checks every entry against them, which helps to ensure the data is accurate, complete and consistent.

Question

**s23_12 2(a) [4]** A horse riding school uses a database, Lessons, to store data about lesson bookings. This database is created and managed using a Database Management System (DBMS). The table contains names and descriptions of DBMS features and tools. Complete the table by writing down the missing names and descriptions. The table has the columns Name and Description. Two rows give only the name: Data dictionary; Query processor. Two rows give only the description: "A model of a database that is not specific to one DBMS."; "A software tool that allows the user to create items such as tables, forms and reports."

1 mark for each correct feature or description

| Feature | Description |
|---|---|
| Data dictionary | Data about the data in the database // data about the structure of the database // metadata for a database |
| Query processor | Software that allows the user to enter criteria, then finds and returns the appropriate result // software that processes and executes queries written in SQL |
| Logical schema | A model of a database that is not specific to one DBMS |
| Developer interface | A software tool that allows the user to create items such as tables, forms and reports |

## C6 SQL as a DDL

Prerequisites: C2（主键、复合主键、外键）。

Knowledge
- Data definition language (DDL): a language used to create, modify and remove the data structures that form a database.
- Data manipulation language (DML): a language used to add, modify, delete and retrieve the data stored in a relational database.
- DDL works on the structure of the database; DML works on the data stored in it. Structured query language (SQL) is the industry standard language used for both.
- DDL commands:
  - CREATE DATABASE: creates a database.
  - CREATE TABLE: creates a table definition.
  - ALTER TABLE: changes the definition of a table.
  - PRIMARY KEY: adds a primary key to a table.
  - FOREIGN KEY ... REFERENCES ...: adds a foreign key to a table.
- Data types:
  - CHARACTER (CHAR): fixed length text.
  - VARCHAR(n): variable length text.
  - BOOLEAN: True or False.
  - INTEGER (INT): whole number.
  - REAL: number with decimal places; FLOAT and CURRENCY are also accepted.
  - DATE: a date, usually formatted as YYYY-MM-DD.
  - TIME: a time, usually formatted as HH:MM:SS.
- NOT NULL is a constraint that means the field must contain a value. It is used for primary key fields and other required fields.
- Choosing a data type from sample data:
  - An ID that contains letters (ST23-56, 15B5L) or starts with zeros (00956124, 0001) is VARCHAR.
  - A count or whole number (Bedrooms, Quantity, Level) is INTEGER.
  - A value with a decimal point or an amount of money (MonthlyCost 1000.00, SellingPrice 2.20) is REAL.
  - Yes / No or TRUE / FALSE values are BOOLEAN.
  - Dates are DATE and times are TIME.

Method
- Create a database:
  `CREATE DATABASE SHOPORDERS;`
- Create a table:
  1. Write `CREATE TABLE` and the table name, then an opening bracket.
  2. Write one line for each field: the field name exactly as in the table design, its data type, and NOT NULL where appropriate, with a comma at the end of the line.
  3. Write `PRIMARY KEY(` and the primary key field, then `)`. For a composite key, write both fields separated by a comma.
  4. For each foreign key, write `FOREIGN KEY(` field `) REFERENCES` table `(` field `)`.
  5. Close the bracket and end with a semicolon.
  Example from sample data StudentID 12, TestID A1, Mark 50:
  ```
  CREATE TABLE STUDENT_TEST(
    StudentID INTEGER,
    TestID VARCHAR,
    Mark INTEGER,
    PRIMARY KEY(StudentID, TestID),
    FOREIGN KEY(TestID) REFERENCES TEST(TestID),
    FOREIGN KEY(StudentID) REFERENCES STUDENT(StudentID));
  ```
- Add a field to an existing table: `ALTER TABLE` table, then `ADD` field name and data type. Several fields are separated by commas.
  ```
  ALTER TABLE CAMERA_DATA
  ADD NumberStored INTEGER, LastUsed DATE;
  ```
- Link a foreign key in an existing table:
  ```
  ALTER TABLE EVENT
  ADD FOREIGN KEY(PlayerID) REFERENCES PLAYER(PlayerID);
  ```
- Errors that questions ask you to find and correct in a DDL script:
  - `CREATE DATA BASE` is written as one word: `CREATE DATABASE SCHOOLDATA;`
  - `NONULL` is written as `NOT NULL`.
  - Each field line except the last line in the brackets ends with a comma.
  - The primary key field must be in brackets: `PRIMARY KEY(CharacterID)`.
  - A foreign key must name the referenced table and field: `FOREIGN KEY(PlayerID) REFERENCES PLAYER(PlayerID)`.
  - A field name must match the table design (`TheLevel INT` is corrected to `Level INT`).
  - The data type must match the sample data (an ID such as 00123 is VARCHAR, not INT).

Question

**s24_12 4(b) [3]** An assessment board wants to store the marks students achieved in exams in a database named RECORDS. Part of the database design includes these two tables:
EXAM(<u>ExamID</u>, Subject, Level, TotalMarks)
EXAM_QUESTION(<u>ExamQuestionID</u>, ExamID, QuestionNumber, Question, MaxMark)
Sample data for the table EXAM is shown:

| ExamID | Subject | Level | TotalMarks |
|---|---|---|---|
| 00956124 | Computer Science | 2 | 75 |
| 00956125 | Computer Science | 3 | 120 |
| 00956126 | Mathematics | 2 | 100 |
| 00956127 | Mathematics | 3 | 150 |
| 00956128 | Physics | 2 | 70 |
| 00956129 | Physics | 3 | 80 |

Write a Structured Query Language (SQL) script to define the table EXAM.
1 mark each:
• Creating table EXAM with opening and closing brackets
• All fields with appropriate data types and commas at end of lines
• ExamID as primary key
Example:
CREATE TABLE EXAM( ExamID varchar NOT NULL, Subject varchar, Level int, TotalMarks int, PRIMARY KEY(ExamID));

## C7 SQL as a DML: queries

Prerequisites: C2（主键、外键）、C3（一对多关系中主键与外键的对应）。

Knowledge
- Query commands:
  - SELECT ... FROM ...: fetches data from a database. Queries always begin with SELECT.
  - WHERE: includes only rows in a query that match a given condition.
  - ORDER BY: sorts the results by a given column alphabetically or numerically; ASC (ascending) is the default, DESC gives descending order.
  - GROUP BY: arranges data into groups, so that an aggregate function gives one result for each group.
  - INNER JOIN ... ON ...: combines rows from different tables if the join condition is true.
  - SUM: returns the sum of all the values in the column.
  - COUNT: counts the number of rows where the column is not NULL.
  - AVG: returns the average value for a column with a numeric data type.
  - AS: gives a name to a column of the result, for example `COUNT(OrderID) AS NotCollected`. A question that asks for "an appropriate title" or "a suitable field name" has a mark for AS.
- Writing values in conditions:
  - Text values are in quotation marks: `TestID = "A7"` or `'A7'`.
  - Numbers and TRUE / FALSE are written without quotation marks: `Paid = FALSE`.
  - Dates are written in the format of the database, for example `#01/01/2023#`.
  - A date range is written with two comparisons joined by AND (`DateSent >= #01/01/2023# AND DateSent <= #31/12/2023#`) or with BETWEEN.
  - LIKE with the wildcard % (or *) matches text that starts with given characters: `WHERE CameraID LIKE 'CAN%'`.
  - AND requires both conditions to be true; OR requires at least one. Two values allowed for the same field are joined with OR: `WHERE HorseLevel = "Intermediate" OR HorseLevel = "Beginner"`.
- Choosing the aggregate from the question: "total" of a field → SUM; "number of" → COUNT; "average" → AVG.
- When the query uses two tables and a field name appears in both, the field is written with its table name: `CUSTOMER.CustomerID`.
- Two tables are joined in one of two ways; a script uses one of them, not a mix of both:
  - `FROM T1, T2 WHERE T1.Key = T2.Key AND <other conditions>`
  - `FROM T1 INNER JOIN T2 ON T1.Key = T2.Key WHERE <other conditions>`
  The join condition matches the primary key in one table to the foreign key in the other.

Method
- Steps to write a query:
  1. SELECT: list the fields the question asks to return; add the aggregate function and AS name if the question asks for a total, a number or an average.
  2. FROM: list the table(s) that contain the returned fields and the fields in the conditions. If there are two tables, join them on primary key = foreign key.
  3. WHERE: write each condition, joined by AND or OR.
  4. GROUP BY: if the question says "for each" or "each", group by the field that identifies each group, and that field is also selected.
  5. ORDER BY: if the question gives an order, sort by that field, with DESC for descending.
  6. End with a semicolon.
- Example, one table: the first and second names of all students in class 7A, in alphabetical order of second name:
  ```
  SELECT FirstName, SecondName
  FROM STUDENT
  WHERE ClassID = '7A'
  ORDER BY SecondName;
  ```
- Example, aggregate with groups: the number of cars for sale in each shop: `SELECT COUNT(RegistrationNumber) FROM CAR GROUP BY ShopID;`
- Example, two tables: the number of containers for the ship with the name Caledonia (ShipName is in SHIP, ContainerID is in CONTAINER):
  ```
  SELECT COUNT(ContainerID)
  FROM CONTAINER INNER JOIN SHIP
  ON CONTAINER.ShipID = SHIP.ShipID
  WHERE ShipName = "Caledonia";
  ```
- Example, two tables with groups and an output name: the customer ID, name and total cost of each customer's unpaid orders:
  ```
  SELECT CUSTOMER.CustomerID, CUSTOMER.Name, SUM(ORDER.TotalCost) AS TotalOwed
  FROM CUSTOMER, ORDER
  WHERE CUSTOMER.CustomerID = ORDER.CustomerID
  AND ORDER.Paid = FALSE
  GROUP BY CUSTOMER.CustomerID;
  ```
- Errors that questions ask you to find and correct in a query (script meant to count beginner riders with a lesson on 09/09/2023):
  - SUM should be COUNT, because the question asks for a number of riders.
  - The join condition needs the table name before each field name: `WHERE STUDENT.StudentID = LESSON.StudentID`.
  - OR should be AND, because all conditions must be true.
  - A text value needs quotation marks: `STUDENT.RiderLevel = "Beginner"`.

Reasoning
- Without a join condition, a query on two tables combines every row of the first table with every row of the second. The join condition keeps only the pairs of rows where the foreign key matches the primary key, which are the rows that belong together.

Question

**s22_11 4(c)(ii) [3]** A teacher uses a relational database, MARKS, to store data about students and their test marks. The database has the following structure:
STUDENT(<u>StudentID</u>, FirstName, LastName)
TEST(<u>TestID</u>, Description, TotalMarks)
STUDENT_TEST(<u>StudentID</u>, <u>TestID</u>, Mark)
Write a Structured Query Language (SQL) script to find the average mark of students in test A7.
1 mark for each point
• AVG(Mark)
• SELECT and FROM STUDENT_TEST
• WHERE clause
e.g.
SELECT AVG(Mark)
FROM STUDENT_TEST
WHERE TestID = "A7";

## C8 SQL as a DML: maintenance (INSERT, UPDATE, DELETE)

Prerequisites: C6（数据类型，文本值与数值的区别）、C7（WHERE 条件的写法）。

Knowledge
- Maintenance commands:
  - INSERT INTO: adds new row(s) to a table.
  - UPDATE: edits row(s) in a table.
  - DELETE FROM: removes row(s) from a table.
- In INSERT, the values are written in the same order as the fields in the table design. Text values are in quotation marks; numbers and TRUE / FALSE are not. An ID made of digits that is stored as text, such as "002323", is in quotation marks.
- If the field names are listed after the table name, the values follow in that order; this form is used when values are not given for all fields.
- DELETE FROM without WHERE deletes every row of the table.

Method
- Insert a row:
  ```
  INSERT INTO CAR
  VALUES ("123AA", "Tiger", "Lioness", 10500, "12BSTREET");
  ```
  or, naming the fields:
  ```
  INSERT INTO PRODUCT (ProductID, ProductName, QuantityInBox, Cost, SupplierID)
  VALUES ("002323", "Blue ball point 2 mm", 50, 5.00, "SFX223");
  ```
- Change data in existing rows: UPDATE the table, SET each field to its new value (several fields separated by commas), WHERE the condition selects the row(s).
  ```
  UPDATE CHARACTER
  SET Level = 3, Money = 10000.00
  WHERE CharacterID = "0002";
  ```
- Delete rows:
  ```
  DELETE FROM PLACEMENT
  WHERE Complete = TRUE;
  ```

Question

**w22_12 5(b) [3]** A relational database, GARDEN, has the following tables:
OWNER(<u>OwnerID</u>, FirstName, TelephoneNo, TreeID, TreePosition)
TREE(<u>TreeID</u>, ScientificName, MaxHeight, FastGrowing)
Write the Structured Query Language (SQL) script to add a new record in the table TREE to store the following data:

| Attribute | Value |
|---|---|
| TreeID | LOW_1276 |
| ScientificName | Salix_Alba |
| MaxHeight | 30.00 |
| FastGrowing | TRUE |

1 mark for each bullet point:
• INSERT INTO TREE
• VALUES ( ) and correct values
• Values in correct order
Option 1:
INSERT INTO TREE (TreeID, ScientificName, MaxHeight, FastGrowing) VALUES ('LOW_1276', 'Salix_Alba', 30.00, TRUE);
Option 2:
INSERT INTO TREE VALUES ('LOW_1276', 'Salix_Alba', 30.00, TRUE);
