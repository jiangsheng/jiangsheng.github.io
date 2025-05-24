.. meta::
   :description: MSDN第9频道又采访了Visual C++类库组的项目经理Nikola Dudar和Sarita Bafna，以及质量控制组的Marina Polishchuk。尽管Visual C++项目组已经转移了工作重点，但是很少人注意到这一点。或许这些采访可以帮助你了解Visual C++项目组的工作。 为什么C++仍旧重要

STL/CLR, Compiler and Marshaling
================================
.. post:: 12, Apr, 2007
   :tags: C#,Common Language Runtime,Microsoft Foundation Class Library,Open source,Standard Template Library,Visual C++,Windows Vista
   :category: enmsdn,Microsoft,Visual Studio
   :author: me
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!664

   MSDN第9频道又采访了Visual C++类库组的项目经理\ `Nikola
   Dudar <http://channel9.msdn.com/Showpost.aspx?postid=284140>`__\ 和\ `Sarita
   Bafna <http://channel9.msdn.com/Showpost.aspx?postid=293987>`__\ ，以及质量控制组的\ `Marina
   Polishchuk <http://channel9.msdn.com/Showpost.aspx?postid=285284>`__\ 。\ `尽管Visual
   C++项目组已经转移了工作重点 <http://blog.joycode.com/jiangsheng/archive/2007/03/01/94082.aspx>`__\ ，但是很少人注意到这一点。或许这些采访可以帮助你了解Visual
   C++项目组的工作。 为什么C++仍旧重要？

   - 非托管的应用程序有很大的代码积累，而这些程序的升级工作仍旧在进行
   - 性能是选择C++的重要因素。举例来说，游戏和杀毒程序更适合用非托管代码来编写。
   - 多平台支持。虽然.Net号称是跨平台的，但是如果要编写真正的跨平台程序，开发的时候遵循C++标准还是很有必要的。

   为什么C++程序员仍旧重要？

   - C++程序员理解整个机器的运作，他们知道怎么写垃圾收集机制，甚至可以写机器代码
   - C++程序员可以很容易的学会其他语言——C++已经是最难学的语言之一了
   - C++程序员并不只使用一种语言。如果有必要的话，他们会选择汇编、C#或者Perl这样更适合特定任务的语言。

   为什么Visual C++项目组转移了工作重点？

   - C++程序员对于转到C#没有抵触心理，所以Visual
     C++项目组不认为有必要尽快实现Visual
     C#支持的所有特性，比如LINQ和WPF设计器
   - C++程序员对于让他们的非托管程序调用其他语言的托管代码比用C++来写托管代码更有兴趣
   - 核心模块，例如IE和Windows外壳会更加频繁地更新，而会有更多的非托管代码需要调用这些新的特性，为了这些特性，有必要在MFC中引入新的封装类来节省C++程序员的时间

   Orcas中Visual C++的新特性：

   - 托管代码互操作库。可扩展的托管数据类型和非托管数据类型的转换支持
   - STL/CLR。使得托管代码可以利用旧的STL编写的算法
   - Vista支持。对Vista中新的通用控件和文件对话框等界面元素的MFC封装。
   - DevExpess重构引擎——将包含DevExpess的\ `Refactor!™ for
     C++ <http://blog.joycode.com/jiangsheng/archive/2007/02/28/94008.aspx>`__\ 。

   Orcas之后的考虑

   - 更新界面。有些Visual
     C++的代码是针对20年之前的硬件环境设计的，已经不适合现在的需要。新的\ `Phoenix <http://research.microsoft.com/phoenix/>`__\ 编译引擎使得重写前台变得更加容易。
   - 太多现有的代码需要重构。新的\ `Phoenix <http://research.microsoft.com/phoenix/>`__\ 编译引擎使得代码分析变得更加容易。
   - C++标准。新的C++标准TR1可能会在Orcas下一版本开发时成为正式标准。
   - 多核支持。需要编写可以充分利用多CPU的代码。第一个尝试是LINQ。

   结论

   - MFC和非托管代码回来了
   - 性能和多平台支持的重要性越来越低，托管代码仍旧具有很大的市场。

   `Visual
   C <http://msdn2.microsoft.com/en-us/visualc/default.aspx>`__\ ++项目组的其他动作

   - ATL
     Server发布到了源代码共享站点\ `CodePlex <http://www.codeplex.com/AtlServer>`__\ 。这包含CAtlRegExp，在.Net和第三方类库(boost,TR1)的竞争下已经不再有必要维护一个单独的条件表达式标准了

