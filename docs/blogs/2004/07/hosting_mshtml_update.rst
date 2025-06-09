.. meta::
   :description: 浏览器控件是一个提供浏览器绝大部分功能的ActiveX控件，随Microsoft? Internet Explorer 4.0(IE)或者更高版本发行。实际上，IE可以认为是一个集成浏览器控件的程序。 怎么给用户提供丰富的内容一直是程序员们努力的目标。尽管各种各样的界面库可能使你眼花缭乱，但是这些也是美工和程序员的恶梦

在应用程序中集成浏览器控件(Update)(Subjet to change without notice)
======================================================================

.. post:: 6, Jul, 2004
   :tags: MSHTML, MFC, Bug
   :category: UI
   :author: me
   :nocomments:

.. _blog_hosting_mshtml_update:

-----
概述
-----

^^^^^^^^^^^^^^^^^^
什么是浏览器控件
^^^^^^^^^^^^^^^^^^

浏览器控件是一个提供浏览器绝大部分功能的ActiveX控件，随Microsoft? Internet Explorer 4.0(IE)或者更高版本发行。实际上，IE可以认为是一个集成浏览器控件的程序。

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
为什么要使用浏览器控件
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
怎么给用户提供丰富的内容一直是程序员们努力的目标。尽管各种各样的界面库可能使你眼花缭乱，但是这些也是美工和程序员的恶梦——要自定义界面上的每个元素的外观并不是一件容易的事情，而且有时候需要比较复杂的技术，例如自定义程序中出现的滚动条的颜色。

浏览器控件的出现使这一切变得简单。一个简单的应用是使用浏览器控件显示丰富的内容，就像Microsoft Outlook的预览窗格。你可以让美工为你做出华丽的效果，例如界面上面的渐变效果、动画GIF或者Flash动画，而顶多只需要编写少量的HTML代码；进阶的应用包括使用浏览器控件显示整个或者部分用户界面，例如Norton Antivirus和Real Player都使用HTML来显示界面，使用层叠样式表统一界面风格；使用DHTML对象模型进行无界面网页分析，或者编写浏览器辅助对象（BHO）来自定义浏览器的行为。

我也必须在这里说一下集成浏览器可能的问题，以供使用者斟酌

浏览器控件是进程内组件。也就是说，如果浏览器或者相关模块崩溃，那么整个程序会崩溃。虽然这不太可能会发生，但是由于浏览器加载的组件/插件太多太多，万无一失是肯定做不到的。这可能也是默认情况下，浏览器控件不会加载BHO的原因。

浏览器占用的资源很多。这包括CPU资源和内存。同时，网页可能需要额外的资源，例如客户端XML解析（CSDN……），动态的图片，ActiveX控件（大部分是Flash控件）。实际上，如果不限制用户浏览的网址，那么网站上常见的广告（通常是动态的图片或者Flash控件）会大大增加浏览器占用的资源，特别是CPU资源。

浏览器控件中加载的脚本可能造成程序不稳定。微软推荐禁用脚本(https://web.archive.org/web/20030928024723/http://support.microsoft.com/default.aspx?scid=kb;EN-US;q266343)，但是这会大大降低浏览器控件的实用性，同时使得某些高级的自定义特性，例如扩展DOM，变得毫无意义。

浏览器不太适合自动化的浏览操作。尽管微软把浏览器作为操作系统的核心，但是我们还是看到，在浏览器控件不断浏览网页的过程中，它的内存占用不断上升。因为这种现象，浏览器控件推荐的用途还是作为静态或者人控的显示。

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
入门
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

在使用浏览器控件之前，你需要创建它。这可以通过在对话框编辑器中插入微软浏览器控件，或者使用类标识CLSID_WebBrowser创建一个控件来完成。如果你仅仅把控件用于显示，那么第一种方法就足够了，如果你需要一些比较高级的功能，例如自定义一些特性，那么你需要用代码来控制控件的创建过程。某些类库，(例如MFC)，内建了对浏览器控件的支持(CHTMLxxxx和CDHTMLDialog类)，但是它们在提供你访问浏览器控件的便利的同时，也使得你自定义浏览器的过程更加复杂。在我看来，它们最好的用途是用作访问浏览器控件的示例和自定义的基础。

浏览器控件提供的一个最主要的COM接口是IWebBrowser2。它提供一个浏览器的基本操作接口，以及这个接口的一些方法，例如比较常用的方法是Navigate/Navigate2，它使得浏览器控件打开一个你指定的目标，例如一个文件夹，一个网页，或者一个活动文档。你可能需要要有效地理解IWebBrowser2接口提供给你的应用程序的特性，你首先需要对Internet Explorer和DHTML两者的对象模型有一个基本的了解。当然，完全解释这些模型可能会占据大量篇幅，因为DHTML文件中每种独立的元素类型（<B>、 <HTML>、 <BODY>等等）都具有代表自己的COM对象类或者接口。获得对这些对象模型的彻底的理解的最好方法是看一些书和获得一个工具。Inside Dynamic HTML （微软出版社 ，1997）是DHTML对象模型的最好的参考书之一。关于对象模型的更多技术信息可以通过研究Internet Client SDK的DHTML相关头文件（特别是mshtml.h、 expdispid.h、 mshtmhst.h和mshtmdid.h）。这些文件指定各种类或者对象支持的接口。不幸的是，可用的Internet Client SDK中的帮助文档只有中等程度的辅助，他们解释了如何使用IWebBrowser2接口的细节，但是没有提供太多对象和接口之间的关系的信息。微软的相关文档很少，所以探索DHTML对象到底支持那些接口是一个有趣的事情。在微软知识库中，你经常会看到一些DHTML对象支撑标准的IConnectionPointContainer、IOleCommandTarget或者IOleContainer接口。

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
如何...
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

""""""""""""""""""""""""""
使用MFC集成浏览器控件
""""""""""""""""""""""""""

MFC6开始内建了对浏览器控件的支持，但是高级的接口，例如IDocHostUIHandler，到7.0版本才支持。使用MFC编写浏览器控件应用程序比较简洁，用户可能只需要少量代码就可以创建出一个具有大部分浏览器功能的程序。使用MFC的缺点是MFC6的这些类的BUG很多，而且要自定义一些功能的话，需要了解了MFC的控件创建过程。MFC有一个MFCIE示例演示了一个使用CHTMLView创建的简单的浏览器程序。Paul DiLascia 在MSDN杂志中他的C++Q&A专栏中演示了在对话框中集成CHtmlView，以及禁用浏览器控件的右键菜单的方法。

""""""""""""""""""""""""""
自定义浏览器的行为
""""""""""""""""""""""""""

如果在应用程序中集成浏览器控件，可以参考MSDN中WebBrowser Customization这篇文章。一个基于MFC的示例可以在https://web.archive.org/web/20030318000333/http://www.beginthread.com/Article/Ehsan/Advanced%20CHtmlView%20Hosting/找到。

如果编写BHO，那么MSDN文章Browser Helper Objects: The Browser the Way You Want It（Dino Esposito著）这篇文章可以用来入门。

""""""""""""""""""""""""""
在MFC中重载默认的控件站点
""""""""""""""""""""""""""
为了实现一些高级浏览器宿主特性，需要在控件站点的同一个对象上实现某些接口。例如用于查询宿主提供的服务接口的IServiceProvider（常用的服务有用于HTML编辑器的IHTMLEditHost或者IHTMLEditServices和用于自定义IE的安全选项的IInternetHostSecurityManager ）和 用于自定义浏览器的行为和界面的IDocHostUIHandler、IDocHostUIHandler2以及IDocHostShowUI接口。

虽然在MFC7中，可以重载CWnd::CreateControlSite来覆盖控件站点的创建，但是在MFC6中，这个工作要复杂得多。微软知识库文章HOWTO: Disable the Default Pop-up Menu for CHtmlView (https://web.archive.org/web/20060206063550/http://support.microsoft.com/default.aspx?scid=kb;EN-US;Q236312)介绍了其中一种方法，但是这种方法看起来不那么优雅，要在启动时就覆盖掉默认的OLE容器创建者，而且窗口无法创建其他类型的控件站点。实际上，这不是必要的。分析一下下面的MFC6代码

.. code-block:: C++

    void AFX_CDECL AfxEnableControlContainer(COccManager* pOccManager)
    {
        if (pOccManager == NULL)
            afxOccManager = _afxOccManager.GetData();
        else
            afxOccManager = pOccManager;
    }

你可以看到只需要在创建前调用AfxEnableControlContainer，传递你自己的容器创建者作为参数，创建站点之后再调用一次传递NULL作为参数就可以达到覆盖掉默认的OLE容器创建者的目的。这是在你覆盖的CHtmlView::Create中调用的.你必须覆盖这个过程，因为CHtmlView::Create会调用AfxEnableControlContainer(NULL)。

.. code-block:: C++

    BOOL CHtmlView::Create(LPCTSTR lpszClassName, LPCTSTR lpszWindowName,
    DWORD dwStyle, const RECT& rect, CWnd* pParentWnd,
    UINT nID, CCreateContext* pContext)
    {
        //……
        //假定控件容器已经启用
        AfxEnableControlContainer();
        //……
    }

-----------------------
常见问题
-----------------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^
MFC6的CHtmlView的BUG
^^^^^^^^^^^^^^^^^^^^^^^^^^^
在我编写我的一种基于网页的游戏的外挂的第二个版本的时候，我试图把我的经验编写成文章（这篇文章已经发表在\ :ref:`我的专栏 <add_scripting_support_to_webbrowser_control>`\ ）。作为我的第一个非测试用途的（其他的浏览器基本上都过于简单，而且有这样那样的不便或者缺陷，以至于不能方便和稳定地使用）MDI浏览器，我碰见的第一个问题就是修复MFC的BUG（暂且不谈IE本身的BUG）。尽管我查到和发现的BUG不算太多，但是用于解决这些BUG的代码量也很可观。我到目前为止发现的大部分BUG的都在这篇文章中的示例代码里解决了，尽管文章中关于这些问题的篇幅很少。

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
在CDHtmlDialog派生的对话框中按Ctrl+N会弹出IE
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

CDHtmlDialog捕获了DWebBrowserEvets事件，并将其转发到虚函数，而没有捕获DWebBrowserEvents2；所以在按Ctrl+N触发DWebBrowserEvents2事件的时候，执行默认操作——打开新的IE窗口。这可能不是你预料之中的行为。解决的方法是自己写一个EventSink,你可以不必将其转发到虚函数。参见微软知识库文章181845
HOWTO: Create a Sink Interface in MFC-Based COM Client (https://web.archive.org/web/20040721215255/http://support.microsoft.com/?id=181845)


""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
ActiveX控件中访问文档对象模型
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
知识库文章Q172763 INFO: Accessing the Object Model from Within an ActiveX Control 描述了这个问题的解决方案。可以看到，可以同样使用IOleClientSite来和IE这个控件容器交互。可以使用IOleClientSite::GetContainer得到网页所在HTML文档对象的IOleContainer接口，然后再查询其他接口，例如IHTMLDocument2来进行对DHTML对象模型的访问。

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
创建并且操纵IE浏览器
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
可以使用CoCreateInstance来创建一个浏览器对象，使用的CLSID是CLSID_InternetExplorer。创建成功之后，可以查询浏览器对象的其他接口，例如IWebBrowser2,IOleObject等等。

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
分析网页和自动提交网页表单
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
经常被提出的问题，但是网页千奇百怪，要写个通用的不容易。一般的应用都是首先把可以参考MSDN中文站上的文章拆取Web页(https://web.archive.org/web/20040616182448/http://www.microsoft.com/china/msdn/Archives/workshop/scrape.asp)。

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
如何调用网页中Script中的函数？
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
IHTMLDocument2::scripts属性表示HTML文档中所有脚本对象。使用脚本对象的IDispatch接口的::GetIDsOfNames方法可以"发现其中的函数和对象成员，使用IDispatch::Invoke可以访问这些成员。

-----
参考
-----
* Inside OLE, 第二版, Kraig Brockschmidt著 (微软出版社)
* Understanding ActiveX and OLE, David Chappell著 (微软出版社)
* Inside COM, by Dale Rogerson著 (微软出版社)

