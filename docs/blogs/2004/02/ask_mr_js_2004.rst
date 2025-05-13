Ask Mr JS
=====================
.. post:: 6, Feb, 2004
   :tags: CSDN, MFC
   :category: Win32, Microsoft Foundation Classes
   :author: me
   :nocomments:

Q

我想在控件上绘图，现在已能取得该控件的长与宽，但取不了它在对话杠中的位置（X，Y），请问该如何取？谢谢。

A
你确定控件只在MFC对话框上面用？
如果是的话，你可以看MFC代码中关于COleControlContainer的实现。

void COleControl::OnSetClientSite()之后，COleControlSite::m_pClientSite可以用来访问容器（IClientSite::GetContainer）。
获得的指针指向一个COleControlContainer对象。

.. code-block:: C++

    STDMETHODIMP COleControlSite::XOleClientSite::GetContainer(
    LPOLECONTAINER* ppContainer)
    {
        METHOD_PROLOGUE_EX_(COleControlSite, OleClientSite)
        return (HRESULT)pThis->m_pCtrlCont->InternalQueryInterface(
            &IID_IOleContainer, (LPVOID*)ppContainer);
    }

而COleControlContainer同时支持IOleInPlaceFrame接口，所以你可以在获得的IOleContainer指针上查询IOleInPlaceFrame接口，使用IOleInPlaceFrame::GetWindow来获得窗口句柄

.. code-block:: C++

    STDMETHODIMP COleControlContainer::XOleIPFrame::GetWindow(HWND* phWnd)
    {
        METHOD_PROLOGUE_EX_(COleControlContainer, OleIPFrame)

        *phWnd = pThis->m_pWnd->m_hWnd;
        return S_OK;
    }

获得容器窗口句柄之后，你可以枚举窗口来找到控件的宿主窗口。（判断从子窗口调用CWnd::GetControlUnknown获得的指针是否就是控件的IUnknown接口指针）

然后就可以判断宿控件的主窗口的位置了

以上操作严重依赖于MFC未公开的代码，所以在使用未来版本的MFC库时可能不再有效。