.. meta::
   :description: 最近常去的论坛挂了，看起来是IIS进程系统资源占用太多了；服务器管理员又度周末去了，不能重启IIS，郁闷。CSDN服务器的IIS可能重启过于频繁了，分论坛页面经常来不及更新，自己发的帖子出现在列表里面的时候已经沉了，还是郁闷。

重新启动服务
===================

.. post:: 23, Jun, 2004
   :tags: service,IIS
   :category: Win32
   :author: me
   :nocomments:

.. _blog_restart_service:

最近常去的论坛挂了，看起来是IIS进程系统资源占用太多了；服务器管理员又度周末去了，不能重启IIS，郁闷。CSDN服务器的IIS可能重启过于频繁了，分论坛页面经常来不及更新，自己发的帖子出现在列表里面的时候已经沉了，还是郁闷。

微软知识库文章Q194916 Restarting Web Services and Scheduled Tasks with a Batch File（https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/194916）中描述了定时用命令行重新启动IIS的方法，有想偷懒的网管可以试试。平台SDK中包含工具的SC.exe可以对服务进行更加详细的配置。

如果用程序来重新启动IIS的话，可以使用Shell对象的IShellDispatch2接口的ServiceStop 和ServiceStart方法。要使用Shell对象，可以调用CoCreateInstance，传递Shell对象的CLSID CLSID_SHELL来创建对象，然后查询其IShellDispatch/IShellDispatch2等接口来进行进一步的操作。

另外，WMI类Win32_ApplicationService 也提供了控制服务的方法StartService和StopService。cideguru上面有一个示例Using WMI to Extract Management Information（https://web.archive.org/web/20060221101835/http://www.codeguru.com/Cpp/W-P/system/misc/article.php/c5675/）。WMI的优点是可以远程管理；缺点是配置起来比较麻烦。

当然，使用Windows服务API也是可以的——尽管需要OpenService之后再ControlService和StartService，看起来不是很简洁。平台SDK中的示例Sending Control Requests to a Service（https://web.archive.org/web/20020920161053/http://msdn.microsoft.com/library/en-us/dllproc/base/sending_control_requests_to_a_service.asp）描述了这一点。用Windows 服务APIChangeServiceConfig和ChangeServiceConfig2可以对服务进行更加详细的配置。

这些方法都可以应用于其它服务。要查询服务的短名称的话，可以参考微软知识库文章Q271362 How to Find the Short Names of Services （https://web.archive.org/web/20030118144753/http://support.microsoft.com/?kbid=271362）


