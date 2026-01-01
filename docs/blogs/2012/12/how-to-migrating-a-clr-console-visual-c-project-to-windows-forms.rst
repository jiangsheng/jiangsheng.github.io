.. meta::
   :description: Note: Windows Forms programming in new development is discouraged by Microsoft at this point as Microsoft wants to make full use of hardware accelerated drawing

How to: Migrating a CLR console Visual C++ project to Windows Forms
===================================================================
.. post:: 17, Dec, 2012
   :tags: CPP,WinForms
   :category: Visual Studio, .Net Framework
   :author: me
   :nocomments:

Note: Windows Forms programming in new development is `discouraged by Microsoft <http://stackoverflow.com/questions/913417/will-windows-forms-be-deprecated-in-favor-of-wpf>`_ at this point as Microsoft wants to make full use of hardware accelerated
drawing instead of using the CPU-intensive `GDI <http://en.wikipedia.org/wiki/Graphics_Device_Interface>`_. But maintaining old Windows Forms code in `Visual C++ <http://msdn2.microsoft.com/en-us/visualc/default.aspx>`_ 2012 is still supported, GDI isn't going anywhere anytime soon. 

Visual C++ 2012 removed the Windows Forms project template and I see people scramble to find ways to create a Windows Forms project.  There is a walkaround that's been around for years, that is, to convert a `CLR console application <http://msdn.microsoft.com/en-us/library/z6ad605x(v=vs.110).aspx>`_ to a Windows one, then add forms related code to the project. 

The basic steps are listed at http://support.microsoft.com/kb/317433, conveniently named "How to suppress the console window for a managed extensions to Visual C++ Windows Forms application". Yes, the need to convert a C++ console application to windows forms is that old,
back all the way back in the `managed extensions for C++ <http://en.wikipedia.org/wiki/Managed_Extensions_for_C%2B%2B>`_ days. 

So what I need to do to add Windows Forms support to a C++/CLI console application? Of course the System.Windows.Forms.dll reference is
missing in a new console application, so I need to reference it:

- In code:
   
  .. code-block:: C++

    #using <System.dll> 
    #using <System.Drawing.dll>
    #using <System.Windows.Forms.dll> 
    using namespace System::Windows::Forms;

- Or In IDE:

  - Select the project in Solution Explorer
  - On the Project menu or the context menu of the project node, select
    Properties
  - In the Property Pages dialog box, expand the Common Properties node,
    select `Framework and References <http://msdn.microsoft.com/en-us/library/47w1hdab(v=vs.110).aspx>`_,
    and then click Add New Reference.
  - Find and add System.Windows.Forms in the list of available
    references.
  - In reality the `Windows Forms Designer <http://msdn.microsoft.com/en-US/library/e06hs424(v=vs.110).aspx>`_ generates a lot of layout code that uses System.Drawing types like Point and Size, so I need to repeat the steps for System.Drawing. 

Next the console window needs to be suppressed. The C++/CLI console project template in fact does not specify an entry point, so compiler guesses because a main function exists, the project is a console application. A Windows Forma application's entry point has the same signature with the main function, therefore the `/subsystem <http://msdn.microsoft.com/en-us/library/fcc1zstk.aspx>`_ setting of the project needs to be changed to Windows:

- Go back to the project's Property Pages dialog box.
- Click the Linker folder on the type.
- Click the System property page.
- Change the SubSystem property to Windows.

Ready? Not yet. The compiler is now trying to find a WinMain function, and throws LNK2028 and  LNK2019 when it can't find the entry point,
which of course isn't there. I am not interested in writing one as I prefer to keep the nice args command line
parameter of an array<String^>^ type , so I need to tell the compiler my `entry point <http://msdn.microsoft.com/en-us/library/f9t8842e(v=vs.110).aspx>`_ function is still main:

- Go back to the the Linker folder.
- Click the Advanced property page.
- Change the `Entry Point <http://en.wikipedia.org/wiki/Entry_point>`_ property to main.

We are almost here. `Windows Forms needs an STA thread <http://blogs.msdn.com/b/jfoscoding/archive/2005/04/07/406341.aspx>`_, so I have to add  [STAThreadAttribute] to the main function:

.. code-block:: C++
  
  [STAThreadAttribute] 

  int main(array<System::String ^> ^args) 
  {
    
  }

wait did I add anything here? I guess not yet Here you go,  a Windows
Forms application that does nothing interesting.  Mmm, to make it a
little more visual, I create a new Windows Form class named Form1 and
run it in the main function:

.. code-block:: C++

  //before main function
  #include "Form1.h"
  using namespace ProjectName;

  //in the main function
  Application::EnableVisualStyles();
  Application::SetCompatibleTextRenderingDefault(false); 
  // Create the main window and run it 
  Application::Run(gcnew Form1()); 

Yada! I have a Windows Forms application running now.

