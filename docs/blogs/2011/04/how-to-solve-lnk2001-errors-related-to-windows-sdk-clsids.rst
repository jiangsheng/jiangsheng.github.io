.. meta::
   :description: User IMFCoder wants to know how to solve a LNK2001 error related to CLSID_CMpeg4sDecMediaObject. The user has no problem linking a lib file in the project but c

How to solve LNK2001 errors related to Windows SDK CLSIDs
=========================================================
.. post:: 8, Apr, 2011
   :tags: Globally unique identifier,Microsoft Windows SDK,Visual C++
   :category: enmsdn,Microsoft,Visual Studio
   :author: me
   :nocomments:

User IMFCoder `wants to
know <http://social.msdn.microsoft.com/Forums/en-US/vcgeneral/thread/7aa5ff12-cf78-438d-b9de-324a0530ca87/>`__
how to solve a LNK2001 error related to CLSID_CMpeg4sDecMediaObject. The
user has no problem linking a lib file in the project but couldn’t find
which lib the CLSID is in. 

The `Windows
SDK <http://en.wikipedia.org/wiki/Microsoft_Windows_SDK>`__ is strangely
cryptic on which lib file the CLSID is exported from. Luckily you can
find out the library file you need to link with, if you execute the
following `command
line <http://en.wikipedia.org/wiki/Command-line_interface>`__ in the SDK
command prompt.

Update: use 
.. code-block ::

   findstr /m /S /c:"CMpeg4" \*.lib

is easier.

.. code-block ::
   
   C:\\Program Files\\Microsoft SDKs\\Windows\\v7.0\\Lib>for %a in (\*.lib) do dumpbin /symbols %a \|find "CMpeg4" 
   
After a bunch of fruitless
searches, the search yields the results when it encounters
wmcodecdspuuid.lib

   C:\Program Files\Microsoft SDKs\Windows\v7.0\Lib>dumpbin /symbols wmcodecdspuuid.lib   | find "CMpeg4"
   056 00000000 SECT1D notype       External     | _CLSID_CMpeg4DecMediaObject
   059 00000000 SECT1E notype       External     | _CLSID_CMpeg43DecMediaObject
   05C 00000000 SECT1F notype       External     | _CLSID_CMpeg4sDecMediaObject
   05F 00000000 SECT20 notype       External     | _CLSID_CMpeg4sDecMFT
   065 00000000 SECT22 notype       External     | _CLSID_CMpeg4EncMediaObject
   068 00000000 SECT23 notype       External     | _CLSID_CMpeg4sEncMediaObject

There is a big uuid.lib file contains most
of the SDK CLSIDs in the Windows SDK, and it is likely linked by default
if you use Visual C++’s project templates, so you may not see the link
error at all if you use common CLSIDs like CLSID_InternetExplorer. 

There
are also `GUIDs defined in the Windows SDK using the DEFINE_GUID
macro <http://msdn.microsoft.com/en-us/library/ff960419.aspx>`__. The
SDK assumes you to initialize the GUID using the methods demonstrated in
`How to avoid error "LNK2001 unresolved external" by using
DEFINE_GUID <http://support.microsoft.com/kb/130869>`__.

