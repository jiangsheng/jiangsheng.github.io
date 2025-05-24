.. meta::
   :description: 这里使用了窗口标题进行查找匹配。可以使用内核同步对象来进行准确的匹配和防止同时启动。

限制应用程序的实例数目
==========================

.. post:: 23, Mar, 2004
   :tags: MFC
   :category: Microsoft Foundation Classes, Visual C++
   :author: me
   :nocomments:

.. code-block:: C++

    ///////////////////////////////////////////////////////////////////////////// 
    // CTheApp::FirstInstance 
    // FirstInstance checks for an existing instance of the application. 
    // If one is found, it is activated. 
    // 
    // This function uses a technique similar to that described in KB 
    // article Q109175 to locate the previous instance of the application. 
    // However, instead of searching for a matching class name, it searches 
    // for a matching caption. This allows us to use the normal dialog 
    // class for our main window. It assumes that the AFX_IDS_APP_TITLE 
    // string resource matches the caption specified in the dialog template. 

    BOOL CTheApp::FirstInstance() 
    { 
        CString strCaption; 
        strCaption.LoadString(AFX_IDS_APP_TITLE); 

        CWnd* pwndFirst = CWnd::FindWindow((LPCTSTR)(DWORD_PTR)WC_DIALOG, 
        strCaption); 
        if (pwndFirst) 
        { 
            // another instance is already running - activate it 
            CWnd* pwndPopup = pwndFirst->GetLastActivePopup(); 
            pwndFirst->SetForegroundWindow(); 
            if (pwndFirst->IsIconic()) 
                pwndFirst->ShowWindow(SW_SHOWNORMAL); 
            if (pwndFirst != pwndPopup) 
                pwndPopup->SetForegroundWindow(); 
            return FALSE; 
        } 
        else 
        { 
            // this is the first instance 
            return TRUE; 
        } 
    } 

    ///////////////////////////////////////////////////////////////////////////// 
    // CTheApp::InitInstance 
    // InitInstance performs per-instance initialization of the DLGCBAR 
    // application. If an instance of the application is already running, 
    // it activates that instance. Otherwise, it creates the modeless 
    // dialog which serves as the application''s interface. 

    BOOL CTheApp::InitInstance() 
    { 
        if (!FirstInstance()) 
        return FALSE; 
    }

这里使用了窗口标题进行查找匹配。可以使用内核同步对象来进行准确的匹配和防止同时启动。
