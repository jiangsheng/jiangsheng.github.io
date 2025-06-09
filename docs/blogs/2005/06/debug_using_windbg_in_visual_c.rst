.. meta::
   :description: 虽然在VC6.0中可以通过安装Visual C++ Toolkit(https://archive.org/details/microsoft-visual-c-toolkit-2003)来编写基于最新版本的平台SDK、DirectX SDK的程序以及托管代码，但是VC6附带的调试器并不支持新版本的调试信息，所以实际上

使用WinDbg调试VC程序
======================
.. post:: 8, Jun, 2005
   :tags: windbg
   :category: Visual Studio
   :author: me
   :nocomments:

.. _blog_debug_using_windbg_in_visual_c:

虽然在VC6.0中可以通过安装Visual C++ Toolkit(https://archive.org/details/microsoft-visual-c-toolkit-2003)来编写基于最新版本的平台SDK、DirectX SDK的程序以及托管代码，但是VC6附带的调试器并不支持新版本的调试信息，所以实际上是不能用VC6来调试新版本编译器生成的程序的。

一个替代的解决方案是使用新版本的Windows调试工具Windbg(https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/)。Windbg的调试功能基本和Visual C++中的相同，但是需要手动设定源文件和调试符号文件的搜索路径（可以参考VC6.0中的对应设置）。

一些代码，例如MFC的代码比较难于定位，这时可以双击调用堆栈中的函数名称来打开文件并定位到函数所在位置。Windbg可以进行有限的托管代码调试，但是调试过程比较麻烦。在没有安装Visual Studio的计算机上调试，例如进行远程调试的时候可能还需要部署调试符号(https://web.archive.org/web/20040417015606/http://msdn.microsoft.com/library/en-us/dnvc60/html/gendepdebug.asp)。

调试Visual Studio .Net 的程序需要用户是管理员或者"Debug User"用户组成员。如果登录用户不是该组成员，那么也可以用WinDbg来调试程序。
