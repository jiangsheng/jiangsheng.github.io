.. meta::
   :description: MFC提供了许多十分有用的类和对象，在很多时候在Office插件、BHO、常规DLL这样的工程中加入MFC支持是一个不错的选择。但是，MFC中的很多功能，例如资源查找，消息预处理等等都依赖于在进程或者线程创建时被初始化的MFC内部数据；而对于需要添加MFC支持的工程，这些数据并不会被自动地初始化。这时候使用一些MFC的

MFC，欢乐与痛苦
========================

.. post:: 20 Aug, 2005
   :tags: MFC, Bug
   :category: Visual Studio
   :author: me
   :nocomments:

.. _blogs_2005_08_mfc_joy_and_pain:


MFC提供了许多十分有用的类和对象，在很多时候在Office插件、BHO、常规DLL这样的工程中加入MFC支持是一个不错的选择。但是，MFC中的很多功能，例如资源查找，消息预处理等等都依赖于在进程或者线程创建时被初始化的MFC内部数据；而对于需要添加MFC支持的工程，这些数据并不会被自动地初始化。

这时候使用一些MFC的功能，例如使用CString从字符串表加载一个字符串，或者使用CDialog::DoModal()创建一个模态对话框，都会有断言错误，用ATL向导创建的支持MFC的程序也没有多少改善，在CWinApp的DLL版本中没有初始化线程数据，所以调用AfxGetThread会返回空指针。解决这个问题的一个办法是使用AfxBeginThread来启动一个MFC线程，这样MFC会初始化线程相关的数据。

在下面的示例中，我在线程初始化时建立了一个模态对话框，以避免直接创建模态对话框会触发的断言失败信息。为了模拟模态对话框的效果，在CDialogThread::WaitForDoModal()这个函数中创建了一个消息循环来等待线程结束，同时用MsgWaitForMultipleObjects来避免死锁。因为MFC中和进程相关的数据并不总是被正确初始化，在调用模态对话框之前也需要手动设置一下。

.. code-block:: C++

    //如果这段代码可以工作，那么它的作者是Jiangsheng
    //否则我不知道它的作者
    void __stdcall CFrontPageAddin::OnClickButtonExportCHM(IDispatch* /*Office::_CommandBarButton*
    */ Ctrl,VARIANT_BOOL * CancelDefault)
    {
        AtlTrace(_T(" CFPAnt::OnClickButtonExportCHM\n"));
        //create a thread to avoid assert failure
        CDialogThread* pDialogThread=
            (CDialogThread*)AfxBeginThread(RUNTIME_CLASS(CDialogThread),
                THREAD_PRIORITY_NORMAL,
                0,
                CREATE_SUSPENDED,NULL);
        if(pDialogThread)
        {
            pDialogThread->m_prc=RUNTIME_CLASS(CExportCHMSheet);
            pDialogThread->ResumeThread();
            pDialogThread->WaitForDoModal();
            delete pDialogThread;
        }
    }
    class CDialogThread : public CWinThread
    {
        //......
        int m_nModalResult;
        CRuntimeClass* m_prc;
        void WaitForDoModal();
        //......
    };
    CDialogThread::CDialogThread()
    {
        m_bAutoDelete=FALSE;
        m_prc=NULL;
        m_nModalResult=0;
    }
    BOOL CDialogThread::InitInstance()
    {
        // TODO: perform and per-thread initialization here
        AFX_MANAGE_STATE(AfxGetAppModuleState());
        AFX_MODULE_STATE* pModuleState=AfxGetModuleState();
        pModuleState->m_hCurrentInstanceHandle=_Module.GetModuleInstance();
        AfxSetResourceHandle(_Module.GetModuleInstance());
        if(m_prc)
        {
            if(m_prc->IsDerivedFrom(RUNTIME_CLASS(CDialog)))
            {
                CDialog* pDialog=(CDialog*)m_prc->CreateObject();
                if(pDialog)
                {
                    m_pMainWnd=pDialog;
                    m_nModalResult=pDialog->DoModal();
                }
            }
            else if(m_prc->IsDerivedFrom(RUNTIME_CLASS(CPropertySheet)))
            {
                CPropertySheet* pDialog=(CPropertySheet*)m_prc->CreateObject();
                if(pDialog)
                {
                    m_pMainWnd=pDialog;
                    m_nModalResult=pDialog->DoModal();
                }
            }
        }
        return FALSE;
    }
    void CDialogThread::WaitForDoModal()
    {
        //from https://web.archive.org/web/20100118052023/http://blogs.msdn.com/oldnewthing/archive/2005/02/17/375307.aspx
        MSG msg;
        UINT cRecords = 0;
        while (true) {
            switch (MsgWaitForMultipleObjects(1, &m_hThread,
                FALSE, INFINITE, QS_ALLINPUT)) {
                case WAIT_OBJECT_0:
                    return ; // event has been signalled
                    break;
                case WAIT_OBJECT_0+1:
                    // we have a message - peek and dispatch it
                    if (PeekMessage(&msg, NULL, 0, 0, PM_REMOVE)) {
                        TranslateMessage(&msg);
                        DispatchMessage(&msg);
                        }
                    break;
                default:
                    return ; // unexpected failure
            }
        }
    }


使用VC6.0编译通过。

上面的方法只对于DLL之类的组件比较有用。对于使用MFC的应用程序来说，上面的方法比较繁琐。比较简单的方法还是使用MFC向导来创建应用程序，然后再添加ATL或者.Net之类的额外支持。参考微软知识库文章Q181505和Q824480。
参考

* BUG: You receive an "ASSERT in wincore.cpp" assert when an MFC application calls a function in MFC regular DLL in Visual C++（https://web.archive.org/web/20060212193318/http://support.microsoft.com/kb/194300）
* PRB: ATL COM AppWizard Doesn't Offer MFC Support for .EXE（https://web.archive.org/web/20060212193332/http://support.microsoft.com/kb/181505）
* PRB：为 C++ DLL 项目建立托管扩展时出现链接器警告（https://web.archive.org/web/20041019174557/http://support.microsoft.com/kb/814472）
* BUG: "HRESULT - 0x80010106" Error When You Run a Managed C++ Application（https://web.archive.org/web/20060212193302/http://support.microsoft.com/kb/824480）
