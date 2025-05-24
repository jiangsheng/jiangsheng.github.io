.. meta::
   :description: [url=http://community.csdn.net/expert/Topicview2.asp?id=2542812]怎样修改theApp.m_pszAppName[/url]


Ask Mr JS
=====================

.. post:: 16, Dec, 2003
   :tags: CSDN, MFC
   :category: Win32, Microsoft Foundation Classes
   :author: me
   :nocomments:
   
[url=http://community.csdn.net/expert/Topicview2.asp?id=2542812]怎样修改theApp.m_pszAppName[/url]

总结：可以参考微软知识库Q154744

[url=http://community.csdn.net/expert/Topicview2.asp?id=1988055]BBS灌水机[/url]

总结：太复杂了一点，而且依赖于网页结构。后来我写了个支持脚本的，参见

[url=http://community.csdn.net/expert/Topicview2.asp?id=2521954]获得设备安装和卸载的通知，控件访问所在网页的DHTML文档对象模型[/url]

总结：抄微软的代码，没什么特别的

[url=http://community.csdn.net/expert/Topicview2.asp?id=2568865]编译时报告线程函数类型错误[/url]

总结：非静态成员函数具有隐含this指针参数，会造成这个编译错误。解决方案是

.. code-block::C++

    m_pThreadWrite=AfxBeginThread(ThreadProc,(LPVOID)this);
    UINT CMyClass::ThreadProc(LPVOID lp)
    {
        CMicrophoneInput* pInput=(CMicrophoneInput*)lp;
        return pInput->Run();
    }
    UINT CMyClass::Run()
    {
        HRESULT hr;
        if(!InitInstance())
        {
            TRACE("InitInstance failed\r\n"); 
            return ExitInstance();
        }
        while(!IsKilling())
        {
            //do something
        }
        return ExitInstance();
    }
    BOOL CMyClass::InitInstance()
    {
        m_eventKill.ResetEvent();
        m_eventDead.ResetEvent();
        //do something 
        return TRUE;
    }
    UINT CMyClass::ExitInstance()
    {
        //do something
        m_eventDead.SetEvent(); 
        return 0;
    }
    BOOL CMyClass::IsDead()
    {
        return WaitForSingleObject(m_eventDead,0)==WAIT_OBJECT_0;
    }
    BOOL CMyClass::IsKilling()
    {
        return WaitForSingleObject(m_eventKill,0)==WAIT_OBJECT_0;
    }
    //在外部可以这样终止线程
    //check if dead 
    if(!IsDead()&&m_pThreadWrite!=NULL)
    {
        m_eventKill.SetEvent(); 
        WaitForSingleObject(m_eventDead,INFINITE); m_pThreadWrite=NULL;
    }
