How to restart Windows Explorer programmatically using Restart manager
=======================================================================

.. post:: 22 Jan, 2013
   :tags: CPP, Taskbar, Windows Explorer, Windows Registry, Windows Vista
   :category: Visual C++
   :author: me
   :nocomments:

You can download source code of this post at https://github.com/jiangsheng/Samples/tree/master/AppBarTest

For shell extension programmers, restart Windows Explorer is one of steps in their setup programs. A programmer may also want to force some shell setting changes that would only be read by Explorer on start up. For example, this posts is inspired by a `programmer who want to toggle task bar layout automatically depending on the screen resolution <https://stackoverflow.com/questions/12435503/change-windows-7-taskbar-location-automatically-based-on-screen-shape-or-on-dock/14369385#14369385>`_, and is used to demonstrate the new Windows Vista restart manager API like RmStartSession, RmRegisterResources, RmGetList, RmShutdown, RmRestart and RmEndSession.

Traditionally restarting explorer `is a hackish process <https://stackoverflow.com/questions/5689904/gracefully-exit-explorer-programmatically>`_. Most of people kill the process by brutal force like taskkill or TerminateProcess, however this approach produces `a pretty mess <https://devblogs.microsoft.com/oldnewthing/20070503-00/?p=27003>`_, and if HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\AutoRestartShell is on, Windows would restart explorer. This is not want the user want – not only because changes in the previous explorer session are only saved during a clean shutdown, but the restarting also needs to be delayed to allow some time to change the task bar layout. A grace way to terminate would be to send WM_QUIT, or use Vista’s new restart manager API.

Restart manager is introduced in Vista to minimize system restarts when installing patches. For example, you can now `upgrade IE without a restart <https://web.archive.org/web/20120526162951/http://blogs.msdn.com/b/ieinternals/archive/2011/02/17/internet-explorer-9-supports-no-reboot-installation-setup-using-windows-restart-manager.aspx>`_. Here it is merely used to restart a particular program, but it has more interesting usage, such as `restarting an application after crash <https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-registerapplicationrestart?redirectedfrom=MSDN>`_.

The first step of restarting explorer would be registering the main explorer process for restarting. RmRegisterResources can be used to restart a process in a session started by RmStartSession, however the machine could have extra explorer processes if the “launch folder in a separate process” setting is on, or if other users are logged in. Here the code loop through all explorer processes and try to find the oldest one for restarting purpose. This is assuming only one user is going to use the computer, an IsProcessInSession check is needed if multiple users would be logged on concurrently.

.. code-block:: C++

    //returns the process id and create time for the oldest explorer.exe 
    RM_UNIQUE_PROCESS GetExplorerApplication()
    {
        RM_UNIQUE_PROCESS  result={0};
        DWORD bytesReturned=0;
        DWORD processIdSize=4096;
        std::vector<DWORD> processIds;
        processIds.resize(1024);
        EnumProcesses(processIds.data(),processIdSize,&bytesReturned);
        while(bytesReturned==processIdSize)
        {
            processIdSize+=processIdSize;
            processIds.resize(processIdSize/4);
            EnumProcesses(processIds.data(),processIdSize,&bytesReturned);
        }    std::for_each(processIds.begin(), processIds.end(), [&result] (DWORD processId) {
            HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION|PROCESS_VM_READ,
                                    FALSE, processId);
            if (hProcess) {
                std::wstring imageName;
                imageName.resize(4096);
                if(GetProcessImageFileName (hProcess,(LPWSTR)imageName.data(),4096)>0)
                {
                    if(wcscmp(L"explorer.exe",PathFindFileName(imageName.data()))==0)
                    {
                        //this is assmuing the user is not running elevated
                        // and won't see explorer processes in other sessions
                        FILETIME ftCreate, ftExit, ftKernel, ftUser;
                        if (GetProcessTimes(hProcess, &ftCreate, &ftExit,&ftKernel, &ftUser))
                        {
                            if(result.dwProcessId==0)
                            {
                                result.dwProcessId=processId;
                                result.ProcessStartTime=ftCreate;
                            }
                            else if(CompareFileTime(&result.ProcessStartTime,&ftCreate)>0)
                            {
                                result.dwProcessId=processId;
                                result.ProcessStartTime=ftCreate;
                            }
                        }
                    }
                }
                CloseHandle(hProcess);
            }
        });
        return result;
    }


Next step would be telling the restart manager to request a shutdown via RmShutdown and restart via RmRestart after some registry tweak:

.. code-block:: C++

    //taskbar position calculating code omitted
    DWORD dwSession=0;
    WCHAR szSessionKey[CCH_RM_SESSION_KEY+1] = { 0 };
    DWORD dwError = RmStartSession(&dwSession, 0, szSessionKey);
    if (dwError == ERROR_SUCCESS) {
        RM_UNIQUE_PROCESS rgApplications[1]={GetExplorerApplication()};
        dwError=RmRegisterResources(
            dwSession,0,NULL,1,rgApplications,0,NULL);
        DWORD dwReason;
        UINT nProcInfoNeeded;
        UINT nProcInfo = 10;
        RM_PROCESS_INFO rgpi[10];
        dwError = RmGetList(dwSession, &nProcInfoNeeded,
                       &nProcInfo, rgpi, &dwReason);
        if(dwReason==RmRebootReasonNone)//now free to restart explorer
        {
            RmShutdown(dwSession,RmForceShutdown,NULL);
            //important, if we change the registry before shutting down
            // explorer will override our change
            //using undocumented setting structure, could break any time
            //edge setting is stored at 
            //HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\StuckRects2!Settings
            HKEY hKey={0};
            DWORD result=0;
            result=::RegOpenKeyEx(HKEY_CURRENT_USER,
                 _T("Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\StuckRects2"),
                    0, KEY_READ|KEY_WRITE, &hKey) ;
            if (result== ERROR_SUCCESS)
            {
                std::vector<BYTE> data;
                data.resize(256);
                TCHAR settingValue[]= _T("Settings");
                DWORD dwKeyDataType=0;
                DWORD dwDataBufSize=data.size();
                result=::RegQueryValueEx(hKey,settingValue, NULL, &dwKeyDataType,
                    (LPBYTE) data.data(), &dwDataBufSize);
                while(ERROR_MORE_DATA==result)
                {
                    data.resize(256+data.size());
                    dwDataBufSize=data.size();
                    result=::RegQueryValueEx(hKey,settingValue, NULL, &dwKeyDataType, 
                        (LPBYTE) data.data(), &dwDataBufSize);
                }
                data.resize(dwDataBufSize);
                if(result==ERROR_SUCCESS)
                {
                    switch ( dwKeyDataType )
                    {
                        case REG_BINARY:
                            if(data.size()==40)
                            {
                                BYTE taskbarPosition=data[12];
                                taskbarPosition=edge;
                                data[12]=taskbarPosition;
                                RECT* taskbarRect=(RECT*)&data[24];
                                CopyRect (taskbarRect,&abd.rc);
                                result=::RegSetValueEx(hKey,
                                settingValue,0,REG_BINARY,(LPBYTE) data.data(), dwDataBufSize);
                            }
                            break;
                    }
                }
                ::RegCloseKey( hKey );
            }
            RmRestart (dwSession,0,NULL);
        }
    }
    RmEndSession(dwSession);


Finally the RmEndSession function is called to free up resources. For other lockable resource like files the steps to restart affected processes are similar. This API can also be used to `write restart manager custom actions <https://learn.microsoft.com/en-us/windows/win32/rstmgr/using-restart-manager?redirectedfrom=MSDN>`_ if the installer authoring software does not support the restart manager.