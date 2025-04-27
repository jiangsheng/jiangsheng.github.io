.. _blog_2023_extend_a_webbrowser_control_using_icustomqueryinterface:

Extend a webbrowser control using ICustomQueryInterface
==================================================================
This article is written with the help of ChatGPT. I want to see how far ChatGPT can go solve this and if any correction needs to be made. ChatGPT went pretty far but still made some mistakes. 

--------------------------------
ChatGPT Generated Response
--------------------------------

To extend a WebBrowser control using ICustomQueryInterface, you can create a new class that implements the ICustomQueryInterface interface and then use the SetSite method of the WebBrowser control to set the new class as the site for the control. Here are the steps you can follow:

Create a new class that implements the ICustomQueryInterface interface. The ICustomQueryInterface interface provides a way to intercept queries for interfaces that are not normally exposed by an object. Here’s an example implementation:

.. code-block:: C++

    class MyCustomQueryInterface : public ICustomQueryInterface
    {
    public:
        // ICustomQueryInterface methods
        HRESULT STDMETHODCALLTYPE GetInterface(const IID& iid, void** ppv);
    };

In your WPF window or user control, create a new instance of the WebBrowser control and set its site to an instance of your new class that implements ICustomQueryInterface:

.. code-block:: C++

    MyCustomQueryInterface* pCustomQueryInterface = new MyCustomQueryInterface();
    IWebBrowser2* pWebBrowser2 = m_pWebBrowser->Document;
    pWebBrowser2->SetSite(pCustomQueryInterface);

Implement the GetInterface method of your ICustomQueryInterface class to intercept queries for interfaces that are not normally exposed by the WebBrowser control. For example, you can intercept queries for the IOleCommandTarget interface to customize the behavior of the control:

.. code-block:: C++

    HRESULT STDMETHODCALLTYPE MyCustomQueryInterface::GetInterface(const IID& iid, void** ppv)
    {
        if (iid == IID_IOleCommandTarget)
        {
            // return a pointer to your custom IOleCommandTarget implementation here
            return S_OK;
        }
        return E_NOINTERFACE;
    }

That’s it! You can now use your customized WebBrowser control in your WPF application with the behavior that you defined in your implementation of the ICustomQueryInterface interface. Note that the specific interfaces that you intercept and the behavior that you define will depend on your specific requirements.

-----------------------------------------------------
Accuracy of ChatGPT Generated Answer 
-----------------------------------------------------

ICustomQueryInterface is defined in the System.Runtime.InteropServices namespace and the language of choice should be C#, Chatgpt failed to recognize this. 

As for the approach, ChatGPT is surprisingly close. 

* The AI correctly recognizes that the way to extend a webbrowser control is is via SiteSite, however it attributes the method to IWebBrowser2 instead of IOleObject. Probably hallucinating.
* It implements IOleCommandTarget for no apparent reason. Probably hallucinating.
* The way to change a webbrowser control’s behavior via IOleCommandTarget is limited to handling of menu and toolbar commands and script/alert error message boxes. 
  * Generally speaking you want to turn on the FEATURE_BROWSER_EMULATION Feature control to upgrade the render engine in webbrowser control.
  * Generally speaking you need to implement IDocHostUIHandler/IServiceProvider to simulate modern IE behaviors like text autocomplete.

-----------------------------------------------------
Human Answer 
-----------------------------------------------------

In WinForms, the way to customize the webbrowser site is by deriving from WebBrowser then in the derived class, declare another class deriving from WebBrowserSite (you have to derive from nested class this way). Then implement ICustomQueryInterface and IDocHostUIHandler. 

.. code-block:: C#

    public CustomQueryInterfaceResult GetInterface(ref Guid iid, out IntPtr ppv)
    {
        if (iid == typeof(UnsafeNativeMethods.IDocHostUIHandler).GUID)
        {
            ppv = Marshal.GetComInterfaceForObject(this, typeof(UnsafeNativeMethods.IDocHostUIHandler), CustomQueryInterfaceMode.Ignore);
        }
        else
        {
            ppv = IntPtr.Zero;
            return CustomQueryInterfaceResult.NotHandled;
        }
        return CustomQueryInterfaceResult.Handled;
    }   

For interfaces that are not implemented by the default WinForms WebBrowserSite you can just declare them and derive your WebBrowserSite from the interfaces. The issue with customizing the default IDocHostUIHandler implementation is that you don't get to access the interface yourself, the interface is internal only to WinForms, thus ICustomQueryInterface is needed. Or you have to do the WPF way without the possibility of hosting a control from another framework, see below.

For WPF, Microsoft made the customization even harder. The default WebBrowserSite is now internal and not open to subclass. And the CreateActiveXSite() method is itself also internal, you don't really get to substitute a different webbrowser site anywhere. You have to either write your own variation of ActiveXHost that has a public CreateActiveXSite as well as making your own public WebBrowserSite class, or host a WinForms version of webbrowser control somewhere via WindowsFormsHost. 