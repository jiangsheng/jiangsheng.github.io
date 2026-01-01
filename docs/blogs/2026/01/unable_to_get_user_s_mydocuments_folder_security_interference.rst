.. meta::
   :description: this blog post describes a security problem I encountered while trying to retrieve the running user's MyDocuments folder.
    :keywords: Windows Security

Unable to get running user's MyDocuments folder due to security interference 
============================================================================================================================================================

.. post:: 1 Jan, 2026
   :tags: shdocvw,Windows,CPP,Security  
   :category: Microsoft
   :author: me
   :nocomments:

I was trying to retrieve the running user's MyDocuments folder in a WinForms application via

.. code-block:: csharp

    string path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

To my surprise, it returned an empty string. 

As this program is running under of a desktop user (in fact started by Visual Studio's debugger), this is not something related to the user's profile being uninitialized, like in a Windows Service where the registry hive of the current user is not mounted by default. The user profile should be loaded when the user log into Windows.

I then tried to switch to C++ and get the error code, as the .Net equivalent does not have one telling what went wrong.

.. code-block:: C++

    // TODO: Add extra initialization here
    TCHAR buffer[_MAX_PATH];
    HRESULT hr = SHGetSpecialFolderPath(m_hWnd, buffer, CSIDL_MYDOCUMENTS, FALSE);
    CString message;
    if (SUCCEEDED(hr))
    {		
    	message.Format(_T("My document folder is at %s"), buffer);        
    }
    else
    {
    	message.Format(_T("SHGetSpecialFolderPath failed to get My document folder, error %X"), hr);
    }
    AfxMessageBox(message);

The code succeeded and returned the MyDocuments folder.

So Environment.GetFolderPath is not calling SHGetSpecialFolderPath, I get it, as it is a deprecated function and now supposedly merely a wrapper for SHGetKnownFolderPath. Or is it?

.. code-block:: C++
    
    PWSTR path = NULL;
    HRESULT hr = SHGetKnownFolderPath(FOLDERID_Documents, KF_FLAG_DEFAULT, NULL, &path);
    CString message;
    if (SUCCEEDED(hr))
    {
    	message.Format(_T("My document folder is at %s"), path);
        CoTaskMemFree(path);
    }
    else
    {
    	message.Format(_T("SHGetSpecialFolderPath failed to get My document folder, error %X"), hr);
    }
    AfxMessageBox(message);

This code returns -2147024891, or 0x80070005. 80=Error, 07=From Windows, and 0005=E_ACCESSDENIED. So I guess I reproduced the error in C++ and Environment.GetFolderPath is using the modern API.

This time, Windows 11's notification area sends me a message, that a program is blocked from Controlled Folder Access (CFA). I am not using Environment.SpecialFolderOption.Create or KF_FLAG_CREATE, no changes to the file system should be happening to trigger this message. But after I reviewed the CFA blocking logs, my test programs are indeed there. Adding my program to the exception list solved the issue. 

I am not so sure why merely reading the location of the MyDocuments folder should trigger this anti-ransomware feature. I assumed it was readying it off the registry, apparently not.

In summary, you need to add error handling when reading the location of protected known folders on a modern version of Windows when Controlled Folder Access is enabled and prompt the user to whitelist your program. Or switch to the application data folder instead, which is not an option for me, as the program is two decades old.
