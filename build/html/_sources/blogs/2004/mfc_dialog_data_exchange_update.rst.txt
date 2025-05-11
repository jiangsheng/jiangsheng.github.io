对话框数据交换 (Update)
=========================

.. post:: 14, May, 2004
   :tags: MFC
   :category: Microsoft Foundation Classes, Visual C++
   :author: jiangshengvc
   :nocomments:

.. code-block:: C++

    //{{Jiangsheng的牢骚(对话框数据交换)
    //由于越来越多的人问如何在对话框中获得文档/视图指针以执行数据访问和交换的问题，我大多数情况下都不得不建议比较好的方式是备份数据而不是直接修改。
    //本文的内容以现状提供并且不提供任何担保，Jiangsheng不对使用本文造成的可能的损失负责
    //}}End Jiangsheng的牢骚(对话框数据交换)

通常，简单的对话框不使用结构来存储成员数据。但是大量的简单类型的成员交换会使得代码繁琐。这时候可以使用结构来封装简单类型的数据，声明一个赋值操作符和修改DDX调用来简化数据交换代码。

例如在文档或者视图的命令处理函数中

.. code-block:: C++

    void CMyView::OnSomeButton()
    {
        CMyDoc* pDoc=GetDocument();
        CMyDialog mydlg;
        mydlg.m_data=pDoc->data1;
        if(mydlg.DoModal()!=IDOK)return;//Allow cancel
        pDoc->data1=mydlg.m_data;
    }

    void CMyDialog:oDataExchange(CDataExchange* pDX)
    {
        CDialog:oDataExchange(pDX);    // call base class
        //{{AFX_DATA_MAP(CMyDialog)
        //}}AFX_DATA_MAP
        DDX_Check(pDX, IDC_SEX, m_data.m_bFemale);
        DDX_Text(pDX, IDC_EDIT1, m_data.m_strName);
    }

这里pDoc->data1和mydlg.m_data不必是同一类型的类，只需要有=操作符来复制数据就行了。

我要把文档的数据复制一个备份的原因是，如果在模态对话框中把控件直接绑定到文档的成员，那么如果在对话框数据验证过程中一个控件验证失败，那么验证过程中这个控件之前的数据交换已经执行，即使选择取消之后也无法恢复弹出对话框之前的状态。这可能不是用户期望的行为。

另外，基于MFC的句柄映射机制，跨线程调用CWnd成员函数，例如UpdateData，会有不可预料的后果。有兴趣的可以参考微软知识库文章Q147578 CWnd Derived MFC Objects and Multi-threaded Applications。

修改工程的CLW文件以扩展默认的DDX/DDV机制的方法对我不很实用。我的VC经常丢失部分类的向导信息(在存盘的时候，我的杀毒软件就隔离了我的代码文件开始扫描病毒，然后VC报告文件不能保存，classview的相关类信息就丢失了)我不得不每隔一段时间删除并且重建CLW文件。

顺便说一下，TN026里面似乎有好多BUG，被解释了两次，根据顺序来看，第一个解释应该是正确的。第二个似乎是旧的解释的版本，忘记删除了。另外有一段话

.. code-block:: 

    “= single identifier for the DDV_ procedure. The C++ function name must start with “DDV_” but don't include “DDX_” in the identifier.”

被重复了两次。看起来看MFC技术文章的人次是不多...

http://www.microsoft.com/china/community/content/news/mstranslate.aspx里面的链接似乎都是死链接？

这里是我以前写的一个自定义的DDX的代码: :doc:`mfc_dialog_data_exchange`