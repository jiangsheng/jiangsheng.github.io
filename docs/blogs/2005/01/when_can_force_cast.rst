.. meta::
   :description: 问：我看到CListView的成员函数GetListCtrl直接把CListView本身的指针转换为CListCtrl指针。我想知道在什么情况下可以安全地把一个类的指针转化为另一个类的指针？ 答:只要你访问的数据的内存表示是完全相同的，那么这种转化就是安全的。 考虑MFC从CWnd到CEdit的派生过程，是一个纯粹的封

何时一个类的指针可以强制转化为另外一个类的指针，即使它们之间没有派生关系？
==========================================================================

.. post:: 24, Jan, 2005
   :tags: CPP, MFC
   :category: UI
   :author: me
   :nocomments:


问：我看到CListView的成员函数GetListCtrl直接把CListView本身的指针转换为CListCtrl指针。我想知道在什么情况下可以安全地把一个类的指针转化为另一个类的指针？

答:只要你访问的数据的内存表示是完全相同的，那么这种转化就是安全的。

考虑MFC从CWnd到CEdit的派生过程，是一个纯粹的封装——既没有增加数据成员也没有增加虚函数(隐含的虚函数表的指针实际上是类的一个成员，你可以在VC的监视窗口看到)——所有的代码只是在操作基类的成员。所以你可以在对话框的成员函数中安全地进行如下调用

.. code-block:: C++

    CEdit* pEdit=GetDlgItem (IDC_EDIT);//把CTempWnd类型的对象的指针转化成CEdit指针

也就是说，你可以安全地把CWnd指针转化为CEdit指针。在CWnd的窗口类为EDIT的情况下，你可以安全地用这个CEdit指针来访问CEdit具有的而CWnd不具有的方法。由于CEditView的窗口类也是EDIT，同时是从CWnd派生下来的，所以你也可以把CEditView指针转化成CEdit指针。MFC的CCtrlView的派生类都可以做这样的转化。

在这样做之前，你需要查看类的定义头文件以确保类型安全。CEdit, CListCtrl, CTreeCtrl,CToolBarCtrl都是这样的封装，但是CToolTipCtrl是一个例外。除了对TTM_ADDTOOL消息的处理可能不一致之外。

.. code-block:: C++

    LRESULT CToolTipCtrl::OnAddTool(WPARAM wParam, LPARAM lParam)
    {
        TOOLINFO ti = *(LPTOOLINFO)lParam;
        if ((ti.hinst == NULL) && (ti.lpszText != LPSTR_TEXTCALLBACK)
            && (ti.lpszText != NULL))
        {
            void* pv;
            if (!m_mapString.Lookup(ti.lpszText, pv))
                m_mapString.SetAt(ti.lpszText, NULL);
            // set lpszText to point to the permanent memory associated
            // with the CString
            VERIFY(m_mapString.LookupKey(ti.lpszText, ti.lpszText));
        }
        return DefWindowProc(TTM_ADDTOOL, wParam, (LPARAM)&ti);
    }

这里访问了CToolTipCtrl的数据成员，这样的话下面的代码看起来就似乎未必安全

.. code-block:: C++

    _AFXCMN_INLINE CToolTipCtrl* CTreeCtrl::GetToolTips() const
    {
        ASSERT(::IsWindow(m_hWnd));
        return (CToolTipCtrl*)CWnd::FromHandle((HWND)::SendMessage(m_hWnd, TVM_GETTOOLTIPS, 0, 0L)); 
    }

不过CTreeCtrl::GetToolTips()返回的只是有效的CWnd，TVM_ADDTOOL消息也是被默认窗口过程而不是CToolTipCtrl的代码来处理, 所以上面的函数没有机会执行，这个用法还是安全的。

顺便说一下，尽管大部分这样的封装是用SendMessage实现的，但是Redmond的家伙似乎很热衷于用DefWindowProc替代SendMessage来节省CPU的时钟周期。这样的一个副作用是MFC不会有处理这样的消息的机会，例如PreTranslateMessage和Subclass都会失效了。

强制转换的一个副作用是protected修饰符不再是类成员的保护伞。考虑如下情况

.. code-block:: C++

    Class A
    {
        protected: int m_iProtected;
    };

如果我想获得m_iProtected的public访问权，我可以写一个封装类

.. code-block:: C++

    Class B:public A
    {
        public:int & GetProtected()
        {
            return m_iProtected;
        }
        friend class C;
    };

然后把A类型的指针强制转化成B类型的就可以以public方式访问声明为m_iProtected的成员了。在C类中访问B的成员也不受限制。

尽管多继承是C++的一个特性，从理想情况来说，CEditView应该从CCtrlView和CEdit派生出来；但是所有的人都知道MFC中的多继承是多么的麻烦。对于MFC的CObject派生类，默认的情况是不允许的——尽管你可以通过的MFC技术文档TN016: Using C++ Multiple Inheritance with MFC中提供的方法手动添加多继承支持。实际上，这些特性应该以接口的形式提供——把GetEditCtrl转换成QueryInterface，但是这样的话性能上又会损失很多，而且Windows通用控件和MFC对它的封装总是在不断地升级——接口的噩梦就是升级——所以MFC使用了如上的”黑客”方法来提供和多继承类似的功能。

关键字:MFC "no data members"

参考

C++ Q & A -- Microsoft Systems Journal May 1998

https://web.archive.org/web/20040430054924/https://www.microsoft.com/msj/0598/c0598.aspx
