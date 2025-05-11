在Windows2000中动态禁用/启用Ctrl-Alt-Delete
==============================================

.. post:: 9, Nov, 2003
   :tags: MFC, Hook
   :category: Microsoft Foundation Classes,Visual C++
   :author: jiangshengvc
   :nocomments:

.. _blog_disable_control_alt_delete_windows_2000:

来自CSDN论坛VC/MFC版的讨论 在NT/2000中怎么禁用Ctrl+Alt+Delete?（不能用gina,键盘驱动）（此帖已归档，可以在http://search.csdn.net 搜索此帖）

本文的更新信息位于http://blog.joycode.com/jiangsheng/archive/2004/07/20/27909.aspx

单击 https://github.com/jiangsheng/Samples/tree/master/TrapControlAltDelete 下载本文的代码。

概要

此文章的信息来自CSDN论坛VC/MFC版的讨论

在NT/2000中怎么禁用Ctrl+Alt+Delete?（不能用gina,键盘驱动）（此帖已归档，可以在http://search.csdn.net 搜索此帖）

在Windows2000中Ctrl-Alt-Delete组合键的处理如下：

Winlogon初始化的时候，在系统中注册了CTRL+ALT+DEL Secure Attention Sequence(SAS)热键，并且在WinSta0 Windows 系统中创建三个桌面。


* Winlogon 桌面
* 应用程序桌面
* 屏幕保护桌面

当用户按下Ctrl-Alt-Delete组合键时，Winlogon桌面上的SAS窗口收到它注册的系统热键消息(WM_HOTKEY)

SAS Window窗口处理这个消息调用Graphical Identification and Authentication(GINA)动态连接库中的相关函数

要中断Ctrl-Alt-Delete组合键的处理,可以有以下方式

* 从键盘驱动层捕获Ctrl-Alt-Delete （https://web.archive.org/web/20060228191152/http://dev.csdn.net/Develop/article/12/12173.shtm）
* 替换Winlogon
* 替换GINA （https://web.archive.org/web/20041023033211/http://www.csdn.com.cn/program/296.htm）
* Hook Winlogon 上SAS窗口的窗口过程(需要当前登录用户有调试权限)
* Hook  GINA里边的函数WlxLoggedOnSAS，然后返回WLX_SAS_ACTION_NONE（未研究）

更多信息

鉴于系统的更新可能造成我们替换的系统文件和其他系统文件不兼容（著名的DLL地狱），所以不推荐替换Winlogon.exe和GINA的方法。这里我们讨论Hook Winlogon 上的SAS窗口的窗口过程的方法。

因为SAS窗口和我们的程序内存地址空间不同，所以要写一个动态连接库，加载到SAS窗口的内存空间中。下面是动态连接库的源代码。

.. code-block:: C++

    //---------------------------------------------------------------------------
    //作者 ：韦覃武
    //网上呢称：BCB_FANS(四大名捕之追杀令)（此为CSDN和www.driverdevelop.com之帐号）
    //E-Mail ：slwqw@163.com
    //日期 ：2002-10-20
    //
    //功能 ：在2000下屏蔽Ctrl + Alt + Del组合键。（在Windows 2000 Professional SP3
    // 中文版平台下面测试通过）
    //原理 ：采用远程线程注入技术，装载一个DLL到Winlogon进程，然后截获SAS窗口的窗
    // 口过程，接管WM_HOTKEY消息，以达到屏蔽Ctrl + Alt + Del之目的。
    //开发语言：Borland C++Builder 5.0 Patch2
    //技术比较：关于在2000下面如何屏蔽Ctrl + Alt + Del组合键，一种常被提到的解决方法就
    // 是使用自己写的GINA去替换MSGINA.DLL，然后在WlxLoggedOnSAS里边直接返回
    // WLX_SAS_ACTION_NONE。嘿嘿，说到底这并不是真正地屏蔽了这个组合键，只是
    // 直接返回WLX_SAS_ACTION_NONE时，Winlogon进程又自动从"Winlogon"桌面切换
    // 回原来的"Default"桌面了，而不是显示安全对话框，所以看起来被屏蔽了：），
    // 使用那种方法明显地看到桌面在闪烁！但是使用本文的方法时，你不会看到任
    // 何闪烁！
    //鸣谢 ：www.driverdevelop.com上的icube和lu0。
    //版权 ：转载请注明原作者：）

    //---------------------------------------------------------------------------

    #include "stdafx.h"

    #include <string>

    using namespace std;

    //---------------------------------------------------------------------------

    HWND hSASWnd;
    FARPROC FOldProc;

    LRESULT CALLBACK SASWindowProc(HWND hwnd,UINT uMsg,WPARAM wParam,LPARAM lParam);

    BOOL CALLBACK EnumWindowsProc(HWND hwnd,LPARAM lParam);

    //---------------------------------------------------------------------------

    HANDLE hThread = NULL;
    DWORD dwThreadId;

    DWORD WINAPI ThreadFunc();

    //---------------------------------------------------------------------------
    BOOL APIENTRY DllMain( HANDLE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
    {
        switch(ul_reason_for_call)
        {
            case DLL_PROCESS_ATTACH :

                hThread = CreateThread(NULL,0,(LPTHREAD_START_ROUTINE)ThreadFunc,NULL,0,&dwThreadId);
                break;
            case DLL_PROCESS_DETACH :
                if(FOldProc != NULL)
                {
                    SetWindowLong(hSASWnd,GWL_WNDPROC,long(FOldProc));
                }
                CloseHandle(hThread);
                break;
        }
        return TRUE;
    }
    //---------------------------------------------------------------------------
    DWORD WINAPI ThreadFunc()
    {
        HDESK hDesk;

        hDesk = OpenDesktop("Winlogon",0,false,MAXIMUM_ALLOWED);

        FOldProc = NULL;
        hSASWnd = NULL;

        EnumDesktopWindows(hDesk,(WNDENUMPROC)EnumWindowsProc,0);

        if(hSASWnd != NULL)
        {
            FOldProc = (FARPROC)SetWindowLong(hSASWnd,GWL_WNDPROC,long(SASWindowProc));
        }
        CloseHandle(hDesk);

        return 1;
    }
    //---------------------------------------------------------------------------
    //查找"Winlogon"桌面的窗口
    BOOL CALLBACK EnumWindowsProc(HWND hwnd,LPARAM lParam)
    {
        char ClassBuf[128];

        GetWindowText(hwnd,ClassBuf,sizeof(ClassBuf));

        //我自己写了一个系统服务，然后在里边查询"Winlogon"桌面上的窗口，发现桌面上存在
        //窗口"SAS window"。
        string ClassName(ClassBuf);
        if(ClassName.find("SAS window") != -1)
        {
            hSASWnd = hwnd;
            return false;
        }
        return true;
    }
    //---------------------------------------------------------------------------
    //SAS窗口的窗口过程
    LRESULT CALLBACK SASWindowProc(HWND hwnd,UINT uMsg,WPARAM wParam,LPARAM lParam)
    {
        //屏蔽Ctrl + Alt + Del
        if(uMsg == WM_HOTKEY)
        {
            WORD wKey = HIWORD(lParam);
            WORD wModifier = LOWORD(lParam);
            bool IsCtrlDown = ((wModifier & VK_CONTROL) != 0);
            bool IsAltDown = ((wModifier & VK_MENU) != 0);
            bool IsShiftDown = ((wModifier & VK_SHIFT) != 0);

            //按下Ctrl + Alt + Del组合键
            if(IsCtrlDown && IsAltDown && wKey == VK_DELETE)
            {
            return 1;
            }
            //按下Ctrl + Shift + Esc组合键，这个组合键将显示任务管理器，可根据需要是否屏蔽。
            else if(IsCtrlDown && IsShiftDown && wKey == VK_ESCAPE)
            {
                // Do nothing
            }
        }
        return CallWindowProc((WNDPROC)FOldProc,hwnd,uMsg,wParam,lParam);
    }    


这样，如果Winlogon加载了这个动态连接库，那么就替换了SAS窗口的窗口过程。如果Winlogon卸载了这个动态连接库，则恢复了SAS窗口的窗口过程。

为了让Winlogon加载我们的动态连接库，首先要找到Winlogon进程，然后在进程中分配空间存放我们的代码，再通过创建远程线程赖执行我们的代码。下面是Hook部分的代码

.. code-block:: C++

    //---------------------------------------------------------------------------
    //作者 ：韦覃武,jiangsheng
    //网上呢称：BCB_FANS(四大名捕之追杀令)（此为CSDN和www.driverdevelop.com之帐号）jiangsheng（此为CSDN帐号）
    //E-Mail ：slwqw@163.com
    //日期 ：2002-10-20
    //2002-11-5 jingsheng修改
    //功能 ：在2000下屏蔽Ctrl + Alt + Del组合键。（在Windows 2000 Professional SP3
    // 中文版平台下面测试通过）
    //原理 ：采用远程线程注入技术，装载一个DLL到Winlogon进程，然后截获SAS窗口的窗
    // 口过程，接管WM_HOTKEY消息，以达到屏蔽Ctrl + Alt + Del之目的。
    //开发语言：Borland C++Builder 5.0 Patch2，Visual C++ 6.0 SP5
    //技术比较：关于在2000下面如何屏蔽Ctrl + Alt + Del组合键，一种常被提到的解决方法就
    // 是使用自己写的GINA去替换MSGINA.DLL，然后在WlxLoggedOnSAS里边直接返回
    // WLX_SAS_ACTION_NONE。嘿嘿，说到底这并不是真正地屏蔽了这个组合键，只是
    // 直接返回WLX_SAS_ACTION_NONE时，Winlogon进程又自动从"Winlogon"桌面切换
    // 回原来的"Default"桌面了，而不是显示安全对话框，所以看起来被屏蔽了：），
    // 使用那种方法明显地看到桌面在闪烁！但是使用本文的方法时，你不会看到任
    // 何闪烁！
    //鸣谢 ：www.driverdevelop.com上的icube和lu0。
    //版权 ：转载请注明原作者：）

    //---------------------------------------------------------------------------

    #include "stdafx.h"
    #include <tlhelp32.h>
    #include <lmerr.h>

    #include "Hook.h"
    //add by jiangsheng 2002-11-5
    #include "TaskKeyMgr.h"
    #include "Wrappers.h"//复制自MSDN杂志Windows XP Escape from DLL Hell with Custom Debugging and Instrumentation Tools and Utilities的代码
    extern BOOL Is_Terminal_Services () ;//复制自Platform SDK文档: Windows System Information /Verifying the System Version
    //end add by jiangsheng 2002-11-5
    //---------------------------------------------------------------------------
    //错误代码格式化函数
    //replaced by jiangsheng 2002-11-5
    //from Q149409 HOWTO: Get Message Text from Networking Error Codes

    CString __fastcall SysErrorMessage(DWORD dwLastError )
    {
        CString strRet(_T("Unknown error"));
        HMODULE hModule = NULL; // default to system source
        LPSTR MessageBuffer;
        DWORD dwBufferLength;

        DWORD dwFormatFlags = FORMAT_MESSAGE_ALLOCATE_BUFFER |
            FORMAT_MESSAGE_IGNORE_INSERTS |
            FORMAT_MESSAGE_FROM_SYSTEM ;

        //
        // If dwLastError is in the network range,
        // load the message source.
        //

        if(dwLastError >= NERR_BASE && dwLastError <= MAX_NERR) {
            hModule = LoadLibraryEx(TEXT("netmsg.dll"),NULL,LOAD_LIBRARY_AS_DATAFILE);
            if(hModule != NULL)
                dwFormatFlags |= FORMAT_MESSAGE_FROM_HMODULE;
        }

        //
        // Call FormatMessage() to allow for message
        // text to be acquired from the system
        // or from the supplied module handle.
        //

        if(dwBufferLength = FormatMessageA(
            dwFormatFlags,
            hModule, // module to get message from (NULL == system)
            dwLastError,
            MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT), // default language
            (LPSTR) &MessageBuffer,
            0,
            NULL
            ))
        {

            //
            // Output message string on stderr.
            //
            strRet=CString(MessageBuffer,dwBufferLength);
            //
            // Free the buffer allocated by the system.
            //
            LocalFree(MessageBuffer);
        }

        //
        // If we loaded a message source, unload it.
        //
        if(hModule != NULL)
            FreeLibrary(hModule);
        return strRet;
    }
    //end replaced by jiangsheng 2002-11-5
    //---------------------------------------------------------------------------

    #ifdef UNICODE
    LPCSTR LoadLibraryFuncStr = "LoadLibraryW";
    LPCSTR GetModuleHandleFuncStr = "GetModuleHandleW";
    #else
    LPCSTR LoadLibraryFuncStr = "LoadLibraryA";
    LPCSTR GetModuleHandleFuncStr = "GetModuleHandleA";
    #endif
    LPCSTR FreeLibraryFuncStr = "FreeLibrary";
    LPCSTR GetProcAddressFuncStr = "GetProcAddress";
    LPCSTR GetLastErrorFuncStr = "GetLastError";

    //---------------------------------------------------------------------------
    //removed by jiangsheng 2002-11-5
    //const char* const RemoteDllName = "RemoteDll.Dll";
    //end removed by jiangsheng 2002-11-5
    LPCTSTR szRemoteProcessName = "Winlogon.exe";

    typedef HINSTANCE (WINAPI *PLOADLIBRARY)(LPCTSTR );
    typedef BOOL (WINAPI *PFREELIBRARY)(HINSTANCE);
    typedef HMODULE (WINAPI* PGETMODULEHANDLE)(LPCTSTR );
    typedef PVOID (WINAPI* PGETPROCADDRESS)(HINSTANCE,LPCSTR);
    typedef DWORD (WINAPI* PGETLASTERROR)(VOID);

    BOOL __fastcall EnablePrivilege(LPCTSTR lpszPrivilegeName,BOOL bEnable);
    DWORD __fastcall GetPIDFromName(LPCTSTR lpszProcName);

    //---------------------------------------------------------------------------

    typedef struct
    {
        PLOADLIBRARY pfnLoadLibrary;
        PGETLASTERROR pfnGetLastError;
        TCHAR szDllName[1024];
        DWORD dwReturnValue;
    } INJECTLIBINFO;

    typedef struct
    {
        PFREELIBRARY pfnFreeLibrary;
        PGETMODULEHANDLE pfnGetModuleHandle;
        PGETLASTERROR pfnGetLastError;
        DWORD dwReturnValue;
        TCHAR szDllName[1024];

    } DEINJECTLIBINFO;

    //---------------------------------------------------------------------------
    //远程线程，用来装载DLL
    static DWORD WINAPI ThreadFuncAttach(INJECTLIBINFO *pInfo)
    {
    HINSTANCE hDll=NULL;
    pInfo->dwReturnValue = 0;
    hDll = (HINSTANCE)pInfo->pfnLoadLibrary(pInfo->szDllName);
    if(hDll == NULL)
    pInfo->dwReturnValue = pInfo->pfnGetLastError();
    return((DWORD)hDll);
    }

    //---------------------------------------------------------------------------
    //占位函数，用来计算ThreadFuncAttach的大小
    static void AfterThreadFuncAttach(void)
    {
    }

    //---------------------------------------------------------------------------
    //远程线程，用来卸载DLL
    static DWORD WINAPI ThreadFuncDetach(DEINJECTLIBINFO *pInfo)
    {
        HINSTANCE hDll = NULL;
        BOOL bResult=FALSE;
        BOOL bHasFoundModule = FALSE;

        pInfo->dwReturnValue = 0;//意味成功，如果这个值不是0，则是一个错误代码。

        while((hDll = pInfo->pfnGetModuleHandle(pInfo->szDllName)) != NULL)
        {
            bHasFoundModule = TRUE;

            bResult = pInfo->pfnFreeLibrary(hDll);
            if(bResult == FALSE)
            {
                pInfo->dwReturnValue = pInfo->pfnGetLastError();
                break;
            }
        }

        if(pInfo->dwReturnValue == 0 && !bHasFoundModule)
        {
            pInfo->dwReturnValue = pInfo->pfnGetLastError();
        }

        return 1;
    }

    //---------------------------------------------------------------------------
    //占位函数，用来计算ThreadFuncDetach的大小
    static void AfterThreadFuncDetach(void)
    {
    }

    //---------------------------------------------------------------------------
    //修改本进程的权限
    BOOL __fastcall EnablePrivilege(LPCTSTR lpszPrivilegeName,BOOL bEnable)
    {
        HANDLE hToken;
        TOKEN_PRIVILEGES tp;
        LUID luid;

        if(!OpenProcessToken(GetCurrentProcess(),TOKEN_ADJUST_PRIVILEGES |
            TOKEN_QUERY | TOKEN_READ,&hToken))
            return FALSE;
        if(!LookupPrivilegeValue(NULL, lpszPrivilegeName, &luid))
            return TRUE;

        tp.PrivilegeCount = 1;
        tp.Privileges[0].Luid = luid;
        tp.Privileges[0].Attributes = (bEnable) ? SE_PRIVILEGE_ENABLED : 0;

        AdjustTokenPrivileges(hToken,FALSE,&tp,NULL,NULL,NULL);

        CloseHandle(hToken);

        return (GetLastError() == ERROR_SUCCESS);
    }
    //---------------------------------------------------------------------------
    //通过进程名称得到进程的ID（这里使用方法Toolhelp函数，也可使用PSAPI）
    DWORD __fastcall GetPIDFromName(LPCTSTR lpszProcName)
    {
        HANDLE hSnapshot;
        PROCESSENTRY32 ProcStruct;
        DWORD dwProcessID = -1;
        //added by jiangsheng 2002-11-8
        BOOL bIsTerminalServices=Is_Terminal_Services();
        if(bIsTerminalServices){

            //复制自MSDN杂志Windows XP Escape from DLL Hell with Custom Debugging and Instrumentation Tools and Utilities的代码
            //get current session ID
            CWTSWrapper WTS;
            if (WTS.IsValid())
            {
                DWORD dwCurSessionID = -1;
                LPTSTR pSessionInfo=NULL;
                DWORD dwBytes;
                if(WTS.WTSQuerySessionInformation(WTS_CURRENT_SERVER_HANDLE,WTS_CURRENT_SESSION,
                    WTSSessionId, (LPTSTR*)&pSessionInfo, &dwBytes)){
                        dwCurSessionID =*((DWORD*)pSessionInfo);
                        // enumerate processes
                        PWTS_PROCESS_INFO pProcessInfo = NULL;
                        DWORD ProcessCount = 0;
                        BOOL bFound;
                        if (WTS.WTSEnumerateProcesses(WTS_CURRENT_SERVER_HANDLE, 0, 1,
                            &pProcessInfo, &ProcessCount)){
                        for (DWORD CurrentProcess = 0; CurrentProcess < ProcessCount; CurrentProcess++){
                            CString strCurExePath(pProcessInfo[CurrentProcess].pProcessName);
                            CString strRemoteProc(lpszProcName);
                            strCurExePath.MakeLower();
                            strRemoteProc.MakeLower();
                            bFound = (strCurExePath.Find(strRemoteProc) != -1);
                            if(bFound && dwCurSessionID==pProcessInfo[CurrentProcess].SessionId) {
                                dwProcessID = pProcessInfo[CurrentProcess].ProcessId;
                                break;
                            }
                        }
                    }
                    WTS.WTSFreeMemory(pSessionInfo);
                }
            }
        }
        else{
            //end added by jiangsheng 2002-11-8
            BOOL bResult;
            hSnapshot = CreateToolhelp32Snapshot((DWORD)TH32CS_SNAPPROCESS,0);
            ProcStruct.dwSize = sizeof(PROCESSENTRY32);
            bResult = Process32First(hSnapshot,&ProcStruct);
            while(bResult)
            {
                BOOL bFound;
                CString strCurExePath(ProcStruct.szExeFile);
                CString strRemoteProc(lpszProcName);
                strCurExePath.MakeLower();
                strRemoteProc.MakeLower();
                bFound = (strCurExePath.Find(strRemoteProc) != -1);
                if(bFound)
                {
                    dwProcessID = ProcStruct.th32ProcessID;
                    break;
                }
                bResult = Process32Next(hSnapshot,&ProcStruct);
            }
            CloseHandle(hSnapshot);
        }
        return dwProcessID;
    }
    //---------------------------------------------------------------------------
    // 插入代码
    //---------------------------------------------------------------------------
    //InjectFunc
    void __fastcall InjectFunc()
    {
        HANDLE hRemoteProcess=NULL;
        DWORD dwRemoteProcess=NULL;

        DWORD dwThreadSize=0;
        INJECTLIBINFO InjectLibInfo;
        PVOID pRemoteThread=NULL;
        PVOID pRemoteParam=NULL;
        DWORD dwWriten=0;
        DWORD dwRet=0;

        //提升本进程权限然后打开目的进程
        //当前用户必须具有调试权限
        EnablePrivilege(SE_DEBUG_NAME,true);
        dwRemoteProcess = GetPIDFromName(szRemoteProcessName);
        if(dwRemoteProcess == (DWORD)-1)
        {
            MessageBox(NULL,_T("Failed to Query Process ID."),NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }
        hRemoteProcess = OpenProcess(PROCESS_ALL_ACCESS,false,dwRemoteProcess);
        if(hRemoteProcess == NULL)
        {
            MessageBox(NULL,_T("Failed to Open Process. Err = ") + SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }
        //初始化参数
        ZeroMemory(&InjectLibInfo,sizeof(INJECTLIBINFO ));
        InjectLibInfo.pfnLoadLibrary = (PLOADLIBRARY)GetProcAddress(GetModuleHandle("Kernel32.dll"),LoadLibraryFuncStr);
        InjectLibInfo.pfnGetLastError = (PGETLASTERROR)GetProcAddress(GetModuleHandle("Kernel32.dll"),GetLastErrorFuncStr);
        lstrcpyn(InjectLibInfo.szDllName,CTaskKeyMgr::strRemoteDllName,CTaskKeyMgr::strRemoteDllName.GetLength()+1);
        //在远程线程分配内存来存放参数
        pRemoteParam = VirtualAllocEx(hRemoteProcess,NULL,sizeof(INJECTLIBINFO),MEM_COMMIT,PAGE_READWRITE);
        if(pRemoteParam == NULL)
        {
            MessageBox(NULL,_T("Failed to Allocate Memory at Remote Process for Param.Err = ") +                 SysErrorMessage(GetLastError()),
                NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }
        dwRet = WriteProcessMemory(hRemoteProcess,pRemoteParam,(LPVOID)&InjectLibInfo,sizeof(INJECTLIBINFO),&dwWriten);
        if(dwRet == 0)
        {
            MessageBox(NULL,_T("Failed to Write Param to Remote Process.Err = ") + SysErrorMessage(GetLastError()),
                NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }

        //拷贝线程体
        dwThreadSize = (int)AfterThreadFuncAttach - (int)ThreadFuncAttach + 1024 + sizeof(INJECTLIBINFO);

        pRemoteThread = VirtualAllocEx(hRemoteProcess,NULL,dwThreadSize,MEM_COMMIT,PAGE_READWRITE);
        if(pRemoteThread == NULL)
        {
            MessageBox(NULL,_T("Failed to Allocate Memory at Remote Process for Thread Code.Err = ") + SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }
        dwRet = WriteProcessMemory(hRemoteProcess,pRemoteThread,(LPVOID)ThreadFuncAttach,dwThreadSize,&dwWriten);
        if(dwRet == 0)
        {
            MessageBox(NULL,_T("Failed to Write Thread Code to Remote Process.Err = ") + SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }
        //启动远程线程
        HANDLE hRemoteThread;

        hRemoteThread = CreateRemoteThread(hRemoteProcess,0,0,(DWORD(__stdcall *)(VOID*))pRemoteThread,(INJECTLIBINFO*)pRemoteParam,0,&dwWriten);
        ::WaitForSingleObject(hRemoteThread,INFINITE);
       
        if(hRemoteThread == NULL)
        {
            MessageBox(NULL,_T("Failed to create unload thread.Err=") + SysErrorMessage(GetLastError()),NULL,MB_OK |MB_APPLMODAL | MB_ICONWARNING);
        }
        else
        {
            ;
        }

        //读卸载返回值
        dwRet =ReadProcessMemory(hRemoteProcess,pRemoteParam,(LPVOID)&InjectLibInfo,sizeof(INJECTLIBINFO),&dwWriten);
        if(dwRet == 0)
        {
            MessageBox(NULL,_T("Unable to read load return value.Err=") + SysErrorMessage(GetLastError()),
                NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
        }
        else
        {
            if(InjectLibInfo.dwReturnValue == 0)
            {
                ;
            }
            else
            {
                MessageBox(NULL,_T("Failed to load library to Winlogon.Err=") +SysErrorMessage(InjectLibInfo.dwReturnValue),NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            }
        }

        //恢复权限
        EnablePrivilege(SE_DEBUG_NAME,false);
        CloseHandle(hRemoteProcess);
    }
    //---------------------------------------------------------------------------
    // 卸载线程
    //---------------------------------------------------------------------------
    //DeinjectFunc
    void __fastcall DeinjectFunc()
    {
        HANDLE hRemoteProcess=NULL;
        DWORD dwRemoteProcess=0;

        DWORD dwThreadSize=0;
        DEINJECTLIBINFO DeinjectLibInfo;

        PVOID pRemoteThread=NULL;
        PVOID pRemoteParam=NULL;
        DWORD dwWriten=0;
        DWORD Ret=0;

        //提升本进程权限然后打开目的进程
        EnablePrivilege(SE_DEBUG_NAME,true);

        dwRemoteProcess = GetPIDFromName(szRemoteProcessName);
        if(dwRemoteProcess == (DWORD)-1)
        {
            MessageBox(NULL,_T("Failed to Query Process ID."),NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
        return;
        }
        hRemoteProcess = OpenProcess(PROCESS_ALL_ACCESS,false,dwRemoteProcess);
        if(hRemoteProcess == NULL)
        {
            MessageBox(NULL,_T("Failed to Open Process. Err = ") + SysErrorMessage(GetLastError()),
                NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }

        //初始化参数
        ZeroMemory(&DeinjectLibInfo,sizeof(DEINJECTLIBINFO ));
        DeinjectLibInfo.pfnFreeLibrary = (PFREELIBRARY)GetProcAddress(GetModuleHandle("Kernel32.dll"),FreeLibraryFuncStr);
        DeinjectLibInfo.pfnGetModuleHandle = (PGETMODULEHANDLE)GetProcAddress(GetModuleHandle("Kernel32.dll"),GetModuleHandleFuncStr);
        DeinjectLibInfo.pfnGetLastError = (PGETLASTERROR)GetProcAddress(GetModuleHandle("Kernel32.dll"),GetLastErrorFuncStr);

        lstrcpyn(DeinjectLibInfo.szDllName,CTaskKeyMgr::strRemoteDllName,CTaskKeyMgr::strRemoteDllName.GetLength()+1);

        //在远程线程分配内存来存放参数
        pRemoteParam = VirtualAllocEx(hRemoteProcess,NULL,sizeof(DEINJECTLIBINFO),MEM_COMMIT,PAGE_READWRITE);
        if(pRemoteParam == NULL)
        {
            MessageBox(NULL,_T("Failed to Allocate Memory at Remote Process.Err = ") + SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
        }
        Ret = WriteProcessMemory(hRemoteProcess,pRemoteParam,(LPVOID)&DeinjectLibInfo,sizeof(DEINJECTLIBINFO),&dwWriten);
        if(Ret == 0)
        {
            MessageBox(NULL,_T("Failed to Write Param to Remote Process.Err = ") + SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }

        //拷贝线程体
        dwThreadSize = (int)AfterThreadFuncDetach - (int)ThreadFuncDetach + 1024 + sizeof(DEINJECTLIBINFO);
        pRemoteThread = VirtualAllocEx(hRemoteProcess,NULL,dwThreadSize,MEM_COMMIT,PAGE_READWRITE);
        if(pRemoteThread == NULL)
        {
            MessageBox(NULL,_T("Failed to Allocate Memory at Remote Process for Thread Code.Err = ") +     SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }
        Ret = WriteProcessMemory(hRemoteProcess,pRemoteThread,(LPVOID)ThreadFuncDetach,dwThreadSize,&dwWriten);
        if(Ret == 0)
        {
            MessageBox(NULL,_T("Failed to Write Thread Code to Remote Process.Err = ") + SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            return;
        }

        //启动远程线程
        HANDLE hRemoteThread;

        hRemoteThread = CreateRemoteThread(hRemoteProcess ,0,0,(DWORD(__stdcall *)(VOID*))pRemoteThread,(DEINJECTLIBINFO*)pRemoteParam,0,&dwWriten);
        if(hRemoteThread == NULL)
        {
            MessageBox(NULL,_T("Failed to create remote unload thread.Err=") + SysErrorMessage(GetLastError()),NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
        }
        else
        {
            CloseHandle(hRemoteThread);
        }

        //读卸载返回值
        Ret = ReadProcessMemory(hRemoteProcess,pRemoteParam,(LPVOID)&DeinjectLibInfo,sizeof(DEINJECTLIBINFO),&dwWriten);
        if(Ret == 0)
        {
            MessageBox(NULL,_T("Unable to read unload return value.Err=") + SysErrorMessage(GetLastError()),
            NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
        }
        else
        {
            if(DeinjectLibInfo.dwReturnValue == 0)
            {
           
            }
            else
            {
                MessageBox(NULL,_T("Failed to unload .Err=")+ SysErrorMessage(DeinjectLibInfo.dwReturnValue),NULL,MB_OK | MB_APPLMODAL | MB_ICONWARNING);
            }
        }

        //恢复权限
        CloseHandle(hRemoteProcess);
        EnablePrivilege(SE_DEBUG_NAME,false);
    }
     //---------------------------------------------------------------------------
     //使用方法　

    BOOL CTaskKeyMgr::IsCtrlAltDeleteDisabled(){return bInjectFuncLoaded;}　

    if (dwFlags & CTRLALTDEL) {
        if(bDisable&&!IsCtrlAltDeleteDisabled()){
            InjectFunc();
            bInjectFuncLoaded=TRUE;
        }
        if(!bDisable&&IsCtrlAltDeleteDisabled()){
            DeinjectFunc();
            bInjectFuncLoaded=FALSE;
        }
    }
 

注意

如果Windows的后续版本更改了Ctrl+Alt+Delete的处理，本文所提供的技术可能不再工作 (更新：Windows Vista重写了登录机制，本文失效）。如果你在你的代码中使用了本文的技术，请注意你可能必须在未来修改你的代码。

已知问题

* 尚无Unicode版本
* VirtualAllocEx分配的内存没有用VirtualFreeEx释放
* 如果编译时加入开关的话，在Debug方式下运行会造成Winlogon出错（出错后请不要确认或取消那个出错对话框，然后保存打开的所有文档，关闭所有程序，通过正常的途径关机，否则Windows会立刻关机）

参考

如果需要更多信息，参考CSDN论坛中的讨论

在NT/2000中怎么禁用Ctrl+Alt+Delete?（不能用gina,键盘驱动）。 　

单击这里下载本文的代码。

MSDN文档库中的文章

Q226359 HOWTO: Disable Task Switching on Win32 Platforms
Q195027 STOP 0xC000021A in Winlogon Caused by PCAnywhere
Q229033 Programs That Replace Msgina.dll May Cause "STOP 0x0000001E" Error Message
Q192298 Third Party GINAs May Fail with Service Pack 4 Causing STOP 0x21A in WINLOGON
Q164486 Winlogon May Fail if the Third-Party Gina.dll File is Missing or Corrupted
Q180854 Access Violation in Winlogon with Third-Party Gina.dll
Q193361 MSGINA.DLL does not Reset WINLOGON Structure

MSDN杂志中的文章

MSDN Magazine > September 2002 > Typename, Disabling Keys in Windows XP with TrapKeys(Paul DiLascia) (https://web.archive.org/web/20021018111337/msdn.microsoft.com/msdnmag/issues/02/09/CQA/default.aspx)
MSDN Magazine > June 2002 > Windows XP Escape from DLL Hell with Custom Debugging and Instrumentation Tools and Utilities (https://web.archive.org/web/20021105062822/http://msdn.microsoft.com/msdnmag/issues/02/06/debug/default.aspx)

VC知识库中的文章

Windows XP系统中如何屏蔽 Ctrl+Alt+Del、Alt+Tab以及Ctrl+Esc键序列 (https://web.archive.org/web/20021105132149/http://www.vckbase.com/document/viewdoc.asp?id=424)

