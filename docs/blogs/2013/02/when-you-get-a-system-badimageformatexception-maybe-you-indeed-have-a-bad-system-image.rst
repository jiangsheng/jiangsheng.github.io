.. meta::
   :description: I am getting a StackOverflowException with two functions repeating on the call stack, one is the constructor of System.BadImageFormatException, another is Syste

When you get a System.BadImageFormatException. maybe you indeed have a bad system image.
========================================================================================
.. post:: 8, Feb, 2013
   :tags: process
   :category: .Net Framework
   :author: me
   :nocomments:

I am getting a StackOverflowException with two functions repeating on
the `call stack <http://en.wikipedia.org/wiki/Call_stack>`__, one is
the constructor of System.BadImageFormatException, another is
System.Environment.GetResourceStringLocal.  

Since the call that throws
the stack overflow is to a `web
service <http://en.wikipedia.org/wiki/Web_service>`__ proxy defined in
the same project as the application, there isn't a 32bit/64bit mismatch
here (32bit machine with every project targeting x86), unlike almost all
other discussions on the internet about this exception. 

After inspecting
Fusion and event logs and finding nothing suspicious, I decided to treat
it as a real bad image problem and reinstalled .Net. Ура! The exception
went away after reinstalling. Sometimes, the exception name isn't
misleading. PS
a `similar question <http://stackoverflow.com/questions/7705751/system-badimageformatexception-an-attempt-was-made-to-load-a-program-with-an-i>`__
was closed as too vague on stackoverflow.

