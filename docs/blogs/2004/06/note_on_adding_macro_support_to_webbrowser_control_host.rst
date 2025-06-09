.. meta::
   :description: 用笔记本用多了，PC键盘用起来不是很习惯了。 在我的一篇文章脚本化浏览器中描述了如何在应用程序中添加宏支持。在添加支持的时候需要注意的是，宏的运行环境——VBS脚本引擎——目前只支持变体数据类型。这造成的一个结果就是当你的应用程序触发一个事件的时候，如果其参数并不都是变体数据类型，那么你编写的宏不是总会被调用。解决的方

在应用程序中添加宏支持的注意事项 (Update)
===========================================

.. post:: 27, Jun, 2004
   :tags: MSHTML, Scripting
   :category: Win32
   :author: me
   :nocomments:

.. _add_scripting_support_to_webbrowser_control_update:

用笔记本用多了，PC键盘用起来不是很习惯了。

在我的一篇文章\ :ref:`脚本化浏览器 <add_scripting_support_to_webbrowser_control>`\ 中描述了如何在应用程序中添加宏支持。在添加支持的时候需要注意的是，宏的运行环境——VBS脚本引擎——目前只支持变体数据类型。这造成的一个结果就是当你的应用程序触发一个事件的时候，如果其参数并不都是变体数据类型，那么你编写的宏不是总会被调用。解决的方法是总是声明你的事件参数为变体数据类型。

另外，MFC的向导会错误地为VARIANT_BOOL类型的事件参数生成一个BOOL类型的事件处理函数参数。这样的自动化对象在VB这样的宿主中运行的时候会造成访问越界。参见微软知识库文章Q199315 FIX: Method with BOOL* Parameter Type Overwriting Memory in Visual Basic (https://www.infania.net/misc/kbarchive/kb/199/Q199315/index.html) 。解决的方法是手动修改类向导生成的代码，把4字节的BOOL替换成两个字节的VARIANT_BOOL。
