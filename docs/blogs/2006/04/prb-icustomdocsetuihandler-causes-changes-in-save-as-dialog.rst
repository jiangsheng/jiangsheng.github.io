.. meta::
   :description: For the description of this problem, see http://support.microsoft.com/kb/330441. A workaround is delegating DHTML commands to the origional webbrowser object th

PRB: ::SetUIHandler Causes Changes in Save As Dialog
==============================================================
.. post:: 21, Apr, 2006
   :tags: Dynamic HTML,Trident (layout engine)
   :category: enmsdn,Microsoft,Visual C++
   :author: me
   :nocomments:


For the description of this problem, see
http://support.microsoft.com/kb/330441.



A workaround is `delegating DHTML
commands <http://blog.joycode.com/jiangsheng/archive/2005/07/09/58754.aspx>`__
to the origional webbrowser object through its IOleCommandTarget
interface. A sample can be found at
http://www.codeproject.com/atl/popupblocker.asp:

.. code-block::

   STDMETHOD(Exec)(
      /*[in]*/ const GUID *pguidCmdGroup,
      /*[in]*/ DWORD nCmdID,
      /*[in]*/ DWORD nCmdExecOpt,
      /*[in]*/ VARIANTARG *pvaIn,
      /*[in,out]*/ VARIANTARG *pvaOut)
   {
      if (nCmdID == OLECMDID_SHOWSCRIPTERROR)
      {
         // Don't show the error dialog, but
         // continue running scripts on the page.
         (*pvaOut).vt = VT_BOOL;
         (*pvaOut).boolVal = VARIANT_TRUE;
         return S_OK;
      }
      return m_spDefaultOleCommandTarget->Exec(pguidCmdGroup, nCmdID,
      nCmdExecOpt, pvaIn, pvaOut);
   }


By redirecting the ole commands to the original client site, the
save as options are restored.



BTW, the sentence "This means that you must host the `Web
browser <http://en.wikipedia.org/wiki/Web_browser>`__ control must
be hosted" in the article seems confusing.

