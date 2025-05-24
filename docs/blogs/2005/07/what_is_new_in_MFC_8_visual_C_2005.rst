.. meta::
   :description: 关于新功能的说明 http://msdn2.microsoft.com/library/y8bt6w34(en-us,vs.80).aspx

Visual Studio 2005中MFC的变化
====================================

.. post:: 5 Jul, 2005
   :tags: MFC
   :category: Visual C++, Microsoft Foundation Classes
   :author: me
   :nocomments:

关于新功能的说明 http://msdn2.microsoft.com/library/y8bt6w34(en-us,vs.80).aspx

一些源代码的变化：

* 对CLR、.Net类库和Winform控件的支持。
* 多处安全性的增强，对于函数参数和消息影射类型的检查加强。对ISAPI的支持看起来改动很大。
* 对基于64位处理器的软件开发的支持。
* 一些过时功能，例如MFC的DAO类，的使用受到限制。对于64位开发环境，MFC的DAO类是被禁用的。
* OLE控件容器和激活状态的改进
* 新增加的ENSURE宏在ASSERT之外还可以抛出异常。

修正了一些BUG

* VC7引入的对GetHtmlDocument()的引用导致内存泄漏的问题。
* CHtmlView::ExecFormsCommand中调用IOleCommandTarget::Exec时参数写反了的问题
* 把CArchiveException::generic修改为CArchiveException::genericException以避免潜在的关键字冲突（微软看起来又准备引入一个新的关键字）
* 
