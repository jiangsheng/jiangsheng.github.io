.. meta::
   :description: 带子窗口的ActiveX控件问题，如何获取回车键？

DLL/OCX中的MFC对话框不能处理Tab和回车键的问题
=================================================

.. post:: 11, Jul, 2004
   :tags: DLL, OCX, Message Pump
   :category: Microsoft Foundation Classes
   :author: me
   :nocomments:


带子窗口的ActiveX控件问题，如何获取回车键？

问题：

新建一个MFC ActiveX工程，添加一对话框资源，上面有一些标准控件，如按钮、编辑框等，并生成一个类CCtrlPanel。
在CXXXXCtrl类中：

.. code-block:: C++

    int CXXXXCtrl::OnCreate(LPCREATESTRUCT lpCreateStruct)
    {
        if (COleControl::OnCreate(lpCreateStruct) == -1)
            return -1;

        m_CtrlPanel.Create(IDD_CTRLPANEL,this);
        //m_CtrlPanel在.h文件中申明为：CCtrlPanel m_CtrlPanel;
        OnActivateInPlace(TRUE,NULL);
        return 0;
    }

这样一来，的确做了个带界面的ActiveX控件，可是用于网页中的时候，控件的子窗口，就是CCtrlPanel类收不到tab键、回车键和方向键，这样控件显得很不专业（如：用户在一EDIT框中输入完了内容，回车想表示按那个默认按钮，却不能实现），后来我发现这些按键被CXXXXCtrl类截获了！于是我理所当然的加了如下代码：

.. code-block:: C++

    BOOL CSluiceCtrl::PreTranslateMessage(MSG* pMsg)
    {
        if(pMsg->message==WM_KEYDOWN)
        {
            if(pMsg->wParam==VK_TAB ||pMsg->wParam==VK_RETURN ||
                pMsg->wParam==VK_LEFT || pMsg->wParam==VK_RIGHT)
            {
                m_CtrlPanel.SendMessage(pMsg->message,pMsg->wParam, pMsg->lParam);
                return TRUE;
            }
        }
        return COleControl::PreTranslateMessage(pMsg);
    }
    
但结果证明我想得太天真，但我始终不明白这样做为什么不行？还请高手指教！
另外想请教高手，这个问题到底应该如何解决？我甚至最极端的方法也试过了，如下：

.. code-block:: C++

    BOOL CSluiceCtrl::PreTranslateMessage(MSG* pMsg)
    {
        m_CtrlPanel.SendMessage(pMsg->message,pMsg->wParam, pMsg->lParam);
        return TRUE;
    }

答：

PretranslateMessage依赖于MFC的消息循环。如果容器的消息循环不是MFC的，那么PretranslateMessage不会被调用。

.. code-block:: C++

    int CWinApp::Run()
    {

        for (;;) {
            while (!::PeekMessage(&m_msgCur,...)) {
                if (!OnIdle(...))    // do some idle work
                    break;
            }
            // I have a message, or else no idle work to do: // pump it
            if (!PumpMessage())
                break;
        }
        return ExitInstance();
    }


    BOOL CWinApp::PumpMessage()
    {
        if (!::GetMessage(&m_msgCur,...)) {
            return FALSE;
        }
        if (!PreTranslateMessage(&m_msgCur)) {
            ::TranslateMessage(&m_msgCur);
            ::DispatchMessage(&m_msgCur);
        }
        return TRUE;
    }
    BOOL CWinApp::PreTranslateMessage(MSG* pMsg)
    {
        for (pWnd = /* window that sent msg */; pWnd; pWnd=pWnd->getParent())
            if (pWnd->PreTranslateMessage(pMsg))
                return TRUE;
        if (pMainWnd = /* main frame and it's not one of the parents */)
            if (pMainWnd->PreTranslateMessage(pMsg))
                return TRUE;

        return FALSE;  // not handled
    }


MFC对话框相应的键盘处理依赖于MFC的消息循环。

.. code-block:: C++

    BOOL CDialog::PreTranslateMessage(MSG* pMsg)
    {
        if (pMsg->message >= WM_KEYFIRST && // for performance
            pMsg->message <= WM_KEYLAST)

            // maybe translate dialog key
            return ::IsDialogMessage(m_hWnd, pMsg);
        return FALSE;
    }


如果容器的消息循环没有调用IsDialogMessage，那么相应的键盘处理不会被调用。

解决的方法是用Hook来获得需要的键盘输入，然后转发到对话框。参见PRB: Modeless Dialog Box in a DLL Does Not Process TAB Key (233263)

------------------
参考文档
------------------

* Q233263 PRB: Modeless Dialog Box in a DLL Does Not Process TAB Key (https://web.archive.org/web/20040721215404/http://support.microsoft.com/default.aspx?kbid=233263)
* FAQ: WebBrowser Keystroke Problems (https://web.archive.org/web/20030206122423/https://www.microsoft.com/mind/0499/faq/faq0499.asp)
* Meandering Through the Maze of MFC Message and Command Routing (https://web.archive.org/web/20030608113420/http://www.microsoft.com/msj/0795/dilascia/dilascia.aspx)
* C++ Q&A: Enabling Menus in MFC Apps, Changing the Behavior of Enter with DLGKEYS Sample App -- MSDN Magazine, July 2000(https://web.archive.org/web/20021108025739/http://msdn.microsoft.com/msdnmag/issues/0700/c/default.aspx)


