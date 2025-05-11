.. _add_scripting_support_to_webbrowser_control:

Sample: IEAutomation to Adding Macro Support to Webbrowser Host Applications
============================================================================================================

.. post:: 23, Oct, 2003
   :tags: WebBrowser Control, CHtmlView, Scripting, VBA
   :category: Microsoft Foundation Classes
   :author: jiangshengvc
   :nocomments:
   

这个教程提供在浏览器程序中添加宏支持的方法，你会看到如何给MFC的程序添加宏支持。这篇文章也讨论了如何扩展VC6中的CHtmlView的功能，如何实现MDI结构的浏览器，以及如何分析DHTML的文档结构。

单击 https://github.com/jiangsheng/Samples/tree/master/IEAutomation 下载本文的代码

----------------
前提和需求
----------------
在阅读本文之前，建议先

* 对微软基础类(MFC)和组件对象模型（COM)有所了解
* 熟悉活动模板库(ATL)
* 安装了微软的因特网探索者(IE)6.0或者更高版本
* 开发环境中具有IE6.0或者更高版本的头文件和库文件

----------------
介绍
----------------
集成浏览器控件对于快速的应用程序开发(RAD)是一个强有力的工具；你可以使用动态HTML(DHTML)，或者可扩展的标记语言(XML)显示你的用户界面。一个通常的用途是用它来显示表单，然后通过分析表单网页和处理递交事件来处理表单。但是，如果你要分析表单页面的话，分析的方式完全依赖于页面的结构，也就是说，如果在应用程序中通过IE提供的接口分析网页，那么为了每个网页结构，你要编写和编译一次代码。这在应用程序和表单网页一起发布的情况下是完全没有问题的，但是对于表单网页位于远程服务器上，并且有时候会修改的情况，或者想使应用程序对其他网站有效，就必须同时修改并且重新发布应用程序。为了避免反复修改应用程序，可以使用——

----------------
活动脚本
----------------
使用活动脚本可以编写灵活的处理代码而无需重新编译程序。你可能已经在很多应用程序中见到过活动脚本，例如IE、Microsoft Office和Visual Studio。在平台SDK(Platform SDK)的微软窗口脚本技术(Microsoft Windows Script Technologies)部分的微软窗口脚本接口介绍(Microsoft Windows Script Interfaces Introduction) (https://learn.microsoft.com/en-us/previous-versions/t9d4xf28(v=vs.94)?redirectedfrom=MSDN)一文中，介绍了活动脚本的概念、背景、架构和调用步骤。

如果需要示例代码，可以在微软知识库(KB)中查找kbAXScript关键字。下面是一些示例

* Q223139 HOWTO: Add Support for Hosting VBScript to an ATL Application (https://web.archive.org/web/20080119001407/http://support.microsoft.com/kb/223139)
* Q183698 SAMPLE: AXSH.exe Demonstrates Implementing ActiveX Script Hosts (https://web.archive.org/web/20080117081519/http://support.microsoft.com/kb/183698/)
* Q168214 SAMPLE: MFCAxs.exe Implements an ActiveX Script Host Using MFC (https://web.archive.org/web/20080119053556/https://support.microsoft.com/kb/168214)
* ​​Q223389 FILE: Scriptng.exe Contains the Files Necessary for Implementing ActiveX Script Hosts and Engines (https://web.archive.org/web/20080118223117/https://support.microsoft.com/kb/223389)
* Q232394 HOWTO: Catch Run-time Errors in an ActiveX Script Host (https://web.archive.org/web/20080118221836/https://support.microsoft.com/kb/232394)

本文的示例代码是基于MFC6的，所以采用了Q168214中提供的代码。

--------------------------------
为应用程序添加脚本支持
--------------------------------

^^^^^^^^^^^^^
自动化对象
^^^^^^^^^^^^^

为了实现脚本支持，我们需要让应用程序具有自动化服务器支持。实现这个支持的最简单的办法是使用MFC的应用程序向导(Application Wizard)创建IEAutomation MDI应用程序时，在MDI向导第三步选中Automation支持。

向导自动产生的CHtmlView派生类CIEAutomationView并不是一个自动化对象，所以在建立示例工程时，我把CIEAutomationView的定义和实现文件删除，然后删除类向导中CIEAutomationView的信息，重新创建CIEAutomationView类，在创建的时候指定基类是CHtmlView并且支持自动化。

CIEAutomationView中的脚本解释器是从Q168214的示例代码修改的，去掉了一些对象，增加了DOM扩展对象的实现。

^^^^^^^^^^^^^^^^^^^^^^^^^^
Scripter对象
^^^^^^^^^^^^^^^^^^^^^^^^^^

脚本引擎对象，可以用名字Scripter访问。提供创建对象的方法。

^^^^^^^^^^^^^^^^^^^^^^^^^^
WebBrowser对象
^^^^^^^^^^^^^^^^^^^^^^^^^^

浏览器控件对象，可以用名字WebBrowser访问。可以用来访问文档对象模型。查看源代码功能也被增强了以显示文档对象模型。需要更多信息的话，可以查看文末的参考。

^^^^^^^^^^^^^^^^^^^^^^^^^^
External对象
^^^^^^^^^^^^^^^^^^^^^^^^^^

DOM扩展对象，可以用名字External访问。用于扩展浏览器的文档对象模型的对象。在本示例中，我也同时用这个对象转发了WebBrowser对象的事件。尽管大部分功能都实现了，但是自动完成功能似乎还有点问题，看起来和IShellUIHelper的未公开方法AutoCompleteAttatch有关。（实际上，浏览器控件需要实现IDocHostUIHandler::GetHostInfo，参考http://blog.joycode.com/jiangsheng/archive/2004/01/08/11037.aspx）

^^^^^^^^^^^^^^^^^^^^^^^^^^
类型库支持
^^^^^^^^^^^^^^^^^^^^^^^^^^

脚本中需要对象的类型库信息来访问对象的属性、方法和事件。默认情况下，直接从CComTarget派生的类是无法通过类向导添加和删除事件的，CComTargetEx类“模拟”了ActiveX的部分特性，并且欺骗了类向导来做到这一点。在给对象添加类型信息时，参考了Q185720 HOWTO: Provide Type Information From an MFC Automation Server中的方法，把应用程序的类型库添加到资源。

---------------
安全性
---------------

尽管自动化浏览器可以提供更多的灵活性，但是这也把应用程序的一部分暴露给用户。例如，用户可能修改脚本使得应用程序不能正常工作。另外，如果用户可以查看脚本，那么就可以了解程序结构，并且能够借此攻击没有慎重设计的站点。

使用脚本创建对象也可能有安全性问题。某些对象不是安全的，例如恶意的或者不正确使用的COM对象。

如果扩展了DOM,使得网页上的脚本可以访问应用程序的功能，那么需要确保脚本是安全的，或者来自于可以信赖的站点。下面的函数用于访问DOM中Window的扩展属性之前检查安全性。

.. code-block:: C++

    BOOL CIEAutomationView::CanAccessExternal()
    {
        // if the dispatch we have is safe,
        // we allow access
        if (IsExternalDispatchSafe())
        return TRUE;

        // the external dispatch is not safe, so we check
        // whether the current zone allows for scripting
        // of objects that are not safe for scripting
        if (m_spHtmlDoc == NULL)
        return FALSE;

        CComPtr<IInternetHostSecurityManager> spSecMan;
        m_spHtmlDoc->QueryInterface(IID_IInternetHostSecurityManager,
            (void **) &spSecMan);
        if (spSecMan == NULL)
            return FALSE;

        HRESULT hr = spSecMan->ProcessUrlAction(URLACTION_ACTIVEX_OVERRIDE_OBJECT_SAFETY,
            NULL, 0, NULL, 0, 0, PUAF_DEFAULT);
        if (hr == S_OK)
            return TRUE;
        return FALSE;
    }

默认设置下，一般网页上的脚本可以访问同一站点上的网页。

---------------------------
CHtmlView的增强
---------------------------

^^^^^^^^^^^^^^^^^^^^^
使用高级宿主特性
^^^^^^^^^^^^^^^^^^^^^

使用高级宿主特性的好处可以参见我翻译文章自定义浏览器。在本文的示例代码中，我使用这个特性扩展了DHTML文档结构模型(DOM)，使得网页中的脚本可以访问应用程序。离线浏览功能的实现也可以参考这篇文章。

为了可以在MFC6的CHtmlView基础上使用高级宿主特性自定义浏览器，需要重载默认的控件客户站点（这个代码只在MFC6中有必要，MFC7的CHtmlView已经支持了高级宿主特性）。因为MFC6不能重载CWnd的虚函数CreateControlSite来创建自定义的客户站点，所以使用Q236312 HOWTO: Disable the Default Pop-up Menu for CHtmlView这篇文章中的方法，重载默认的控件客户站点管理器。然后在重载过的默认控件客户站点中保存控件宿主的指针

.. code-block:: C++

    CCustomControlSite::CCustomControlSite(COleControlContainer *pCnt)
    :COleControlSite(pCnt)
    {
        m_pCustomImpl=NULL;
        CWnd* pWnd=pCnt->m_pWnd;
        if(pWnd)
        {
            if(pWnd->IsKindOf(RUNTIME_CLASS(CIEAutomationView)))
            {
                CIEAutomationView* pView=(CIEAutomationView*)pWnd;
                m_pCustomImpl=pView;
            }
        } 
    }

这样可以在控件客户站点的IDocHostUIHandler2实现中调用控件宿主的相应处理，例如

.. code-block:: C++

    HRESULT FAR EXPORT CCustomControlSite::XDocHostUIHandler2::GetHostInfo( DOCHOSTUIINFO* pInfo )
    {
        METHOD_PROLOGUE(CCustomControlSite, DocHostUIHandler2)
        if(pThis->m_pCustomImpl){
            return pThis->m_pCustomImpl->GetHostInfo(pInfo );
        }
        return S_OK;
    }

高级宿主特性的应用之一就是扩展DOM，使得网页上的脚本可以使用window.external访问DOM扩展对象。IE实现的DOM扩展对象具有menuArguments属性和IShellUIHelper接口。

^^^^^^^^^^^^^^^^^
控制新的窗口
^^^^^^^^^^^^^^^^^

默认情况下，浏览器收到创建新窗口请求时，会在IE中打开新的窗口。你可以处理NewWindow2事件来在自己指定的窗口中打开请求的页面。

.. code-block:: C++

    void CIEAutomationView::OnNewWindow2(LPDISPATCH* ppDisp, BOOL* Cancel) 
    { 
        // Get a pointer to the application object. 
        CWinApp* pApp = AfxGetApp(); 
        // Get the correct document template. 
        POSITION pos = pApp->GetFirstDocTemplatePosition(); 
        CDocTemplate* pDocTemplate = pApp->GetNextDocTemplate( pos ); 
        // Create a new frame. 
        CFrameWnd* pFrame = pDocTemplate->CreateNewFrame( 
        GetDocument(), 
        (CFrameWnd*)AfxGetMainWnd() ); 
        // Activate the frame. 
        pDocTemplate->InitialUpdateFrame( pFrame, NULL ); 
        CIEAutomationView* pView = (CIEAutomationView*)pFrame->GetActiveView(); 
        // Pass pointer of WebBrowser object. 
        pView->SetRegisterAsBrowser( TRUE ); 
        *ppDisp = pView->GetApplication(); 
    } 

如果需要更多信息，参见Q184876 HOWTO: Use the WebBrowser Control NewWindow2 Event (https://web.archive.org/web/20080118220005/https://support.microsoft.com/kb/184876)。

^^^^^^^^^^^^^^
MDI浏览器
^^^^^^^^^^^^^^

本文的示例代码是基于浏览器的，为了省事起见，直接在MFC的MFCIE示例上进行了修改，改成了MDI结构。MFCIE本身就是一个简单的浏览器，但是在把代码从主框架转移到子框架之后出了一点小问题，动态建立的收藏夹菜单不见了。这是由于MDI框架的菜单替换机制在框架激活时恢复了默认菜单造成的，所以我重载了CDocument::GetDefaultMenu，以在MDI框架的菜单替换的时候恢复我修改过的菜单（参见）。为了在子框架的创建过程中获得文档指针来修改文档中保存的菜单，可以从创建结构获得MDI创建上下文。

.. code-block:: C++

    MDICREATESTRUCT * pMDICreateStruct=(MDICREATESTRUCT * )lpCreateStruct->lpCreateParams;
    CCreateContext *pCreateContext=(CCreateContext *)pMDICreateStruct->lParam;
    pMenu =((CIEAutomationDoc *)pCreateContext->m_pCurrentDoc)->m_menuDefault.GetSubMenu(3);

^^^^^^^^^^^^^^
收藏夹
^^^^^^^^^^^^^^

MFCIE示例中演示了如何建立一个收藏夹菜单，但是在移植工具栏里面的显示收藏夹命令到MDI子框架的时候碰见一个问题，动态创建的收藏夹菜单的位置不固定。但是通过查找新增的“添加到收藏夹”命令的位置，可以确定这个菜单的位置。添加到收藏夹和管理收藏夹的功能是通过创建ShellUIHelper对象实现的。

^^^^^^^^^^^^^^
自动完成
^^^^^^^^^^^^^^

为了使用方便，我在应用程序中也添加了自动完成功能。地址栏的自动完成功能的实现比较简单，调用系统的API SHAutoComplete就可以了。在我自己扩展了DOM的情况下，表单的自动完成似乎有些问题。

需要更多信息的话，可以参考我翻译的文章在应用程序中集成自动完成功能。

^^^^^^^^^^^^^^^^^^^^^^^^^^^^
访问需要授权的站点
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
某些站点在访问时需要验证用户身份，但是默认情况下浏览器控件在无法验证用户身份时并不提示用户输入用户名和密码。通过在控件的客户站点实现IServiceProvider接口，并且同时实现IAuthenticate接口，使得应用程序具有输入身份验证信息的功能。更多信息参见微软知识库文章Q329802 错误：通过IAuthenticate进行的代理身份验证可能会在安全URL上失败 (https://web.archive.org/web/20140320032003/http://support.microsoft.com/kb/329802)。

^^^^^^^^^^^^^^^^^^^^^^^^^^^^
常用命令处理
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
为了使用方便，增加了调用查找对话框、查看源代码和设置Internet选项的功能。这是通过查询浏览器控件的IOleCommandTarget接口，执行命令组CGID_WebBrowser的命令实现的。实现这类命令的方法不只一种，例如可以载入inetcpl.cpl，调用函数LaunchInternetControlPanel来实现打开Internet选项；使用IMarkupServices接口执行查找、定位和选择，以及使用流来获得/设置网页的内容。在示例代码中，演示了如何分析文档结构，以及如何编辑选定的网页元素的HTML代码或者框架的源文件。

^^^^^^^^^^^^^^^^^^^^^^^^^^^^
MFC6BUG的修复
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
尽管应用程序已经可以具有比较完整的功能，但是为了让应用程序能够长期正常工作，需要修复MFC6中包含的一些问题。我在这里只列出文章标题，有兴趣的话可以去查看微软知识库文章或者本文的代码

Q241750 BUG: CHtmlView Leaks Memory by Not Releasing BSTRs in Several Methods (https://jeffpar.github.io/kbarchive/kb/241/Q241750/)
Q220021 BUG: CHtmlView Does Not Repaint Correctly in an AppWizard-Generated MDI Application (https://web.archive.org/web/20110404164131/http://support.microsoft.com/kb/220021)
Q253219 PRB: WebBrowser Control Disappears When Script Calls window.close(https://web.archive.org/web/20121205185511/http://support.microsoft.com/kb/253219)


脚本示例

.. code-block:: vbscript

    WebBrowser.Navigate "About:<H1><B>This is a test</B></h1>"
    Dim msword 
    Set msword = Scripter.HostCreateObject("Word.Basic")

    msword.appshow
    msword.filenew
    msword.Insert "hello"

    Sub External_BeforeNavigate2(pDisp, URL, Flags, TargetFrameName, PostData, Headers, Cancel)
        MsgBox URL
    End Sub

如果你为WebBrowser对象的事件编写脚本，你会发现这些事件处理代码不会被执行，这是因为CHtmlView处理了这些事件。你可以在你的CHtmlView派生类的处理代码中触发自定义对象的相应事件。在示例代码中，我转发了BeforeNavigate2事件到自定义对象的事件。

---------------------
结论
---------------------
给应用程序添加脚本支持可以大幅度提高程序的灵活性和可扩展性。虽然为此会牺牲一些性能、安全性和增加一些代码量，但是很多时候这种牺牲是值得的。

尽管我在示例代码没有转发DocumentComplete事件，但是这仅仅是基于安全性考虑。自动化浏览器可以很容易地实现广告窗口过滤、自动填写表单，页面分析等脚本。如何编写这些脚本取决于你自己的需要。

---------------------
参考
---------------------


^^^^^^^^^^
浏览器
^^^^^^^^^^
* About the Browser (https://web.archive.org/web/20040214191846/http://msdn.microsoft.com/workshop/browser/overview/overview.asp)
* Reusing MSHTML (https://web.archive.org/web/20030210191849/http://msdn.microsoft.com/workshop/browser/hosting/hosting.asp)
* WebBrowser Customization(https://web.archive.org/web/20040214164345/http://msdn.microsoft.com/workshop/browser/hosting/wbcustomization.asp)
* Loading HTML content from a Stream(使用流来获得/设置网页的内容) https://web.archive.org/web/20031211063355/http://msdn.microsoft.com/workshop/browser/webbrowser/tutorials/webocstream.asp
* Reusing the WebBrowser Control (https://web.archive.org/web/20040214123330/http://msdn.microsoft.com/workshop/browser/webbrowser/WebBrowser.asp)
* Using MFC to Host a WebBrowser Control (https://web.archive.org/web/20040214142042/http://msdn.microsoft.com/workshop/browser/webbrowser/tutorials/wbtutorial.asp)

^^^^^^^^^^
安全
^^^^^^^^^^
* About Cross-Frame Scripting and Security (https://web.archive.org/web/20040214171018/http://msdn.microsoft.com/workshop/browser/sec_progIE.asp)

^^^^^^^^^^^^^^^^^^^^
文档对象模型
^^^^^^^^^^^^^^^^^^^^

* About the DHTML Object Model (https://web.archive.org/web/20040202035117/http://msdn.microsoft.com/workshop/author/om/doc_object.asp)
* About the W3C Document Object Model (https://web.archive.org/web/20031209134906/http://msdn.microsoft.com/workshop/author/dom/domoverview.asp)
* Working with Windows, Frames, and Dialog Boxes (https://web.archive.org/web/20040203025242/http://msdn.microsoft.com/workshop/author/om/windows_frames_dialogs.asp)

^^^^^^^^^^
自动完成
^^^^^^^^^^

* Using AutoComplete in HTML Forms (https://web.archive.org/web/20031226103116/http://msdn.microsoft.com/workshop/Author/forms/autocomplete_ovr.asp)
* 在应用程序中集成自动完成功能

