.. meta::
   :description: 简介：本文描述了如何使用C++、VB、Windows API和.Net类库判断一个进程是否停止了响应。 没有一个明确的“停止响应”的定义，例如对于Internet Explorer或者Word 2000这样的多顶层窗口应用程序，可能存在部分顶层窗口失去响应的情况，这时很难定义应用程序是否停止了响应。但是一般来说，很多应

How To Detect If an Application Has Stopped Responding
============================================================
.. post:: 31, Dec, 2004
   :tags: Win32
   :category: UI 
   :author: me
   :nocomments:

简介：本文描述了如何使用C++、VB、Windows API和.Net类库判断一个进程是否停止了响应。

没有一个明确的“停止响应”的定义，例如对于Internet Explorer或者Word 2000这样的多顶层窗口应用程序，可能存在部分顶层窗口失去响应的情况，这时很难定义应用程序是否停止了响应。但是一般来说，很多应用程序只有一个标志性窗口（或者叫主窗口）。如果主窗口在一段时间内不响应用户操作的时候，对于用户来说应用程序是停止响应的（例如在Internet Explorer等待远程FTP服务器返回登录结果时）。尽管这经常属于其他应用程序应该妥善考虑的范畴，但是如果自己的应用程序依赖于这样的程序而没有源代码级控制权，那么应该提供一个机会允许用户中断对外部应用程序的等待或者干脆终止外部应用程序。

Windows2000及Windows XP中提供了一个API IsHungAppWindow，但是微软声明此函数可能在后续的Windows版本中删除这个函数。不用遗憾，在Windows 32中有一个特殊的消息WM_NULL，在其文档中说明它可以和SendMessageTimeout一起用于判断某个窗口是否停止了响应。一般来说，我们需要获得进程的标志性窗口（或者叫主窗口）来执行这个判断。2002年7月的MSDN杂志Q&A专栏文章Get the Main Window, Get EXE Name 说明了如何做到这一点。很遗憾，附录中的文章How To Detect If an Application Has Stopped Responding中通过访问浏览器对象的hwnd属性绕过了这个过程，或许是因为在VB中调用EnumWindow比较繁琐；参见附录中的Enumerating Windows Using API(VB)。

另外，.Net Framework中提供了一个Responding属性，可以用于检测进程是否停止了响应。附录中的两篇基于.Net的文章就是检查了这个属性。看起来这似乎是通过检查进程的MainWindowHandle指明的窗口是否立刻响应来解决的。通过这种方法判断的缺点是无法设置等待超时的时间。

参考资料
* IsHungAppWindow(MSDN) https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-ishungappwindow
* WM_NULL(MSDN) (https://learn.microsoft.com/en-us/windows/win32/winmsg/wm-null)
* Process.Responding Property (MSDN) (https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.process.responding)
* Q178893 如何“干净地”终止 Win32 中的应用程序 (https://web.archive.org/web/20050210230103/http://support.microsoft.com/kb/178893/zh-cn)
* Q231844 How To Detect If an Application Has Stopped Responding (https://web.archive.org/web/20041229204405/http://support.microsoft.com/kb/231844)
* Q304991 Detect if an Application Has Stopped Responding by Using C# (https://web.archive.org/web/20050105134838/http://support.microsoft.com/kb/304991)
* Q304990 Detect if an Application has Stopped Responding by Using Visual Basic .NET (https://web.archive.org/web/20041229003323/http://support.microsoft.com/kb/304990)
* Get the Main Window, Get EXE Name (https://web.archive.org/web/20031011160224/http://msdn.microsoft.com/msdnmag/issues/02/07/CQA/)
* Enumerating Windows Using API(VB) (https://web.archive.org/web/20030422013110/http://www.vbaccelerator.com/home/VB/Code/Libraries/Windows/Enumerating_Windows/article.asp)

