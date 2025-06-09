.. meta::
   :description: I would like to keep tracking some interesting CSDN discussions, but sometimes I can not find them due to the limit of the CSDN favorite and the CSDN full text search. So again I list some interesting discussions here. For details about the discussion, go to http://search.csdn.net and search posts by their topics. For previous Q&A discussions
   
Win32 & .Net Q&A 200509
=========================================
.. post:: 22, Sep, 2005
   :tags: CSDN
   :category: Internet,Win32
   :author: me
   :nocomments:


I would like to keep tracking some interesting CSDN discussions, but sometimes I can not find them due to the limit of the CSDN favorite and the CSDN full text search. So again I list some interesting discussions here. For details about the discussion, go to http://search.csdn.net and search posts by their topics. For previous Q&A discussions, see my blogs Win32 & .Net Q&A  and VC/MFC Q&A 200407 . A topic may appear in these Q&A blogs more than once, but I will try to cover every interesting discussion if I can.

----------------------------
如何用程序控制电源管理设置
----------------------------
我们知道在电源选项 属性 里面可以设置

*  关闭监视器  1分钟之后，...,从不
*  关闭硬盘    1分钟之后，...,从不
*  待机时间    1分钟之后，...,从不

请问这些设置我怎么用程序来实现 比如我现在要把关闭监视器设成 5分钟之后 请问各位大虾，应该怎么办？是不是要调用API?如果是，应该调用什么函数？

另外补充说明:如果是调出控制面板让用户自己设置，这种功能我不需要，我要的是在程序里面自动完成这些操作，不需要用户的介入！

To update an existing power scheme, call the WritePwrScheme, WriteGlobalPwrPolicy, or WriteProcessorPwrScheme function. Note that changes to the active power scheme do not automatically take effect. You must always call SetActivePwrScheme to update the active power scheme.
自己创建一个新的power scheme  （WritePwrScheme）
POWER_POLICY中USER_POWER_POLICY结构
VideoTimeoutAc VideoTimeoutDc是控制Display 的AC和Battery Power
Power Control Panel中的“关闭监视器”是通过 VideoTimeoutAc 来设置的，单位为秒
SpindownTimeoutAc SpindownTimeoutDc控制硬盘

-----------------------------------------------
从CFileDialog派生自定义Open对话框的问题
-----------------------------------------------
我要自定义一个open对话框，除了common filedialog，添加了一些control，同时使用了hook，在hook proc中有 WM_INITDIALOG的定义，那么请问添加的control在什么地方定义，比如说我要

.. code-block:: C++

    BOOL fdex_mfc_dlg::OnInitDialog()
    {
        CFileDialog::OnInitDialog();

        CListBox* pLB = (CListBox*)GetDlgItem(IDC_ENV);
        pLB->InsertString(-1, "Current Project");
        pLB->InsertString(-1, "Current scenes");
        pLB->InsertString(-1, "Projects");
        pLB->InsertString(-1, "Default");
        pLB->InsertString(-1, "Home");
        pLB->SetTopIndex(0);

        return TRUE;  // return TRUE unless you set the focus to a control
        // 异常: OCX 属性页应返回 FALSE
    }

好像不起作用了！


文件对话框上的控件在收到WM_INITDIALOG甚至是CDN_INITDONE的时候都还不存在。最简单的解决方法是使用自定义消息

.. code-block:: C++

    BOOL CMyOpenDlg::OnInitDialog()
    {
        CFileDialog::OnInitDialog();
        PostMessage(MYWM_POSTINIT,0,0);
        return TRUE;
    }

然后在MYWM_POSTINIT的处理函数中操作文件对话框上的控件。因为使用了PostMessage，所以这个消息在之前消息队列中所有消息得到处理之后才会被处理，这时候文件对话框已经初始化完毕了。

--------------------------------------------------------------------
能不能将一个ie的dll插件转换成active X组件做到自动下载并注册
--------------------------------------------------------------------
因为网页中一般不能直接运行可执行程序（如.EXE程序），所以如果要实现一些自定义的方法，一般通过编写ActiveX控件，然后在ActiveX控件中实现所需要的功能，最终在网页中调用该ActiveX。
１.使用VB或者ATL工具来实现一个Active控件，在控件中向外暴露一个方法，该方法的功能为：首先将所要安装的程序下载到用户机器上，然后启动所下载的安装程序进行安装。
２.在网页中调用该控件，在所需要处理事件中(如：onload,onclick等)，调用上诉ActiveX控件的方法来实现安装。

网页中调用ActiveX控件的方法如下：

.. code-block:: 

    <object ID=”CotrolID”
                    CLASSID=”clsid:XXX”
                    CODEBASE=”http://someserver.com/XXX.cab”>
    </object>

其中，ID：代表网页中该控件的ID,可以通过该ID来调用控件的方法。
            CLASSID：唯一代表一个ActiveX控件，指明将使用哪个ActiveX控件。
            CODEBASE：如果ActiveX控件还没安装在本机上，指明可以从何处进行安装。

----------------------------------------------------
如果将插入WORD的ActiveX控件对象持久化到WORD文档中？
----------------------------------------------------
http://support.microsoft.com/support/kb/articles/q241/9/36.asp

----------------------------------
关于vc.net的几个问题
----------------------------------

1、使用vc.net“项目”中.net项中建立的类库能不能使用MFC，如果能使用那么编译后还是不是托管模块?其中引用到的MFC库中类是不是也编译成托管模块
2、使用vc.net“项目”中用MFC建立的应用程序在修改编译属性后编译为托管代码，那么这时程序的那一部分被编译为托管代码，还是全部被编译成托管的？这个程序能不能添加对程序集的引用？

1 可以使用MFC，但是因为很多MFC类依赖于CWinApp进行的全局MFC数据的初始化，所以建议还是用MFC向导来生成程序
2 MFC的DLL是非托管的，但是可以和托管代码一起工作。托管代码中当然可以引用程序集。
3 混合了非托管代码的程序很可能较难不加修改的移植到其它平台，尤其是在非托管代码包含对特定操作系统的API调用的情况下。

some of my blogs also discussed this topic:

* :ref:`示例：在MFC程序中集成.Net中的控件 <blogs_2005_03_host_managed_control_in_mfc>`
* :ref:`MFC，欢乐与痛苦 <blogs_2005_08_mfc_joy_and_pain>`


--------------------------------------------------------------------
怎么样实现 CEditView 的某几行文字为不可编辑吗？
--------------------------------------------------------------------
我的 View 想每次建立的时候，自动在前几行输出内置的 文字，但是不想用户能够编辑它，可以接着这些文字下面继续编辑，这个该怎么实现？？

谢谢，有这方面的文章吗？

用richedit2.0的话可以把文字块保护起来

CFE_PROTECTED
Characters are protected; an attempt to modify them will cause an EN_PROTECTED notification message.

http://msdn.microsoft.com/library/en-us/shellcc/platform/commctls/richedit/richeditcontrols/richeditcontrolreference/richeditstructures/charformat2.asp
http://www.codeguru.com/Cpp/controls/richedit/article.php/c2401/


----------------------------------------------------------------
WebBrowser的BeforeNavigate2事件如何添加Header啊？
----------------------------------------------------------------
BeforeNavigate2事件有个Headers As Variant参数，我怎样修改它？
我试过Headers = "Referer:http://www.csdn.net"，好像不起作用啊，用嗅探器没看到添加的这个Header，请高手帮帮忙，谢谢！

you can use the APP to strip Referer header. The header is attached by MSHTML in HttpNegotiate::BeginningTransaction.
see also
http://msdn.microsoft.com/workshop/networking/pluggable/pluggable.asp
http://support.microsoft.com/?id=kb;en-us;303740
http://home.nyc.rr.com/itandetnik/PassthruAPP.zip

----------------------------------------------------------------
如何得到用 ATL 作的控件的窗口句柄，试了几个都无效，怎么回事？
----------------------------------------------------------------
这ATL编成还真费劲，我用vs7做了个ATL控件，同时要导入一个别的绘图用的dll,但是该dll中的库函数全都需要窗口句柄，我试了控件类中的

.. code-block:: C++

    m_hWnd,m_hWndCD,GetWindow(HWND *phwnd)

成员得到的句柄都无效，把它们的数值想办法显示出来后，发现全是0，我又用

.. code-block:: C++

    m_spInPlaceSite->GetWindow(&hwndParent);

得到了控件的父窗体句柄，但是控件本身的句柄还是没有办法得到，弄了一天了，没有结果，太郁闷了，望高手相救。

windowless的控件没句柄（这是ATL Full Control的默认选项）
创建控件的时候在属性页中选择不透明就可以了

----------------------------------------------------------------
如何让CEdit控件属性为Read Only, 但是背景为白色而不是灰色
----------------------------------------------------------------

WM_CTLCOLOR消息

.. code-block:: C++

    HBRUSH CEditTest::OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor)
    {
        HBRUSH hbr = CDialog::OnCtlColor(pDC, pWnd, nCtlColor);
        pDC->SetBkColor( RGB(255, 255, 255) ); // text bkgnd
        return hbr;
    }

----------------------------------------------------------------
想做个IE插件，屏蔽掉“浮动广告”，从何下手？
----------------------------------------------------------------
最关键的是如何实现屏蔽“浮动广告”

用其它浏览器虽然可以屏蔽，但总觉得还是用IE顺手

把绝对定位的元素都隐藏
但是这样会使得gmail、微软这样的网站也不能正常使用。

-------------------------------------------------------------------------------------------
当一个USB设备和电脑连接，该USB驱动是系统自动识别的。系统如何能启动一个已经安装的程序呢？
-------------------------------------------------------------------------------------------
这个有点类似数码相机的处理软件，当数码相机和电脑连接后，系统会自动调用一个以前安装的相机处理程序，这个是怎么作到的呢？
把自己的程序加入可移动介质的自动播放列表
http://msdn.microsoft.com/library/en-us/shellcc/platform/shell/programmersguide/shell_basics/shell_basics_extending/autoplay/autoplay2k_cookbook.asp


-------------------------------------------------------------------------------------------
有个问题请教IE编程高手
-------------------------------------------------------------------------------------------
我用WebBrower控件，用IPersistStreamInit结构获取了当前网页的源文件，但是如果该网页是框架结构，就拿不到正确的源文件了，还有表单之类的，请教有什么解决方法吗？？

另一个就是如何将页面上的文字信息全部得到，比如CTRA+A复制下来粘贴到记事本里的。

http://support.microsoft.com/support/kb/articles/Q271/8/68.ASP
http://weborama.blogspot.com/2004/09/mshtml-hosting-odds-ends.html

I made a copy of some paragraphs from the second article here because blogspot is inaccessible in many Chinese networks.

Retrieving the HTML of the current selection

If you want to limit the HTML to just what a user has selected, instead of the entire document, we can use the IHTMLXxx COM interfaces. The first thing you need to do is get access to the IHTMLDocument interface for the current document. IWebBrowser2 gives you access using it's Document property. The Document property returns an IDispatch interface, so we need to QueryInterface the IDispatch interface for an IHTMLDocument interface, like so (raw C++):

.. code-block:: C++

    IDispatch* pDocDisp = 0;
    HRESULT hr = pWebBrowser->get_Document(&pDocDisp);
    IHTMLDocument2* pDoc = 0;
    hr = pDocDisp->QueryInterface(IID_IHTMLDocument2, (void**)&pDoc);
    if (SUCCEEDED(hr)) {
        //...
        pDoc->Release();
    }
    pDocDisp->Release();

The IHTMLXxx interfaces follow the W3C DOM specification used for JavaScript very closely. If your familiar with those objects, the IHTMLXxx interface will be easy to grasp. In fact, if you know how to do something using JavaScript, you can duplicate it your compiled code using the IHTMLXxx interfaces.

That said, you can get the current selection as a IHTMLTxtRange from the document element. Once you have a text range, you can retrieve the plain text or HTML text as shown below:

.. code-block:: C++

    IHTMLDocument2* pDoc = ...;

    IHTMLSelectionObject* pSelection = 0;
    HRESULT hr = pDoc->get_selection(&pSelection);
    if (SUCCEEDED(hr)) {
        IDispatch* pDispRange = 0;
        hr = pSelection->createRange(&pDispRange);
        if (SUCCEEDED(hr)) {
            IHTMLTxtRange* pTextRange = 0;
            hr = pDispRange->QueryInterface(IID_IHTMLTxtRange, (void**)&pTextRange);
            if (SUCCEEDED(hr)) {
                CComBSTR sText;
                pTextRange->get_text(&sText);
                // or
                pTextRange->get_htmlText(&sText);
                //...
                pTextRange->Release();
            }
            pDispRange->Release();
        }
        pSelection->Release();
    }

    pDoc->Release();

-------------------------------------------------------------------------------------------
请教一个关于Html视图的问题
-------------------------------------------------------------------------------------------
我在对话框程序中嵌入了一个Html视图，打开了一个网页，现在我想向网页传数据，并且要重网页接收数据，我该怎么做啊？？？
http://blog.csdn.net/jiangsheng/archive/2003/08/15/3793.aspx

集成浏览器控件时获得文档接口
当集成浏览器控件的时候,执行下列步骤获得文档接口:

调用 IWebBrowser2::get_Document 获得文档的 IDispatch 接口。（译者注：MFC的CHtmlView的GetHtmlDocument方法，浏览器控件的Document属性或者DHtmlEdit控件的DOM属性也可以用于获取文档接口）
调用在前面步骤中获得的IDispatch指针的的QueryInterface,请求IID_IHTMLDocument2。
使用文档接口

一旦你获得了文档接口,你就可以使用任何一个IHTMLDocument2接口获得或修改文档的属性。这通常包括从文档包含的不同的元素中得到一些IHTMLElementCollection接口。

一个非常普遍的集合对象是all集合对象。all集合对象是通过使用IHTMLDocument2::all （译者注：原文如此，似乎应该改成get_all）方法获得的。 这个方法返回一个包含文档的所有元素的IHTMLElementCollection接口。然后你可以使用IHTMLElementCollection::item方法枚举元素。 IHTMLElementCollection::item方法为你提供一个你能调用 QueryInterface ,请求IID_IHTMLElement的IDispatch指针。这将会给你一个你能用来为个别的元素获得或设置信息的IHTMLElement接口指针。

大多数的元素提供一个接口操纵那个特定的元素。这些元素相关的接口名字具有IHTMLXXXXElement的格式,这里XXXX是元素的名字。要获得元素相关的接口,可以在IHTMLElement接口上调用QueryInterface,请求被需要的元素相关的接口。举例来说img 元素提供一个 IHTMLImgElement接口以可能用来明确地操纵img元素。要查看可用的元素相关的接口列表,查看接口和脚本对象的接口列表。


---------------------------------
Access数据库函数问题
---------------------------------
使用Access数据库，用MS Access建一个查询Table1_View，SQL语句如下：
SELECT MyName, StrReverse(MyName) AS ReMyName FROM Table1 ORDER BY StrReverse(MyName)

在MS Access中运行正常，可以打开Table1_View记录集，但要在C Builder中打开这个记录集时，返回错误信息：表达式中‘StrReverse’函数未定义。

请问是什么原因？如何解决？

DAO中不支持从外部直接访问内建函数。参考http://support.microsoft.com/?kbid=210439

------------------------------------------------------------------
平台调用问题，如何用C#模拟C++结构中的联合（C#调用C++DLL）？
------------------------------------------------------------------
参阅文档（写的很清楚，但我的还是出错）
http://www.cnblogs.com/allenlooplee/archive/2004/12/25/81917.html

问题是这样的：在C++DLL的接口函数中要传递一个结构，此结构中包括一个联合，我用C#来写这个结构并模拟这个联合，但老出错，请大家帮忙！

C++结构声明原型

.. code-block:: C++

    typedef struct cmppe_packetcmppe_packet;
    struct cmppe_packet{
        cmppe_headpk_head;/*接收到的包头信息*///结构
        dpl_int32_tresult;/*表明解析该包的结果*/ //无符号INT型
        union{//联合
            cmppe_deliverpk_deliver;
            cmppe_login_resppk_login_resp;
            cmppe_submit_resppk_submit_resp;
        }pk_data;
    };

我用C#写的模拟：

.. code-block:: C#

    [StructLayout(LayoutKind.Sequential)]
    public struct cmppe_packet
    {
        public cmppe_headpk_head;/*接收到的包头信息*///结构
        public intresult;/*表明解析该包的结果*/
        public pk_data_struct pk_data;
    }
    　　　　 /// <summary>
    /// C#结构实现联合的方法 cmppe_packet
    /// </summary>
    [StructLayout(LayoutKind.Explicit, Size=1000)]//
    public struct pk_data_struct
    {
        [FieldOffset(0)]
        public cmppe_deliverpk_deliver;
        [FieldOffset(0)]
        public cmppe_login_resppk_login_resp;
        [FieldOffset(0)]
        public cmppe_submit_resppk_submit_resp;
    }

作为参数传递此结构是用　REF　引用　类型的。

现在在执行时出现如下错误。

其他信息: 因为格式无效，未能从程序集 esp, Version=1.0.2060.400, Culture=neutral, PublicKeyToken=null 中加载类型 esp.pk_data_struct。

Interop and Unions
http://blogs.msdn.com/jaredpar/archive/2005/05/13/417263.aspx

将

.. code-block:: C#

    [ DllImport( "api.dll", CharSet=CharSet.Ansi)]
    public static extern int cmpp_recv([MarshalAs(UnmanagedType.LPStruct)] conn_desc conn , [MarshalAs(UnmanagedType.LPStruct)] cmppe_packet cp,char is_break,ref int seq);//@@无符号char int

更改为

.. code-block:: C#

    [ DllImport( "api.dll", CharSet=CharSet.Ansi)]
    public static extern int cmpp_recv([MarshalAs(UnmanagedType.LPStruct)] conn_desc conn , IntPtr cp,char is_break,ref int seq);//@@无符号char int

然后写下列函数：

.. code-block:: C#

    private int CmppRecv(conn_desc conn, cmppe_packet cp,char is_break,ref int seq)
    {
        int strusize = System.Runtime.InteropServices.Marshal.SizeOf(cp.GetType());
        IntPtr pp = System.Runtime.InteropServices.Marshal.AllocHGlobal(strusize);
        byte[] ppp = new byte[strusize];
        int stat = esp.cmpp_recv(conn,pp,is_break,ref seq);//从ISMG服务器接收数据包，并对接收的数据包进行解析
        System.Runtime.InteropServices.Marshal.Copy(pp,ppp,0,strusize);
        System.Runtime.InteropServices.Marshal.PtrToStructure(pp,cp);
        System.Runtime.InteropServices.Marshal.FreeHGlobal(pp);
        return stat;
    }

最后调用

.. code-block:: C#

    stat = esp.cmpp_recv(conn,cp,'0',ref aa);

更改为

.. code-block:: C#

    stat=CmppRecv(conn,cp,'0',ref aa);

即可。
------------------------------------------------------------------
打开文件对话框增加文件类型
------------------------------------------------------------------
VC中打开文件对话框我想再增加一种类型，怎么修改那个资源字符串IDR_MAINFRAME啊，现内容是

.. code-block:: C++

    "Person/n/nPerson/nPER File(*.per)/n.per/nPerson.Document/nPerson Document"

我想加个.txt的


横秋的文件对话框教程
http://community.csdn.net/Expert/topic/4208/4208272.xml?temp=.3928339
MFC Document/View documentation and enhancements
http://www.codeproject.com/docview/DocViewEnhancements.asp

HOWTO: How to Support Two File Extensions per MFC Document Type
http://support.microsoft.com/kb/141921/

------------------------------------------------------------------
怎样通过SHGetFileInfo取得"桌面"图标？
------------------------------------------------------------------
SHGetFileInfo
IShellIcon::GetIconOf
http://blog.csdn.net/jiangsheng/archive/2003/11/20/3796.aspx

.. code-block:: C++
        
    ITEMIDLIST* pidlDeskTop;
    if( S_OK != SHGetSpecialFolderLocation( NULL, CSIDL_DESKTOP, &pidlDeskTop ) )
    {
        return FALSE;
    }

    SHFILEINFOW fi = { 0 };
    if( SHGetFileInfoW( ( WCHAR* )pidlDeskTop, 0U, &fi, sizeof( SHFILEINFOW ), SHGFI_PIDL | SHGFI_SYSICONINDEX ) != 0 )
    {
        // fi.iIcon 就是桌面图标在 SYSTEM IMAGE LIST 中的序号
    }

    IMalloc* pMalloc;
    if( SUCCEEDED( SHGetMalloc( &pMalloc ) ) )
    {
        pMalloc->Free( pidlDeskTop );
        pMalloc->Release( );
    }

-----------------------------------
使用自己的浏览器打开页面
-----------------------------------

咱们用WebBrowser编写的浏览器，点击网页上的一个连接的时候，有时会使用IE打开页面，而不是使用咱们自己的浏览器打开页面，如何解决这个问题？？

HOW TO: Use the WebBrowser Control NewWindow2 Event in Visual C# .NET.
http://support.microsoft.com/?id=815714

-----------------------------------
如何用c++/cli继承自己的license类
-----------------------------------

我想从system.componentmodel.license继承自己的类，但是，dispose总是不行，请大家给个建议！

.. code-block:: C++

    public ref class MyLicense : public License
    {
        public:
        MyLicese(LicenseProvider^ owner, String^ key)
        {
            this->owner = owner;
            this->key = key;
        }

    // ~MyLicense(){} <-------------这两种都不行
    // virtual void Dispose() override {}

        property String^ LicenseKey
        {
            virtual String^ get() override
            {
                return "";
            }
        }
        private:
            LicenseProvider^ owner;
            String^ key;
    };

上面是我的源代码。我重载dispose确实没有什么用处，但是我不重载的话，我的类也被认为成了abstract的了，因为基类license里的dispose是个纯虚的，我必须重载啊。不然我就没办法在我的licenseprovider的getlicense函数里gcnew 我的license类了。

.. code-block:: C++

    public ref class R {
        public:
            !R() { Console::WriteLine( "I am the R::finalizer()!" ); }
    };

在修订版语言设计中，析构函数被内部重命名为Dispose()方法，在派生类析构函数结束之后会自动调用基类析构函数。我不知道你重载Dispose方法有何特别处理。

建议重写基类，或者使用mc++语法编写你的派生类。

---------------------------------------------------------------------------------------------------------
如何判断newwindow2事件是因为遇到了包含“window.open”的脚本被触发还是用户选择了在新窗口打开
---------------------------------------------------------------------------------------------------------
小弟想做一个简易浏览器，屏蔽掉弹出窗口，但是允许用户选择“右键－》在新窗口打开”打开新窗口，请问有办法吗？

在Windows XP SP2中，弹出对话框之前会触发NewWindow3事件。

你也可以通过将window对象的showModalDialog属性设置设置为自己的函数来捕获弹出的窗口，但是这需要用类似insertAdjacentHTML的方法将自己的<Script>元素插入网页。

NWMF_USERINITED
The call to INewWindowManager::EvaluateNewWindow is the result of a user-initiated action (a mouse click or key press). Use this flag in conjunction with the NWMF_FIRST_USERINITED flag to determine whether the call is a direct or indirect result of the user-initiated action.

NWMF_FIRST_USERINITED
When NWMF_USERINITED is present, this flag indicates that the call to INewWindowManager::EvaluateNewWindow is the first query that results from this user-initiated action. Always use this flag in conjunction with NWMF_USERINITED.

http://msdn.microsoft.com/library/default.asp?url=/library/en-us/shellcc/platform/shell/reference/enums/nwmf.asp
http://msdn.microsoft.com/workshop/browser/webbrowser/reference/events/newwindow3.asp
http://forums.microsoft.com/msdn/ShowPost.aspx?PostID=7228

.. code-block:: BASIC
    
    with event doc as htmldocument
    doc = webbrowser.body.document
    sub doc_onclick()
    
    end sub

---------------------------------------------------------------------------------------------------------
请问在一个线程中创建的CWnd指针能在另一个线程中使用吗？
---------------------------------------------------------------------------------------------------------
在Thread1中建立了一个CEdit对象:

.. code-block:: C++

    class MyClass
    {
        static CEdit wndEdit;
    }

然后在Thread2中使用他：

.. code-block:: C++

    UINT MyThread2(LPVOID lp)
    {
        MyClass::wndEdit.GetWindowText();
    }

居然成功了！
但是书上说，一个线程不能使用另一个线程的CWnd，只能使用hwnd然后Attach(),
这是怎么回事？到底一个线程能不能使用另一个线程的窗口指针

如果只使用其数据成员m_hWnd的话是没问题啦，但是使用其它的函数，例如GetParentFrame就可能出问题。参考http://blog.csdn.net/jiangsheng/archive/2004/01/05/3797.aspx

蒋老大贴了自己的BLOG文章啊？

那我也贴上我自己的。

http://blog.csdn.net/loveghb/archive/2005/06/21/399784.aspx

其实都是一个意思。楼主你自己看吧。


----------------------------------------
AxWebBrowser怎样用代理访问？
----------------------------------------

.. code-block:: C++

    void CVote100Dlg::ChangeProxy()
    {
        ASSERT(m_astrProxies.GetSize()>0);
        CString strProxy=m_astrProxies[m_iProxyIndex];
        if(strProxy.IsEmpty())
        {
            INTERNET_PROXY_INFO ipi;
            ipi.dwAccessType=INTERNET_OPEN_TYPE_DIRECT;
            ipi.lpszProxy=NULL;
            ipi.lpszProxyBypass=NULL;
            UrlMkSetSessionOption(INTERNET_OPTION_PROXY,&ipi,sizeof(ipi),0);
        }
        else
        {
            INTERNET_PROXY_INFO ipi;
            ipi.dwAccessType=INTERNET_OPEN_TYPE_PROXY;
            ipi.lpszProxy=strProxy;
            ipi.lpszProxyBypass=NULL;
            UrlMkSetSessionOption(INTERNET_OPTION_PROXY,&ipi,sizeof(ipi),0);
        }
        m_iProxyIndex++;

        if(m_iProxyIndex>=m_astrProxies.GetSize())
        {
            AfxMessageBox(_T("All Proxy Used"));
            EndDialog(IDCANCEL);
            m_iProxyIndex=0;
        }
    }

---------------------------------------------------------------------------
请问当WebBrowser执行页面中的js脚本window.close()时出错，这该如何处理？？
---------------------------------------------------------------------------
PRB: WebBrowser Control Disappears When Script Calls window.close()
http://support.microsoft.com/support/kb/articles/q253/2/19.asp

---------------------------------------------------------------------------
非托管代码（VC）中如何调用用托管代码编写的DLL？？？？？？
---------------------------------------------------------------------------
1：如何在VC中区别DLL是用.Net写的还是其他语言写的
2：非托管代码（VC）中如何调用用托管代码编写的DLL
3：如何在根据路径动态加载某个DLL（这个DLL可能是用.Net vb vc delphi等不同语言写的第三方提供的）后，构造在上述DLL中定义的对象（通常是窗口，而且对象的类型是已知的，例如在C#中定义的某个Form的类名），然后显示他？

托管和非托管的dll应该是可区分的，他们的Pe格式是不一样的

http://www.cnblogs.com/caca/archive/2004/10/21/54919.html
 
在工程中加入托管代码支持，将工程改为托管和非托管混合程序。

OLE控件可以用CWnd::CreateControl创建。.Net控件用.Net的反射。没有通用的方法。

----------------------------------------------------------------------------------------
使用AfxBeginThread()创建线程，在线程结束时能使用CloseHandle()关闭该线程的句柄对象吗？
----------------------------------------------------------------------------------------
程序示例代码如下：

.. code-block:: C++

    CWinThread* pThread = NULL;

    //开启线程函数
    {
        pThread = AfxBeginThread();
    }

    //结束线程函数
    {
        WaitForSingleObject( pThread->m_hThread, INFINITE );
        CloseHandle( pThread->m_hThread ); //在调试状态下执行到这一句给出了提示信息：first chance execption in NTDLL : Invalid Handle
    }

小弟不知这是什么原因，望高手指点迷津。

再请教一个问题，就是怎样释放 pThread ,每次创建线程它都指向一个新的线程对象，而它是全局变量，这样只到程序退出前它所指向的线程对象都不会释放，而我想在一个线程结束后就能释放该线程对象，不想让 pThread 在原先的线程对象还没释放时就又指向一个新的线程对象。


http://msdn.microsoft.com/library/en-us/vccore/html/_core_Multithreading.3a_.Terminating_Threads.asp

看你是否将pThread->m_bAutoDelete置为了true.

如果置为了true,那么需要自己

.. code-block:: C++

    CloseHandle(pThread->m_hThread);
    delete pThread;

如果没有，那么pThread会自己销毁，并且在析构函数中CloseHandle的。

---------------------------
关于随机数的问题
---------------------------

.. code-block:: C++

    srand((unsigned)time(NULL)+100000);
    for (i = 0; i < range; i++)
    {

        temp = rand()%1000000;//考虑到操作符的位置
        RandNum = temp;
        flag = rand()%2;//如果flag为0，则这个数包含操作符
        if (flag == 1)
        {
            CString RandOpt = MakeOptKey(m_RandMode-1);//随机产生一个操作符，如"+","*"

            int NumLen = 1;
            while ((temp/=10))//求随机生成的数字的位数
            NumLen++;

            OptPos = rand()%NumLen+1;//随机设置操作符在数字串里的位置

            temp2.Format("%d ",RandNum);

            temp2.Insert(OptPos,RandOpt);
            CString test;
            test.Format("%d",RandNum);
            //::AfxMessageBox(test);
        }
        else
        {
            temp2.Format("%d ",RandNum);
        }

        m_strRandStr += temp2;
    }

上面代码经常会生成相同的数，即生成的随机数序列里，常会出现几个相同的在一起，有时甚至全部数里只有两个数``m_strRandStr是最后的结果```

我想请教一吓，怎样才能生成更随机化的序列？或网上有没有一些现成的类可以生成随机数的？


srand((unsigned)time(NULL)+100000);

The time function returns the number of seconds elapsed since midnight

也就是说，在同一秒内连续两次调用time这个函数的话会得到同样的结果。

用gettickcount可以获得毫秒级别的时间

-------------------------------------------------
没有可用于当前位置的代码
-------------------------------------------------

原来VC6做的一段代码，现在用vs2003并加入托管扩展（/CLR）后一切都原以为一切搞定，编译运行看起来都正常。
没想到在调试的时候没有办法用断点停留在子线程的代码上（原来在VC6是没有问题的！！）：
主程序中hThread = CreateThread(NULL,0,(LPTHREAD_START_ROUTINE)T_Child,NULL,0,&dwRet);
其中T_Child 函数中设了断点（注：直接执行下来是没有问题，即程序本身没有问题）。
程序在执行到断点的时候确实是中断了，但是总说没有可用于当前位置的代码（这代码明明就在断点设置的地方），然后我只能停留在汇编窗口，没法单步执行，设置的监视一个都不能用，一头雾水啊。。。。

If your code starts giving you that error while debugging, then do this:

Add this line to the spot where you want to start debugging:
 
System.Diagnostics.Debugger.Break();

compile your program. Then run it  WITHOUT debugging, or by running the executable outside of VS. I don't know if by just having VS installed, or if you need to have VS running, but there will be a debugger listening to debugger calls.

When that code hits that line, it will pop up a dialog asking you what you want to do, usually with these options:
 
* New instance of Microsoft CLR Debugger
* New instance of VS.Net
* Exsting instance of VS.Net

pick Microsoft CLR Debugger
Now you will be jumped to your code and can step through and everything.

NOTE: If you pick either of the VS.Net instances, you will still sometimes get the "source code not available" error!
This method is what you'd have to do for debugging Windows Services since you can run them from the VS IDE.

It may happen when the debugger is unwinding the stack. And since you (in fact, anyone) don't have access to the Framework Source code, the debugger shows that message.

---------------------------------------------------------------------------------------------------------
显示一张位图的ActiveX
---------------------------------------------------------------------------------------------------------
我想做一个Office下的ActiveX的控件，这个控件主要功能就是可以显示一张位图,不知道具体步骤是什么,可否给一点提示.

用ATL向导创建一个DLL，插入一个full control，创建时添加stock的picture属性，然后改OnDraw
参考 http://www.codeproject.com/atl/PictureTransfer.asp, http://www.vckbase.com/document/listdoc.asp?mclsid=17&sclsid=1713

---------------------------------------------------------------------------------------------------------
智能指针
---------------------------------------------------------------------------------------------------------
我刚学VC+ADO，却遇到“智能指针”这个难题。而在MSDN 2001 oct版中却查不到_ConnectionPtr、_CommandPtr、_RecordsetPtr 这些资料。所以请问有哪位大侠知道智能指针的资料，请告诉我一下，我不胜感激。谢了!!!

Sample: ADOVC1 Simple ADO/VC++ Application
http://support.microsoft.com/kb/220152/

---------------------------------------------------------------------------------------------------------
PropertySheet没有合适的默认构造函数
---------------------------------------------------------------------------------------------------------
使用CPropertySheet做属性页面时，跳出如此错误；

请高手指点

CPropertySheet不知道你会用什么做标题，所以要加这个参数来指定标题。你也可以重载CPropertySheet来自动加上标题。

---------------------------------------------------------------------------------------------------------
怎样清空History历史记录文件夹下的数据？
---------------------------------------------------------------------------------------------------------
例如路径“C:/Documents and Settings/Admin/Local Settings/History”

由于里面不是文件，所以无法用kill命令删除，请问如何用代码清除。。（以前的帖子我搜索了一下，好像没有解决的，所以不要简单粘贴以前链接，谢谢）

利用Windows函数实现对IE的History列表的读取和删除其中的某些项:

http://www.applevb.com/sourcecode/delete%20history.zip
http://blogs.msdn.com/jeffdav/archive/2005/01/12/351616.aspx

---------------------------------------------------------------------------------------------------------
有没有控件可以用来显示网页的。
---------------------------------------------------------------------------------------------------------
方法1 用CoCreateInstance创建IE对象来自动化IE
方法2 用CWnd::CreateControl来创建浏览器控件
http://blog.csdn.net/jiangsheng/archive/2004/07/06/35567.aspx

---------------------------------------------------------------------------------------------------------
如何抓取网页上的所有文字
---------------------------------------------------------------------------------------------------------
例如CTRL+A拿到所有的文字信息，可以粘贴到写子版里的功能。
我用WebBrowser控件，目前是向空间发送IDM_SELECTALL和IDM_COPY消息模拟CTRL+A和CTRL+C的功能的，但是遇到某些无法复制的网页就没办法了，有什么好的解决方法吗？？

Retrieving the HTML of the current selection
If you want to limit the HTML to just what a user has selected, instead of the entire document, we can use the IHTMLXxx COM interfaces. The first thing you need to do is get access to the IHTMLDocument interface for the current document. IWebBrowser2 gives you access using it's Document property. The Document property returns an IDispatch interface, so we need to QueryInterface the IDispatch interface for an IHTMLDocument interface, like so (raw C++):

.. code-block:: C++

    IDispatch* pDocDisp = 0;
    HRESULT hr = pWebBrowser->get_Document(&pDocDisp);

    IHTMLDocument2* pDoc = 0;
    hr = pDocDisp->QueryInterface(IID_IHTMLDocument2, (void**)&pDoc);
    if (SUCCEEDED(hr)) {
        //...
        pDoc->Release();
    }
    pDocDisp->Release();

The IHTMLXxx interfaces follow the W3C DOM specification used for JavaScript very closely. If your familiar with those objects, the IHTMLXxx interface will be easy to grasp. In fact, if you know how to do something using JavaScript, you can duplicate it your compiled code using the IHTMLXxx interfaces.

That said, you can get the current selection as a IHTMLTxtRange from the document element. Once you have a text range, you can retrieve the plain text or HTML text as shown below:

.. code-block:: C++

    IHTMLDocument2* pDoc = ...;

    IHTMLSelectionObject* pSelection = 0;
    HRESULT hr = pDoc->get_selection(&pSelection);
    if (SUCCEEDED(hr)) {
        IDispatch* pDispRange = 0;
        hr = pSelection->createRange(&pDispRange);
        if (SUCCEEDED(hr)) {
            IHTMLTxtRange* pTextRange = 0;
            hr = pDispRange->QueryInterface(IID_IHTMLTxtRange, (void**)&pTextRange);
            if (SUCCEEDED(hr)) {
                CComBSTR sText;
                pTextRange->get_text(&sText);
                // or
                pTextRange->get_htmlText(&sText);
                //...
                pTextRange->Release();
            }
            pDispRange->Release();
        }
        pSelection->Release();
    }

    pDoc->Release();

apply get_text to the <Body> element or <Html> element may fail when the element is missing.

you can also use Microsoft Word as a converter. see http://engine.keeboo.com/admin/KeeBookCreator.txt.
 
一般直接调用pDoc->get_body, pBody->get_outerText即可,不必选中,body元素不存在的情况不多

.. code-block:: C++

    IDispatch* pDocDisp = 0;
    HRESULT hr = pWebBrowser->get_Document(&pDocDisp);

    IHTMLDocument2* pDoc = 0;
    hr = pDocDisp->QueryInterface(IID_IHTMLDocument2, (void**)&pDoc);
    if (SUCCEEDED(hr)) {
        IHTMLElement* pBody;
        hr = pDoc->get_body(&pBody);
        if SUCCEEDED(hr))
        {
            BSTR bstrHTMLText;
            hr = pBody->get_outerText(&bstrHTMLText);
            //这个就是网页文本
            CString strText = bstrHTMLText;
            ......
            SysFreeString( bstrHTMLText);
            pBody->Release();
        }
        pDoc->Release();
    }

    pDocDisp->Release();


Frame访问

如果是框架,并且其中的文档是HTML，那么可以查询其IWebBrowser2接口来获得你需要的接口
否则可以查询当前HTML文档的IServiceProvider接口，然后查询IID_IWebBrowserApp服务。
参考 http://msdn.microsoft.com/msdnmag/issues/01/06/c/, http://support.microsoft.com/default.aspx?id=196340

.. code-block:: C++

    IHTMLDocument2* pDoc2;
    CComBSTR tagName;
    pElement->get_tagName(&tagName);
    CString str = tagName;
    str.MakeUpper();
    if (str == "FRAME" || str == "IFRAME")
    {
        HRESULT hr;
        IHTMLWindow2 *pHTMLWindow;
        IHTMLFrameBase2* pHTMLFrameBase2;
        hr =pElement->QueryInterface(IID_IHTMLFrameBase2, (void**)&pHTMLFrameBase2);
        pElement->Release();
        hr = pHTMLFrameBase2->get_contentWindow(&pHTMLWindow);
        pHTMLFrameBase2->Release();
        hr = pHTMLWindow->get_document(&pDoc2);
        //然后用IHTMLDocument2对域进行操作
    }


跨域的Frame访问

http://msdn.microsoft.com/library/default.asp?url=/workshop/browser/mshtml/reference/ifaces/document2/domain.asp

----------------------------------------------------------
CListView继承的类中OnTimer事件为何不能定时执行?
----------------------------------------------------------
程序基于MFC/SDI,CTestView继承于CListView。
部分代码：

.. code-block:: C++

    //OnTimer事件均定义了消息映射和响应声明，响应函数如下

    void CTestView::OnTimer(UINT nIDEvent)
    {
        //...
        CListCtrl& lc = GetListCtrl();
        CString szValue;
        CTime time_cur= CTime::GetCurrentTime();
        szValue.Format("%02d:%02d:%02d",time_before.GetHour(),time_before.GetMinute(),time_before.GetSecond());
        nItem =lc.InsertItem(0,szValue);
        //...
        CListView::OnTimer(nIDEvent);
    }

Timer事件在OnCreate(LPCREATESTRUCT lpCreateStruct)中SetTimer，在OnDestroy()中KillTimer

现象：程序运行开始时在CTestView添加了两行记录，接着就没反应

点击ListCtrlItem会不定期地响应，时间间隔各不一样。

问题：

（1）CTestView中关于ListCtrl的初始化或者Insert操作出错？但照搬到基于MFC/CDialog的程序中,一切正常
（2）CTestView接收消息是否先经由CMainFrame处理？是否需要CMainFrame接收到消息再传递给CTestView？
（3）OnTimer的执行为什么断断续续？

>CListView::OnTimer(nIDEvent)究竟干了些什么
里面会调用KillTimer。
所以如果nIDEvent是你自己的定时事件，就不要调用默认的处理过程。

-----------------------------------------
请问ASF文件头的字节数是几多？？
-----------------------------------------
能提供它的数据结构更好？

变长。最大64K字节。参考
http://www.microsoft.com/china/msdn/archives/library/dnwmt/html/AddingWindowsMediaSupportwiththeWindowsMediaFormat.

-----------------------------------------
关于richedit的重画`
-----------------------------------------
关于richedit的重画``我想给richedit里的某一个词话下划线，可是我在OnPaint()里dc.drawtext(...)就不行了，画的时候那个光标会有轨迹，要手动使窗体重画（如最小化），那些轨迹才会消失`而且背景变成窗体的背景色了``请问richedit重画`应该是怎样画呢？有画过的说一吓`
我想画的下划线可能是波浪线或直线``但是是彩色的，有的人可能说那直接将该字符串变色，那它的下划线也是彩色``可是我现在是想字体不变色，下面的线是彩色的`

http://msdn.microsoft.com/library/en-us/shellcc/platform/commctls/richedit/richeditcontrols/richeditcontrolreference/richeditstructures/charformat2.asp

CFE_OUTLINE
Characters are displayed as outlined characters. The value does not affect how the control displays the text.
CFE_REVISED
Characters are marked as revised.

bUnderlineType
Specifies the underline type. To use this member, set the CFM_UNDERLINETYPE flag in the dwMask member. This member can be one of the following values.
CFU_CF1UNDERLINE
The structure maps CHARFORMAT's bit underline to CHARFORMAT2, (that is, it performs a CHARFORMAT type of underline on this text).
CFU_UNDERLINE
Solid underlined text.
CFU_UNDERLINEDOTTED
Dotted underlined text. For versions earlier than Rich Edit 3.0, text is displayed with a solid underline.
CFU_UNDERLINEDOUBLE
Double-underlined text. The rich edit control displays the text with a solid underline.
CFU_UNDERLINENONE
No underline. This is the default.
CFU_UNDERLINEWORD
Underline words only. The rich edit control displays the text with a solid underline.

------------------------------
程序结束后希望删除文件夹
------------------------------
文档视图结构，怎样实现关闭程序的时候，删除一个指定的包含有若干文件的文件夹？在线等，谢谢

此文件夹是在程序的运行过程中生成的

用以装载程序所用到的一些临时文件（这些文件也是运行时生成的）

当程序结束后希望删除文件夹及其内部的文件
最好做到彻底删除（即不是转移到回收站中）

打算在View类中实现

应该重载哪个函数呢？

应该怎样处理呢？

When used to delete a file, SHFileOperation permanently deletes the file unless you set the FOF_ALLOWUNDO flag in the fFlags member of the SHFILEOPSTRUCT structure pointed to by lpFileOp. Setting that flag sends the file to the Recycle Bin. If you want to delete a file and guarantee that it is not placed in the Recycle Bin, use DeleteFile.

-----------------------------------------------------------
RichEdit拖动
-----------------------------------------------------------

如何实现，在两个RichEdit编辑框中：用鼠标选中一个编辑框中的部分内容然后拖动到另一个编辑框？

http://www.codeguru.com/Cpp/misc/misc/draganddrop/article.php/c349/

-----------------------------------------------------------
怎样在资源编辑器中调整对话框大小到需要的象素点
-----------------------------------------------------------

在资源编辑器中，通过拉动可以调整对话框大小，在状态条下面还可以看到一个大小指示的宽和高，问题是那个宽高值不是实际象素，怎样才能让一个对话框在资源管理编辑器中调到到需要的象素点（不用写程序的那种）。

http://support.microsoft.com/support/kb/articles/q145/9/94.asp

-----------------------------------------------------------
"IInputObject” : 没有与该对象关联的 GUID 
-----------------------------------------------------------

网上下的VC6的ATL代码在vc7下报这个错是怎么回事？

是这句报错：　COM_INTERFACE_ENTRY(IInputObject)

PRB: Error C2787 When Building a Project Using ATL 3.0
http://support.microsoft.com/?id=192561

-----------------------------------------------------------
VC6编写的扩展MFC的DLL，为什么用VC7调用不了？？
-----------------------------------------------------------
在VC6中编写的扩大展MFC DLL中有一成员函数，如下：

.. code-block:: C++

    AddDoc(){
    BOOL bSuccess = FALSE;

    CWinApp* pApp = AfxGetApp();
    ASSERT(pApp);
    if(pApp)
    {
        CMultiDocTemplate* pDocTemplate;

        pDocTemplate = new CMultiDocTemplate(
            IDR_REPORT_MANAGE_DOCTYPE,
            RUNTIME_CLASS(CReportDoc),
            RUNTIME_CLASS(CReportTableFrm),
            RUNTIME_CLASS(CReportView));
        ASSERT(pDocTemplate);
        if(pDocTemplate){
            pApp->AddDocTemplate(pDocTemplate);
            bSuccess = TRUE;
        }
        return bSuccess;
    }

在VC7应用程序中，调用后，出错，文档加载不了，但在VC6可以正常运行，
不知有哪位朋友有解决办法？还请多多帮忙，解决一下！

MFC的很多类的虚函数和数据成员的数目变了，CString甚至成了模板类，不要期望旧版本的扩展DLL可以拿来就用。

最好是做成WIN32的动态库。

扩展动态库一般只在MFC42支持的开发工具间使用。而vc7.0，MFC42支持不了。

-----------------------------------------------------------
在VC6.0的Enable profiling选项在VC7.0里面如何设置？
-----------------------------------------------------------
A previous reply:

Hi Lewis,

That is correct, there is no profiler shipping as part of VC 7.0. You will
need to use a third party product.

The reason for that is exactly as you state, what we shipped was not of
sufficient quality and good third party products exist.

Ronald Laeremans
Visual C++ compiler team

-----------------------------------------------------------
多线程调度
-----------------------------------------------------------
要求是这样的：

有n多的url 用一定数量的thread依照次序下载 比如5个 先下前5个 一个线程下载结束后 接着下载下面的 这样循环利用5个thread
可以这样做吗？如果可以如何做（最好有代码参考）？如果不可以 怎么做？

Check my reply to an old post "继续多线程问题--我使用CEvent进行多线称同步！"
http://bbs.csdn.net/Expert/topic/249/249613.xml

-----------------------------------------------------------
#import调用自动化接口的问题
-----------------------------------------------------------
我用的是

.. code-block:: C++
    
    #import "c:/windows/system32/opcdaauto.dll" no_namespace

程序：

.. code-block:: C++

    try
    {
        IOPCAutoServerPtr myServer( __uuidof(IOPCAutoServer));
    }
    catch(_com_error e)
    {
        AfxMessageBox(e.ErrorMessage());
    }

跳出"没有注册类别“对话框

我已经用了regsvr32 c:/windows/system32/opcdaauto.dll

请问是什么问题啊？？？？帮帮忙啊
 
类的接口ID和CLSID可以不一样的。用

.. code-block:: C++
    
    #import "c:/windows/system32/opcdaauto.dll" named_guid
    
看看生成哪些CLSID。

那就用CLSIDFromProgID获得CLSID看看,或者直接用_com_ptr的构造函数

.. code-block:: C++

    HRESULT hr;
    IOPCAutoServerPtr myServer;
    hr=myServer.CreateInstance( __uuidof(IOPCAutoServer));//这里要的是clsid不是iid，只要找到clsid即可！

试试：

.. code-block:: C++

    HRESULT hr;
    IOPCAutoServerPtr myServer;
    hr=myServer.CreateInstance( __uuidof(OPCServer)); //估计就是它了，你的tlh给的不全只能猜测到这里了！

-----------------------------------------------------------
关于openfiledialog的问题
-----------------------------------------------------------
我想做一个自定义的open file dialog

我做了一个ie的扩展,就是如果显示风格是detail的时候，标题栏有我自定义的列
现在的问题是，当我用open file dialog的时候，也想像ie那样，记住我上次的选择
或者是实现默认显示风格是detail的，并且把我的自定义列显示出来也可以
我现在实现了默认显示风格是detail的，但是我想显示我自定义的列就出问题了
就是说在显示成detail的风格的时候，不能给他自定义显示列

.. code-block:: C++

    private int HookProc(int hdlg, int msg, int wParam, int lParam)
    {
        switch (msg)
        {
            case WM_NOTIFY:
            if (iSetList != 2)
            {
                int hCtrl = FindWindowEx(GetParent(hdlg),0,CONTROL_LISTVIEW_NAME,"");//SysListView32
                if(hCtrl != 0)
                {
                    SendMessage(hCtrl, WM_COMMAND, GetViewMode(ViewMode), 0); //打开文件对话框，默认是detail风格，就是在这里，我怎么让它不显示默认的列，比如大小，种类。日期等，而去显示我自定义的列
                }
                iSetList++;
            }

            NMHDR nmhdr=(NMHDR)Marshal.PtrToStructure(new IntPtr(lParam), typeof(NMHDR));
            if (nmhdr.Code == CDN_SELCHANGE)//选择文件改变，记住文件名称
            {
                int hCtrl1 = FindWindowEx(GetParent(hdlg),0,CONTROL_TEXT_NAME,"");//ComboBoxEx32
                if(hCtrl1 != 0)
                {
                    GetWindowText(hCtrl1,Buff,nChars);
                    strTemp = Buff.ToString();
                }
            }

            break;

        }
        return 0;
    }

整个的代码太多了，上面是我重写的hook，可以显示detail风格的，比如默认的大小，种类，更新日期
现在我想去掉这些列，默认显示其他的列，也就是我自定义的列

我实现的功能是把硬盘上的特定的文件中的内容解析出来，当是detail风格的时候，我就把他们按照选择的列显示出来

资源管理器可以记住我上次的操作，但是这个对话框记不住，所以我只好让它默认显示我定义的列

我不知道如何控制文件夹视图的列的选择。你可以自己实现一个基于ListView的文件选择对话框。


----------------------------------
如何直接从Cobject类中派生新类！
----------------------------------

我在按照一本参考书说的做一个图形类的应用程序，上面需要建立一个新类，新类要以CObject类为父类，但我在Class Wizard 选择基类的列表框中却找不到CObject，请高手不吝赐教！

When you want to create a new class with classwizard, and you want to derive a class not listed in MFC or ATL class list, use the "generic class" option and type the name of you class. If you're lucky, the right headers will be added, otherwise add them yourself

------------------------------------------------
关于类似CHM文件的适用于IE的自定义协议的开发
------------------------------------------------
许多软件如chm的帮助可设计自己的协议供ie控件访问本程序提供的页面，如mk:@msitstore:i:/，请哪位提供一些这方面的参考资料（包括msdn中的大致位置）

我觉得用这种方式有很多用途，比如在程序中自带帮助信息就比较方便

http://msdn.microsoft.com/workshop/networking/pluggable/pluggable.asp


---------------------------------------------------------------------------------------------
在vb中能否通过向其他程序控件发送WM_GETCONTROLNAME消息得到这个控件的name
---------------------------------------------------------------------------------------------

主要想实现在vb里区分其他程序窗体里同级、同标题、同类的控件。。。。。。。用其他方法都似乎不太保险

WM_GETCONTROLNAME仅用于获得本进程内的Winform控件名称。对于其他应用程序，可以尝试获得窗口类信息。

参考 http://msdn.microsoft.com/library/en-us/dnwinforms/html/autowforms.asp#autowforms_topic5

--------------------------------------------------------------------
如果取得webbrowser控件带框架frame/iFrame中的文档对象!
--------------------------------------------------------------------
FAwebbrowser.document只能取得主文档,如果里面包含了架frame/iFrame,如何取得架frame/iFrame中的文档对象?

如何枚举出webbrowser.document所有的frame/iFrame及其中的document对象.

.. code-block:: BASIC
    
    webbrowser.document.frames(0)

    返回的是HTMLWindow2,里面的Document拒绝访问.

    还有iFrame中的文档对象如何访问?

http://support.microsoft.com/kb/238313

--------------------------------------------------------------------
如何实现自动在网页中输入内容，并点击相关的按钮
--------------------------------------------------------------------
比如一个网页http://xxx.xxx.xxx.xxx/abc.asp中有如下结构

xxx 输入框1 按钮1
xxx 输入框2 按钮2
输入框3 xxx 输入框4 按钮3

我现在想用个Timer来循环做：往输入框1填入固定内容，然后点按钮1.
不知道该如何实现，不需要显示出网页，是否用IdHttp?

http://support.microsoft.com/kb/311293
http://support.microsoft.com/?kbid=815722

--------------------------------------------------------------------
如何判断网页已经下载完毕
--------------------------------------------------------------------

我用Navigate2(_T("http://www.163.com/"),NULL,NULL);打开一个页面,如何判断网页已经下载完毕了呢?

http://support.microsoft.com/support/kb/articles/q180/3/66.asp

--------------------------------------------------------------------
命令行导出DSP文件
--------------------------------------------------------------------

请教:用VC6将DSP文件导出makefile文件，可以用 cmd命令行来实现吗？如何做 谢谢？找了MSDN帮助 未果。

写一个导出mak的宏，然后调用msdev -ex MacroName


--------------------------------------------------------------------
MFC模式下开发的对话框程序如何使用ADO.NET？
--------------------------------------------------------------------

请问在VC.NET的MFC模式下开发的对话框程序如何使用ADO.NET？多谢！！

在.NET模式下可以用using ...OleDB

那么在MFC模式下要些什么？

MFC和.NET不是互斥的

参考 http://blog.joycode.com/jiangsheng/archive/2005/03/19/46065.aspx

--------------------------------------------------------------------
如何快速的删除NNN多的小文件？
--------------------------------------------------------------------
由于项目需要会生成许多许多（上百万个8k左右大小的文件），在删除文件的时候遇到了问题，删的特别特别的慢，目前是使用DOS模式命令删除（因为在windows下删的更慢）。 是否有好的办法？谢了

BOOL MoveFileEx(LPCTSTR lpExistingFileName,LPCTSTR lpNewFileName, DWORD dwFlags);

MoveFileEx allows you to move a file from one directory to another. Passing NULL for the lpNewFileName parameter tells the system to move the file to nowhere. This is the same thing as telling the system to delete the file and is basically the same thing as calling DeleteFile. So why would this be a better solution? MoveFileEx's third parameter, dwFlags, allows you to specify flags that alter the behavior slightly. The MOVEFILE_DELAY_UNTIL_REBOOT flag tells the system that the file is not to be moved (deleted) until the system is rebooted.

--------------------------------------------------------------------
转换函数的用法
--------------------------------------------------------------------
VC下如何进行UNICODE和ANSI字符串的转换~转换函数的用法~还有比较两个字符串大小的函数和用法

It is very handy to include atlconv.h and use the T2OLE and OLE2T macros with USES_CONVERSION;, but you can still call WideCharToMultiByte and MultiByteToWideChar directly.
 
--------------------------------------------------------------------
怎么在vc中嵌入vbscript脚本，或者怎么把脚本转化成vc语句
--------------------------------------------------------------------
例如：

.. code-block:: BASIC

    Set obj = GetObject("winmgmts:{impersonationLevel=impersonate}!root/default:SystemRestore")

    If (obj.Disable(Drive)) = 0 Then

http://blog.csdn.net/jiangsheng/archive/2003/11/09/3795.aspx

--------------------------------------------------------------------
怎么用程序实现抓取某网页的HTML
--------------------------------------------------------------------
输入URL

由程序抓回HTML

怎么实现呢？

用winsock吗

http://msdn.microsoft.com/archive/en-us/samples/internet/browser/walkall/default.asp
http://bbs.csdn.net/Expert/topic/1921/1921625.xml

--------------------------------------------------------------------
ASSERT_VALID(m_pViewActive)出错是怎么回事？
--------------------------------------------------------------------
SDI程序中调用DLL中的对话框结果弹出一个断言错来：
wincore.cpp
line:884
继续跟下去在CFrameWnd::AssertValid()中，ASSERT_VALID(m_pViewActive)在这出错了，DLL中还有函数，位图资源，如果不调用DLL中的对话框，则一切正常。

http://support.microsoft.com/kb/

--------------------------------------------------------------------
如何把 createElement 得到的元素插入文档
--------------------------------------------------------------------
这个问题一直困惑着我，也一直没寻找到解决方法。

.. code-block:: C++
    
    IHTMLDocument2* pHtmlDoc2;
    GetDHTMLDocument(&pHtmlDoc2);
    IHTMLElement* pELe;
    pHtmlDoc2->createElement(CComBSTR("<span style="width:10px"></span>"),&pEle);

但是创建了这个 pEle 之后该如何把它插入到文档中去呢？执行上面的代码，HTML 文档没显示任何变化。查 MSDN 得知这需要通过 IHTMLDOMNode 把它插入节点中去，但也语焉不详。

.. code-block:: C++

    IHTMLDOMNode::insertBefore(
        IHTMLDOMNode *newChild,
        VARIANT refChild,
        IHTMLDOMNode **node
    );

newChild

[in] IDispatch that specifies the new element to be inserted into the document hierarchy. Elements can be created with the IHTMLDocument2::createElement method.

这一段很难理解。如何从createElement 得到的 Element ，再得到 IHTMLDOMNode * newChild ？

refChild
[in] IDispatch that specifies the new element to be inserted before this child element, if specified.
node
[out, retval] Returns a reference to the element that is inserted into the document.

要在文档任意位置插入 Element，该如何做？

我现在已知道如何在某个光标闪烁的位置插入元素了，是通过IDisplayServices得到的ITHMLCaret来获取当前光标所在的IMarkupPointer，但就你所摘的例子，如果我用鼠标选中dog，那么如何得到[pend]呢？

queryinterface啊
不过不建议用IE的DOM插入Node，用IE的标记编辑服务的IMarkupServices::InsertElement比较好，这样可以指定插入元素的位置
http://msdn.microsoft.com/workshop/browser/mshtml/overview/intromarkupsvc.asp
For example, consider calling IMarkupServices::InsertElement on a b element with the following pointers:

My [pstart]dog[pend] has fleas.
They would produce a document with the following content:

My [pstart]<B>dog[pend]</B> has fleas.

IHTMLEditServices::MoveToSelectionAnchor /IHTMLEditServices::MoveToSelectionEnd

-------------------------------------------------
如何在自己的应用程序里实现远程桌面?
-------------------------------------------------
想利用WIN32的API,但却不知道该怎样调,调哪些? 同时想把远程桌面连接的窗口嵌入自己设计的窗体里,请高手指点.

远程桌面使用的是RDP协议。你可以根据这个协议自己实现客户端

参考http://www.rdesktop.org/

-------------------------------------------------
如何使用VC来更改"工作组"或"域"
-------------------------------------------------
因需要大量的重复修改机器

请教高手解决，我找不到具体的WIN接口函数.
另:9X系列与NT系列是否有所不同?

VC中没有内建这样的功能，你需要调用WMI脚本。搜索Visual C++ 和WMI你就可以找到在Visual C++中如何调用WMI。
 
方案：更改 DNS 服务器和域

在企业发生重大变革时（例如，合并、收购和重组），组织的 DNS 域层次结构可能会发生改变，因而可能必须对主机进行重新配置，才能让它们在新的结构内正常运行。

在此方案中，Fabrikam, Inc. 的 IT 部门将以前位于顶级域 fabrikam.com 中的客户端分配到不同的子域中：hr.fabrikam.com、it.fabrikam.com 和 ac.fabrikam.com。各个新的子域需要为包含的客户端配置一个新的 DNS 服务器搜索顺序。各个子域的主 DNS 服务器还将成为其他两个子域的备用服务器。

此脚本使用 Win32_NetworkAdapterConfiguration 方法 SetDNSDomain() 和 SetDNSServerSearchOrder()，而没有使用 EnableDNS()。EnableDNS() 需要两个其他可选参数（可以保留为空白）；前面的两个方法可以准确地设置此示例所需的参数。如有必要，您可以轻松地扩展该脚本，使之使用 SetDynamicDNSRegistration() 方法来配置主机的动态注册设置。

http://www.microsoft.com/china/technet/community/scriptcenter/topics/networking/05_atnc_dns.mspx

例如，我们经常被问及“为什么 TechNet 的脚本中心里的‘加入计算机到域’脚本在 Windows 2000 中不能用？”回答是，因为在 Windows 2000 中的 Win32_ComputerSystem 类（它是在脚本中使用的 WMI 类）不支持 JoinDomainOrWorkGroup 方法。在内置于 Windows XP 和 Windows Server 2003 的 WMI 版本中，JoinDomainOrWorkGroup 方法被添加到 Win32_ComputerSystem 类中。

http://www.microsoft.com/china/MSDN/library/enterprisedevelopment/softwaredev/WDdnclinicscripting.mspx

http://www.microsoft.com/technet/scriptcenter/guide/sas_wmi_osjn.mspx
http://www.microsoft.com/technet/scriptcenter/topics/networking/05_atnc_dns.mspx

-------------------------------------------------
求救:View类或CDialog类文件无故被删!
-------------------------------------------------
各位大虾,我在用vc编程的时候,时常会出现这样的问题:

1. 当为一新建的对话框创建一个类时,按照正常步骤填写类名,并且选择CDialog类的
基类时,点击ok后,停了一阵子然后它就跳出说:"添加失败",不仅如此还连主程序的
view类的cpp文件或者主程序的Dlg类的cpp文件都被删除了!!害得不得不要一切
重头来过,实在是非常郁闷!

2. 有时是当为对话框的一个控件如按钮在类向导里设置变量时,当填好变量名选好类型
后,点ok,又是过了几秒钟后说添加失败,同时电脑居然把该对话框的cpp文件都给
删除了!!

3.有时是当为对话框的一个控件添加点击函数时,在类向导里,点击Add Function成功后
借着点击edit code时,居然又说失败,同时自动把对话框的cpp文件删除了

这究竟是怎么回事?真是太烦人了!因为这个原因我不知道重做了多少个程序---全部
从头开始做啊!!郁闷!!!

各位大虾帮忙看看这是什么问题啊?究竟是硬件问题,还是软件问题呢?该怎么解决呢?

ps.应该不是中毒,因为我用最新的norton查了几次了,而且除了在vc的这个问题上,其他
的都正常.

谁来搭救一下小弟啊!!

norton杀毒工具是典型的文件隔离扫描类型，在隔离时文件不可访问，致使旧版本的Visual Studio报告文件找不到。解决的办法就是关掉norton，或者升级Visual Studio

http://support.microsoft.com/kb/822856/

-------------------------------------------------
如何将CImage对象存储到复合文档中？
-------------------------------------------------
是不是要用这个函数？

CImage::Save(IStream* pStream,REFGUID guidFileType)

怎么用？

#include <gdiplus.h>
using namespace Gdiplus;
http://www.codeproject.com/bitmap/picturestream.asp

-------------------------------------------------
WebBrowser1如何实现自动完成？
-------------------------------------------------
网络上有VC++的代码，但看不懂。

用WebBrowser1控件编写浏览器如何实现自动完成？注意不是指地址栏。

是网页中的文本框。比如输入用户名的地方，鼠标点上去就自动列出曾经输入的内容？

谢谢！

The cleanest way of controlling these interesting aspects of the Webbrowser control is through implementing the IDocHostUIHandler interface, but you can't find an easy way to do this in VB6. So, how do you implement it? Will the only easy way in the pre .Net days was through VC++ and there is a sample of how it can be done up on the MS Support web site ( http://support.microsoft.com/support/kb/articles/Q183/2/35.ASP), and I found some guy worked very hard to translate this sample into VB ( http://www.topxml.com/code/default.asp?p=3&id=v20031122135204). However, this method is less satisfactory: the customization can not be done before DocumentComplete, because a full DHTML Document object is needed to access its ICustomDoc interface.

The better implementations are written in native C++, usually based on MFC or ATL. One of them is the driller sample ( http://msdn.microsoft.com/archive/en-us/samples/internet/browser/driller/default.asp), and the other is the MFC 8.0 implementation, while MFC 7.0 and 7.1 are buggy.

In .Net 1.0 and 1.1, you can implement the IDocHostUIHandler interface much easier (http://www.codeproject.com/csharp/advhost.asp), however, the implementation of the .Net wrapper of the WebBrowser control is almost unknown, so ICustomDoc is also required.

In .Net 2.0 (still in beta), the new WinForm WebBrowser control is much better, and is almost the same of the MFC 8.0 implementation. However, its implementation details are still almost unknown, but it would satisfy most of WebBrowser developers.

-------------------------------------------------
求教:如何用AxWebBrowser控件浏览chm文件的内容
-------------------------------------------------
我做的一个程序里想用自己定义的帮助界面.但是不知道怎样用AxWebBrowser控件浏览chm文件的内容
.

手动打开一个CHM，右键单击网页，在上下文菜单里面选择属性就可以看到CHM里面的网页的地址了

-------------------------------------------------
从IHTMLDocument2接口重写网页源代码的问题
-------------------------------------------------
使用IHTMLDocument2::write()可以重写网页的源代码，但重写后IE就断开了连接了（此时看IE的“文件--属性”，发现地址是：about:blank）有没有什么方法重写网页源代码而不让IE断开呢

MSDN上面是写用IDispatch来QueryInterface出IPersistStreamInit的，但我试了发现得不到接口位置，反而用IHTMLDocument2可以QueryInterface出IPersistStreamInit。执行结果也的确修改了网页内容，但是。。。属性还是显示about:blank。。还是断开了啊

The easiest way to do this is to embed a <base> tag into the generated
HTML. You don't have to save it to disk, or make visible to the user,
just feed it in the stream with the rest of the content.

Another way is to write a custom implementation of IMoniker interface.
You only need a non-trivial implementation of two methods: BindToStorage
should return the IStream with your HTML content, and GetDisplayName
should return the base URL you want to use to resolve relative links.
You then use IPersistMoniker to feed the content into MSHTML using this
custom implementation, instead of IPersistStreamInit. Disclaimer: I have
not done this myself, but I've seen people reporting successful use of
this technique.

Changed your LoadFromStream method to QI on the WebBrowser Document for
IPersistMoniker then pass your implementation of IMoniker that
implemented BindToStorage and GetDisplayName. In BindToStorage you simply use
a TStreamAdapter and return the stream.

.. code-block:: C++
        
    IHtmlMoniker* pHtmlMoniker = NULL;
    hr = CoCreateInstance(CLSID_HtmlMoniker, NULL, CLSCTX_INPROC_SERVER, IID_IHtmlMoniker, (LPVOID*)&pHtmlMoniker);
    if (SUCCEEDED(hr) )
    {
        pHtmlMoniker->SetDocStream(pStream);
        pBrowser->LoadFromMoniker(pHtmlMoniker);
    }

    class ATL_NO_VTABLE CHtmlMoniker:
        public CComObjectRootEx<CComSingleThreadModel>,
        public CComCoClass<CHtmlMoniker, &CLSID_HtmlMoniker>,
        public IHtmlMoniker
    {
    }

    STDMETHODIMP CHtmlMoniker::BindToStorage(IBindCtx* pbc, IMoniker* pmkToLeft, REFIID riid, void** ppvObj)
    {
        return m_pDocStream->QueryInterface(riid, ppvObj);
    }

    STDMETHODIMP CHtmlMoniker::GetDisplayName(IBindCtx* pbc, IMoniker* pmkToLeft, LPOLESTR* ppszDisplayName)
    {
        if (!ppszDisplayName)
        return E_INVALIDARG;

        CString szBaseUrl = "C://Projects//testfiles//html";
        *ppszDisplayName = szBaseUrl.AllocSysString();

        return NOERROR;
    }

    HRESULT CBrowser::LoadFromMoniker(IMoniker* pMoniker)
    {
        IPersistMoniker* pPersisitMoniker = NULL;
        IBindCtx* pBindCtx = NULL;

        if (SUCCEEDED(hr = CreateBindCtx(0, &pBindCtx)))
        {
            // Retrieve the document object.
            hr = m_pBrowserCtrl->get_Document(&pHtmlDoc);

            if (SUCCEEDED(pHtmlDoc->QueryInterface(IID_IPersistMoniker, (LPVOID*)&pPersisitMoniker)))
            {
                hr = pPersisitMoniker->Load(FALSE, pMoniker, pBindCtx, STGM_READ);
                pPersisitMoniker->Release();
            }
        }
    }

 

http://www.adminlife.com/247reference/msgs/15/77697.aspx

-------------------------------------------------------
请问，mfc里面，如何获得控制台所传出来的参数？
-------------------------------------------------------
用控制台来启动应用程序，想在后面加两个参数，mfc工程该如何接收？请大家指教

ANSI版本的C++程序仍然可以使用标准C的main主函数入口参数argc和argv或者WinMain函数的lpCmdLine参数。但是，这些参数都是LPSTR类型而不是LPTSTR类型，所以不能用于Unicode版本的程序。Unicode版本的程序可以使用GetCommandLine获得命令行字符串，以及使用CommandLineToArgvW来获得argc和argv风格的数据。

MFC程序当然也是C++程序，所以上面的方法仍然有效。一般情况下，应用程序可以访问CWinApp::m_lpCmdLine来处理参数。为了简化这个处理，MFC也提供了命令行处理过程的封装类CCommandLineInfo，支持了标准的命令行开关的分析。更高级的命令行参数的处理可以参考MSJ 1999年10月号，Paul DiLascia在C++Q&A专栏中描述的CCommandLineInfoEx类（ http://www.microsoft.com/msj/1099/c/c1099.aspx）。它通过重载CCommandLineInfo ::ParseParam，之后保存分析的结果来提供自定义命令行开关分析方式的方法。
http://www.codeproject.com/cpp/cmdlineparser.asp

可以用这个类来解析命令行
参数从CWinApp::m_lpCmdLine即可以获得
 

-------------------------------------------------------
使用WebBrowser组件穿过代理服务器的疑问
-------------------------------------------------------

.. code-block:: Delphi

    ipi.dwAccessType := INTERNET_OPEN_TYPE_PROXY;
    ipi.lpszProxy := PChar(ServerHost + ':' + ServerPort);
    InternetSetOption( nil, INTERNET_OPTION_PROXY, @ipi, SizeOf(ipi) );

以上内容是使用代理服务器的方式，如果代理服务器有密码认证，又没有办法直接在这里使用代码确认认证密码，不用弹出对话框输入呢？谢谢

http://support.microsoft.com/kb/329802

--------------------------------------------------------------------------------------------------------------
如何在本地计算机上模拟某个网页上的某个链接的onMouseDown（即调用页面中的某个JavaScript写的函数）
--------------------------------------------------------------------------------------------------------------
某个页面上有个链接，其onMouseDown="return fun1(1,2,3)"

如何用程序模拟这个onMouseDown?

用IHTMLElement::get_onmousedown获得一个默认方法是事件处理过程的对象，之后调用其默认方法

.. code-block:: C++

    const pDispMousedown: IDispatch; 
    var varMousedown: OleVariant
    pDispMousedown=IDispatch((Doc.Body AS IHtmlElement).onmousedown);
    pDispMousedown.DoInvoke(0,IID_NULL, 0, DISPATCH_METHOD,
    0, 0, 0, 0);
    
----------------------------
如何修改WMV文件的版权信息!
----------------------------
这时我需要一个程序可以把我自己的WMV文件的版权标题等信息进行任意修改!
参考MetadataEdit示例(MSDN)
http://msdn.microsoft.com/library/en-us/wmform95/htm/sampleapplications.asp
http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wmform95/htm/iwmheaderinfointerface.asp
http://msdn.microsoft.com/library/en-us/wmform95/htm/workingwithmetadata.asp

----------------------------
获得IE上的内容问题
----------------------------
比如象flashget，右键点一个链接，菜单中有用flashget下载，点击后就运行了flashget下载。
我也想实现这样的功能，怎么把这个链接传递到我的程序里？

VB实现netant的例子我看过了，要改注册表添加菜单我也会了，就是不知道该怎么把得到的链接传到vb.net程序中去，VB的例子到vb.net中该怎么用呢？

http://blogs.msdn.com/oldnewthing/archive/2004/05/24/140283.aspx


--------------------------------------------------------
webbrowser下相同的代码,出现不同的结果
--------------------------------------------------------
WebBrowser1.Navigate('c:/LionLogo4c.tif');

上面的代码在win2000下可以使得tif文件在webbrowser中打开,可是在winxp下,却要用tif的执行程序单独打开?why?how to do?

http://support.microsoft.com/default.aspx?scid=KB;EN-US;Q319829


----------------------------------------------------------------------------
写一个com,在asp服务器端网页上调用,能够获取浏览器向这个网页请求或提交的数据
----------------------------------------------------------------------------
这是现在很多三层软件采用的方式,不知道有没有了解这项技术的?

In older versions of IIS, components accessed the ASP built-in objects by creating an instance of the ScriptingContext object, which implemented the IScriptingContext C++ Interface. Components that needed to access the ASP built-in objects did so through Page-level Event Methods. This approach still works in order to be compatible with existing ASP applications, however, using the COM+ ObjectContext object is easier and better as mentioned above, with one exception: if you implement your component as an executable file instead of a dynamic link library, you cannot use the COM+ ObjectContext object to access the ASP built-in objects. You must use IScriptingContext C++ Interface and Page-level Event Methods.

.. code-block:: C++

    STDMETHODIMP CHelloWorld::GetResponse()
    {
        // Get the Object Context
        CComPtr<IObjectContext> pObjContext;
        HRESULT hr = ::GetObjectContext(&pObjContext);

        if (SUCCEEDED(hr))
        {
            // Get the Properties interface
            CComPtr<IGetContextProperties> pProps;

            hr = pObjContext->QueryInterface(IID_IGetContextProperties, (void**) &pProps);

            if (SUCCEEDED(hr))
            {
                // Get the ASP Response object
                CComBSTR bstrResponse("Response");
                CComVariant vt;

                hr = pProps->GetProperty(bstrResponse, &vt);

                if (SUCCEEDED(hr))
                {
                    // Convert the IDispatch pointer to an IResponse pointer
                    if (V_VT(&vt) == VT_DISPATCH)
                    {
                        CComPtr<IResponse> piResponse;
                        IDispatch *pDispatch = V_DISPATCH(&vt);

                        if (NULL != pDispatch)
                        hr = pDispatch->QueryInterface(IID_IResponse, (void**) &piResponse);

                        if (SUCCEEDED(hr))
                        piResponse->Write(CComVariant(OLESTR("Hello, World!")));
                        }
                    }
                }
            }
        }

        return hr;
    }

see also (considered obsolete)

Developing Active Server Components with ATL

http://msdn.microsoft.com/library/en-us/dnasp/html/comp.asp

---------------------------------------
请问达人VC7里如何设置双机调试?
---------------------------------------
http://msdn.microsoft.com/library/en-us/vsdebug/html/vxoriremotedebuggingsetup.asp


---------------------------------------------------------
我把TWebBrowser的statusbar设为true但状态栏还是不显示
---------------------------------------------------------

还有TProgressBar怎么能让它在打开网页时显示进度

最后 Thtml在哪个packet里可以添加 有请高人赐教

1 WebBrowser控件并未实现statusbar属性。这个属性仅在控制IE窗口时有效。

2 捕获DWebBrowserEvents2::OnProgressChange

---------------------------------------------------------
求如何在VC里用跳转表的方式编译swich
---------------------------------------------------------
我做了一个庞大的switch，case的值是0～255乱序，

希望被编译成跳转表，否则效率太低了。

但不知道有没有编译选项或指令可以达到这个目的。

switch语句通常编译成比较高效的跳转表。在我看来唯一的通用的优化是将最常用的case语句放在前面以尽量避免在跳转时跨越内存块。对于非整型分支取值，也可以用std::map来做跳转，但是需要付出一定的性能。

如果分支值属于常量的话，也可以把switch换成模板

.. code-block:: C++

    template<int I>
    class CASE {
        public:
        static inline void f() //default
        { }
    };
    class CASE<value1> {
        public:
        static inline void f()
        { }
    };
    class CASE<value2> {
        public:
        static inline void f()
        {}
    };
    CASE<I>::f();

但是分支值一般都不是常量。另外一种方法是使用循环模板：

.. code-block:: C++

    template <template <int> class T, int I>
    struct Root
    {
        int run(int pos) const
        {
            const T<I>& ref = static_cast<const T<I>&>(*this);
            if (pos== I)
                return ref.getValue();
            return T<I-1>().run(pos);
        }
    };

但是

1 很多不标准的编译器，例如VC，不支持循环模板
2 分支值越大，循环次数越多，函数调用次数越多。

如果CASE中的处理代码需要被重载，简单的方案就是使用虚函数表，但是在分支值取值范围很大的时候虚函数表可能过于庞大，这时候类似于MFC实现的有缓存的线性查找性能可能比较高一些。

----------------------------------------------------------------------
请问做过ISAPI过滤器的朋友,HttpfilterProc中如何获得session的内容？
----------------------------------------------------------------------
ISAPI Extension Callback Functions
http://support.microsoft.com/kb/q168864/

----------------------------------------------------------------------
如何能查看到MFC内部类的源码？
----------------------------------------------------------------------

1. 新建一个MFC扩展DLL工程
2. 添加VC的安装目录下的MFC的源文件和头文件。如果你有兴趣，可以把ATL的文件也加上
3. 在类视图中选择需要访问的类或者函数

----------------------------------------------------------------------
VC7的IDE中Properties窗口是如何做出来的？
----------------------------------------------------------------------
VC7里的Properties窗口中的属性设置窗口是怎么做的？是用listview或者treeview控件吗？

怎样使得其中每个属性对应右边的一个edit控件，可以让用户来进行输入？
http://blog.joycode.com/jiangsheng/archive/2005/03/19/46065.aspx

----------------------------------------------------------------------
如何使用VC++编写一个简单的Web Service啊？或者说能否写Web Service??
----------------------------------------------------------------------
望高手指点，刚接触这个，谢谢。。。

Creating Web Services with Visual C++.NET
http://www.informit.com/articles/article.asp?p=29572&rl=1

----------------------------------------------------------------------
visual studio 2003 .net中的有ClassWizard么?
----------------------------------------------------------------------
刚开始用,没找到.请指点.

http://msdn.microsoft.com/library/en-us/vccore/html/vcgrfWhereIsClassWizardInVisualCNET.asp

----------------------------------------------------------------------
买了本vc书。打开里面例子出的问题
----------------------------------------------------------------------
classview information will not avalible

看不到他的类的列表。

这样的例子都有自己生成的类。

我怎么才可以看类的列表呢?

复制到硬盘去掉只读属性再打开

----------------------------------------------------------------------
关于截屏的问题
----------------------------------------------------------------------
我最近做了一个远程监控的程序,其它的东西都做了差不多,也能流畅地看到远程机的桌面及应用程序窗口,但当远程机处于非桌面操作状态(如XP中切换用户时),则不能看到远程机的屏幕,有没有哪位高手知怎样截取这时的屏幕?

用OpenInputDesktop获得当前桌面

参考VNC的源代码

----------------------------------------------------------------------

怎么样在我的程序运行时,屏蔽 Ctrl +pause Break ,谢谢
----------------------------------------------------------------------
怎么样在我的程序运行时,屏蔽 Ctrl +pause Break , 同时屏蔽 Ctrl+Alt +z 之类的, 可以用 PreTranslateMessage 达到这种效果么?
谢谢

控制台程序使用SetConsoleCtrlHandler处理CTRL_BREAK_EVENT

Windows下可以捕获VK_CANCEL。如果有必要的时候可以使用键盘钩子。
----------------------------------------------------------------------
在单文档的对话框的子视图中如何获取主文档的指针
----------------------------------------------------------------------
我在单文档的视图中响应菜单消息创建一个非模式对话框，接着在对话框中的OnCreate()中创建了子框架,又在框架的OnCreate()中创建了子视图，请问在子视图ChildView中如何获得文档Doc的指针？

MainFrame--->Doc---->View---->DLG----->ChildFrame--->ChildView

可以用成员变量来传递需要访问的对象的指针。


响应菜单消息创建一个非模式对话框，这里可以把文档的指针保存到对话框的成员变量
接着在对话框中的OnCreate()中创建了子框架，这里可以把文档的指针保存到子框架的成员变量
又在框架的OnCreate()中创建了子视图，这里可以把文档的指针保存到子视图的成员变量
解几何题的时候辅助线是要自己画的。

----------------------------------------------------------------------
如何获得 HTML 文本中光标所处位置的格式？
----------------------------------------------------------------------
实现 FrontPage 中的功能，当把插入光标“I”置于一串 Bold 字符中间时，程序知道这是 Bold 格式，当光标置于一串 Italic 字符中间时，程序知道这是 Italic 格式。

需要用到一个函数：IHTMLDocument2::queryCommandState(BSTR Cmd,VARIANT_BOOL* pfRet)来询问光标当前位置的文本被执行了何种命令：
.. code-block:: C++

    VARIANT_BOOL fRet;
    m_pHtmlDoc2->queryCommandState(m_C2B("Bold"),&fRet);
    // m_C2B(CString) 完成CString 到 BSTR 的转换。
    m_bBold = (fRet==VARIANT_TRUE)?TRUE:FALSE;

------------------------------------------------------------------------------------------
请问如何获取WINDOWS中正在运行的可视程序的标题与图标就像(ALT+TAB)的功能一样.
------------------------------------------------------------------------------------------

参考TaskSwitchXP Pro 2.0

http://sourceforge.net/project/showfiles.php?group_id=115098

用API函数EnumDesktopWindows可以获得所有的顶层窗口，然后你可以通过GetWindowLong来判断窗口是否可见，如果是的话，通过GetWindowIcon就可以获得窗体的图标局柄。

----------------------------------------------------------------------
程序中能否控制IE浏览器变更浏览地址??
----------------------------------------------------------------------

我在VC程序中通过ShellExcute或者WinExec打开了一个浏览器并转到某个地址。那能不能够在后面的程序中还是用此窗口来打开另外一个地址呢？
比较简单的方法是参考http://www.microsoft.com/msj/0698/browser.aspx的方法用CoCreateInstance创建一个浏览器对象

----------------------------------------------------------------------
IE儲存檔案的問題?
----------------------------------------------------------------------
請問有沒有辦法做到當在IE網址列輸入文件下載地址(如http://www.server.com/test.exe)後不出現檔案儲存的詢問框,就自動下載文件到指定的路徑(如c:/test.exe)呢?

註:一定要通過IE下載.

在注册表里面关掉exe文件格式的下载提示就可以了，但是应用程序不应该引入这么大的系统安全威胁

http://www.ddvip.net/web/asp/index2/156.htm

----------------------------------------------------------------------
请问哪位大虾有实现IInternetProtocolRoot接口的完整例子？
----------------------------------------------------------------------

请问是否有人在ie开发中使用过Asynchronous Pluggable Protocol？有没有实现IInternetProtocolRoot接口的完整例子可以给偶参考一下？多谢！
http://www.codeguru.com/Cpp/COM-Tech/atl/misc/article.php/c37/


----------------------------------------------------------------------
汇编的一个程序问题
----------------------------------------------------------------------

.. code-block::

    .386
    .model flat,stdcall
    option casemap:none

    include D:/masm32/INCLUDE/windows.inc ;常量及结构定义
    include D:/masm32/INCLUDE/kernel32.inc ;函数原型声明
    include D:/masm32/INCLUDE/user32.inc

    includelib D:/masm32/lib/kernel32.lib ;用到的引入库
    includelib D:/masm32/lib/user32.lib
    include D:/masm32/INCLUDE/masm32.inc
    includelib D:/masm32/LIB/masm32.lib
    .data
    szCaption db "命令行参数",0
    errortext db "没有参数",0

    .code
    start:
    invoke GetCommandLine
    ;invoke StdOut,addr eax //为什么这样不行呢？
    .if eax!=NULL
    invoke MessageBox,NULL,eax,addr szCaption,MB_OK
    .endif
    invoke ExitProcess,NULL
    end start

1.是不是getcommandline反回的值在eax里.用messagebox就能行．为什么stdout不行呢?
2.怎么得到参数的个数？我试着用if eax>2之类的，好像没什么作用.

我用.net写了一个这样的功能的东西.

Imports System
Module Module1

Sub Main()
Dim args As String()
Dim i
args = Environment.GetCommandLineArgs()
For i = 0 To args.Length - 1
Console.WriteLine("Args(" & i & "):" & args(i))
Next
Console.ReadLine()

End Sub

End Module

结果:D:/masm32/BIN/test>E:/程序学习/net/argc/bin/argc.exe 11 2123

Args(0):E:/程序学习/net/argc/bin/argc.exe
Args(1):11
Args(2):2123

编译出错信息

Assembling: D:/masm32/BIN/test/commandline.asm

D:/masm32/BIN/test/commandline.asm(23) : error A2033: invalid INVOKE argument :
1

D:/masm32/BIN/test/commandline.asm(23) : error A2114: INVOKE argument type misma
tch : argument : 1
_
Assembly Error
 

栈顶是命令行参数的个数，而之前压入的则是命令行参数的指针。

为了长文件名的考虑, 还需要检查首个有效字符是否为引号 ("), 是的话, 还需要向后配对.

Masm32 中预定义了些函数的, 如 ArgCl, ArgClC, GetCL 等. 具体的源码可以参看 M32lib 目录下的相关 asm 文件的, 分别是 ClArgs.asm, ClArgsc.asm 和 Getcl,asm
 

--------------------------------------------------
Windows Media Player谁有这个控制的编程语法
--------------------------------------------------
FAWindows Media Player要求以下功能,请给于语法

问题1

一首歌的总时间

静音,

恢复暂停播放


问题2

WindowsMediaPlayer1_EndOfStream(ByVal Result As Long)

这个事件不是播放完一首歌后调用的事件吗?为什么在这个事件里面,写代码不响应

http://msdn.microsoft.com/library/en-us/wmplay10/mmp_sdk/usingwindowsmediaplayerwithvisualbasic.asp

----------------------------------------------------------------------------------------------------
如何去掉TREE控件里的表MSysAccessStorage,MSysACEs,MSysObjects........,程序是老外写的。
----------------------------------------------------------------------------------------------------
原程序地址：http://www.codeproject.com/database/msdatagrid.asp?target=datagrid 贴出TREE控件的相关代码：bool CLeftView::PopulateTree()

http://support.microsoft.com/kb/182831

.. code-block::
    
    // Function that gets all table names & excludes System tables and views
    void OpenSchemaTables()
    {
        //......
    }

------------------------------------------------------------    
如何不用临时文件，在CppWebBrowser中显示内存中的图片？
------------------------------------------------------------
即如何把图片显示在CppWebBrowser中，而不用先保存至硬盘上？可以实现吗？

1 切换浏览器中的HTMLDocument对象到编辑模式
2 把图片放到剪贴板里面
3 用IMarkupServices设置插入位置
4 粘贴
参考http://msdn.microsoft.com/library/default.asp?url=/workshop/browser/mshtml/overview/intromarkupsvc.asp

------------------------------------------------------------
在VB的ActiveX控件中，如何获取当前IE的地址信息?急!!!
------------------------------------------------------------

http://support.microsoft.com/kb/181678

How To Retrieve the URL of a Web Page from an ActiveX Control

------------------------------------------------------------
于CHtmlEditView类视图页面可视化显示出现源代码
------------------------------------------------------------

我在继承自CHtmlEditView类的视图中采用SetDocumentHTML()方法写页面代码，部分页面能够正常显示(指以textbox,table的可视化界面显示)，而部分页面却显示源码，不知道是什么原因，请各位帮忙看看，谢谢^_^.
具体代码如下：
.. code-block:: C++

    //....To Get Document HtmlCode as CString variable 'htmlcodestr'
    NewDocument();
    SetDocumentHTML(htmlcodestr);

IE6.0的一个BUG就是用IPersistStream载入数据流的时候偶尔会错误判断数据的MIME类型。尽量在数据流开头加入<HTML>、<XML>这样的标识加大IE正确判断数据的MIME类型的机会。

参考http://msdn.microsoft.com/workshop/networking/moniker/overview/appendix_a.asp

http://groups-beta.google.com/group/microsoft.public.inetsdk.programming.webbrowser_ctl/browse_frm/thread/27c82069df2e9903/3c05c8004aec4c8b
http://groups-beta.google.com/group/microsoft.public.inetsdk.programming.html_objmodel/browse_frm/thread/fa57f1eebf880388/502fcc85024db587

http://groups-beta.google.com/group/microsoft.public.windows.inetexplorer.ie5.programming.components.webbrowser_ctl/browse_thread/thread/338aac25981fc64c/92e33ce6921bf1ec?lnk=st&q=WalkAll%2FStream+loading%2FUI-less+HTML+Dom&rnum=1&hl=en#92e33ce6921bf1ec

http://blogs.msdn.com/ie/archive/2005/02/01/364581.aspx
http://support.microsoft.com/default.aspx?scid=kb;en-us;329661
http://support.microsoft.com/default.aspx?scid=kb;EN-US;q234207
BUG: PersistStreamInit::Load() Displays HTML Files as Text
http://support.microsoft.com/?id=323569
 

------------------------------------------------------------
■■数据库结果的排列显示问题■■
------------------------------------------------------------
MS SQL中 如果 

.. code-block:: SQL

    select * from A where aa like '%nn%' or aa like 'mm' 

是否有实现的办法 使得select的结果 按照 先 like '%nn% 的结果显示完再显示 like '%mm%'?

.. code-block:: 

    SELECT 客户.公司名称, 客户.联系人姓名, [联系人姓名] Like "*先生" AS 性别
    FROM 客户
    WHERE ((客户.联系人姓名) Like "*先生" Or (客户.联系人姓名) Like "*小姐"))
    ORDER BY [联系人姓名] Like "*先生";

公司名称联系人姓名性别
亚太公司陈先生-1
汉光企管王先生-1
德化食品王先生-1
新巨企业成先生-1
中硕贸易苏先生-1
兰格英语王先生-1
瑞栈工艺苏先生-1
一诠精密工业刘先生-1
顶上系统方先生-1
千固苏先生-1
凯诚国际顾问公司刘先生-1
高上补习班徐先生-1
凯旋科技方先生-1
山泰企业黎先生-1
椅天文化事业方先生-1
通恒机械黄小姐0
伸格公司林小姐0
万海林小姐0
文成唐小姐0
志远有限公司王小姐0
中通林小姐0
永大企业余小姐0
华科吴小姐0
就业广兑唐小姐0
三川实业有限公司刘小姐0
留学服务中心赵小姐0
霸力建设谢小姐0

声明：示例数据来自微软的示例数据库NorthWind，如有和现实人物或组织名字类同纯属巧合。

------------------------------------------------------------------------------- 
请问vc6.0是不是也有sp2的啊？打了补丁后如何看一个叫MSVCRT.DLL的版本？
-------------------------------------------------------------------------------

http://support.microsoft.com/kb/194295
http://msdn.microsoft.com/vstudio/downloads/updates/sp/vs6/sp6/download/default.aspx

-------------------------------------------------------------------------------
ＳＯＳ！如何快速的把ＭＦＣ的exe文件转化为ActiveX控件！有没有这样的工具
-------------------------------------------------------------------------------
如果能提供示范性代码最好，分数不够可以加，偶有的是分数！
于对话框的程序比较简单。可以在控件中创建一个非模态对话框，在上面放想要的控件。微软知识库文章Q187988 PRB: ActiveX Control Is the Parent Window of Modeless Dialog 描述了这样一个示例。codeguru文章Dialog frame as an ActiveX control ( http://www.codeguru.com/Cpp/COM-Tech/activex/controls/article.php/c2615/ )的评论里面有一些这种实现的常见问题解答。
基于Doc/View的比较复杂一点，参考http://www.microsoft.com/mind/0497/mfc.asp


-------------------------------------------------------------------------------
Some other words
-------------------------------------------------------------------------------

After 4 years, the long expecting upgrade of CSDN forum is partially released. The new UI besides the old seems very incongruous, but better late than never, as I said.
