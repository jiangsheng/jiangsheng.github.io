.. meta::
   :description: 自动完成功能在浏览器控件中默认是禁用的（但是没有任何文档提到这一点……），但是可以通过实现IDocHostUIHandler，在GetHostInfo方法中在填充DOCHOSTUIINFO结构的dwFlags成员时设置DOCHOSTUIFLAG_ENABLE_FORMS_AUTOCOMPLETE标识位来启用。

在浏览器控件中启用自动完成功能
======================================


.. post:: 9, Jan, 2004
   :tags: MSHTML
   :category: UI
   :author: me
   :nocomments:

自动完成功能在浏览器控件中默认是禁用的（但是没有任何文档提到这一点……），但是可以通过实现IDocHostUIHandler，在GetHostInfo方法中在填充DOCHOSTUIINFO结构的dwFlags成员时设置DOCHOSTUIFLAG_ENABLE_FORMS_AUTOCOMPLETE标识位来启用。

关于如何实现IDocHostUIHandler，可以参考 https://web.archive.org/web/20030218020128/http://msdn.microsoft.com/workshop/browser/hosting/wbcustomization.asp ，示例工程在https://github.com/jiangsheng/Samples/tree/master/IEAutomation

我以前的努力可以在\ :ref:`写篇文章真累 <editor_notes_for_webbrowser_control_host_scripting>`\ 看到，是企图调用IShellUIHelper::AutoCompleteAttatch，但是这个未公开方法并无作用。
