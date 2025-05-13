示例：在MFC程序中集成.Net中的控件
=========================================

.. post:: 19, Mar, 2005
   :tags: MFC
   :category: Visual C++, Microsoft Foundation Classes, .Net Framework 
   :author: me
   :nocomments:

从.Net Framework 1.1开始，.Net控件可以以ActiveX的方式被集成到非托管宿主中——但是官方的支持只对于使用托管C++的MFC程序。Chris Sells在2003年3月份的MSDN杂志中描述了这样一个示例（https://web.archive.org/web/20030304083154/http://msdn.microsoft.com/msdnmag/issues/03/03/WindowsForms/default.aspx）。这个示例使用的代码稍微繁琐，而且没有描述如何处理控件的事件。MFC 8.0增加了一系列这方面的支持来把这个集成过程简单化（参考http://msdn2.microsoft.com/en-us/library/ahdd1h97.aspx）。这使得在MFC程序中使用.Net中的一些比较好用的类，例如System::Windows::Forms::PropertyGrid比以前容易多了。

举例来说，要在MFC的基于对话框的程序中使用System::Windows::Forms::PropertyGrid控件，首先创建一个基于对话框的程序，添加必要的引用:

.. code-block:: C++

    #include <afxwinforms.h>// MFC Windows Forms support
    #using <system.dll>
    #using <Microsoft.VisualC.Dll>
    #using <System.Drawing.dll>
    #using <System.Windows.Forms.dll>
    #using <mscorlib.dll>

    using namespace System;
    using namespace System::Drawing;
    using namespace System::Windows::Forms;
    using namespace System::ComponentModel;
    using namespace Microsoft::VisualC::MFC;
    using namespace stdcli::language;

之后添加代码（下面这个类是从MSDN中的充分利用.NET 框架的PropertyGrid 控件(https://web.archive.org/web/20040627011159/http://www.microsoft.com/china/msdn/archives/library/dndotnet/html/usingpropgrid.asp)这篇文章里面借过来的，关于此控件的更加高级的使用方法也可以参考这篇文章）。

.. code-block:: C++

    public ref class AppSettings
    {
        public:
        [Description("文档设置"), Category("文档设置"), DefaultValue(false)]
            property Boolean saveOnClose ;
        [Description("文档设置"),Category("全局设置"), ReadOnly(true),DefaultValue("欢迎使用应用程序！")]
            property String^ greetingText ;
        [Category("全局设置"), DefaultValue(4)]
            property Int32 itemsInMRU ;
        [Description("以毫秒表示的文本重复率。"), Category("全局设置"),DefaultValue(10)]
            property Int32 maxRepeatRate ;
        [Browsable(false), DefaultValue(false)]
            property Boolean settingsChanged ;
        [Category("版本"), DefaultValue("1.0"), ReadOnly(true)]
            property String^ appVersion ;
        AppSettings()
        {
            this->saveOnClose = true;
            this->greetingText = gcnew String("欢迎使用应用程序！");
            this->maxRepeatRate = 10;
            this->itemsInMRU = 4;
            this->settingsChanged = false;
            this->appVersion = gcnew String("1.0");
        }
    };
    

    class CPropertyGridTestDlg : public CDialog
    {

        //为了偷懒起见，向导生成的默认代码省略

        CWinFormsControl<System::Windows::Forms::PropertyGrid> m_wndPropertyGrid;

        BEGIN_DELEGATE_MAP( CPropertyGridTestDlg )
            EVENT_DELEGATE_ENTRY( PropertyValueChanged , Object, PropertyValueChangedEventArgs )
            EVENT_DELEGATE_ENTRY( HandleDestroyed , Object, EventArgs )
        END_DELEGATE_MAP()
    public:
        void PropertyValueChanged ( Object^ sender, PropertyValueChangedEventArgs ^ e )
        {
            TRACE("PropertyValueChanged %S\n", marshal_as<CString>(e->ToString()));
        }
        void HandleDestroyed( Object^ sender, EventArgs ^ e )
        {
            TRACE("PropertyValueChanged %S\n", marshal_as<CString>(e->ToString()));
        }
    };

    BOOL CPropertyGridTestDlg::OnInitDialog()
    {

        //为了偷懒起见，向导生成的默认代码再次省略

        // TODO: 在此添加额外的初始化代码
        CRect rect;
        GetDlgItem(IDC_PLACEHOLDER)->GetWindowRect(rect);//IDC_PLACEHOLDER是一个用来占地方的Static控件
        GetDlgItem(IDC_PLACEHOLDER)->DestroyWindow();
        ScreenToClient(rect);


        m_wndPropertyGrid.CreateManagedControl( WS_VISIBLE|WS_CHILD, rect, this, IDC_PLACEHOLDER );
        System::Windows::Forms::PropertyGrid^ pGrid=m_wndPropertyGrid.GetControl();

        AppSettings^ appSettings=gcnew AppSettings;
        pGrid->SelectedObject=appSettings;

        pGrid->PropertyValueChanged += MAKE_DELEGATE( PropertyValueChangedEventHandler ,PropertyValueChanged );

        pGrid->HandleDestroyed += MAKE_DELEGATE( System::EventHandler , HandleDestroyed );

    }

在VC2005二月份的CTP中使用这个功能还有一些小问题：启动的时候输出窗口有几个警告：还有一个Assert窗口，可以简单地忽略。退出的时候有一个原因不明的内存泄漏。

题外话：尽管我确定marshal_as这个函数2004年4月就在可用（在2004年4月的全球MVP峰会上，我亲眼看见对这个函数的引用在Visual C++ 2005中通过了编译），但是到目前为止我还没发现这家伙到底在哪个头文件或者名称空间里面。为了平时偷懒起见，我不得不自己写了一个模板函数。

.. code-block:: C++

    template<typename T>
    interior_ptr<T> marshal_as (String^ s)
    {
        interior_ptr<const System::Char> txt=PtrToStringChars (s);
        return interior_ptr<T>(txt);
    }

这个模板函数在微软的MSDN里面也是语焉不详，或许这个函数现在还没有启用吧。
