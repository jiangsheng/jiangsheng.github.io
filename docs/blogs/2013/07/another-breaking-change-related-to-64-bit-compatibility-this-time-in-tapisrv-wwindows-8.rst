.. meta::
   :description: The ADO team had to make a breaking change the ADO APIs due to compatibility problem with Microsoft Office. Now it seems to be Tapi’s turn.

Another breaking change related to 64 bit compatibility, this time in TAPISRV w/Windows 8
=========================================================================================
.. post:: 30, Jul, 2013
   :category: enmsdn,Microsoft
   :author: me
   :nocomments:

The ADO team `had to make a breaking change the ADO
APIs <http://jiangsheng.net/2011/02/24/breaking-change-in-ado-update-kb983246-included-in-windows-7-service-pack-1/>`__
due to compatibility problem with `Microsoft
Office <http://en.wikipedia.org/wiki/Microsoft_Office>`__. Now it seems
to be Tapi's turn. 

In the `64
bit <http://en.wikipedia.org/wiki/64-bit_computing>`__ editions of
`Windows 8 <http://en.wikipedia.org/wiki/Windows_8>`__ and `Windows
Server 2012 <http://en.wikipedia.org/wiki/Windows_Server_2012>`__, some
TAPI providers would stop getting incoming calls due to implementation
changes in the TAPI service (TAPISRV) that had to be done for 64 bit
compatibility.

The problem is pretty obvious from the
`documentation <http://msdn.microsoft.com/en-us/library/windows/desktop/ms725235%28v=vs.85%29.aspx>`__,
for example LINE_NEWCALL has this:

.. code-block::

   htLine = (HTAPILINE) hLineDevice;
   htCall = (HTAPICALL) 0;
   dwMsg = (DWORD) LINE_NEWCALL;
   dwParam1 = (DWORD)(HDRVCALL) hdCall;
   dwParam2 = (DWORD)(LPHTAPICALL) &htCall;
   dwParam3 = (DWORD) 0;

The parameters can't really be passed as DWORDs -
on a 64 bit build, pointers are 64 bit in size, and a DWORD is 32 bit.

Fortunately this can be corrected fairly easily, just ignore what the
documentation said and treat the DWORD parameters as DWORD_PTR, however
for the end users they would need updates from TAPI providers to get
TAPI working on their Windows 8 /Server 2012 machine. `According to TAPI
MVP Andreas
Marschall <http://social.msdn.microsoft.com/Forums/windowsdesktop/en-US/1d9646d9-ea18-4bfa-8214-d017cab97d56/windows-8-tapi-issues>`__,
the following TAPI providers are affected (If you got a provider
released before 2012,  it is likely also affected)

- Avaya TAPI
- Acatel-Lucent TSP
- NEC TSP (for PBX NEC SL1100)
- Siemens HiPath TAPI 120/170 (V2 R1.66.0)

