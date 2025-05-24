.. meta::
   :description: 问《VC++技术内幕》第四版p217，关于线程和MFC书上说，不允许在线程之间共享MFC对象（此原则不适用于直接从CObject派生的对象或者是简单的类），那么我想在一个线程中打开一个txt文件并向里面写数据可否这样做：

Win32 & .Net Q&A
====================

.. post:: 28, Feb, 2005
   :tags: CSDN, MFC
   :category: Win32, Microsoft Foundation Classes
   :author: me
   :nocomments:

问《VC++技术内幕》第四版p217，关于线程和MFC书上说，不允许在线程之间共享MFC对象（此原则不适用于直接从CObject派生的对象或者是简单的类），那么我想在一个线程中打开一个txt文件并向里面写数据可否这样做：

.. code-block:: C++

    FILE* pfile= fopen(g_strSavepath,"wt");

其中CString g_strSavepath;是一个全局变量。

另外，书上p217第7行提到，主线程有一个窗口，这个窗口指的是什么？传递窗口句柄和传递窗口指针又有什么区别？线程中是否只能用API函数呢？

帮同学做一个程序，没想到里面用到了线程，只好临时抱佛脚了，请多多指教。谢谢！

答：每个MFC线程类包含一个主窗口指针成员。如果在线程类的主消息循环中发现这个指针指向的窗口已经被销毁，那么会退出主消息循环——这也导致线程终止。

使用其它线程创建的CString目前是安全的——但是你最好不要这么做，鬼知道微软在以后的MFC版本中会不会修改它的实现使其依赖于所在线程。字符数组是安全的，而且路径长度是有上限的，所以你可以使用TCHAR tszPath[_MAX_PATH}这样一个字符数组来保存数据。一些其它类型的类和类型也可以用来在线程之间传递数据，例如BSTR等等。

线程使用的函数没有限制，但是可以使用的MFC对象有限制，通常只允许访问本线程创建的。如果你检查一下CWinThread的源代码就会发现它创建了一个临时的窗口对象来在本线程内继承父线程的主窗口——这是默认的行为，除非你手动指定一个主窗口。这个临时的窗口对象是使用父线程的主窗口句柄来创建的。

问：把控件嵌入到WEB中，浏览时出现“控件运行某些功能不安全”的对话框，请问这些问题是什么样的原因造成？如果是控件的原因，那么请问控件中安全问题该在何处增强？会不会也有脚本编辑的问题存在？请高手帮忙？

答：要使控件对IE来说是安全的话，则必需实现IObjectSafety接口。如果你不会使用MFC添加COM接口，那么你需要仔细看看MFC技术文档TN038
http://msdn.microsoft.com/library/en-us/vcmfc98/html/_mfcnotes_tn038.asp

对于你的问题，知识库中有一个基于MFC的示例
http://support.microsoft.com/kb/164119

如果你要将现存控件升级，可以参考
http://support.microsoft.com/kb/161873


问：BHO中拦截了DISPID_BEFORENAVIGATE2,之后怎样显示自定义Band？怎么向自己写的 Explorer Bar传递参数过去？
答：手动显示/隐藏浏览栏可以参考http://support.microsoft.com/support/kb/articles/Q255/9/20.ASP 。在BHO中可以通过枚举窗口，获得每个窗口所在线程ID之后，向本线程的窗口发送自定义消息来完成。

问：VC类中，怎样声明一个事件？
答：C++ 托管扩展和C++/CLI支持事件。

.. code-block:: C++

    // Managed C++ Extension
    __delegate void ClickEventHandler(int, double);
    __delegate void DblClickEventHandler(String*);

    __gc class EventSource {
            __event ClickEventHandler* OnClick; 
            __event DblClickEventHandler* OnDblClick; 

        // ...
    };

.. code-block:: C++

    // C++/CLI
    delegate void ClickEventHandler( int, double );
    delegate void DblClickEventHandler( String^ );

    ref class EventSource
    {
    event ClickEventHandler^ OnClick;
    event DblClickEventHandler^ OnDblClick;
    // ...
    };

.. code-block:: C++

    // Managed C++ Extension
    // 显式地实现add、remove和raise ...

    public __delegate void f(int);
    public __gc struct E {
    f* _E;
    public:
    E() { _E = 0; }

    __event void add_E1(f* d) { _E += d; }

    static void Go() {
        E* pE = new E;
        pE->E1 += new f(pE, &E::handler);
        pE->E1(17);
        pE->E1 -= new f(pE, &E::handler);
        pE->E1(17);
    }

    private:
    __event void raise_E1(int i) {
        if (_E)
            _E(i);
    }

    protected:
    __event void remove_E1(f* d) {
        _E -= d;
    }
    };

.. code-block:: C++
        
    // C++/CLI
    delegate void f( int );
    public ref struct E 
    {
        private:
        f^ _E; //是的，委托也是引用类型

        public:
        E()
        {  // 注意0换成了nullptr！
            _E = nullptr;
        }

        // C++/CLI中显式事件声明的语法集合
        event f^ E1
        {
            public:
                void add( f^ d )
                {
                    _E += d;
                }

            protected:
                void remove( f^ d )
                {
                    _E -= d;
                }

            private:
                void raise( int i )
                {
                    if ( _E )
                        _E( i );
                }

            }
            static void Go()
            {
                E^ pE = gcnew E;
                pE->E1 += gcnew f( pE, &E::handler );
                pE->E1( 17 );
                pE->E1 -= gcnew f( pE, &E::handler );
                pE->E1( 17 );
            }
        };
    }

你也可以实现回调函数、发送WM_NOTIFY消息或者实现自动化连接相关接口来完成类似的功能。

问：我的CPropertySheet中有几个page,在page的EditBox中改变输入,想把框的输入传给变量。在OnOK()的响应里,调用UpdateData(TRUE);但是得到的变量值没有相应改变，请问为什么?是不是属性页不能用UpdateData()?那么我该怎么样使变量的值等于框的输入值?

答：可以调用CPropertySheet::PressButton(PSBTN_APPLYNOW);手动进行数据交换；注意要用DDX把page上的变量和控件关联起来

问：请问如何实现WinRar中那种从列表空件中拖放文件到Windows的窗口中的功能。就是从我自己的应用程序中向Windows的通过双击“我的电脑”产生的窗口中拖放文件，我查了下资料，估计要用到COleDataSource和钩子函数方面的东西，小弟以前没搞过，大侠们帮帮忙，又源代码更好！

答：你可以自己实现OLE Drag/Drop 接口，参考微软知识库文章Q152092 DRAGD95.EXE OLE Drag/Drop in Windows 95 Common Controls和
http://msdn.microsoft.com/library/en-us/shellcc/platform/shell/programmersguide/shell_basics/shell_basics_programming/transferring/datascenarios.asp。

问：首先，我确信已经将一段html 复制到了剪贴板中，然后欲用下面代码取得 HTml 代码：

.. code-block:: C#

    IDataObject iData = Clipboard.GetDataObject();
    this.txtbox1.Text  = (String)iData.GetData(DataFormats.Html);


可是得到的HTML却是下面的一段代码（文字的开端有很多不需要的信息）：

.. code-block:: 

    Version:1.0
    StartHTML:000000264
    EndHTML:000000659
    StartFragment:000000431
    EndFragment:000000623
    StartSelection:000000431
    EndSelection:000000590
    SourceURL:file://D:\quzw\To press\灞傛鏁版嵁搴揬Web淇℃伅鎶藉彇\Application\WebExtract\bin\Debug\Untitled.htm
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

    <HTML xmlns="http://www.w3.org/1999/xhtml"><HEAD><TITLE></TITLE></HEAD>

    <BODY><!--StartFragment--><TABLE>
    <TBODY>
    <TR>
    <TD width="95%"><B><A href="http://www.computer.org/">IEEE Computer
    Society</A></B><BR><SPAN>Last updated 3 December From IEEE Annals</SPAN></TD></TR></TBODY></TABLE><!--EndFragment--></BODY>
    </HTML>


而我想要得到的代码却应该是：

.. code-block:: html

    <TR>
    <TD width="95%"><B><A href="http://www.computer.org/">IEEE Computer
    Society</A></B><BR><SPAN>Last updated 3 December From IEEE Annals</SPAN></TD>
    </TR>


请问我该如何做？？？

答：
.. code-block:: 

    StartHTML:000000264
    EndHTML:000000659
    StartFragment:000000431
    EndFragment:000000623
    StartSelection:000000431
    EndSelection:000000590

这些数值就是剪贴板数据中对应的文本所在的范围，以字符为单位

参考http://msdn.microsoft.com/workshop/networking/clipboard/htmlclipboard.asp

问：vc7里没有类向导的话不是很麻烦吗？怎样能从vc6转到vc7？

答：参考http://msdn.microsoft.com/library/en-us/vccore/html/vcgrfWhereIsClassWizardInVisualCNET.asp


问：请问如何在资源管理器的右键菜单中添加我自己的菜单，以及如何写我的菜单响应命令，谢谢。另外如果可以知道用户资源管理器右键菜单“复制”到底是复制的那些东西（文件名or文件夹名）也可以（这样我就不必去添加自己的菜单了）

答：参考http://www.codeproject.com/shell/copypathext.asp

问：两个webbrowser控件能共同一个session吗?

答：同一进程的webbrowser控件共享一个session。例外：
* 进程手动发送不合法的数据到IIS可能造成session丢失。
* 同时使用SSL和某些路由器，例如 Cisco Local Director，可能造成session丢失

问：WM的标准消息是子类一直流到父类，遇到如WM_PAINT等消息处理完就结束，其他就一层层向父类流，然后处理。

那么WM_COMMAND消息呢？这种消息比较怪，子类收到后还会通知拥有者，比如按一个按钮，按钮的拥有者也会收到消息，那么他们怎么处理呢？怎么流呢？WM的标准消息的处理我模拟出来了，类型机制也模拟出来了。但是WM_COMMAND和WM_NOTIFY消息怎么处理呢？大家说说自己的看法和理解，能有类似代码那是更好。

答：可以去看http://msdn.microsoft.com/library/en-us/vclib/html/_mfcnotes_tn021.asp

问：我以前已经有了一个C/s的系统，现在又开发了一个B/s的系统，也就是同一业务系统的两部分。我现在想通过开发一个com，直接通过网页上点击，来提取人员ID，然后在C/S程序中马上调出人员信息显示，怎么实现，大家给点思路？不知道大家用过eph没有，他的聊天室搜索中就是这么干得，点击后面的按钮就把聊天室添加软件中了。分不够再加

答：有两种方法

一种方法是实现自定义协议，通过解析URL来进行操作

另一种方法是实现IDocHostUIHandler，浏览器控件中的脚本通过访问window.external来访问宿主程序。参考http://www.euromind.com/iedelphi/embeddedwb/ongetexternal.htm和http://www.euromind.com/iedelphi/app/pluggableprotocol.htm。

问：安装了创天简体中文企业版，下载了visual studio sp5中文版，在安装时却说语言版本不对，郁闷啊~怎样才能升级呢？

答：VC没有官方中文版，打SP需要用英文版本的。

问：为什么整型常量可以作为switch结构的case的值，而把变量强制转换成常量就不行呢？

答：switch case不是if goto，编译时可能要根据选项优化的。例如，某些编译器可能优化等间隔的连续switch（例如0,1,2,3)到一个跳转表。

问：如何用程序在IE中的收藏夹中添加一项？

答：你可以直接用SHGetSpecialFolderPath得到收藏夹的位置，然后在里面用IShellLink创建url快捷方式。创建之后用SHChangeNotify通知其他程序。

问：如何拦截IE页面浮动广告？

答：可以枚举所有浮动的网页元素（style.position="absolute"）并且隐藏它们；但是最好在隐藏时通知用户，因为并非全部的浮动元素都是广告。

问：怎样在一个FormView上面实现类似VC的IDE中WorkSpace那样的标签页？

答：可以参考http://msdn.microsoft.com/msdnmag/issues/02/10/cqa/default.aspx、http://www.codeproject.com/docview/cpropertyview.asp和http://www.codeproject.com/docview/mditab.asp

问：如何让CDHtmlDialog有滚动条???   原来我是用CwebBrowser的,为了去掉它的边框,我就用了CDHtmlDialog,但这个又没有滚动条??怎么能让它又滚动条呢?谢谢

答：默认情况下CDHtmlDialog初始化的时候会取消滚动条

.. code-block:: C++

    void CDHtmlDialog::Initialize()
    {
        SetHostFlags(DOCHOSTUIFLAG_NO3DBORDER | DOCHOSTUIFLAG_SCROLL_NO);
    }

在oninitdialog中之前调用SetHostFlags重新设置一下就好了。对话框面积大于网页的时候想去掉滚动条的话，在DocumentComplete的时候设置body.scroll=auto。

问：怎样模拟按下CTRL+ALT+DELETE?

答：可以参考http://msdn.microsoft.com/library/default.asp?url=/library/en-us/sysinfo/base/how_to_lock_the_workstation.asp

问：我用cfiledialog经过设置参数后多选文件最多可以达到4750个

以后随便增加多少内存都不能增加了！请问有没有除了自己重新写类的方法实现选取任意多个文件？

答：参考我的文章http://blog.joycode.com/jiangsheng/archive/2004/11/22/39413.aspx

问：请问同一个项目里可否同时存在托管代码和非托管代码 ？用宏语句来告诉编译器哪一段为托管  哪一段为非托管。

答：参考我的文章http://blog.joycode.com/jiangsheng/archive/2004/12/15/41209.aspx

问：本来我的Activex调用javascript函数已经实现，但是后来我的网页被作为框架嵌入其他的网页后就无法再成功调用了。Activex总是试图调用主框架下的javascript函数，因而总是报出方法名找不到的错误。

先得到script的IDispatch接口

.. code-block:: C++

    void CMyActivexCtrl::OnSetClientSite()
    {
        IServiceProvider *isp, *isp2 = NULL;
        pScript=NULL;
        pHTMLDocument=NULL;
        pWebBrowser=NULL;

        if (m_pClientSite)
        {
            do
            {
                HRESULT hr = S_OK;
                hr = m_pClientSite->QueryInterface(IID_IServiceProvider, reinterpret_cast<void **>(&isp));
                if (FAILED(hr))
                {
                    m_pClientSite->Release();
                    m_pClientSite=NULL;
                    break ;
                }
                hr = isp->QueryService(SID_STopLevelBrowser, IID_IServiceProvider, reinterpret_cast<void **>(&isp2));
                if (FAILED(hr))
                {
                    m_pClientSite->Release();
                    m_pClientSite=NULL;
                    break ;
                }
                hr = isp2->QueryService(SID_SWebBrowserApp, IID_IWebBrowser2, reinterpret_cast<void **>(&pWebBrowser));
                if (FAILED(hr))
                {
                    m_pClientSite->Release();
                    isp->Release();
                    m_pClientSite=NULL;
                    isp=NULL;
                    break ;
                }
                hr = pWebBrowser->get_Document((IDispatch**)&pHTMLDocument);
                if(FAILED(hr))
                {
                    m_pClientSite->Release();
                    pWebBrowser->Release();
                    isp->Release();
                    isp2->Release();
                    m_pClientSite=NULL;
                    pWebBrowser=NULL;
                    isp=NULL;
                    isp2=NULL;
                    break ;
                }
                hr=pHTMLDocument->get_Script(&pScript);
                if(FAILED(hr))
                {
                    m_pClientSite->Release();
                    pHTMLDocument->Release();
                    pWebBrowser->Release();
                    isp->Release();
                    isp2->Release();
                    pHTMLDocument=NULL;
                    m_pClientSite=NULL;
                    pWebBrowser=NULL;
                    isp=NULL;
                    isp2=NULL;
                    break ;
                }
                if(isp){
                    isp->Release();
                    isp=NULL;
                }
                if(isp2){
                    isp2->Release();
                    isp2=NULL;
                }
            }
            while(FALSE);
        }
        else{
            DestroyWindow();
        }
        COleControl::OnSetClientSite();
    }


然后再调用

.. code-block:: C++

    //向js发送信息
    LRESULT CMyDoc::outputParam(CString fuctionName,const CArray<CString> &params)
    {
        extern IDispatch *pScript;
        if(pScript==NULL){
            return -1;
        }
        CComBSTR bstrMember(fuctionName);

        DISPID dispid;

        HRESULT hr=pScript->GetIDsOfNames(IID_NULL,&bstrMember,1,LOCALE_SYSTEM_DEFAULT,&dispid);
        if(FAILED(hr))
        {
            #ifdef _DEBUG
            switch(hr)
            {
                case E_OUTOFMEMORY:
                    MessageBox(NULL,"E_OUTOFMEMORY","outputParam Err",0);
                    break;
                case DISP_E_UNKNOWNNAME:
                    MessageBox(NULL,"DISP_E_UNKNOWNNAME","outputParam Err",0);
                    break;
                case DISP_E_UNKNOWNLCID:
                    MessageBox(NULL,"DISP_E_UNKNOWNLCID","outputParam Err",0);
                    break;
            }
            #endif
            return -1;
        } 

        DISPPARAMS dispparams;
        memset(&dispparams, 0, sizeof dispparams);

        int paramNum=params.GetCount();
        VARIANT *pParams=new VARIANT[paramNum];

        for( int i = 0; i<paramNum; i++)
        {
            CComBSTR bstr =params.GetAt(i); // back reading
            bstr.CopyTo(&pParams[i].bstrVal);
            pParams[i].vt = VT_BSTR;
        }

        dispparams.rgvarg = pParams; 
        dispparams.cNamedArgs = 0;
        dispparams.cArgs=paramNum;

        EXCEPINFO excepInfo;
        memset(&excepInfo, 0, sizeof excepInfo);
        CComVariant vaResult;
        UINT nArgErr = (UINT)-1;  // initialize to invalid arg
        hr = pScript->Invoke(dispid,IID_NULL,0,DISPATCH_METHOD,&dispparams,&vaResult,&excepInfo,&nArgErr);
        delete []dispparams.rgvarg;
        return 1;
    }

但是这种方法只可以得到主框架里面的javascript脚本，Activex所在的网页是作为子框架嵌入的就无法调用成功了。
有没有人知道怎么做？通过什么办法可以让Acticex调用js的时候只在包含Activex的框架网页中找对应的javascript代码呢？

答：

.. code-block:: C++
    
    hr = isp->QueryService(SID_STopLevelBrowser, IID_IServiceProvider, reinterpret_cast<void **>(&isp2));

这不明摆是要访问顶层框架么？

m_pClientSite的container就是HTMLDocument对象，Get一下Container就可以了

问：如何指定打开一个GOOGLE网页，自动填入“HELLO”，自动单击搜索按钮？不要用模拟按键的方法

答：首先访问HTMLDocument的all属性获得HTML元素集合

然后枚举找到需要的表单元素（通过比较tagName或者通过查询IHTMLFormElement接口）

之后访问表单元素的element获得表单项元素集合

然后枚举找到需要的输入域元素（通过比较tagName或者通过查询IHTMLInputElement接口）

之后访问输入域元素的value属性

问：安装vc6.0英文版或汉化版最后都提示DCOM注册失败，部分安装和全部安装也一样结果，不知是何原因？XPsp2，高手救命！！！！

问：为什么我安装Visual Studio 6.0 时总是出错？

换了光盘，中英文版都试了，总是出现下面的错误提示：

.. code-block:: 

    Setup was unable to create a DCOM user account in order to register 'C:\programe Files\Microsoft Visual Studio\ Common \Tools \VS-Ent98 \Vanalyzr \valec.exe

请会的朋友帮帮忙`~

先谢谢了`

答：参考http://support.microsoft.com/kb/257413

问：基于微软WebBrowser控件开发的简易浏览器，在访问基于cookie或者session认证的网站时,如果网页脚本里面自己弹出一个新的ie窗口，此窗口里面就无法得到用户的认证信息，需要重新登录一次。

问题：通过我的自己写的浏览器认证通过后，如何将这些信息也传入到新弹出ie窗口里面？

答：在新建窗口时，如果浏览器控件的宿主没有处理NewWindow2事件或者NewWindow事件，那么会新建一个新的IE进程中的窗口，由于Session不能跨进程存在，依赖于Session的程序可能出现问题。

关于如何处理NewWindow2事件，可以参考http://support.microsoft.com/kb/184876/

问：如何释放用SHGetFileInfo得到的图标资源？我用如下语句得到某种类型文件的图标，可以成功。但如果对很多文件都进行这种操作，在window资源管理器中发现本程序的GDI对象不停的增长，当超过10000时，系统界面就花了。

.. code-block:: C++

SHGetFileInfo(WFD.cFileName,FILE_ATTRIBUTE_NORMAL,&fileInfoS,sizeof(fileInfoS),SHGFI_USEFILEATTRIBUTES|SHGFI_TYPENAME|SHGFI_ICON);

答：If SHGetFileInfo returns an icon handle in the hIcon member of the SHFILEINFO structure pointed to by psfi, you are responsible for freeing it with DestroyIcon when you no longer need it.

For more information, see
http://msdn.microsoft.com/library/default.asp?url=/library/en-us/shellcc/platform/shell/reference/functions/shgetfileinfo.asp

问：如何知道ocx中

.. code-block:: C++
    
    ON_EVENT(CDlg, IDC_SKIN,/* 这里 */, OnClickSkin, VTS_I4)的ID

问：VC下面绘制不相交的连续线段的问题. 目的实现就是用鼠标点击一系列的点,将各个点连成直线,但是不允许与已经存在的线相交.大概要怎么做呢?

答：对已经存在的点进行某种方式的排序,然后以这种排的序列依次连接.

方法1

1 找任意一个和点集中任何两点都不在一个直线上的点

2 以此点为极点，任一方向为极轴建立极坐标系。

3 将点集按极坐标的角度排序

4 按照此顺序连接点集中的点

或者

方法2

找凸包

剩余的点再次找凸包

循环直到所有的点都进入了凸包当中

显然这些凸包是相互包含的，一个套一个，然后再打开这个系列凸包就是了。所谓的打开,就是从凸包上的任意一点,找到下一个凸包上的一个点,使得他们之间的连线和内部凸包无交点即可

这样的结果是一个类似螺旋形状的折线

为了说明问题,把处理方案规划成为找多个凸包

实际上在具体操作当中,找凸包的同时就可以生成这个解的

一堆点如何找凸包?

先找出一个极值点,比如y分量最小的点当中x分量最小的点,它肯定是凸包上的一个点

然后从这里开始找一个点,使得其他的点都在这个点和和起点的连线的同一侧

记录这个线段,然后再把找到的点作为新的起点,找下一个线段,一直到完成一个封闭的多边形为止

参考http://search.csdn.net/Expert/topic/2483/2483852.xml?temp=.5336725

问：我在WinForm程序中做一个类于Outlook/Foxmail的邮件编辑发送软件.在Html Editor编辑功能中, 通过浏览插入本地图片时,在邮件内容中只是记录了一个图片路径, 这样发送出去的邮件,客户不能看到图片.

请问哪位大侠知道Outlook/Foxmail是如何将图片做为邮件的一部分(不是在附件中)发送出去的? 应该是MHTML功能吧? 如何实现上述功能呢? 请给出例子代码.

答：可以参考http://www.codeproject.com/vb/net/MhtBuilder.asp

问：怎么看VC6是否安装了sp5和sp6?

答：参考微软知识库文章 如何判断是否安装了 Visual Studio Service Pack http://support.microsoft.com/kb/194295

问：我想做一个Activex来监听一个服务器的端口，接受到服务器指令后就调用页面相应的JS函数，请问大家能不能这样实现？Activex调用页面JS函数该如何写？

答：可以，ActiveX的容器是HTMLDocument对象，执行其ExecScript方法即可。

微软知识库文章Q172763 INFO: Accessing the Object Model from Within an ActiveX Control 描述了如何使用IOleClientSite来和IE这个控件容器交互。可以使用IOleClientSite::GetContainer得到网页所在HTML文档对象的IOleContainer接口，然后再查询其他接口，例如IHTMLDocument2来进行对DHTML对象模型的访问。

IHTMLDocument2::scripts属性表示HTML文档中所有脚本对象。使用脚本对象的IDispatch接口的::GetIDsOfNames方法可以"发现其中的函数和对象成员，使用IDispatch::Invoke可以访问这些成员。也可以用IHTMLDocument2::ExecScript执行脚本。

也可以在activex里声明事件,在脚本里编写此事件的处理代码。

问：近一直在学习浏览器的开发。遇到一问题，找了几天资料也没能解决。希望大家给点支持和帮助，谢谢了！具体问题如下：

我以MDI模式和利用axwebBrowser组建做了一个浏览器，现在点击一个弹出式窗口的连接的时候会同时弹出两个窗口，一个是我浏览器内的（正确），一个是IE浏览器的（多余）。我现在想知道为什么和怎么做能屏蔽掉IE自动弹出来的这个窗口。

部分相关代码如下

.. code-block:: C#

    private void Mdi_Load(object sender, System.EventArgs e)
    {
        Thread t = new Thread(new ThreadStart(GoGo));
        t.Start();

        webBrowser_V1 = (SHDocVw.WebBrowser_V1)this.axWebBrowser1.Application;
        this.webBrowser_V1.NewWindow += new SHDocVw.DWebBrowserEvents_NewWindowEventHandler(webBrowser_V1_NewWindow);
    }

    private void webBrowser_V1_NewWindow(string URL, int Flags, string TargetFrameName, ref object PostData, string Headers, ref bool   Processed)
    {
        Mdi form2 = new Mdi(URL);
        form2.MdiParent = this.MdiParent;
        form2.Show();
    }

答：NewWindow2事件在创建新窗口之前都会被触发(NewWindow事件是为了兼容性而触发的，在新的代码中不应该处理这个事件)

如果要停止默认的处理（在Internet Explorer中打开新的窗口），需要设置Cancel指向的值为真

参考http://msdn.microsoft.com/library/default.asp?url=/workshop/browser/webbrowser/reference/ifaces/dwebbrowserevents2/newwindow2.asp

对于
.. code-block:: C#

    private void webBrowser_V1_NewWindow(string URL, int Flags, string TargetFrameName, ref object PostData, string Headers, ref bool Processed)

这个声明，设置Processed为真就可以了。

对于
.. code-block:: C#
    
    private void axWebBrowser1_NewWindow2(object sender, AxSHDocVw.DWebBrowserEvents2_NewWindow2Event e)

这个声明，需要设置e.cancel为真。

问：IE编程，取得当前鼠标指向的表单域的值？

如果网页中没有子frame，则用下面的语句可以获得，但是如果网页中带有frame，则我要获取的frame不是主frame时，下面的语句就无效了

HTMLElement := HTMLDocument.elementFromPoint(p.X,p.Y);

有两个问题不懂，

一、如何当到前前鼠标指向的frame，并得到frame中的IHTMLDocument接口？

二、如何把p.X与p.Y转换为相对于frame中的坐标？

答：1 elementFromPoint获得frame之后查询IWebBrowser2接口

2 根据框架左上角的位置换算一下坐标

参考资料
http://www.codeguru.com/Cpp/I-N/ieprogram/security/article.php/c4387

问：如何根据文件的扩展名 得到操作系统中相应的图标?

答：

.. code-block:: C#

    private void button1_Click(object sender, System.EventArgs e)
    {
        this.Icon=ExtractIcon.GetIcon("D:\\111.txt",false);
    }

    using System;
    using System.Runtime.InteropServices;
    using System.Drawing;
    using System.Windows.Forms;

    /// <summary>
    /// Summary description for ExtractIcon.
    /// </summary>
    public class ExtractIcon
    {
        [DllImport("Shell32.dll")]
        private static extern IntPtr SHGetFileInfo
        (
            string pszPath,
            uint dwFileAttributes,
            out SHFILEINFO psfi,
            uint cbfileInfo,
            SHGFI uFlags
        );

        [DllImport("comctl32.dll")]
        private static extern int ImageList_GetImageCount(
            IntPtr himl
        );

        [DllImport("comctl32.dll")]
        private static extern IntPtr ImageList_GetIcon(
            IntPtr himl,
            int i, 
            uint flags
        );

        [StructLayout(LayoutKind.Sequential)]
        private struct SHFILEINFO
        {
            public SHFILEINFO(bool b)
            {
                hIcon=IntPtr.Zero;iIcon=0;dwAttributes=0;szDisplayName="";szTypeName="";
            }
            public IntPtr hIcon;
            public int iIcon;
            public uint dwAttributes;
            [MarshalAs(UnmanagedType.LPStr, SizeConst=260)]
            public string szDisplayName;
            [MarshalAs(UnmanagedType.LPStr, SizeConst=80)]
            public string szTypeName;
        };

        private ExtractIcon()
        {
        }

        private enum SHGFI
        {
            SHGFI_ICON =             0x000000100,     // get icon
            SHGFI_DISPLAYNAME =      0x000000200,     // get display name
            SHGFI_TYPENAME =         0x000000400,     // get type name
            SHGFI_ATTRIBUTES =       0x000000800,     // get attributes
            SHGFI_ICONLOCATION =     0x000001000,     // get icon location
            SHGFI_EXETYPE =          0x000002000,     // return exe type
            SHGFI_SYSICONINDEX =     0x000004000,     // get system icon index
            SHGFI_LINKOVERLAY =      0x000008000,     // put a link overlay on icon
            SHGFI_SELECTED =         0x000010000,     // show icon in selected state
            SHGFI_ATTR_SPECIFIED =   0x000020000,     // get only specified attributes
            SHGFI_LARGEICON =        0x000000000,     // get large icon
            SHGFI_SMALLICON =        0x000000001,     // get small icon
            SHGFI_OPENICON =         0x000000002,     // get open icon
            SHGFI_SHELLICONSIZE =    0x000000004,     // get shell size icon
            SHGFI_PIDL =             0x000000008,     // pszPath is a pidl
            SHGFI_USEFILEATTRIBUTES = 0x000000010     // use passed dwFileAttribute
        }

        private enum SHIL
        {
            SHIL_LARGE =          0,   // normally 32x32
            SHIL_SMALL =          1,  // normally 16x16
            SHIL_EXTRALARGE =     2,
            SHIL_SYSSMALL =       3   // like SHIL_SMALL, but tracks system small icon metric correctly
        }

        /// <summary>
        /// Get the associated Icon for a file or application, this method always returns
        /// an icon.  If the strPath is invalid or there is no idonc the default icon is returned
        /// </summary>
        /// <param name="strPath">full path to the file</param>
        /// <param name="bSmall">if true, the 16x16 icon is returned otherwise the 32x32</param>
        /// <returns></returns>
        public static Icon GetIcon(string strPath, bool bSmall)
        {
            SHFILEINFO info = new SHFILEINFO(true);
            int cbFileInfo = Marshal.SizeOf(info);
            SHGFI flags;
            if (bSmall)
                flags = SHGFI.SHGFI_ICON|SHGFI.SHGFI_SMALLICON;
            else
                flags = SHGFI.SHGFI_ICON|SHGFI.SHGFI_SMALLICON|SHGFI.SHGFI_USEFILEATTRIBUTES;

            SHGetFileInfo(strPath, 256, out info,(uint)cbFileInfo, flags);
            return Icon.FromHandle(info.hIcon);
        }

        public static int GetIconIndex(string strPath, ImageList imgList)
        {
            SHFILEINFO info = new SHFILEINFO(true);
            int cbFileInfo = Marshal.SizeOf(info);
            SHGFI flags;
            IntPtr hIcon;

            flags = SHGFI.SHGFI_SYSICONINDEX|SHGFI.SHGFI_SMALLICON;

            IntPtr ret = SHGetFileInfo("c:\\", 256, out info, (uint)cbFileInfo, flags);
            int nbIcon = ImageList_GetImageCount(ret);

            for (int i = 0; i < nbIcon; i++)
            {
                hIcon = ImageList_GetIcon(ret, i, 0);
                imgList.Images.Add (Icon.FromHandle(hIcon));
            }

            return info.iIcon;
        }
    }

问：我有一个日期格式的CString值，我要赋给一个CTime的变量，请问用什么方法转换最好？

答：COleDateTime::ParseDateTime可以解析标准格式的时间，参考http://msdn.microsoft.com/library/default.asp?url=/library/en-us/vclib/html/_MFC_COleDateTime.asp

但是对于不标准格式的时间，没有现成的算法。你需要自行设计解析函数，例如使用scanf。COleDateTime不一定可以转CTime的，因为CTime的时间是从0:00:00 GMT, January 1, 1970至03:14:07 January 19 2038，而COleDateTime是从 1 January 100开始到31 December 9999的。如果你确定时间可以转换，那么可以使用CTime的一个构造函数：

.. code-block:: C++

    CTime( int nYear, int nMonth, int nDay, int nHour, int nMin, int nSec, int nDST = -1 );

其中参数的值可以调用COleDateTime的对应成员函数获得。

问：用VB.net 编 天干地支 的最简单方法 是怎么编啊 ！

答：可以用.Net 2.0里面增加的类

EastAsianLunisolarCalendar.GetSexagenaryYear Method
EastAsianLunisolarCalendar.GetTerrestrialBranch Method

Note: Methods are new in the .NET Framework version 2.0.
Namespace: System.Globalization
Assembly: mscorlib (in mscorlib.dll)

查表也可以

.. code-block:: 

    Function GetYLDate(tYear As Integer, tMonth As Integer, tDay As Integer, _
    YLyear As String, YLShuXing As String, _
    Optional IsGetGl As Boolean) As String
    On Error Resume Next

        Dim daList(1900 To 2011) As String * 18
        Dim conDate As Date, setDate As Date
        Dim AddMonth As Integer, AddDay As Integer, AddYear As Integer, getDay As Integer
        Dim RunYue As Boolean

        If tYear > 2010 Or tYear < 1901 Then Exit Function '如果不是有效有日期，退出

        '1900 to 1909
        daList(1900) = "010010110110180131"
        daList(1901) = "010010101110000219"
        daList(1902) = "101001010111000208"
        daList(1903) = "010100100110150129"
        daList(1904) = "110100100110000216"
        daList(1905) = "110110010101000204"
        daList(1906) = "011010101010140125"
        daList(1907) = "010101101010000213"
        daList(1908) = "100110101101000202"
        daList(1909) = "010010101110120122"
        daList(1910) = "010010101110000210"
        daList(1911) = "101001001101160130"
        daList(1912) = "101001001101000218"
        daList(1913) = "110100100101000206"
        daList(1914) = "110101010100150126"
        daList(1915) = "101101010101000214"
        daList(1916) = "010101101010000204"
        daList(1917) = "100101101101020123"
        daList(1918) = "100101011011000211"
        daList(1919) = "010010011011170201"
        daList(1920) = "010010011011000220"
        daList(1921) = "101001001011000208"
        daList(1922) = "101100100101150128"
        daList(1923) = "011010100101000216"
        daList(1924) = "011011010100000205"
        daList(1925) = "101011011010140124"
        daList(1926) = "001010110110000213"
        daList(1927) = "100101010111000202"
        daList(1928) = "010010010111120123"
        daList(1929) = "010010010111000210"
        daList(1930) = "011001001011060130"
        daList(1931) = "110101001010000217"
        daList(1932) = "111010100101000206"
        daList(1933) = "011011010100150126"
        daList(1934) = "010110101101000214"
        daList(1935) = "001010110110000204"
        daList(1936) = "100100110111030124"
        daList(1937) = "100100101110000211"
        daList(1938) = "110010010110170131"
        daList(1939) = "110010010101000219"
        daList(1940) = "110101001010000208"
        daList(1941) = "110110100101060127"
        daList(1942) = "101101010101000215"
        daList(1943) = "010101101010000205"
        daList(1944) = "101010101101140125"
        daList(1945) = "001001011101000213"
        daList(1946) = "100100101101000202"
        daList(1947) = "110010010101120122"
        daList(1948) = "101010010101000210"
        daList(1949) = "101101001010170129"
        daList(1950) = "011011001010000217"
        daList(1951) = "101101010101000206"
        daList(1952) = "010101011010150127"
        daList(1953) = "010011011010000214"
        daList(1954) = "101001011011000203"
        daList(1955) = "010100101011130124"
        daList(1956) = "010100101011000212"
        daList(1957) = "101010010101080131"
        daList(1958) = "111010010101000218"
        daList(1959) = "011010101010000208"
        daList(1960) = "101011010101060128"
        daList(1961) = "101010110101000215"
        daList(1962) = "010010110110000205"
        daList(1963) = "101001010111040125"
        daList(1964) = "101001010111000213"
        daList(1965) = "010100100110000202"
        daList(1966) = "111010010011030121"
        daList(1967) = "110110010101000209"
        daList(1968) = "010110101010170130"
        daList(1969) = "010101101010000217"
        daList(1970) = "100101101101000206"
        daList(1971) = "010010101110150127"
        daList(1972) = "010010101101000215"
        daList(1973) = "101001001101000203"
        daList(1974) = "110100100110140123"
        daList(1975) = "110100100101000211"
        daList(1976) = "110101010010180131"
        daList(1977) = "101101010100000218"
        daList(1978) = "101101101010000207"
        daList(1979) = "100101101101060128"
        daList(1980) = "100101011011000216"
        daList(1981) = "010010011011000205"
        daList(1982) = "101001001011140125"
        daList(1983) = "101001001011000213"
        daList(1984) = "1011001001011A0202"
        daList(1985) = "011010100101000220"
        daList(1986) = "011011010100000209"
        daList(1987) = "101011011010060129"
        daList(1988) = "101010110110000217"
        daList(1989) = "100100110111000206"
        daList(1990) = "010010010111150127"
        daList(1991) = "010010010111000215"
        daList(1992) = "011001001011000204"
        daList(1993) = "011010100101030123"
        daList(1994) = "111010100101000210"
        daList(1995) = "011010110010180131"
        daList(1996) = "010110101100000219"
        daList(1997) = "101010110110000207"
        daList(1998) = "100100110110150128"
        daList(1999) = "100100101110000216"
        daList(2000) = "110010010110000205"
        daList(2001) = "110101001010140124"
        daList(2002) = "110101001010000212"
        daList(2003) = "110110100101000201"
        daList(2004) = "010110101010120122"
        daList(2005) = "010101101010000209"
        daList(2006) = "101010101101170129"
        daList(2007) = "001001011101000218"
        daList(2008) = "100100101101000207"
        daList(2009) = "110010010101150126"
        daList(2010) = "101010010101000214"
        daList(2011) = "101101001010000214"
        AddYear = tYear
        RunYue = False
        
        If IsGetGl Then
            AddMonth = Val(Mid(daList(AddYear), 15, 2))
            AddDay = Val(Mid(daList(AddYear), 17, 2))
            conDate = DateSerial(AddYear, AddMonth, AddDay)
            AddDay = tDay
            For i = 1 To tMonth - 1
                AddDay = AddDay + 29 + Val(Mid(daList(tYear), i, 1))
            Next i
            'MsgBox DateDiff("d", conDate, Date)
            setDate = DateAdd("d", AddDay - 1, conDate)
            GetYLDate = setDate
            tYear = Year(setDate)
            tMonth = Month(setDate)
            tDay = Day(setDate)
            Exit Function
        End If

        CHUSHIHUA:

        AddMonth = Val(Mid(daList(AddYear), 15, 2))
        AddDay = Val(Mid(daList(AddYear), 17, 2))
        conDate = DateSerial(AddYear, AddMonth, AddDay)
        setDate = DateSerial(tYear, tMonth, tDay)
        getDay = DateDiff("d", conDate, setDate)
        If getDay < 0 Then AddYear = AddYear - 1: GoTo CHUSHIHUA

        ' addday = NearDay
        AddDay = 1: AddMonth = 1
        For i = 1 To getDay
            AddDay = AddDay + 1
            If AddDay = 30 + Mid(daList(AddYear), AddMonth, 1) Or (RunYue And AddDay = 30 + Mid(daList(AddYear), 13, 1)) Then
                If RunYue = False And AddMonth = Val("&H" & Mid(daList(AddYear), 14, 1)) Then
                    RunYue = True
                Else
                    RunYue = False
                    AddMonth = AddMonth + 1
                End If
                AddDay = 1
            End If
        Next

        md$ = "初一初二初三初四初五初六初七初八初九初十十一十二十三十四十五十六十七十八十九二十廿一廿二廿三廿四廿五廿六廿七廿八廿九三十"
        dd$ = Mid(md$, (AddDay - 1) * 2 + 1, 2)
        mm$ = Mid("正二三四五六七八九十寒腊", AddMonth, 1) + "月"
        YouGetDate = DateSerial(AddYear, AddMonth, AddDay)
        tiangan$ = "甲乙丙丁戊已庚辛壬癸"
        dizhi$ = "子丑寅卯辰巳午未申酉戌亥"
        Dim ganzhi(0 To 59) As String * 2
        For i = 0 To 59
            ganzhi(i) = Mid(tiangan$, (i Mod 10) + 1, 1) + Mid(dizhi$, (i Mod 12) + 1, 1)
            'ff$ = ff$ + ganzhi(i)
        Next i

        'MsgBox ff$, , Len(ff$)
        YLyear = ganzhi((AddYear - 4) Mod 60)
        shu$ = "鼠牛虎兔龙蛇马羊猴鸡狗猪"
        YLShuXing = Mid(shu$, ((AddYear - 4) Mod 12) + 1, 1)
        If RunYue Then mm$ = "闰" + mm$
        GetYLDate = mm$ + dd$
    End Function

    '下面是一个使用的例子，你需要在窗体上加上一个按扭，并命名为Command1，然后将下列代码复制到窗体的代码中

    Private Sub Command1_Click()

        Dim ty As Integer, tm As Integer, td As Integer, yl As String, sx As String
        '取公历1999年10月28日的农历日期
        ty = 1999
        tm = 10
        td = 28
        t = GetYLDate(ty, tm, td, yl, sx)
        MsgBox t
        MsgBox ty & "-" & tm & "-" & td & " " & yl & " " & sx
        '取1999年农历十月28的公历日期
        t = GetYLDate(ty, tm, td, yl, sx, True)
        MsgBox t
        MsgBox ty & "-" & tm & "-" & td & " " & yl & " " & sx
    End Sub

问：我要写一个COM组件供asp调用，我能否在COM组件中得到当前调用ASP的客户IP/调用URL等信息？不采用传递参数的方法

答：可以，但是这会使你的组件依赖于IIS支持。参考

http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnasp/html/comp.asp
和http://msdn.microsoft.com/library/default.asp?url=/library/en-us/iissdk/iis/ref_biobj_cppirqs.asp

问：在ActiveX里面写了一个方法来调用javascript方法

.. code-block:: C++

    //向js发送信息
    LRESULT CFXVTDoc::outputParam(CString fuctionName,const CArray<CString> &params)
    {
        extern IDispatch *pScript;
        if(pScript==NULL){
            return -1;
        }
        CComBSTR bstrMember(fuctionName);

        DISPID dispid;

        HRESULT hr=pScript->GetIDsOfNames(IID_NULL,&bstrMember,1,LOCALE_SYSTEM_DEFAULT,&dispid);
        if(FAILED(hr)){
            #ifdef _DEBUG
            switch(hr)
            {
                case E_OUTOFMEMORY:
                MessageBox(NULL,"E_OUTOFMEMORY","outputParam Err",0);
                break;
                case DISP_E_UNKNOWNNAME:
                MessageBox(NULL,"DISP_E_UNKNOWNNAME","outputParam Err",0);
                break;
                case DISP_E_UNKNOWNLCID:
                MessageBox(NULL,"DISP_E_UNKNOWNLCID","outputParam Err",0);
                break;
            }
            #endif
            return -1;
        }

        DISPPARAMS dispparams;
        memset(&dispparams, 0, sizeof dispparams);

        int paramNum=params.GetCount();
        VARIANT *pParams=new VARIANT[paramNum];

        for( int i = 0; i<paramNum; i++)
        {
            CComBSTR bstr =params.GetAt(i); // back reading
            bstr.CopyTo(&pParams[i].bstrVal);
            pParams[i].vt = VT_BSTR;
        }

        dispparams.rgvarg = pParams; 
        dispparams.cNamedArgs = 0;
        dispparams.cArgs=paramNum;

        EXCEPINFO excepInfo;
        memset(&excepInfo, 0, sizeof excepInfo);
        CComVariant vaResult;
        UINT nArgErr = (UINT)-1;  // initialize to invalid arg
        hr = pScript->Invoke(dispid,IID_NULL,0,DISPATCH_METHOD,&dispparams,&vaResult,&excepInfo,&nArgErr);
        delete []dispparams.rgvarg;
        return 1;
    }


这个方法在主线程中调用一切正常，但到了自己写的线程中调用就会失败，爆出DISP_E_UNKNOWNNAME错误。查了好久，看到别人的贴子上说有些com方法是线程不安全的，所以不要用线程。是这样吗？

可我现在不用线程就不知道该怎么做。

我这里一个操作过程是这样的。

activex调用js方法--->js做相应的操作-->js调用activex方法报告操作完成

整个过程是不可以重叠的。比如在第一次js方法调用后，如果还没有得到js的完成消息，是不可以启动二次js方法调用的。但这个对用户来说是透明的，用户可以一次提交多个操作请求。

所以我把操作请求放到队列中，通过CEvent来实现同步。如果不放到线程中就会出现在同步等待的时候界面死掉。

这个怎么解决？

答：你可以列集你的所有脚本操作到创建控件的那个线程。通常的做法是发送自定义消息，以控件的窗口句柄为参数，在控件的窗口过程中编写处理代码。

问：AxWebBrowser中如果JavaScrip调用关闭窗口的命令会触发什么事件？我用AxWebBrowser控件浏览下面这个网页，http://www.5460.net/gy5460/jsp/login/loginMain.jsp，点击关闭按钮，网页调用JavaScript中的window.close()方法，请问我如何截获这个事件。谢谢。我监视window.close()执行前后，实际上axWebBrowser控件并没有关闭，各个属性和执行前完全一样，但是当我调用browser.visible=true,browser.BringToFront()函数时，浏览器虽然能重现，但是却无法再浏览网页了。请问这是为什么？好像用JavaScript关闭浏览器控件时，浏览器控件应该释放资源了，可是调试的时候还能发现其内部信息没有丢失，真是奇怪！

答：会有windowclosing.事件http://msdn.microsoft.com/workshop/browser/webbrowser/reference/events/windowclosing.asp。处理windowclosing事件，取消默认的过程，自行提示用户和关闭窗口就可以了。

参考

Q253219 PRB: WebBrowser Control Disappears When Script Calls window.close()
http://support.microsoft.com/support/kb/articles/q253/2/19.asp


问：如何初始化ocx控件的大小？ 以及控件大小被改便后，是通过什么消息响应的？

答：如果你需要设置ActiveX的大小，可以参考

MFC控件：http://support.microsoft.com/kb/168326

ATL控件：http://support.microsoft.com/kb/242994

更多信息可以参考http://msdn.microsoft.com/library/en-us/dnaxctrl/html/msdn_contcntr.asp

问：在COM组件里经常要加入一些新的类，而调用COM组件的客户程序不知道这些类的具体结构，希望每次在COM加入新类时，客户程序通过读一个配置文件（这个文件中记录着COM中类名称和类中域和方法的名称），就能实例COM中的类，并调用类的方法。请问如何做才能使客户程序在每次COM中加入新类时都不必进行扩展并重新编译？如果COM没有办法，还有没有其他技术可以完成？谢谢回答。

答：你可以让服务器端支持OLE自动化，客户集成一个脚本引擎就可以了。微软的脚本引擎支持JScript和VBScript

问：我写了一个b/s结构的程序，用VB写了一个程序把b/s的页面包含在里面，用的是webbroser控件，现在问题出来了，以前页面里面的打开新窗口教本：window.open（url），弹出来的仍然是IE窗口，请问各位大侠，有没有办法在b/s页面里面用教本控制打开的新窗口为VB的form。麻烦各位了～～～

答：VB6不能实现这个功能。你可以用ATL实现IDocHostUIHandler::GetExternal和IDocHostUIHandler::SetExternal,然后在VB中设置，就可以在网页的脚本中通过访问webbrowser.Document.external来访问设置的对象。

参考

http://support.microsoft.com/kb/183235/

http://www.csdn.net/develop/read_article.asp?id=48483

问：如何获取某正在运行程序数据区的内存开始地址和内存长度？

答：Windows里面可以用VirtualQueryEx尝试获得已经提交的内存页的信息。

参考http://community.csdn.net/Expert/topic/3801/3801409.xml?temp=.3144037 和http://www.csdn.com.cn/program/4603.htm

问：我的ActiveX控件是内嵌入IE的，我想当这个IE页面失去/获取当前焦点的时候告诉我这个ActiveX控件，不知道在htm里有没有这样的事件。我这里所说的“当前焦点”是指当前用户查看的是哪个页面，当前查看的htm页面既具有当前焦点！

答：判断GetForegroundWindow所在线程就可以……
