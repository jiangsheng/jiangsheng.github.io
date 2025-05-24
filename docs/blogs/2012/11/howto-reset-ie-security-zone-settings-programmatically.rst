.. meta::
   :description: Internet Explorer 7 introduced the IInternetZoneManagerEx2 interface, which has a FixUnsecureSettings method to reset all security zone settings. Like all other

Howto: reset IE security zone settings programmatically
=======================================================
.. post:: 26, Nov, 2012
   :tags: Internet Explorer 7,security zone settings,Trident (layout engine)
   :category: enmsdn,Microsoft,Visual C++,Visual Studio,Webbrowser control
   :author: me
   :nocomments:

`Internet Explorer
7 <http://en.wikipedia.org/wiki/Internet_Explorer_7>`__ introduced
the `IInternetZoneManagerEx2 <http://msdn.microsoft.com/en-us/library/ms537055(v=VS.85).aspx>`__
interface, which has a FixUnsecureSettings method to reset all security
zone settings. Like all other IInternetZoneManager\* interfaces, you can
query this interface from the internet zone manager object:

.. code-block::

   IInternetZoneManagerEx2* pzoneManager=NULL;
   HRESULT hr=CoCreateInstance(CLSID_InternetZoneManager
      ,NULL,CLSCTX_INPROC_SERVER,IID_IInternetZoneManagerEx2,(LPVOID*)&pzoneManager);

   if(hr==S_OK && pzoneManager!=NULL) {
      hr=pzoneManager->FixUnsecureSettings(); 
   } 
   
There's
another `CoInternetCreateZoneManager <http://msdn.microsoft.com/en-us/library/ms537159(v=VS.85).aspx>`__
function to get the zone manager object's IInternetZoneManager
interface.

