.. meta::
   :description: 本来想自己写一个的，但是发现codeproject上面已经有了(https://web.archive.org/web/20000604080517/http://www.codeproject.com/miscctrl/iprogressdialog.asp)

使用IE5内建的进度对话框
=============================

.. post:: 12, Feb, 2004
   :tags: Windows API
   :category: Windows, Win32
   :author: me
   :nocomments:

本来想自己写一个的，但是发现codeproject上面已经有了(https://web.archive.org/web/20000604080517/http://www.codeproject.com/miscctrl/iprogressdialog.asp)

下面是微软知识库里面的一个示例

.. code-block:: C++

    CoInitialize(NULL);

    IProgressDialog *pProgressDialog;
    CoCreateInstance( CLSID_ProgressDialog, NULL, CLSCTX_ALL, IID_IProgressDialog, (LPVOID*)&pProgressDialog);
    pProgressDialog->SetTitle(L"Testing...");
    pProgressDialog->SetCancelMsg(L"Cancelling...",NULL);
    pProgressDialog->StartProgressDialog(NULL, NULL, PROGDLG_NOMINIMIZE, NULL);
    Sleep(100);
    int i;
    for(i=0;i<100;i++)
    {
        if(pProgressDialog->HasUserCancelled()) break; 
        pProgressDialog->SetProgress(i,100); 
        Sleep(100); 
    }
    pProgressDialog->StopProgressDialog();
    pProgressDialog->Release();
    CoUninitialize();

相关链接

* Q260222 BUG: PROGDLG_NOMINIMIZE Flag in IProgressDialog::StartProgressDialog() Has No Effect (https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/260222)
