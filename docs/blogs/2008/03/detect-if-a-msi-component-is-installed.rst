.. meta::
   :description: A C# program for those who don’t know MSI SDK or C++. C++ programmers can find the API inside the msi.h file in Windows SDK.

Detect if a MSI component is installed
======================================
.. post:: 24, Mar, 2008
   :tags: Application programming interface,C#,Windows SDK
   :category: enmsdn,Microsoft
   :author: me
   :nocomments:

A C# program for those who don't know MSI SDK or C++. C++ programmers
can find the
`API <http://en.wikipedia.org/wiki/Application_programming_interface>`__
inside the msi.h  file in `Windows
SDK <http://msdn.microsoft.com/windows/bb980924.aspx>`__.
   
   
.. code-block::

   static class Program 
   {
      static int Main(string[] args)
      {
         uint pathSize = 0;
         try
         {
            foreach (string componentId in args) 
            {
               MsiInstallState state = MsiLocateComponent(
                  componentId, null, ref pathSize); 
               if (state != MsiInstallState.Local) 
               {
                  return ERROR_UNKNOWN_COMPONENT; 
               }
            }
         }
         catch (Exception ex)
         {
            Console.WriteLine(ex.Message); 
            Console.WriteLine(ex.StackTrace);
            return ERROR_MOD_NOT_FOUND;
         }
         return 0; 
      }
      [`DllImport ("msi.dll", CharSet = CharSet.Auto)] 
      extern static internal MsiInstallState MsiLocateComponent(string component, string path, ref uint pathSize);
      /// Enumeration of MSI install states.
      internal enum MsiInstallState: int
      {
         Local = 3 
      }
      const int ERROR_MOD_NOT_FOUND = 126; 
      const int ERROR_UNKNOWN_COMPONENT = 1607; 
      }
   }
