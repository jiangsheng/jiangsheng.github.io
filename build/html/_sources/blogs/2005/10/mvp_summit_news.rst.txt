西雅图MVP峰会见闻
========================
.. post:: 3 Oct, 2005
   :tags: MFC
   :category: Visual C++, Microsoft Foundation Classes
   :author: me
   :nocomments:

个人觉得这次MVP峰会最大的进步就是技术相关的Session数量大大增加，按照MVP专长来分类；而不像上次那样按主题分类。我只需要在VC产品组的日程里面选择就可以了，而不是像上回那样不得不去听移动开发。当然这回也有MVP不去参加VC的Session，跑去听IE和移动开发。内容方面也比上次活泼很多，Don Box还是那么幽默，比尔·盖茨也有搞笑的演出，不过他看起来比去年七月份在北京的时候老多了。


一些可能有人会感兴趣的技术信息

* 新的产品开发合作网站http://connect.microsoft.com/。在这里可以申请参与新产品的测试。
* 软件开发者可以使用Windows错误报告机制（Windows Error Reporting，简称WER，https://winqual.microsoft.com/parentorgs.asp）来获得反馈。
* 有人正在开发把VC项目转化成MSBuild的XML格式的工具 (http://blogs.msdn.com/clichten/archive/2005/06/07/Building_VC_projects_with_msbuild_and_not_using_vcbuild.aspx)。关于MSBuild的概述可以看看Christophe Nasarre的文章Overview of MSBuild (http://msdn.microsoft.com/library/en-us/dnlong/html/msbuildpart1.asp)和MSBuild Team Blog (http://blogs.msdn.com/msbuild)。还不知道这个工具是否支持VS.Net中其他语言的项目。新的代号为Phoenix的统一编译器平台也在计划中。可以加入插件来实现自定义语言的编译器 (http://blogs.msdn.com/kangsu/archive/2005/08/11/450481.aspx)。
* 在MFC8.0中使用Windows Forms会更加简单，加速键和Tab键的处理现在可以扔给MFC来做了 (http://blogs.msdn.com/yvesdolc/archive/2005/04/26/WindowsForms_In_MFC.aspx)。VC8.0中也会有一些新的向导，例如单元测试工程向导 (http://msdn.microsoft.com/library/en-us/dnvs05/html/vs05security.asp)。

一些建议

* 停止开发新的面向Win9x的程序和静态链接MFC的程序。使用新的MFC版本编译旧的程序来增加应用程序的安全性。
* 在新的程序中使用Unicode编码，同时尽可能将现有程序移植到Unicode。
* 移植到Visual C++ 2005来使用强大的编译器和调试器。

尽管限于保密协议我不能说得更多，但是微软在11月7号就会正式发布Visual Studio 2005、SQL Server 2005和BizTalk Server 2006了。新的Visual Studio版本（代号Orca和Hawaii）也正在规划中。