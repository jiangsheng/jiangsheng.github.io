摆脱在每个命令消息处理函数中的TRY和CATCH
==========================================

.. post:: 2, Aug, 2001
   :tags: MFC, CCmdTarget
   :category: Microsoft Foundation Classes,Visual C++
   :author: jiangshengvc
   :nocomments:

每个命令处理都可能导致异常，抛出异常通常导致终止当前命令处理。在每个命令处理过程中编写异常处理代码是一个十分繁琐的工作，由于命令是CCmdTarget::OnCmdMsg中处理的，所以可以这个函数中处理所有命令处理过程产生的异常而不用分别编写异常处理函数。

CCccXCommandHandler是一个基于CCmdTarget的类(:ref:`参考使用单独的命令处理类来处理命令消息 <handle_command_message_in_separate_class>`)。此示例可推广到所有CCmdTarget的派生类。

.. code-block:: C++

    BOOL CCccXCommandHandler::OnCmdMsg(UINT nID, int nCode, void* pExtra, AFX_CMDHANDLERINFO* pHandlerInfo)
    {
        BOOL     bRet=TRUE;
        TRY{
            bRet=CCmdTarget::OnCmdMsg(nID, nCode, pExtra, pHandlerInfo);
        }
        CATCH(COleDispatchException, pEx)
        {
            CGlobal::ProcessOleDispatchException(pEx);
        }
        AND_CATCH(CException, pEx)
        {
            CGlobal::ProcessException(pEx);
        }
        END_CATCH
        return bRet;
    }