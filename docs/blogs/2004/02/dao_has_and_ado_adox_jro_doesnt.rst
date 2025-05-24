.. meta::
   :description: 转自 http://www.trigeminal.com/usenet/usenet025.asp?2052 微软很清楚地把ADO定位为DAO的替换……许多微软的代理认为DAO 就是DOA（Dead On Arrival（到达即死），在美国，这是一个术语，用来描写那些希望获救的人在救护车刚到达，要抢救他们时，他们就死了

DAO拥有ADO/ADOx/JRO所没有的东西（也许从不会有！
=================================================

.. post:: 27, Feb, 2004
   :tags: ADO, DAO, JRO
   :category:  Win32, Visual C++
   :author: me
   :nocomments:

转自 http://www.trigeminal.com/usenet/usenet025.asp?2052

微软很清楚地把ADO定位为DAO的替换……许多微软的代理认为DAO 就是DOA（Dead On Arrival（到达即死），在美国，这是一个术语，用来描写那些希望获救的人在救护车刚到达，要抢救他们时，他们就死了）。然而，在DAO中，许多核心函数功能时被支持的，而ADO/ADOx/JRO 却不被支持，而且甚至可能从未被支持，因为微软似乎正把用户推向其他方向。而Jet本身不会“死”，很清楚，它不再是一个策略平台，所以，在Jet中，似乎不只是要有足够的兴趣使工作做得更有效了。 
对于全记录，这里是一个DAO有而ADO没有的所有能力表： 

* 运行使用多数据库事务（在DAO中有效，因为事务位于工作区层，而在ADO中失效，因为事务位于连接层---而且连接只支持一个数据库） 
* 用一模式打开一个表格，该模式可避免其他用读写模式打开它（由于使用dbDenyWrite常数，在DAO中有效，而在表格层的ADO中失效，因为其最接近模拟adModeShareDenyWrite仅能够被设置在连接层）。 
* 用一模式打开一个表格，该模式可避免其他模式打开它（由于使用dbDenyRead常数，在DAO中有效，而在表格层的ADO中失效，因为其最接近模拟adModeShareDenyRead仅能够被设置在连接层）。 
* 用某一方式创建用户和组，该方式允许你在万一丢失MDW文件时可以重新创建它们（使用CreateUser/CreateGroup，它使你能够指定PIDs，在DAO中有效，而在ADO中失效，ADO不允许你指定PIDs）。 
* 使存取项目对象如表单，报表，或宏安全（由于文档对象的权限属性，在DAO中有效，而在ADOx中失效，因为它不能正确地映射期望常数，用于执行，读更改，和写更改到这些对象类型的权限）。 
* 创建一可更新的链接ODBC表格的能力（由于其调用到SQLStatistics函数，在DAO中有效，而在没有这种调用的ADO中失效）。 
* 创建“预防删除”副本的能力（由于传递&H4;的值到CreateReplica调用，在DAO中有效，而在没有这种模拟的JRO中失效）。 
* 从Exchange/Outlook文件夹和列确定文件夹信息的方法（由于TableDef/Field对象属性，在DAO中有效，而在ADO中失效，因为该信息不被通过）。 
* 设置和更改Jet选项而不更改注册表的能力（由于DBEngine.GetOption and DBEngine.SetOption, 在DAO中有效，而在没有这种模拟的ADO中失效）。 
* 通过JPM--也称为Jet Property Manager（Jet属性管理器），允许创建/更改/删除任何和所有属性（由于CreateProperty/Properties.Append, 在DAO中有效，而在几乎所有属性的ADO/ADOx/JRO中失效，因为没有JPM到ADO的挂钩联系）。 
* 从存取内工作时，强制一数据库的锁定模式（使用CurrentDb时，由于DAO.LockTypeEnum常数，在DAO中有效，而使用CurrentProject.Connection时由于ADO.LockTypeEnum常数而失效）。 
* 在一对象上检索隐式权限（由于AllPermissions属性，在DAO中有效，而在ADO中失效，因它没有AllPermissions属性，且要求你分别枚举它们所有组的用户）。 
* 允许一独立的Jet会话来运行使用对象模型中的一专用对象（由于PrivDBEngine对象，在DAO中有效，而在ADO中由于没有模拟对象而失效）。 

这些项越来越多地被发现，因此，反复检查，你可能会发现表上的新项目！ 
