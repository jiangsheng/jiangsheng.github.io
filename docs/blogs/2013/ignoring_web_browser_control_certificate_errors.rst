Howto: Ignoring web browser certificate errors in a webbrowser host
========================================================================

.. post:: 17 Jul, 2013
   :tags: C#, WinForms, Trident (Layout Engine), WebBrowser Control
   :category: C#, WebBrowser Control
   :author: me
   :nocomments:

.. index:: pair:Ignore SSL certificate; WebBrowser control
.. index:: pair: WinForms; Webbrowser Customization

Many applications host webbrowser controls to display web pages inside. Before production the web page is often in an internal server that do not have a valid certificate. This article let you skip the certificate error and continue testing your application

The webbrowser queries host services via IServiceProvider implemented on the ActiveX host. One of the services is IHttpSecurity, which can be used to override the certificate problem dialog.

Security warning: ignoring security problems can compromise your application.

IHttpSecurity is derived from IWindowForBindingUI, so the host needs to implement it too.

In Windows Forms, customizing certificate error handling involves the following:

* derive a class from WebBrowser
* create a nested class derived from WebBrowser.WebBrowserSite (the only way you can derive from the nested class)
* overwrite CreateWebBrowserSiteBase and return a new instance of your webbrowser site.
* implement IServiceProvider on the webbrowser site
* implement IServiceProvider.QueryService so it returns an IHttpSecurity implementation when the IHttpSecurity service is requested
* handle IHttpSecurity.OnSecurityProblem and return S_OK (warning: undocumented code, won’t work in IE6)
* use the new webbrowser in the form
* important: navigate to "about:blank" first otherwise your service provider won't get called.

Example Code: https://github.com/jiangsheng/Samples/blob/master/IgnoreSsl.

For sample code in providing the service using MFC, check :ref:`Handle NewWindow3 and ShowModalDialog in CHtmlView <blogs_handle_newwindow3_and_showmodaldialog_chtmlview>`. The way to implements IHttpSecurity is similar to how the article exposes the INewWindowManager service to the webbrowser control.

WPF's WebBrowser class does not provide a public virtual function to change the ActiveX site. You might have to :ref:`implement ICustomQueryInterface yourself <blog_2023_extend_a_webbrowser_control_using_icustomqueryinterface>`.