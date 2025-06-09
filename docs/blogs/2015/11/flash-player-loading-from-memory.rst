.. meta::
   :description: user cucao wants to know how to play a flash file from application resource. The user wants to use a dongle to protect unauthorized viewing of the flash file so

Flash Player: Loading from memory
=================================
.. post:: 26, Nov, 2015
   :tags: MFC
   :category: Win32
   :author: me
   :nocomments:

`user cucao wants to know <http://bbs.csdn.net/topics/391865427>`__ how to play a flash file from application resource. The user wants to use a dongle to protect unauthorized viewing of the flash file so can't just put the swf file in plain sight.

Adobe's Flash Player, being an ActiveX with supports for many OLE containers such as Internet Explorer and Microsoft Word, implements many standard OLE interfaces (for details open the ActiveX in oleview). One of them is IPersistStreamInit, a standard interface for ActiveX controls who want to distinguish new page load vs refresh, but can be used for the user to load the swf file from memory. 

The data source passed into IPersistStreamInit::Load could be a home-brew COM server that implements IStream, but since Windows already has such an implementation (CreateStreamOnHGlobal), it saves a lot of work to just load the resource into global memory
(GlobalAlloc/GlobalLock/memcpy/GlobalUnlock), and creates a stream off there for loading. 

.. code-block::
   
   //MFC and ATL instead of Windows API for readability
   void LoadFlash(LPUNKNOWN player, LPCVOID data, UINT size) 
   {

      COleStreamFile streamFile;
      if(!streamFile.CreateMemoryStream() return;
      CArchive ar (&streamFile, CArchive::store ); 
      ar.Write(data,size);
      ar.Close(); 
      streamFile.SeekToBegin();
      CComQIPtr<IPersistStreamInit> playerStreamLoader(player); 
      if(playerStreamLoader==NULL) return;
      playerStreamLoader->InitNew();
      playerStreamLoader->Load(streamFile.GetStream()); 
   }
   
This only works for self-contained swf files, however. To set a base url for relative url search in action scripts, a home-brew COM server that implements both IStream and IMoniker is needed.

