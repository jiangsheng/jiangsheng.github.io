.. meta::
   :description: 基于非模态对话框的MFC工程#

基于非模态对话框的MFC工程
===============================

.. post:: 23, Mar, 2004
   :tags: MFC
   :category: Microsoft Foundation Classes, Visual C++
   :author: me
   :nocomments:

.. code-block:: C++

    BOOL CMyApp::InitInstance()
    {
        //……
        CMyDlg * pDlg=new CMyDlg;
        m_pMainWnd = pDlg;
        return pDlg->Create();
    }
    void CMyDlg ::OnClose() 
    {
        if (CanExit())
        {
            DestroyWindow();
            delete this;
            AfxPostQuitMessage(0); 
        }
    }
