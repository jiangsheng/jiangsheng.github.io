PRB: ICustomDoc::SetUIHandler Causes Changes in Save As Dialog
==============================================================
.. post:: 21, Apr, 2006
   :tags: Dynamic HTML,Trident (layout engine)
   :category: enmsdn,Microsoft,Visual C++
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!483

   .. container::

      For the description of this problem, see
      http://support.microsoft.com/kb/330441.

   .. container::

      A workaround is `delegating DHTML
      commands <http://blog.joycode.com/jiangsheng/archive/2005/07/09/58754.aspx>`__
      to the origional webbrowser object through its IOleCommandTarget
      interface. A sample can be found at
      http://www.codeproject.com/atl/popupblocker.asp:

   .. container::

      STDMETHOD(Exec)( /\*[in]*/ const
      `GUID <http://en.wikipedia.org/wiki/Globally_unique_identifier>`__
      \*pguidCmdGroup, /\*[in]*/
      `DWORD <http://en.wikipedia.org/wiki/Word_%28computing%29>`__
      nCmdID, /\*[in]*/ DWORD nCmdExecOpt, /\*[in]*/ VARIANTARG \*pvaIn,
      /\*[in,out]*/ VARIANTARG \*pvaOut) { if (nCmdID ==
      OLECMDID_SHOWSCRIPTERROR) { // Don't show the error dialog, but //
      continue running scripts on the page. (\*pvaOut).vt = VT_BOOL;
      (\*pvaOut).boolVal = VARIANT_TRUE; return S_OK; } return
      m_spDefaultOleCommandTarget->Exec(pguidCmdGroup, nCmdID,
      nCmdExecOpt, pvaIn, pvaOut); }

   .. container::

      By redirecting the ole commands to the original client site, the
      save as options are restored.

   .. container::

      BTW, the sentence "This means that you must host the `Web
      browser <http://en.wikipedia.org/wiki/Web_browser>`__ control must
      be hosted" in the article seems confusing.
