Error: Unable to cast COM object of type ‘mshtml.HTMLDocumentClass’ to interface type ‘ICustomDoc’
==================================================================================================
.. post:: 23, Oct, 2006
   :tags: C#,Component Object Model,Trident (layout engine)
   :category: Microsoft
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!533

   This operation failed because the `QueryInterface <http://en.wikipedia.org/wiki/IUnknown>`__ call on
   the `COM <http://en.wikipedia.org/wiki/Component_Object_Model>`__ component for the interface with IID
   '{3050F3F0-98B5-11CF-BB82-00AA00BDCE0B}' failed due to the following error: No such interface supported (Exception from
   `HRESULT <http://en.wikipedia.org/wiki/HRESULT>`__: 0x80004002 (E_NOINTERFACE)). 
   
   My first reaction was:"What the hell? HTMLDocumentClass is the managed wrapper of `MSHTML <http://msdn.microsoft.com/en-us/library/aa741317.aspx>`__, and MSHTML is supposed to support the ICustomDoc interface!" Now I started wondering why the interfaces don't work I created a sandbox project and tried to cast interface there, but it works smoothly. I played with strong name and found no luck. Finally, I found out that it is the frame document that does not support this interface.
