Visual C++ 2005 Beta 2中的变动
=====================================

.. post:: 19, Apr, 2005
   :tags: MFC
   :category: Visual C++, Microsoft Foundation Classes
   :author: me
   :nocomments:

stdcli::language名称空间被取消，代之以cli名称空间。

MFC对.Net控件的事件支持宏VENT_DELEGATE_ENTRY的参数类型变化：例如

.. code-block:: C++
    
    EVENT_DELEGATE_ENTRY( eventHandler, Object, EventArgs )

改为

.. code-block:: C++
    
    EVENT_DELEGATE_ENTRY( eventHandler, Object^, EventArgs^ )

编译器更加友好了，例如这个编译错误消息：

.. code-block:: 
    
    error C3824: 'cli::pin_ptr': this type cannot appear in this context (function parameter, return type, or a static member)

这回总算可以不安装J#的支持包了……

小道消息：以下功能预计不会存在于Visual Studio 2005的第一个发布中：

Visual C++ 对Class Designer(http://blogs.msdn.com/classdesigner/)的支持(http://blogs.msdn.com/classdesigner/archive/2005/03/04/384764.aspx)

完整的托管支持库(marshal_as)