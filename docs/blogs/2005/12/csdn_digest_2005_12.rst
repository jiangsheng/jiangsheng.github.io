.. meta::
   :description: I would like to keep tracking some interesting CSDN discussions, but sometimes I can not find them due to the limit of the CSDN favorite and the CSDN full text search. So again I list some interesting discussions here. For details about the discussion, go to http://search.csdn.net and search posts by their topics. For previous Q&A discussions
   
Win32 & .Net Q&A 200512
=========================================
.. post:: 24, Dec, 2005
   :tags: CSDN
   :category: Internet,Win32
   :author: me
   :nocomments:

I would like to keep tracking some interesting CSDN discussions, but sometimes I can not find them due to the limit of the CSDN favorite and the CSDN full text search. So again I list some interesting discussions here. For details about the discussion, go to http://search.csdn.net and search posts by their topics. For previous Q&A discussions


------------------------------------------------------
loadXML之后文档的内容始终为空
------------------------------------------------------
MSXML4的文档对象的async属性默认是真，这时候Load是异步的，要等待对象触发事件再访问文档内容。也可以把文档的async属性设置成false切换到同步模式，这样Load调用之后就可以读DOM了。



------------------------------------------------------
.Net和MFC哪个更有前途
------------------------------------------------------

我是计算机专业大三的学生，我这学期已经学完了C++，教材是Essencial C++，但我自己把C++ Primer看完了，正在看Effective C++。我觉得自己基础比较扎实，因为以前C学得也可以。 我现在有点疑惑，不知道该学MFC还是学.Net。 因为听说明年64位操作系统就要出来了。所以学.Net很有前途，但是.Net的正宗语言是C#，不是C++，而我没学过C#，并且听人说C#在底层实现上比较差。 我想问一下，MFC和.Net哪个更有前途。


MFC是在API的基础上封装出来的一个类库，给C++程序员在Windows上快速开发用的。
.Net类库是在Windows非托管API的基础上封装出来的一个托管类库，给程序员在各种Windows平台上跨平台开发用的。

如果你是一个C++程序员，要进行非托管程序开发，那么你不能用.Net类库。如果要进行托管程序开发，你可以选择.Net类库，但是有时也需要在工程中加入对Windows非托管API和MFC的调用，例如http://blog.joycode.com/jiangsheng/archive/2005/03/19/46065.aspx。


------------------------------------------------------
用MSXML DOM创建XML文件，怎么在文件开头写上一些注释？
------------------------------------------------------
比如我想写上：

.. code-block:: XML

    <?xml-stylesheet href="a.xsl" _fcksavedurl=""a.xsl"" type="text/xsl" ?>

CreateProcessInstruction

------------------------------------------------------
VS2005的类设计器是怎么用的？ 
------------------------------------------------------
我下了profession的rtm版，找来找去都没找到这个类设计器在哪里？
原有的代码能用类设计器吗，还是说要新建的？

Class Designer is not included in the current version of Visual C++ 2005.

C++ support will not be included in the Class Designer until a future release of Visual Studio, hopefully Visual Studio 2006.


------------------------------------------------------
继承CTreeCtrl类初始化控件时同时加入ITEM
------------------------------------------------------
我建一个类是从CTreeCtrl派生的。我想在自定义类里加入初始化控件的时候，自动加载几个ITEM到控件中。请问怎么做？比如说我的CMyTreeCtrl是继承CTreeCtrl的，然后我用CMyTreeCtrl定义一个控件，我想这控件在初始化时就有我自定义的默认的几项在里边。


把插入项目的代码放在PresubclassWindow里面。对话框是通过SubclassWindow来关联已经创建的子窗口和成员变量的，所以WM_CREATE等消息的处理函数不会总是被调用。

------------------------------------------------------
多线程环境下CLISTCTRL切换和刷新慢的问题
------------------------------------------------------

环境：WIN2000 SP4 VS2003。NET

本地运行了自己开发的一个网络服务器软件（没有问题的）

然后运行客户端，

客户端的主界面重载了ONEARSE（ ），用来设置背景图片，本身是个对话框程序

原来使用的是LISTBOX监控窗口，刷新和程序切换，界面都没有问题，

改用CLISTCGTRL控件的REPORT模式做监控窗口后，出现问题

CLISTCTRL控件的刷新，在一直保持在TOP WINDOW位置的时候，正常

但是如果有其他程序占用TOP WINDOW位置，然后切换，如果已经连接到服务器（客户端本身也是多线程），那么经常在切换的时候出现CLISTCTRL控件要等一些时间才出现，其他部分却完全正常，

或者把鼠标移动到CLISTCTRL上，也能一点但刷新出来，

但是如果立即最小化，又最大化，通常能立即恢复

在WIN98下调试发现也有这问题，但是以前使用LISTBOX没有任何问题

界面上的CLISTCTRL采用定时刷新机制，间隔3-5秒

同时各线程在收到消息后也会发送立即刷新消息，然后主截面就立即刷新CLISTCTRL控件内容

为了防止闪动，在刷新函数中使用了SETREDRAW（ ）函数

请各位帮忙分析原因，

估计是SetRedraw的问题

用虚列表+CListCtrl::Update，更新的项目不可见的话没必要SetRedraw这么兴师动众

http://www.codeguru.com/Cpp/data/mfc_database/article.php/c1127

------------------------------------------------------
怎么将两个xml文件合并
------------------------------------------------------

现在两个xml文件，文件的格式都是相似的，比如：

.. code-block:: XML

    <?xml version="1.0" encoding="UTF-16" ?>
    <inforoot informationtime="2005-11-15 14:34:15">
    <iedate date="2005-11-08">
        <webname mbrid="0" number="2">update.cnnic.cn:80</webname>
    </iedate>
    </inforoot>

现在我想新建一个xml，然后将2个xml文件的内容都复制到这个新的xml文件中，变成这样：

.. code-block:: XML

    <?xml version="1.0" encoding="UTF-16" ?>
    <root>
    <inforoot informationtime="2005-11-15 14:34:15">
        <iedate date="2005-11-08">
            <webname mbrid="0" number="2">update.cnnic.cn:80</webname>
        </iedate>
    </inforoot>
    <inforoot informationtime="2005-11-16 14:34:15">
        <iedate date="2005-11-09">
            <webname mbrid="0" number="8">www.sina.com</webname>
        </iedate>
    </inforoot>
    </root>

请问具体该怎么做？
最好有例子或者代码提示，谢谢！

用XSLT来做转换。用document函数就可以导入XML文件。如果你需要导入同一个文件两次，你可能更喜欢用一个变量来保存导入的文件内容。参见http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/b24aafc2-bf1b-4702-bf1c-b7ae3597eb0c.asp

------------------------------------------------------
使用vc.net中使用API的问题 （.NET技术 VC.NET）
------------------------------------------------------

在程序中使用了GlobalAlloc,如果不在from1.h中加入#include <windows.h>,则编译会出现:

error C3861: "GlobalAlloc": 即使使用参数相关的查找，也未找到标识符

C:\Program Files\Microsoft Visual Studio .NET 2003\Vc7\PlatformSDK\Include\WinBase.h(1624): error C2365: "GlobalAlloc" : 重定义；以前的定义是"原先未知的标识符"

,如果在from1.h中加入#include <windows.h>,则编译会出现:

error C2039: "GetObjectW" : 不是"System::Resources::ResourceManager"的成员

这条语句是系统自动生成的,是我在加入一个com控件量系统自动加入

如果解决,在vc.net中使用API的问题怎样使用sdk中的函数

把GetObjectW undef掉，用的时候直接调ANSI或UNICODE版本。在包含windows.h之后

#undef GetObject

------------------------------------------------------
如何实现模拟ctrl+alt+delete三键? （Java）
------------------------------------------------------
java.awt.Robot robot=new java.awt.Robot();
robot.keyPress(java.awt.event.KeyEvent.VK_CONTROL);
robot.keyPress(java.awt.event.KeyEvent.VK_ALT);
robot.keyPress(java.awt.event.KeyEvent.VK_DELETE);

robot.keyRelease(java.awt.event.KeyEvent.VK_DELETE);
robot.keyRelease(java.awt.event.KeyEvent.VK_ALT);
robot.keyRelease(java.awt.event.KeyEvent.VK_CONTROL);
这样写为什么不成功?

It is handled differently by operation systems. For example, in windows 2000 and above, it is registered as a hotkey by winlogon.exe, and is handled in a window on the SAS desktop, not the application desktop. You need to open the SAS desktop, and broadcast a WM_HOTKEY message. However, I doubt you can do this in your java virtual machine.

Reference:
www.codeproject.com/system/alt_control_delete.asp


------------------------------------------------------
基于对话框的打印(MFC)
------------------------------------------------------

我的程序用ado实现。现在想加入一个打印功能。查了一下资料，好象只有视图类有可以加打印。但我的程序是基于对话框的。比方说有个查询功能，结果显示在一个对话矿上，如何将它打印呢？

http://msdn.microsoft.com/library/en-us/dncdev00/html/vc0300.asp


------------------------------------------------------
如何获得rm,rmvb,avi,wmv,mp3...等文件的头信息？
------------------------------------------------------
如题，能得到播放时间，视频大小。。。tag信息
有通用的函数吗？
请高手指教，最好有源码，delphi的最好



没有通用的函数。

你可以用Windows Media Format SDK里面的WMReader对象打开Windows Media Player支持的文件，之后读取相关信息。参见http://msdn.microsoft.com/library/en-us/wmform95/htm/aboutthewindowsmediaformatsdk.asp。Real的SDK中有rm、rmvb的格式规范（或者查Real提供给IETF的Internet Draft－RealMedia File Format）。mp3可以去查MPEG-1（ISO 11172）的标准文档。AVI文件中的信息可以用AVIFileInfo来获取。


------------------------------------------------------
关于gdi+中Image类显示图片的问题 
------------------------------------------------------

通常我们可以用Image(L"c:\\1.jpg")来加载显示图片

但如果图片文件包含在其它文件中,需要用CFile来读到缓冲区中,再加载,

以下段代码为什么不能正常显示图片?谢谢!

.. code-block:: C++

    void CMy1Dlg::OnPaint()
    {
        if (IsIconic())
        {
            CPaintDC dc(this); // device context for painting

            SendMessage(WM_ICONERASEBKGND, (WPARAM) dc.GetSafeHdc(), 0);

            // Center icon in client rectangle
            int cxIcon = GetSystemMetrics(SM_CXICON);
            int cyIcon = GetSystemMetrics(SM_CYICON);
            CRect rect;
            GetClientRect(&rect);
            int x = (rect.Width() - cxIcon + 1) / 2;
            int y = (rect.Height() - cyIcon + 1) / 2;

            // Draw the icon
            dc.DrawIcon(x, y, m_hIcon);
        }
        else
        {
            CDialog::OnPaint();
        }

        CFile file;
        file.Open("c:\\1.jpg", CFile::modeRead);
        int bufSize = (int)file.GetLength();
        char *pBuf = new char[bufSize];
        file.Read(pBuf, bufSize);
        WCHAR *ws = new WCHAR[bufSize];
        MultiByteToWideChar(CP_ACP, 0,pBuf, bufSize,ws, bufSize);

        Graphics graphics(GetDC()->m_hDC);
        Image image(ws);
        graphics.DrawImage(&image,0, 0, 400, 300);
    }

Use COleStreamFile instead of CFile, and use CreateMemoryStream to create a stream in memory.

.. code-block:: C++

    COleStreamFile image_stream ;
    image_stream.CreateMemoryStream(NULL);
    img.Save(image_stream.GetStream(), Gdiplus::ImageFormatBMP);

Before reading from the memory stream returned by GetStream, call SeekToBegin.

---------------------------
对XML文件排序
---------------------------

两个问题：

比如我有如下XML文档，读取时如何根据level和finishDate对每个shmItem排序？

我尝试使用XPathDocument和XPathNavigator，但是如果xml文档中包含中文，初始化就很慢，请各位指教是怎么回事？

.. code-block:: XML

    <?xml version="1.0" encoding="gb2312"?>
    <!--Powered By Ranran.-->
    <shemes>
        <shmItem>
            <id>632698120068125000</id>
            <title>文章一</title>
            <level>0</level>
            <finishDate>2005-12-10</finishDate>
            <tips>中文内容
            </tips>
        </shmItem>
        <shmItem>
            <id>632698120068125300</id>
            <title>titles23</title>
            <level>3</level>
            <finishDate>2005-12-10</finishDate>
            <tips>some content
            </tips>
        </shmItem>
    </shemes>

<?xml version="1.0" encoding=>指明文档使用的编码。写一个XSLT来转。用XSLT查询XML的时候排序。


---------------------------
类从类视图消失
---------------------------

工程能够正常修改，使用，但是左边工作区里ClassView下一个对话框的类不见了， FileView里有相应的.cpp.h文件，怎么才能使得那个类重新显示（VC/MFC 基础类 ）

VC保存时，文件莫名其妙的没了...


保存文件时，经常有这样的警告"有其他进程正在使用本文件"。一般情况下，忽略警告，第二次保存文件时就没有警告了。在某次保存时，出现警告，多按了几次CTRL+S，结果文件没了。不幸中的万幸，我用FinalData把那个丢失的文件找回来了，原文件里大半是乱码，工程目录下多了个MVCDD.TMP的文件，里面就是丢失的代码，完好。想弄清楚这到底是VC的问题还是VA的问题，或是其他问题。

如果使用的是VC6，而且没有打SP6补丁，那么关闭Norton防火墙，或者升级VC。这个问题的详细资料参考微软知识库文章FIX: "Cannot Save File" Error Message in the Visual C++ IDE http://support.microsoft.com/kb/822856/


------------------------------------------------------
如何将asf格式的文件分成包发送到网络上？
------------------------------------------------------
问题描述：结点A有一个asf格式的文件，结点B以流媒体的形式从结点A那里获得数据，然后调用media player进行播放。
现在是，结点A如何将asf格式的文件以包的形式发送出去？？？

Topic in microsoft.public.windowsmedia.sdk
how to use IWMWriterSink::OnDataUnit

Q:
I want to use IWMWriterSink::OnDataUnit() to get the
compressed sample. I modify the WMVNetWrite sample
application for test app, add the following:

.. code-block:: C++

    IWMWriterNetSink->QurryInterfaceIID_IWMWriterSink,
    m_pWriterSink)

    m_pWriterSink->AllocateDataUnit();
    m_pWriterSink->OnDataUnit();

then use the INSSBuffer::GetBufferAndLength(),but the
buffer content is null! I don't know how to use the
interface: If the OnDataUnit is a callback function, it
should be inherented by a class , otherwise , query
interface to get it, but where and how to call the
OnDataUnit function.
I am waiting for your help
regards
billy

A: If you want to override OnDataUnit() method of a network sinker. You need to
do these steps:


1. Define a new class that inherits from IWMClientConnections2,
IWMRegisterCallback, IWMWriterNetworkSinkobject, and IWMAddressAccess2
interfaces.


For example:

.. code-block:: C++

    class CMyWMNetSink : public IWMWriterNetworkSink,
    public IWMClientConnections2,
    public IWMRegisterCallback,
    public IWMAddressAccess2

2. Besides declare the constructor and the destructor of this class,
you also need to declare all methods of the inherited interfaces.

For example:

.. code-block:: C++

    virtual HRESULT STDMETHODCALLTYPE OnDataUnit(
    /* [in] */ INSSBuffer __RPC_FAR *pDataUnit);

3. Implement the constructor of this class
   a) Set the reference count to 1
   b) Create an internal IWMWriterNetworkSink object m_pNetworkSink by using WMCreateWriterNetworkSink() function.

4. Implement IUnknow interfaces.
   a) Implement AddRef() and Release() method just like you implement other COM interfaces.
   b) Imlplement QueryInterface() method. Return "this" pointer when querying the supported interfaces, such as ID_IWMWriterNetworkSink, IID_IWMWriterSink and etc.

5. Implement all other interfaces this class supports. Pass the calls to the internal IWMWriterNetworkSinker object. Add your own code before or after the calls.

For example:

.. code-block:: C++

    HRESULT STDMETHODCALLTYPE CMyWMNetSink::OnDataUnit(
    /* [in] */ INSSBuffer __RPC_FAR *pDataUnit)
    {
        ////////////////////////////////////////////
        // You can add you code here
        ////////////////////////////////////////////
        IWMWriterSink * pWriterSink = NULL;
        HRESULT hr = S_OK;
        hr = m_pNetworkSink->QueryInterface( IID_IWMWriterSink, (void
        **)&pWriterSink ); if ( FAILED( hr ) ) {return hr;}
        hr = pWriterSink->OnDataUnit( pDataUnit ); if ( FAILED( hr ) ) { pWriterSink->Release(); return hr;}
        pWriterSink->Release();

        /////////////////////////////////////////////////
        // You can also add you code here
        /////////////////////////////////////////////////
        return hr;
    }

6. Create an instance of this class in your program. Get the
IWMWriterNetworkSink interface from this instance.
For example:

.. code-block:: C++

    IWMWriterNetworkSink * pNetworkSink = NULL;
    CMyWMNetSink * pMySink = new CMyWMNetSink();
    if ( pMySink == NULL ) { return E_OUTOFMEMORY; }
    hr = pMySink->QueryInterface( IID_IWMWriterNetworkSink, (void
    **)&pNetworkSink ); 
    if ( FAILED( hr ) ) { return hr; }

7. Then you can use this IWMWriterNetworkSink interface in your
program.
--
Thanks!
Gangjiang Li
Microsoft Corp.
Windows Media Format SDK

---------------------------------------------------------------------
如何用DirectShow实现将一批BMP图片和指定的MP3合成一个MPEG或AVI文件
---------------------------------------------------------------------

去看DirectShow示例里面那个desktop push的sample filter CPushSourceDesktop.
(SDK root)\Samples\C++\DirectShow\Filters\PushSource，在网上找一找曾经开源的软件CamStudio的源代码。


---------------------------------------------------------------------
一种自定义的图形格式如何在windows的文件管理器里缩略图显示出来
---------------------------------------------------------------------

就象photoshop和CorelDraw的文件一样，　这种格式按理说Windows是不认识的，　但我们在用缩略图方式查看文件时却可以显示这样的图片，　为什么？如果我们自己有一种格式需要写出自己的图形回显程序才能显示的，　如何通知ＷＩＮＤＯＷＳ呢？

http://www.codeproject.com/shell/thumbextract.asp


---------------------------------------------------------------------
请问创建线程是用afxBeginThreaD还是应该用CREATETHREAD? 
---------------------------------------------------------------------

为什么我用调试工具调试时,总是提醒说不应该用AFXBEGINTHREAD而应该用CREATETHREAD?


both C runtime and MFC need some special initialization to function properly, so if you need MFC support, use AfxBeginThread. otherwise use _beginthreadex. DO NOT use CreateThread, since you are almost always using C runtime.


---------------------------------------------------------------------
用脚本填网页表 （Perl）
---------------------------------------------------------------------
我有一个链接
http://mtgroup.ict.ac.cn/~zhp/ICTCLAS.htm

这个链接里面有一个输入框，看不到的朋友我把代码也贴上来。

.. code-block:: HTML

    <body background="ICTCLAS/images/blegtext.gif" bgcolor="#CCCCCC" text="#000000" link="#993300" vlink="#0000FF" alink="#FF9900">
    <FORM action="/ictclas-cgi/ictclas_c" method=post>
        <P>输入句子段落：
        <P><TEXTAREA name=address rows=6 cols=101>张华平于1978年3月出生于江西省波阳县。</TEXTAREA>
        <P><INPUT type=submit value=切分标注 name=submit1> <INPUT type=reset value=重置>
    </FORM>
    </body>

可以看到这里面有关textarea ，还有一个叫做"切分标注的"button。我要做的是模拟在textarea里面输入数据，然后点击"input"button，然后接收到服务器端传回来的结果。
不知道这个事情我能不能用什么语言来做。什么语言都可以。

用Win32::OLE创建一个Internet.Application就可以
#launch an Internet Explorer window and search for ACC map
#for more information about automating Internet Explorer
#see my article http://www.codeproject.com/shell/AutomateShellWindow.asp

.. code-block:: Perl

    use Win32::OLE qw(EVENTS);
    my $URL = "http://maps.google.com/";
    my $IE = Win32::OLE->new("InternetExplorer.Application")
    || die "Could not start Internet Explorer.Application\n";
    Win32::OLE->WithEvents($IE,\&Event,"DWebBrowserEvents2");
    $IE->{visible} = 1; #invisible by default
    $IE->Navigate($URL);
    Win32::OLE->MessageLoop();
    sub Event {
        my ($Obj,$Event,@Args) = @_;
        print "Here is the Event: $Event\n";
        if ($Event eq "DocumentComplete") {
            my $IEObject = shift @Args;
            print "Sender: $IEObject\n";
            print "URL: " . $IEObject->Document->URL . "\n";
            if($IEObject->Document->URL eq $URL)
            {
                SetEditBox($IEObject->Document,"q","1212 Rio Grande St., Austin, TX 78701");
                ClickButton($IEObject->Document,"submitq");
            }
        }
        if ($Event eq "OnQuit") {
            print "User Closed Internet Explorer, quiting";
            #Win32::OLE->WithEvents($IE,\&Event,"DWebBrowserEvents2");
            undef $IE;
            Win32::OLE->QuitMessageLoop();
            exit(0);
        }
    }
    sub SetEditBox {
        my ($IEDocument,$name, $value) = @_;
        my $forms = $IEDocument->forms;
        for (my $i = 0; $i < $forms->length; $i++) {
            my $form = $forms->item($i);
            if (defined($form->elements($name))) {
                $form->elements($name)->{value} = $value;
            }
            return;
        }
    }
    sub ClickButton{
        my ($IEDocument,$name) = @_;
        my $forms = $IEDocument->forms;
        for (my $i = 0; $i < $forms->length; $i++) {
            my $form = $forms->item($i);
            if (defined($form->elements($name))) {
                $form->elements($name)->click;
            }
            return;
        }
    }


-----------------------------------------------------
VC.NET无法启动调试：计算机调试管理服务器被禁用
-----------------------------------------------------
有些网络管理员为了安全起见，禁止一般用户调试程序。你可以使用WinDbg( Debug Tools For Windows)来调试看看


------------------------------------------------------------------
Visual C++ 2005 Express 能否编译出不依赖.net平台的程序
------------------------------------------------------------------
Download the Windows Platform SDK and create a windows or console application.


-----------------------------------------------------
请教一个C++.NET中定义消息映射函数的问题
-----------------------------------------------------

用MSVisual C++.NET新建一个MFC Application工程.
1、在框架程序的头文件（比如MainFrm.h）中有这样的定义：

.. code-block:: C++

    #define WM_MYPNP (WM_USER + 100)

    //定义消息映射函数：
    afx_msg　void　OnPtoP();

2、然后在程序文件(比如MainFrm.cpp)中这样定义：

.. code-block:: C++

    BEGIN_MESSAGE_MAP(CMainFrame, CFrameWnd)
    ON_MESSAGE(WM_MYPNP, OnPtoP)
    END_MESSAGE_MAP()

    void CMainFrame:: OnPtoP()
    {
    }


在C＋＋6.0是可以的，但在C++.NET(2003)中不行。
编译通不过。

.. code-block:: 

    erre:C2440 'static_cast' connot convert from 'void (__thiscall CMainFrame：：*)(void)' to ''LRESULT(__thiscall CWnd：：*)（PARAM,LPARAM)


afx_msg　LRESULT OnPtoP(PARAM,LPARAM);

Visual C++ 6.0 does not check the function signature, and VC2003 uses static_cast to check it.


---------------------------------------------------------
怎样使DLL中的窗体或对话框PreTranslateMessage能有用呢？
---------------------------------------------------------

一般情况下DLL 的窗体或对话框，是不能响应这个PreTranslateMessage函数的，
而被主程序窗口响应了。
怎么样使这个函数在DLL的窗体中也能响应呢？有效呢?
我主要是想在DLL的窗体中用工具提示类？

.. code-block:: C++

m_ToolTipCtrl.RelayEvent(pMsg);
return CDialog::PreTranslateMessage(pMsg);

PreTranslateMessage is called by a MFC message pump. If the message pump is not a MFC one, your PreTranslateMessage won't be called. Export a PreTranslateMessage function from your DLL and call it in the message pump.

.. code-block:: C++

    BOOL CXXXDlg::PreTranslateMessage(MSG* pMsg)
    {
        // TODO: Add your specialized code here and/or call the base class
        if(m_pDLLExportedPreTranslateMessage(pMsg))
            return true;
        return CDialog::PreTranslateMessage(pMsg);
    }

Reference
http://support.microsoft.com/kb/q140850/


-----------------------------
Dhtml的应用问题!（Delphi）
-----------------------------
我的Dhtml总是提示,不支持此接口.!!!

.. code-block:: Delphi

    MailDhtml.DocumentHTML:='<html><body></body></html>';
    self.MailDhtml.DocumentHTML :='HtmlBuffer.htm'

Re: DHTML CONTROL MICROSOFT UPDATE DISASTER
by Carlos Rocha <carlosCLEARTHISrocha@[EMAIL PROTECTED] > Feb 28, 2005 at 10:40 PM

Dick,

This was post in a Delphi's newsgroup,


"With all the stuff surrounding Hotfix KB891781 breaking applications that use DHTMLED.OCX, it might be not entirely Microsoft's fault after all. After some investigation, this is what I found:

1. DHTMLEDLib_TLB.pas declares:

.. code-block:: Delphi

    TDHTMLEdit = class(TOleControl)


2. OleCtrls.pas declares:

.. code-block:: Delphi

    TOleControl = class(TWinControl, IUnknown, IOleClientSite,
    IOleControlSite, IOleInPlaceSite, IOleInPlaceFrame, IDispatch,
    IPropertyNotifySink, ISimpleFrameSite, IServiceProvider)


3. OleCtrls.pas implements a method of IOleClientSite:

.. code-block:: Delphi


    function TOleControl.GetContainer(out container: IOleContainer): HResult;
    begin
        Result := E_NOINTERFACE;
    end;


Now, if your application uses TDHTMLEdit, you can trace the call to its DOM member in debug mode in Delphi (I use D2005). You will see that when you try to access DOM, the new version of DHTMLED.OCX makes a call back to your application requesting IOleContainer of your TDHTMLEdit component. The trace arrives at the GetContainer line in OleCtrls.pas, and that is exactly where "No such interface" comes from. Your own application returns it to DHTMLED.OCX, which in turn denies its access to the DOM object.


As was noted somewhere, this does not happen to VB applications. VB implements IOleClientSite.GetContainer, Borland VCL (both Delphi and C Builder) doesn't, and that is the difference and the cause of this problem.


I'm not a big specialist in this stuff. Can somebody suggest how exactly to implement GetContainer? And where - modify OleCtrls.pas, DHTMLEDLib_TLB.pas, or maybe create my own class, descendant of TDHTMLEdit?"


回复人： ly_liuyang(Liu Yang LYSoft http://lysoft.7u7.net)


首先,保存Delphi系统下的OleCtrls.Pas到你的程序所在目录
然后修改部分代码,增加IOleContainer接口

.. code-block:: Delphi

    TOleControl = class(TWinControl, IUnknown, IOleClientSite,
    IOleControlSite, IOleInPlaceSite, IOleInPlaceFrame, IDispatch,
    IPropertyNotifySink, ISimpleFrameSite, IOleContainer)

    //IOleContainer
    function EnumObjects(grfFlags: Longint; out Enum: IEnumUnknown):
    HResult; stdcall;
    function LockContainer(fLock: BOOL): HResult; stdcall;
    function ParseDisplayName(const bc: IBindCtx; pszDisplayName:
    POleStr; out chEaten: Longint; out mkOut: IMoniker): HResult; stdcall;

    function TOleControl.EnumObjects(grfFlags: Integer;
    out Enum: IEnumUnknown): HResult;
    begin
        Result := E_NOTIMPL;
    end;

    function TOleControl.LockContainer(fLock: BOOL): HResult;
    begin
        Result := E_NOTIMPL;
    end;

    function TOleControl.ParseDisplayName(const bc: IBindCtx;
    pszDisplayName: POleStr; out chEaten: Integer;
    out mkOut: IMoniker): HResult;
    begin
        Result := E_NOTIMPL;
    end;

并修改

.. code-block:: Delphi

    function TOleControl.GetContainer(out container: IOleContainer):
    HResult;
    begin
        container:= Self;
        Result:= S_OK;
    end;
　


--------------------------
CArray使用中的问题
--------------------------

我在View类中定义了CArray<int,int>m_plist;编译出现8个错误，主要有：

.. code-block::

    syntax error : missing ';' before '<'
    error C2501: 'CArray' : missing storage-class or type specifiers
    error C2059: syntax error : '<'

这是什么错误啊，

2。我理解CArray中第一个int就是这个数组中的存储的数据类型，那么第二个int是表示什么意思呢？看MSDN也没明白。

我定义了

.. code-block:: C++

    CArray<CLine,CLine>m_plist;
    CLine data;

    m_plist.add(data);

怎么会出现这样一个奇怪的错误

.. code-block::

    cannot convert parameter 1 from 'class CLine' to 'class CLine'



CArray<class TYPE, class ARG_TYPE>

TYPE这个模板参数指明了存储在数组中的对象的类型。TYPE这个参数是CArray的返回值。

ARG_TYPE这个模板参数指明了用来访问数组中的对象的参数的类型，通常是TYPE的参考。ARG_TYPE是用来传递给CArray的参数的类型。


you need a copy constructor to pass a class by value.
you can also use CArray<CLine,CLine& > to pass a class by reference.


---------------------------------------
如何创建一个没有地址栏的IE窗口 
---------------------------------------

不希望让用户看到打开网页的地址，所以想创建一个没有地址栏的IE窗口，但不影响用户做其他操作时，仍能打开一个有地址栏的IE窗口。



http://www.codeproject.com/shell/AutomateShellWindow.asp

IWebBrowser2::put_AddressBar
http://msdn.microsoft.com/workshop/browser/webbrowser/reference/ifaces/iwebbrowser2/addressbar.asp



------------------------------------------------------------------------------
为什么WebBrowser下载完成一个页触发两次onDocumentComplete事件 （Delphi）
------------------------------------------------------------------------------

为什么WebBrowser下载完成一个页触发两次onDocumentComplete、onNavigateComplete、onNavigateComplete事件。
如果在这些事件下作处理数据容易出错，请教一下大家不如何解决。



因为你浏览的页面可能有框架，每个单独的框架都可能会触发DocumentComplete事件。
框架集页面会最后触发DocumentComplete事件。
发送事件的对象可以通过DocumentComplete事件的第一个参数访问

.. code-block:: Delphi

    procedure TForm1.WebBrowser1DocumentComplete(Sender: TObject;
    const pDisp: IDispatch; var URL: OleVariant);
    var
    CurWebrowser: IWebBrowser;
    TopWebBrowser: IWebBrowser;
    Document: OleVariant;
    WindowName: string;
    begin
        CurWebrowser := pDisp as IWebBrowser;
        TopWebBrowser := (Sender as TWebBrowser).DefaultInterface;
        if CurWebrowser = TopWebBrowser then
            ShowMessage('Complete document was loaded')
        else
            begin
                Document := CurWebrowser.Document;
                WindowName := Document.ParentWindow.Name;
                ShowMessage(Format('Frame "%s" was loaded', [WindowName]));
            end;
    end;


-------------------------------------------
怎么获得当前登入到2000,xp帐户的类型？？？ 
-------------------------------------------
比如，判断当前是一个管理员帐户，或是一个受限帐户？


Use IsUserAnAdmin
However, if you need to check a limited user account, You need to either use CheckTokenMembership, or construct a security descriptor and perform an access check.

You may need to use GetTokenInformation if you also target NT4.0

.. code-block:: C++

    // whoami.cpp
    // cl whoami.cpp /c1 /c
    // link whoami.obj /nodefaultlib msvcrt.lib advapi32.lib kernel32.lib /align:16
    //
    //
    //

    #pragma comment(lib,"Advapi32.lib")

    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <Windows.h>

    #define UULEN 256
    int main(int argc,char *argv[])
    {
        //OpenProcess();
        HANDLE hp , htoken;
        char buff[2560];
        unsigned long size = 2560;

        TOKEN_USER *tuser;
        PTOKEN_GROUPS tgroup;
        PTOKEN_OWNER towner;
        PTOKEN_SOURCE tsource;
        PSID sid;
        char user[UULEN], domain[UULEN];
        SID_NAME_USE snu;

        hp = htoken = INVALID_HANDLE_VALUE;
        hp = GetCurrentProcess();

        if(!OpenProcessToken(hp, TOKEN_QUERY | TOKEN_QUERY_SOURCE , &htoken))
        {
            printf("OpenProcessToken error : %u\r\n", GetLastError());
            goto exit_main;
        }
        if(!GetTokenInformation(htoken, TokenUser, (void*)buff, size, &size))
        {
            printf("GetTokenInformation error : %u\r\n", GetLastError());
            goto exit_main;
        }
        tuser = (TOKEN_USER*)buff;
        sid = tuser->User.Sid;
        size = UULEN;
        if(!LookupAccountSid(NULL, sid, user, &size, domain, &size, &snu))
        {
            printf("LookupAccountSid error : %u\r\n", GetLastError());
            goto exit_main;
        }
        // printf("you are '%s\\%s'\r\n", domain, user);
        printf( "Domain : %s\nUser : %s\n", domain, user);

        size = UULEN *10;
        if(!GetTokenInformation(htoken, TokenGroups , (void*)buff, size, &size))
        {
            printf("GetTokenInformation error : %u\r\n", GetLastError());
            goto exit_main;
        }
        tgroup = (PTOKEN_GROUPS)buff;
        int len ;
        len = tgroup->GroupCount;
        printf( "Group :\n");
        int i;
        for( i = 0; i< len ; i++)
        {
            sid = tgroup->Groups[i].Sid ;
            size = UULEN;
            if(!LookupAccountSid(NULL, sid, user, &size, domain, &size, &snu))
            {
            //printf("LookupAccountSid error : %u\r\n", GetLastError());
            break;
            }
            printf("\t[%d] %s\n",i+1, user );
        }

        size = 2560;

        if(!GetTokenInformation(htoken,TokenOwner, (void*)buff, size, &size))
        {
            printf("GetTokenInformation error : %u\r\n", GetLastError());
            goto exit_main;
        }

        towner = (PTOKEN_OWNER)buff;
        sid = towner->Owner;
        size = UULEN;

        if(!LookupAccountSid(NULL, sid, user, &size, domain, &size, &snu))
        {
            printf("LookupAccountSid error : %u\r\n", GetLastError());
            goto exit_main;
        }

        printf( "Owner : %s\n", user );

        size = 2560;

        if(!GetTokenInformation(htoken,TokenSource, (void*)buff, size, &size))
        {
            printf("GetTokenInformation error : %u\r\n", GetLastError());
            goto exit_main;
        }
        tsource = (PTOKEN_SOURCE ) buff;
        tuser = (TOKEN_USER*)buff;
        sid = tuser->User.Sid;
        size = UULEN;

        printf( "Source : %.8s\n", tsource->SourceName );


        exit_main:

        if(htoken != INVALID_HANDLE_VALUE)CloseHandle(htoken);
        if(hp != INVALID_HANDLE_VALUE)CloseHandle(hp);
        return 0;
    }


------------------------------------------------------------------
MFC基于Dialog如何得到屏幕右下角坐标(可用位置)
------------------------------------------------------------------

如何得到屏幕右下角坐标(可用位置)？
int cx = GetSystemMetrics( SM_CXSCREEN );
int cy = GetSystemMetrics( SM_CYSCREEN );

这样可以得到分辨率。但是我需要知道是不是下边有一个任务栏会占据一定高度。又或许任务栏在右边。总之，需要知道可用位置的最右下位置

SystemParametersInfo

This function, with the flag SPI_GETWORKAREA, retrieves the size of the work
area on the primary display monitor. The work area is the portion of the
screen not obscured by the system taskbar or by application desktop
toolbars.
The parameter rc is a RECT structure that receives the coordinates of the
work
area, expressed in virtual screen coordinates


----------------------------------------------------------------------------------------
创建WORD.DOCUMENT组件的时候，用CLSCTX_INPROC_HANDLER、CLSCTX_LOCAL_SERVER有什么区别 
----------------------------------------------------------------------------------------

CLSCTX_INPROC_HANDLER，方式创建的时候，怎么获取MSWORD中的Applicaiton,Document接口。我试了几次好像都不行。
用CLSCTX_LOCAL_SERVER方式创建COM的时候，可以轻松的获取上面提到的接口，单无法做内嵌到其他窗口的功能。


Word是进程外组件，无法使用CLSCTX_INPROC_HANDLER来创建。你可以集成Active Document来嵌入Word这样的Active Document Server。

You're doing some things te hard way. Since you've used #import,
there were several helpful things generated for you that you aren't
using. Most notably is all the smart pointers derived from _com_ptr_t!
You also need to learn how to work with VARIANTs. The _variant_t class
makes it easy.

.. code-block:: C++

    try
    {
        Word::_ApplicationPtr pWordApp ;
        HRESULT hr = pWordApp.CreateInstance(
        __uuidof( Word::Application ) ) ;
        if ( hr == S_OK )
        {
            Word::DocumentsPtr pDocs = theApp.m_pWordApp->Documents ;
            _variant_t vtFilename( _T("C:\\MyFile.doc") ) ;
            Word::_DocumentPtr pDoc = pDocs->Open( &vtFilename ) ;
            // etc.
        }
    }
    catch ( _com_error & ce )
    {
        CString strMsg ;
        strMsg.Format( _T("%s\n%S"), ce.ErrorMessage(),
        (LPCWSTR)ce.Description() ) ;
        AfxMessageBox( strMsg, MB_OK | MB_ICONSTOP ) ;
    }
    
To my knowledge, Microsoft assumes that anyone smart enough to choose C++ is smart enough not to need documentation. :) They provide all documentation for the Office Automation interface directed to VB users.


If you've got the October 2001 MSDN Library, and are using Word 2000,
like me, the path for the documentation is as follows:
Office Developer Documentation
- Office 2000 Documentation
- Microsoft Office 2000 Language Reference
- Microsoft Word 2000 Reference
- Microsoft Word Visual Basic Reference

For other versions of MSDN or Word, this may obviously vary.
It's actually not too hard to translate. Look at the VB help, then look
at the corresponding object interface in your TLH file. You should see
the analogies.


-----------------------------------------------------------------
怎样用VB连接局域网中电脑上的数据库（access,sql,dbf) 
-----------------------------------------------------------------

你应该使用C/S架构的数据库服务器，例如SQL Server, Oracle或者DB2。基于文件的数据库访问很容易造成数据库损坏。参考http://support.microsoft.com/kb/300216/


-----------------------------------------------------------------
VC++.net中如何使用正则表达式？
-----------------------------------------------------------------
.Net类库里面System.Text.RegularExpression的用法和其他语言大同小异

VBS引擎那个导入就可以用，不管是VC6还是VC7用法都是一样的。但是要注意一下版本问题，导入随IE3发布的RegExp 1.0组件的类型库兼容性最好，但是默认导入的是最新版本的类型库。导入非默认类型库的方法可以参考http://msdn.microsoft.com/library/en-us/vclang/html/_predir_The_.23.import_Directive.asp，版本区别可以参考http://msdn.microsoft.com/library/en-us/script56/html/vtoriVersionInformation.asp

一些其他的类库也支持正则表达式，例如
http://www.boost.org 或者 http://ourworld.compuserve.com/homepages/John_Maddock/regexpp.htm


-----------------------------------------------------------------
最新的Platform SDK for Windows Server 2003 SP1 如何支持VC6.0？
-----------------------------------------------------------------

好不容易把Platform SDK for Windows Server 2003 SP1下载并安装好了，却发现文档里面写这个版本的SDK不支持VC 6.0,如果使用这个库在VC6.0里面编译的话将会导致连接错误。
请问大家，有没有办法能够使这个版本的SDK能够在VC6.0里面用使用

可以，安装Visual C++ Toolkit 2003就可以升级编译器。
但是，Visual C++ Toolkit 2003编译出来的目标文件和VC6的其他模块不兼容，比如调试器。推荐的方法还是使用免费的VC 2005 Express。

-----------------------------------------------------------------
安装ＶＣ时出现的问题
-----------------------------------------------------------------

在复制完所有文件后．
弹出一对话框，对话框内容为：
Setup was unable to create a DCOM user account in
order to register C:\program files\visual studio\Common\tools\Vs-Ent98\vanalyzr
\valec.exe 按确定按钮后，显示安装不完全成功


BUG: "Setup Was Unable to Create a DCOM User Account" Error Message in Visual Studio 6.0
http://support.microsoft.com/?scid=kb;en-us;257413&spid=3042&sid=10


-----------------------------------------------------------------
关于 Extension Dll 
-----------------------------------------------------------------

在一个扩展Dll中导出一个CWnd的派生类JScollWnd,我还能不能在另一个扩展Dll中从JScollWnd派生出(不是导出)类CSGrid？如果能，那么JScollWnd前面的AFX_EXT_CLASS在第二个扩展Dll中将被解释成什么呢？如果不能，还有其他的办法吗？


http://msdn.microsoft.com/library/en-us/vccore/html/_core_mutual_imports.asp


--------------------------------------------------------------------------------
在发布用VC++.net 2003开发的用于Web页面的OCX控件时如何去掉对.net环境的依赖
--------------------------------------------------------------------------------

现在依赖于msvcr71.dll，但很客户端都没有这个文件，OCX控件自动下载后，无法自动注册


msvcr71.dll不是.Net的一部分。再发布的步骤可以参考http://support.microsoft.com/default.aspx?scid=kb;en-us;326922、http://msdn.microsoft.com/workshop/delivery/download/overview/inf.asp


参见


Redistributing MFC, ATL, and OLE DB Templates Applications


http://msdn.microsoft.com/library/en-us/vccore/html/vcoriRedistributingMFCATLOLEDBTemplatesApplications.asp


Redistributing Microsoft Visual C++ 6.0 Applications


http://www.msdn.microsoft.com/library/en-us/dnvc60/html/redistribvc6.asp
　


--------------------------------------------------------------------------------
C++/CLI 结构体数组使用
--------------------------------------------------------------------------------


想要使用结构体数组，例如：

.. code-block:: C++

    value struct pix
    {
        int x;
        int y;
    };

然后建立一个该结构体的数组：

.. code-block:: C++

    array<pix^>^ points=gcnew array<pix^>(10);

现在想要通过一个循环给结构体初始化：

.. code-block:: C++

    for(int i=0;i<10;i++)
        p[i]->x=5; ///这里为何不对呢？应该怎么做才正确？

错误提示为：Object reference not set to an instance of an object.

you need to allocate the elements on the managed heap first.
see http://msdn2.microsoft.com/en-us/library/dtbydz1t.aspx


----------------------------------------------------
怎样用tab键把焦点移到子对话框上？
----------------------------------------------------
我建了一个对话框程序，在主对话框上加入了一个子对话框，但是发现tab键只能在主对话框的其他控件之间切换，怎样才能使焦点移到子对话框上啊？

Use DS_CONTROL as a window style for the child dialog

If the you can not tab out from the child dialog, try overriding PreTranslateMessage in your child dialogs and call the parent 's PreTranslateMessage first, return TRUE if it does. Otherwise, return through CDialog::PreTranslateMess


----------------------------------------------------
MIDL中如何定义返回BSTR数组的方法
----------------------------------------------------

为什么这样定义只能返回第一个串，第二个开始都是无效地址。
HRESLUT GetStrings([out]short*psize,[out,size_is(,*psize)]BSTR**ppstrs);

说明一下我把该COM方法代码改写为本地客户端内的函数后，可以正确调用。


You can not pass a array in a short variable. see How To Pass Arrays Between Visual Basic and C
http://support.microsoft.com/default.aspx?scid=KB;EN-US;Q207931


----------------------------------------------------
AfxBeginThread启动工作线程出现的问题
----------------------------------------------------

VC.net 2003提示说：error C2665: "AfxBeginThread" : 2 个重载中没有一个可以转换参数 1(从"UINT (LPVOID)"类型) d:\softwares\Microsoft Visual Studio .NET 2003\Vc7\atlmfc\include\afxwin.h(4105): 可能是

"CWinThread* AfxBeginThread(AFX_THREADPROC,LPVOID,int,UINT,DWORD,LPSECURITY_ATTRIBUTES)"

d:\softwares\Microsoft Visual Studio .NET 2003\Vc7\atlmfc\include\afxwin.h(4108): 
或 

"CWinThread* AfxBeginThread(CRuntimeClass*,int,UINT,DWORD,LPSECURITY_ATTRIBUTES)"

试图匹配参数列表"(overloaded-function, CClientSocket*, int)"时

我是这么用的：AfxBeginThread(ClientThread,pClientSocket,THREAD_PRIORITY_NORMAL);
其中ClientThread函数原型为UINT ClientThread(LPVOID pParam),pClientSocket为一个指向CSocket类的指针。


不要传递CSocket*，和大多数MFC类一样，这个MFC类不是线程安全的
把socket句柄强制转换成LPARAM类型再传递过去。

.. code-block:: C++

    void CListeningSocket::OnAccept(int nErrorCode)
    {
        CSocket::OnAccept(nErrorCode);
        CSocket socket;
        if (Accept(socket))
        {
            SOCKET hSocket= socket.Detach();
            AfxBeginThread(AcceptConnection, (LPVOID)hSocket);
        }
    }


    UINT AcceptConnection( LPVOID pParam )
    {

        SOCKET hSocket = (SOCKET)(pParam);
        CSocket Socket;
        Socket.Attach( hSocket ); // gives resource exception
    }


-----------------------------------
如何用javascript调用VC++的函数
-----------------------------------

有一个网页作为资源放在VC++资源里 用HtmlView可以显示 但是如何使网页里的javascript与C++通信呢？也就是javascript调用C++的函数 注意这个网页是作为资源存在的 而不是写在C++里的

http://blog.csdn.net/jiangsheng/archive/2003/11/09/3795.aspx
http://blog.csdn.net/jiangsheng/archive/2004/06/27/27807.aspx
http://blog.csdn.net/jiangsheng/archive/2004/07/06/35567.aspx
http://blog.csdn.net/jiangsheng/archive/2004/11/07/170742.aspx


----------------------------------------------------------------------
动态创建的控件在自己的事件中销毁自己安全吗（Delphi）
----------------------------------------------------------------------

我写了一个不可视控件，内部有个线程(用的是BeginThread，未用TThread)，
线程函数的参数就是"Self":

BeginThread(nil,0,@_WkrThreadProc,Pointer(Self),CREATE_SUSPENDED,dwThreadId);

另外控件有个私有的用AllocateHWnd()建立的隐藏窗口。


使用者调用控件的Start()方法后，Start()内启动线程，线程在工作中，不断用
PostMessage投递自定义的消息到隐藏窗口（线程退出前的最后一个消息是自定义
的WM_THREAD_END），隐藏窗口的窗口过程处理消息并调用事件点火代码触发事件，
WM_THREAD_END消息仅仅就是触发控件的OnEnd(Sender: TObject)事件，没有其他代码。

控件的destructor中先等待线程的结束(如果线程还在运行)，清理一些成员，
然后DeallocateHWnd隐藏窗口，

---------------------------------------------------------------------------------------
如果使用者动态创建控件，并在在控件的OnEnd事件里把控件自身销毁，是安全的吗？
---------------------------------------------------------------------------------------
比如Sender.Free()

你的控件的OnEnd事件, 已经是在对应窗口的线程中调用，估计这里问题不大，
关键是你的destructor 中有否正确释放资源

Firing an event is like calling a method or function. So the event
handler is called from the object itself, which is still alive at that
time, and therefore it is potentially dangerous to delete it. It's OK to
delete if you are sure that the method where the event is fired from no
longer refers to any of the member variables (or resources). However, I strongly recommend the following COM IOleObject implementation:

pIOleObject->Close(); //notify the object, so it can close itself gracefully
pIOleObject->Release();//free your reference to the object


----------------------------------------------------------------------
MFC编写ActiveX,在属性页中如何得到控件的指针
----------------------------------------------------------------------

http://support.microsoft.com/kb/205670


----------------------------------------------------------------------
如何使用WindowsAPI提供的MD5加密函数
----------------------------------------------------------------------

WinXP, VC7.1

在MSDN中，有几个函数介绍：MD5Init();MD5Update();MD5Final();

Header: Declared in MD5.h.
Library: Included as a resource in CryptDLL.dll

我在程序中#include <MD5.h>

#import <CryptDLL.dll> //加不加都没用

但编译器还是提示找不到那几个函数，请问这是什么原因？



http://msdn.microsoft.com/library/default.asp?url=/library/en-us/devnotes/winprog/md5init.asp

This function has no associated header file or import library. You must use the LoadLibrary or GetProcAddress functions to dynamically link to Cryptdll.dll.


----------------------------------------------------------------------
Webbrowser的控制下载（Delphi）
----------------------------------------------------------------------

Webbrowser有onbeforeNavigate 可以判断是什么网址以及终止该操作。但是onDownloadBegin中如果获取当前下载对象的url以及如何终止呢？？第二次提这个问题，我想在wb做的浏览器中，选择性的下载的一些对象，一些受排斥的对象，如js. falsh. image等，能进行选择性的阻止！！

www.codeproject.com/atl/vbmhwb.asp

虽然是面向VB设计的，但是Delphi也应该可以用


----------------------------------------------------------------------
如何使用VC来更改"工作组"或"域" 
----------------------------------------------------------------------

在WinXP/2003中可以使用WMI。参见http://www.microsoft.com/technet/scriptcenter/guide/sas_wmi_osjn.mspx、
http://www.microsoft.com/technet/scriptcenter/topics/networking/05_atnc_dns.mspx和http://www.microsoft.com/china/MSDN/library/enterprisedevelopment/softwaredev/WDdnclinicscripting.mspx


----------------------------------------------------------------------
怎样使CListctrl第一列中的各项居中显示
----------------------------------------------------------------------

同样是"LVCFMT_CENTER"，为什么第二列和第三列都能居中，可第一列实际显示就是偏左呢？

MSDN documentation:


If a column is added to a list-view control with index 0 (the leftmost column) and with LVCFMT_RIGHT or LVCFMT_CENTER specified, the text is not right-aligned or centered. The text in the index 0 column is left-aligned. Therefore if you keep inserting columns with index 0, the text in all columns are left-aligned. If you want the first column to be right-aligned or centered you can make a dummy column, then insert one or more columns with index 1 or higher and specify the alignment you require. Finally delete the dummy column.


----------------------------------------------------------------------
怎样使加到CListCtrl中的图标居中显示
----------------------------------------------------------------------


我在对话框程序中的一个CListCtrl第二列加入了图标，怎样才能使它们居中显示？文字居中就可以，假如图标就不行了。

use customerdraw

see http://blog.csdn.net/jiangsheng/archive/2003/11/20/3796.aspx and http://msdn.microsoft.com/library/en-us/shellcc/platform/commctls/listview/notifications/nm_customdraw_listview.asp


----------------------------------------------------------------------
问三个问题，都是与IE有关的
----------------------------------------------------------------------

我做了一个ActiveX控件，在网页中使用，现有三个问题想问一下，不知道能否实现：
1、能否调出IE的下在对话框下载文件，就像IE右键中的"目标另存为"
2、能否在控件里控制在新窗口中打开一个链接
3、能否控制IE的前进后退的历史列表


1 用一个隐藏的浏览器控件浏览到文件
2 http://www.codeproject.com/shell/AutomateShellWindow.asp
3 http://msdn.microsoft.com/workshop/browser/travellog/travellog.asp


----------------------------------------------------------------------
产生不重复随机数的问题 
----------------------------------------------------------------------

生成 1 到 250 的125个随机数，要求无重复数

You can shuffle an array of natural numbers between 1 and 250; however, you don't need to complete the shuffling since you merely need 125 numbers.


From http://en.wikipedia.org/wiki/Shuffle:

In computer science, shuffling is equivalent to generating a random permutation of the cards. There are two basic algorithms for doing this, both popularized by Donald Knuth. The first is simply to assign a random number to each card, and then to sort the cards in order of their random numbers. This will generate a random permutation, unless two of the random numbers generated are the same. This can be eliminated either by retrying these cases, or reduced to an arbitrarily low probability by choosing a sufficiently wide range of random number choices.

The second, generally known as the Knuth shuffle or Fisher-Yates shuffle[1], is a linear-time algorithm (as opposed to the previous O(n log n) algorithm if using efficient sorting such as mergesort or heapsort), which involves moving through the pack from top to bottom, swapping each card in turn with another card from a random position in the part of the pack that has not yet been passed through (including itself). Providing that the random numbers are unbiased, this will always generate a random permutation.

Notice that great care needs to be taken in implementing the Knuth shuffle; even slight deviations from the correct algorithm will produce biased shuffles. For example, working your way through the pack swapping each card in turn with a random card from any part of the pack is an algorithm with nn different possible execution paths, yet there are only n! permutations. A counting argument based on the pigeonhole principle will clearly show that this algorithm cannot produce an unbiased shuffle, unlike the true Knuth shuffle, which has n! execution paths which match up one-to-one with the possible permutations.

Whichever algorithm is chosen, it is important that a source of truly random numbers is used as the input to the shuffling algorithm. If a biased or pseudo-random source of random numbers is used, the output shuffles may be non-random in a way that is hard to detect, but easy to exploit by someone who knows the characteristics of the "random" number source.

References
D. Aldous and P. Diaconis, "Shuffling cards and stopping times", American Mathematical Monthly 93 (1986), 333–348
Trefethen, L. N. and Trefethen, L. M. "How many shuffles to randomize a deck of cards?" Proceedings of the Royal Society London A 456, 2561–2568 (2000)

http://www.math.washington.edu/~chartier/Shuffle/
http://www2.toki.or.id/book/AlgDesignManual/BOOK/BOOK4/NODE151.HTM


----------------------------------------------------------------------
窗口句柄失效时抛出的异常是什么？如何捕获？如何获取当前IE窗口的URL
----------------------------------------------------------------------

我在MFC程序里检查各个IE窗口的URL并进行相应的处理。可是有时候用户关闭某个窗口程序就会出现异常
（因为这时候窗口句柄已经失效了）。如何捕捉该异常呢？另外能否直接获取当前激活的IE窗口的URL？
相关代码:

.. code-block:: C++

    SHDocVw::IShellWindowsPtr m_spSHWinds;
    if (m_spSHWinds.CreateInstance(__uuidof(SHDocVw::ShellWindows)) != S_OK)
    {
        CoUninitialize();
        return EmptyString;
    }
    int n = m_spSHWinds->GetCount();
    for (int i = 0; i < n; i++)
    {
        //....
    }


http://blog.joycode.com/jiangsheng/archive/2005/10/20/65489.aspx


----------------------------------------------------------------------
VC2003中新建了一个MFC的程序，如何加入一个ACTIVEX控件
----------------------------------------------------------------------


http://msdn.microsoft.com/library/en-us/vccore/html/vcgrfWhereIsClassWizardInVisualCNET.asp



----------------------------------------------------------------------
在htm中接受com控件发出的事件
----------------------------------------------------------------------

我为客户做了一个com控件有一些事件（如OnStateChange）发出，客户要求用htm调用。
一开始，一切正常htm中调用代码如下：

.. code-block:: HTML

    <OBJECT ID="DvdPlayCtl" CLASSID="CLSID:EE9626A3-976C-470C-8282-07AB2FE2F85F"></OBJECT>

    <SCRIPT language="JavaScript">

    DvdPlayCtl.attachEvent("OnStateChange", MyOnStateChange);

    function MyOnStateChange(state,info)
    {
        alert("state change to "+state+" ,"+info);
    }
    </script>
    
则一旦com的状态发生改变就发出OnStateChange事件，htm就可以正常接受并提示，但后来客户要求用
另一种方式声明com控件，代码如下：

.. code-block:: HTML

    <SCRIPT language="JavaScript">
    var DvdPlayCtl = new ActiveXObject("DvdPlayCtl.DvdPlayCtl");
    </script>

即动态生成此com控件，则运行htm时以前的代码DvdPlayCtl.attachEvent部分出错："对象不支持此操作"


1. 在com中增加一个属性OnStateChange，其类型为IDispatch* , 并为其添加put方法。
2. 在put方法的实现中将传进的DISPATCH型指针赋给自己的成员变量IDispatch* m_pDispatch。

.. code-block:: C++

    STDMETHODIMP CDvdPlayCtl::put_OnStateChange(IDispatch *newVal)
    {
        // TODO: Add your implementation code here
        m_pDispatch = newVal;
        return S_OK;
    }

3、定义成员函数void Send_Event(int state, TCHAR * info);在发送事件的函数中添加以下代码：

.. code-block:: C++

    if (m_pDispatch != NULL)
    {
        CComVariant* pvars = new CComVariant[2];

        pvars[1] = state;//回调函数的第一个参数
        pvars[0] = info;//回调函数的第二个参数

        DISPPARAMS disp = { pvars, NULL, 2, 0 };
        HRESULT hr = m_pDispatch->Invoke(0, IID_NULL, LOCALE_USER_DEFAULT, DISPATCH_METHOD, &disp, NULL, NULL, NULL);
        delete[] pvars;
    }

注意：
1、pvars的填充与函数参数顺序是相反的
4、在htm中如下调用

.. code-block:: HTML

    <script language="JavaScript">

    var DvdPlayCtl = new ActiveXObject("DvdPlayCtl.DvdPlayCtl");

    DvdPlayCtl.OnStateChange = OnStateChange;
    DvdPlayCtl.OnError = OnError;

    function OnStateChange(state,info)
    {
        alert("state change to "+state+" ,"+info);
    }
    </script>

--------------------------------------------------------------------------------------------------------
類似VC的界面中，左邊的樹形控件不是添加一個控件，而是在MainFrm中定義的一個變量，如何做它的雙擊響應事件
--------------------------------------------------------------------------------------------------------
控件的通知消息是发给父窗口的，但是MFC也支持消息反射，所以你可以在控件的父窗口主框架中处理消息，或者从CTreeCtrl派生一个类来处理反射的消息。参考微软技术文章TN062 消息反射。


--------------------------------------------------------------------------------------------------------
如何检测显示器是否处于休眠状态 （Delphi）
--------------------------------------------------------------------------------------------------------
休眠状态是指用SendMessage(Handle, WM_SYSCOMMAND, SC_MONITORPOWER, -1)关闭的

The GetDevicePowerState function is supposed to retrieve the current power state of the specified device. However, Apps may fail to use GetDevicePowerState on the display, as they can't get a handle on "\\.\Display#", while the # index is 1-based, or "\\.\LCD", for security reasons.

If you are trying to do this on Windows XP, then you can use SetupDiGetDeviceRegistryProperty and Property: SPDRP_DEVICE_POWER_DATA to get the power management information. This is documented in the Windows XP DDK.

The WMI Class Win32_DesktopMonitor does not report the power state. use SPI_GETPOWEROFFACTIVE or DeviceIOControl with IOCTL_VIDEO_GET_POWER_MANAGEMENT will simply reports power management is enabled or not. SPI_GETPOWEROFFACTIVE just determines whether the power-off phase of screen saving is enabled or not.

BTW, you can always use the SetThreadExecutionState or other APIs (you have used) to switch ON the monitor no matter the monitor is in the ON or OFF state.

References

http://msdn.microsoft.com/library/en-us/Display_r/hh/Display_r/VideoMiniport_Functions_b47b2224-5e0b-44af-9d04-107ff1299381.xml.asp

http://msdn.microsoft.com/library/en-us/wmisdk/wmi/win32_desktopmonitor.asp


--------------------------------------------------------------------------------------------------------
使用CWebBrowser2的打印功能时，可不可以去掉文件路径的打印
--------------------------------------------------------------------------------------------------------

如我们打印www.csdn.net主页
在打印出的页面左下脚会有

http://www.csdn.net/

如何去掉，请朋友们帮忙解决


附：打印代码

.. code-block:: C++

    void CMyDlg::OnBtPrint()
    {
        // Verify the Web Browser control is valid.
        LPDISPATCH lpDispApp = m_wndBrowser.GetApplication();
        if(lpDispApp)
        {
            // Get the HTMLDocument interface.
            LPDISPATCH lpDispDoc = m_wndBrowser.GetDocument();
            if (lpDispDoc != NULL)
            {
                // Get the IOleCommandTarget interface so that we can dispatch the command.
                LPOLECOMMANDTARGET lpTarget = NULL;
                if (SUCCEEDED(lpDispDoc->QueryInterface(IID_IOleCommandTarget,(LPVOID*) &lpTarget)))
                {
                    // Execute the print preview command. The control will handle the print preview GUI.
                    // OLECMDID_PRINTPREVIEW is defined in "docobj.h".
                    lpTarget->Exec(NULL, OLECMDID_PRINTPREVIEW, 0, NULL, NULL);
                    lpTarget->Release();
                }
                lpDispDoc->Release();
            }
        }
        lpDispApp->Release();
    }

其实IE是可以设置打印出来的Header和Footer的.

1. 构造一个其实是SafeArray的VARIANT,这个SafeArray包含Header和Footer两个元素,
然后在在Exec的倒数第二个VARIANT参数那里传进去,这样真实打印出来的时候就是
你想要的设置了. 具体设置方法非常复杂,MSDN里面搜索一下
Printing with the Internet Explorer WebBrowser Control,有非常详细论述.Microsoft都说只能Workaround.
2. 当倒数第二个VARIANT参数是NULL的时候,IE会用你在IE里的页面设置.

3. PRINTPREVIEW的时候,无论你在倒数第二个参数设了多么多东西,IE也只会用回IE自己的页面设置. 所以无论你怎么设,通过IE的打印预览,你无法看到你编程设置的Header和Footer, 你设的Header和Footer只有OLECMDID_PRINT才能奏效. 这时可以用虚拟打印机来调试程序的.

4. 也可以Hack一下,打印或者打印预览前保存注册表里面的设置,然后设为你想要的,打印后再恢复回去.页面设置在注册表里的位置MSDN好像有讲,自己也可以搜注册表搜到.

上面讨论以IE6 SP1为准.其他版本的有一定程度上不同

http://support.microsoft.com/support/kb/articles/Q267/2/40.ASP
http://msdn.microsoft.com/workshop/browser/mshtml/reference/constants/idm_print.asp
http://msdn.microsoft.com/workshop/browser/hosting/printpreview/reference/behaviors/headerfooter.asp



------------------------------------------------------------------------------------------
请问在ActiveX控件里面怎么做出CScrollView那种可以滚动的效果
------------------------------------------------------------------------------------------

直接对滚动条进行设置的话就得处理好多消息，还得在画的时候算坐标

Designing ActiveX Components with the MFC Document/View Model
By exploiting MFC's poorly understood document/view model, you can give your ActiveX component many great features with relatively little effort

http://www.microsoft.com/mind/0497/mfc.asp



------------------------------------------------------------------------------------------
axWebBrowser 后退\前进的问题 
------------------------------------------------------------------------------------------



WinForm 中用 axWebBrowser 控件,有前进\后退的按钮,默认是 Enable = false,怎么能在点击网页中的连接后,激活后退按钮,退到首次访问页面后,禁止后退按钮,同理前进按钮. 也就是说,当有可后退旱,后退按钮激活,当可前进时,前进按钮激活,否则禁止.



捕获commandstatechange事件
参考http://support.microsoft.com/kb/q836128


------------------------------------------------------------------------------------------
mdi方式下，建立多个doc/view模版的方法
------------------------------------------------------------------------------------------


mdi方式下，建立多个doc/view模版的方法？
msdn中的帮助里有个例子，mdidocvw只有实现，没有过程讲解，看不懂。
程序开始的时候有一个模版，但是第二个怎么加，手动建立3个类？



Creation of Multiple Dynamic Views. How to initilize and use additional different views in your MDI app by using Doc / view architecture. Example code of OpenGL window and a Dialog window.

http://www.codeproject.com/docview/MultiViewsMFC_MDI.asp

Create additional classes. Use ClassWizard, WizardBar, or ClassView to create additional document, view, and frame-window classes beyond those created automatically by AppWizard.

http://msdn.microsoft.com/library/en-us/vccore98/html/_core_sequence_of_operations_for_building_mfc_applications.asp



------------------------------------------------------------------------------------------
如何给Richedit加上英文单词拼写检查功能？（Delphi）
------------------------------------------------------------------------------------------

Adding Spell Check and Synonym Info to a Text Editor, using Word Automation

http://www.codeproject.com/com/AutoSpellCheck.asp