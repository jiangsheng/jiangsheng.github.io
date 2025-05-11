.. _handle_command_message_in_separate_class:

使用单独的命令处理类来处理命令消息
==========================================

.. post:: 2, Aug, 2001
   :tags: MFC, CCmdTarget
   :category: Microsoft Foundation Classes,Visual C++
   :author: jiangshengvc
   :nocomments:

适用于有很多命令处理函数的对象，以及共享命令处理函数。

应用程序的主窗口通常要处理许多命令消息。这会使文件变得很大，不容易查找。为明确起见，可以将对象对命令消息的处理抽象出来，做成一个（这里是一个，但是可以按用途分成多个）类。

这种方法适用于有很多命令处理函数的对象，以及共享命令处理函数。

.. code-block:: C++

    BOOL CWorkBenchDlg::OnCmdMsg(UINT nID, int nCode, void* pExtra, AFX_CMDHANDLERINFO* pHandlerInfo)
    {
        // TODO: Add your specialized code here and/or call the base class
        if(m_CccXCommandHandler.OnCmdMsg(nID,nCode,pExtra,pHandlerInfo))
            return TRUE;
        return CAppBar::OnCmdMsg(nID, nCode, pExtra, pHandlerInfo);
    }

