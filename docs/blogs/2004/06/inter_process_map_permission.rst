跨进程访问共享内存的权限问题
============================

.. post:: 24, Jun, 2004
   :tags: security, process, File Mapping
   :category: Windows Service, Win32
   :author: me
   :nocomments:

问：

* 我在服务器上用 CreateFileMapping 创建了一段共享内存。让这个exe始终在服务器上跑。同时，别的用户在客户端用IE访问服务器，将要查询的数据通过C#制作的网页提交上来，服务器得到网页参数后，建立一个COM对象访问上一个exe的共享内存，然后将在共享内存中的查询结果返回给客户。问题是现在这个COM无法用openmapping访问exe的共享内存，提示 访问拒绝 。而我在服务器上随便建议一个工程编译成exe,文件就可访问这段共享内存!!为何在网页中就不成？COM难道要有什么权限设置.两个进程之间的权限整合方法是什么？怎么用DACL?

* 我用ATL写了一个Service,在这个Service中，我创建了一块共享内存(Memory Mapping)和一个Mutex然后我在另一个普通程序中去访问这块共享内存和Mutex,但是，我用CreateMutex打开Mutex失败，GetLastError()返回5，含义是访问被拒绝！！同样，我在用MapViewOfFile时，也得到同样的错误！！！！！！我已经知道原因是因为在创建共享内存和Mutext时，SECURITY_ATTRIBUTES我设为NULL!!!但是我没有解决的方法,希望各位大虾帮帮忙！

答：检查服务运行所使用的用户的权限。通常，为了安全起见，服务进程的拥有者权限是很低的。为了让服务进程访问对象，你需要在创建共享内存时指定一个更加广泛的的安全描述符，增加一个新的访问控制项目(ACE)给你的ASP进程的拥有者。默认的访问控制列表(ACL)只包含创建者和管理员组。

下列代码创建一个所有用户都可以访问的安全描述符。你可以在创建共享内存时使用这个安全描述符。

.. code-block:: C++

   CShareRestrictedSD ShareRestrictedSD;
   hMapFile = CreateFileMapping(INVALID_HANDLE_VALUE,    // Current file handle.
      ShareRestrictedSD.GetSA(),   // Default security.
        //    NULL,                             
        PAGE_READWRITE,                    // Read/write permission.
        0,                                 // Max. object size.
        FileSize,                                 // Size of hFile.
        MapName);            // Name of mapping object.

   class CShareRestrictedSD 
   {
      public:
         CShareRestrictedSD();
         virtual ~CShareRestrictedSD();
         SECURITY_ATTRIBUTES* GetSA();
      protected:
         PVOID  ptr;
         SECURITY_ATTRIBUTES sa;
         SECURITY_DESCRIPTOR sd;
    };
    //如果这家伙起作用，那么它的作者是jiangsheng；
    //如果这家伙一点用没有，那我不知道它的作者。
    PVOID BuildRestrictedSD(PSECURITY_DESCRIPTOR pSD) 
    {
       DWORD  dwAclLength;
       PSID   psidEveryone = NULL;
       PACL   pDACL   = NULL;
       BOOL   bResult = FALSE;
       PACCESS_ALLOWED_ACE pACE = NULL;
       SID_IDENTIFIER_AUTHORITY siaWorld = SECURITY_WORLD_SID_AUTHORITY  ;      
       SECURITY_INFORMATION si = DACL_SECURITY_INFORMATION;      
       __try {

         // initialize the security descriptor
         if (!InitializeSecurityDescriptor(pSD,
               SECURITY_DESCRIPTOR_REVISION)) 
         {
            printf("InitializeSecurityDescriptor() failed with error %d/n",
                  GetLastError());
            __leave;
         }

         // obtain a sid for the Authenticated Users Group
         if (!AllocateAndInitializeSid(&siaWorld, 1,
               SECURITY_WORLD_RID, 0, 0, 0, 0, 0, 0, 0,
               &psidEveryone)) 
         {
             printf("AllocateAndInitializeSid() failed with error %d/n",
                   GetLastError());
             __leave;
         }

         // NOTE:
         //
         // The Authenticated Users group includes all user accounts that
         // have been successfully authenticated by the system. If access
         // must be restricted to a specific user or group other than
         // Authenticated Users, the SID can be constructed using the
         // LookupAccountSid() API based on a user or group name.

         // calculate the DACL length
         dwAclLength = sizeof(ACL)
               // add space for Authenticated Users group ACE
               + sizeof(ACCESS_ALLOWED_ACE) - sizeof(DWORD)
               + GetLengthSid(psidEveryone);

         // allocate memory for the DACL
         pDACL = (PACL) HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY,
               dwAclLength);
         if (!pDACL) {
            printf("HeapAlloc() failed with error %d/n", GetLastError());
            __leave;
         }

         // initialize the DACL
         if (!InitializeAcl(pDACL, dwAclLength, ACL_REVISION)) {
            printf("InitializeAcl() failed with error %d/n",
                  GetLastError());
            __leave;
         }
      
         // add the Authenticated Users group ACE to the DACL with
         // GENERIC_READ, GENERIC_WRITE, and GENERIC_EXECUTE access
         if (!AddAccessAllowedAce(pDACL, ACL_REVISION,
               GENERIC_ALL,
               psidEveryone)) {
            printf("AddAccessAllowedAce() failed with error %d/n",
                  GetLastError());
            __leave;
         }

         // set the DACL in the security descriptor
         if (!SetSecurityDescriptorDacl(pSD, TRUE, pDACL, FALSE)) {
            printf("SetSecurityDescriptorDacl() failed with error %d/n",
                  GetLastError());
            __leave;
         }

         bResult = TRUE;
        
      }
      __finally 
      {

         if (psidEveryone) FreeSid(psidEveryone);
      }

      if (bResult == FALSE) {
         if (pDACL)
            HeapFree(GetProcessHeap(), 0, pDACL);
         pDACL = NULL;
      }

      return (PVOID) pDACL;
   }

   // The following function frees memory allocated in the
   // BuildRestrictedSD() function
   VOID FreeRestrictedSD(PVOID ptr) {
      if (ptr) 
         HeapFree(GetProcessHeap(), 0, ptr);
      return;
   }


   CShareRestrictedSD::CShareRestrictedSD()
   {
      ptr=NULL;
      sa.nLength = sizeof(sa);
      sa.lpSecurityDescriptor = &sd;
      sa.bInheritHandle = FALSE;
      // build a restricted security descriptor
      ptr = BuildRestrictedSD(&sd);
      if (!ptr) {
         TRACE("BuildRestrictedSD() failed/n");
      }
   }

   CShareRestrictedSD::~CShareRestrictedSD()
   {
      if(ptr){
         FreeRestrictedSD(ptr);
      }
   }
   SECURITY_ATTRIBUTES* CShareRestrictedSD::GetSA()
   {
      if(ptr){
         return &sa;
      }
      else
         return NULL;
   }

更多信息可以参考

* DACL, NULL or not NULL - Flier Lu - 博客园 (https://www.cnblogs.com/flier/archive/2004/07/15/24299.html)

