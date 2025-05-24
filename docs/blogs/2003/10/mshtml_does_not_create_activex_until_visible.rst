.. meta::
   :description: Q195188 PRB: ActiveX Control Window Is Not Created Until Visible in Internet Explorer 使用知识库里面的方法 在Windows XP中，可以在任务栏上看到控件的窗口，很是不雅观 解决的方法是尽可能用GetForegroundWindow

问题：Internet Explorer中的控件在可见之前没有被创建
======================================================

.. post:: 23, Oct, 2003
   :tags: MSHTML, ActiveX
   :category: Microsoft Foundation Classes, WebBrowser Control
   :author: me
   :nocomments:

Q195188 PRB: ActiveX Control Window Is Not Created Until Visible in Internet Explorer
使用知识库里面的方法

.. code-block:: C++

    // CMyControl is derived from CComControl
    STDMETHOD(SetClientSite)(IOleClientSite *pClientSite)
    {
        if (pClientSite)
        {
            RECT rc = {0,0,0,0};
            // Don't have access to the container's window so just use the
            // desktop. Window will be resized correctly during in-place
            // activation.
            HWND hWnd = CreateControlWindow(::GetDesktopWindow(), rc);
            _ASSERT (hWnd);
        }
        return IOleObjectImpl::SetClientSite (pClientSite);
    }

在Windows XP中，可以在任务栏上看到控件的窗口，很是不雅观

解决的方法是尽可能用GetForegroundWindow替代GetDesktopWindow（GetForegroundWindow有时返回NULL）
