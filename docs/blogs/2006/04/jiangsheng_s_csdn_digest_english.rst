Jiangsheng's CSDN Digest (200604)
=========================================

.. post:: 3, Apr, 2006
   :tags: Q&A, MFC,CSDN
   :category: Win32
   :author: me
   :nocomments:

I have been summarizing my CSDN posts since 2004.  The last article of this kind is "Jiangsheng's CSDN Digest(April 3, 2006)" (https://web.archive.org/web/20060701050541/http://blog.csdn.net/jiangsheng/archive/2006/04/03/648980.aspx), including following discussions:

* web autocomplete using AJAX
* prevent printing a word document using VBA
* performance issue of CTreeCtrl::SetItemData
* application hang when accessing the IHTMLWindow2 interface of CHTMLView
* Limit CFileDialog and /or SHBrowseForFolder in a drive
* detect is a page is visited in CHTMLView
* programming ASP.Net using Delphi
* translate kanji to Chinese
* detect <PARAM> in MFC ActiveX
* translating strings to HTML, such as from "<" to "&lt;" in C
* prevent WriteProcessMemory injecting
* CHTMLView in MFC 6 can not process enter key in a contenteditable element correctly
* display UNICODE in a DOS window
* adding parameters to a HyperLink control in a DataList
* sharing socket between processes
* breaking word in edit mode using webbrowser
* modify local policies programmatically
* parse HTML tables in Visual C
* enumerating ODBC data sources
* compile error C2653 MessageBoxA after including Windows.h
* switch IME to full shape mode
* downloading webpages in asp.net using vb.net

Links of previous articles can be found at the beginning of this article.

Update:

in the MFC 6.0 version of the CHTMLView based MFCIE sample, enter key in <DIV contenteditable> get swallowed. You can fix this by adding a TranslateMessage call, or calling the CView version of PretranslateMessage.

.. code-block:: C++

    BOOL  CMfcieView ::PreTranslateMessage(MSG*  pMsg)
    {
            //  TODO:  Add  your  specialized  code  here  and/or  call  the base class
            if  (pMsg-  >message  ==  WM_KEYDOWN  &&  (pMsg-  >wParam  ==
    VK_RETURN    |  |
                        pMsg-  >wParam  ==  VK_ESCAPE))
        {
                    ::TranslateMessage(pMsg);
                return CView::PreTranslateMessage(pMsg);
        }
        return  CHtmlView::PreTranslateMessage(pMsg);
    }


The problem occurs only when MFCIE is showing web page with a DHTML editor which has the focus. Otherwise CHtmlView intercepts enter key correctly even when the TranslateMessage call is absent. https://web.archive.org/web/20030206122423/http://www.microsoft.com/mind/0499/faq/faq0499.asp suggested calling Win 32 API IsDialogMessage(), which is even worse. IDocHostUIHandler::TranslateAccelerator (and presumably, IOleInPlaceActiveObject::TranslateAccelerator) is called and get ignored somewhere inside the web browser control. I can not reproduce this problem in MFC 7, but I can not find how it got fixed after WinDiffing the mfc sources, either.