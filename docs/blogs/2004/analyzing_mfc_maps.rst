分析MFC中的映射
==============================

.. post:: 5, Jan, 2004
   :tags: MFC
   :category: Microsoft Foundation Classes, Win32
   :author: jiangshengvc
   :nocomments:

.. _blog_analyzing_mfc_maps:

---------------------
条件查找映射
---------------------

MFC中大量使用了BEGIN_XXX_MAP这样的宏，以及映射进行查找优化，例如消息映射，OLE命令映射，以及接口等等。每个映射包含一个指向基类的映射的指针。这样，当一个类需要根据一定的条件查找一个对象时，它会查找本类对象，如果没有找到，那么会查找基类，直到根基类。这类查找包含Windows消息，命令，事件和OLE命令的分发，和对象实现的接口的查询等等。

下面是函数BOOL CWnd::OnWndMsg(UINT message, WPARAM wParam, LPARAM lParam, LRESULT* pResult)的部分代码，演示了如何根据消息的ID查找处理函数。

.. code-block:: C++

    const AFX_MSGMAP* pMessageMap; pMessageMap = GetMessageMap();
    UINT iHash; iHash = (LOWORD((DWORD_PTR)pMessageMap) ^ message) & (iHashMax-1);
    AfxLockGlobals(CRIT_WINMSGCACHE);
    AFX_MSG_CACHE* pMsgCache; pMsgCache = &_afxMsgCache[iHash];
    const AFX_MSGMAP_ENTRY* lpEntry;
    if (message == pMsgCache->nMsg && pMessageMap == pMsgCache->pMessageMap)
    {
        // cache hit
        lpEntry = pMsgCache->lpEntry;
        AfxUnlockGlobals(CRIT_WINMSGCACHE);
        if (lpEntry == NULL)
            return FALSE;

        // cache hit, and it needs to be handled
        if (message < 0xC000)
            goto LDispatch;
        else
            goto LDispatchRegistered;
        }
        else
        {
        // not in cache, look for it
        pMsgCache->nMsg = message;
        pMsgCache->pMessageMap = pMessageMap;

        #ifdef _AFXDLL
        for (/* pMessageMap already init'ed */; pMessageMap->pfnGetBaseMap != NULL;
            pMessageMap = (*pMessageMap->pfnGetBaseMap)())
        #else
            for (/* pMessageMap already init'ed */; pMessageMap != NULL;
            pMessageMap = pMessageMap->pBaseMap)
        #endif
        {
            // Note: catch not so common but fatal mistake!!
            // BEGIN_MESSAGE_MAP(CMyWnd, CMyWnd)
            #ifdef _AFXDLL
            ASSERT(pMessageMap != (*pMessageMap->pfnGetBaseMap)());
            #else
            ASSERT(pMessageMap != pMessageMap->pBaseMap);
            #endif

            if (message < 0xC000)
            {
                // constant window message
                if ((lpEntry = AfxFindMessageEntry(pMessageMap->lpEntries,
                    message, 0, 0)) != NULL)
                {
                    pMsgCache->lpEntry = lpEntry;
                    AfxUnlockGlobals(CRIT_WINMSGCACHE);
                    goto LDispatch;
                }
            }
            else
            {
                // registered windows message
                lpEntry = pMessageMap->lpEntries;
                while ((lpEntry = AfxFindMessageEntry(lpEntry, 0xC000, 0, 0)) != NULL)
                {
                    UINT* pnID = (UINT*)(lpEntry->nSig);
                    ASSERT(*pnID >= 0xC000 || *pnID == 0);
                    // must be successfully registered
                    if (*pnID == message)
                    {
                        pMsgCache->lpEntry = lpEntry;
                        AfxUnlockGlobals(CRIT_WINMSGCACHE);
                        goto LDispatchRegistered;
                    }
                    lpEntry++; // keep looking past this one
                }
            }
        }

        pMsgCache->lpEntry = NULL;
        AfxUnlockGlobals(CRIT_WINMSGCACHE);
        return FALSE;
    }

    LDispatch:
    
注意对查找结果的缓存可以提高查找的效率。

不要被MFC起的名字欺骗了，从数据结构上来说，查找是顺序的，而不是使用CMap类使用的散列技术，所以上面的代码中使用散列技术，缓存最近的查找结果和把最常用的映射项放在最前面通常有助于提高效率。

使用查找映射的好处是，可以方便地在派生类中扩展和覆盖映射（例如重新实现IDispatch），而不用重写/重载查找函数（消息和命令的分发，或者接口的查询）；也可以不使用对资源消耗很大的虚函数表。（尽管如此，CWnd类还是有无数个虚函数，并且不出意外地看到，在MFC6到MFC7的升级中又有增加）

使用查找映射的坏处么，当然是理解上的问题和性能上的损失了。

---------------------
句柄映射
---------------------

MFC在把句柄封装成对象方面不遗余力，为了保证同一线程内对象<->句柄映射是一对一的，创建了各种各样的句柄映射，窗口，GDI对象，菜单诸如此类。为了封装GetDlgItem,SelectObject这样的API返回的临时的句柄，MFC还产生临时的对象<->句柄映射。句柄映射使得GetParentFrame这样的函数可以实现。

.. code-block:: C++

    CFrameWnd* CWnd::GetParentFrame() const
    {
        if (GetSafeHwnd() == NULL) // no Window attached
        return NULL;

        ASSERT_VALID(this);

        CWnd* pParentWnd = GetParent(); // start with one parent up
        while (pParentWnd != NULL)
        {
            if (pParentWnd->IsFrameWnd())
                return (CFrameWnd*)pParentWnd;
            pParentWnd = pParentWnd->GetParent();
        }
        return NULL;
    }
    _AFXWIN_INLINE CWnd* CWnd::GetParent() const
    { 
        ASSERT(::IsWindow(m_hWnd)); 
        return CWnd::FromHandle(::GetParent(m_hWnd)); 
    }

看到了么，它首先调用API GetParent，然后去本线程的窗口<->句柄映射查找对象指针，然后调用CWnd::IsFrameWnd来决定对象是否是框架。（谢天谢地，这个函数是用虚函数而不是用CObject::IsKindOf,不然又得遍历一遍运行时类信息）。因为对象和句柄的对应的唯一性，所以可以找到唯一的父框架窗口对象。

在一些经常调用的函数里面也使用到这个映射

.. code-block:: C++

    LRESULT CALLBACK
    AfxWndProc(HWND hWnd, UINT nMsg, WPARAM wParam, LPARAM lParam)
    {
        // special message which identifies the window as using AfxWndProc
        if (nMsg == WM_QUERYAFXWNDPROC)
            return 1;

        // all other messages route through message map
        CWnd* pWnd = CWnd::FromHandlePermanent(hWnd);
        ASSERT(pWnd != NULL); 
        ASSERT(pWnd->m_hWnd == hWnd);
        if (pWnd == NULL || pWnd->m_hWnd != hWnd)
            return ::DefWindowProc(hWnd, nMsg, wParam, lParam);
        return AfxCallWndProc(pWnd, hWnd, nMsg, wParam, lParam);
    }

也就是说，它要遍历一遍afxMapHWND()返回的对象里面的永久的句柄映射。而这个函数在每个消息到达的时候都要调用。这是MFC应用程序性能损失的原因之一。

同样的，由于这些对象是被线程所拥有的，MFC的这些句柄映射的存储方式是线程局部存储（thread-local-storage ，TLS）。也就是说，对于同一个句柄，句柄映射中相应的对象可以不一致。这在多线程程序中会造成一些问题，参见微软知识库文章Q147578 CWnd Derived MFC Objects and Multi-threaded Application (https://web.archive.org/web/20060301163811/https://support.microsoft.com/default.aspx?scid=kb;en-us;147578)。

------------
总结
------------

MFC为了快速和方便地开发作了很多工作，例如上述的两种映射，但是性能方面有所损失。开发应用程序时，需要在快速方便和性能损失方面的权衡。（话是这么说，但是根据摩尔定律，再过两年我的话就成废话了）

