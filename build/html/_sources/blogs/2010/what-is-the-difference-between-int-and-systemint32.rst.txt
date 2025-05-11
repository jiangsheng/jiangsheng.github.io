What is the difference between int and System::Int32
====================================================
.. post:: 22, Nov, 2010
   :tags: C#,C++/CLI,Integer (computer science)
   :category: enmsdn,Microsoft,Visual C++,Visual Studio
   :author: me
   :nocomments:

Some may say identical, at least that’s what the `Visual
C <http://msdn2.microsoft.com/en-us/visualc/default.aspx>`__\ ++ compiler
tells you at the first glance  when you turn on /oldsyntax public \__gc
class Class1 { public: void F1(int a){} void F1(System::Int32 a){}
//Error    2    error  2535:  void Class1::F1(int)' : member function
already defined or declared } Okay, so if I add & to the parameter types
I should get the same error right?void F1(int&a){} void
F1(System::Int32& a){} Build: 1 succeeded, 0 failed, 0 up-to-date, 0
skipped Wait, didn’t I get an error just now? You are right, somehow the
compiler treat the two types differently when passing by reference. look
at the function signatures in
`MSIL <http://en.wikipedia.org/wiki/Common_Intermediate_Language>`__.
Int32 is passed by reference as expected

::

   .method public instance void F1(int32& modopt([mscorlib]System.Runtime.CompilerServices.IsImplicitlyDereferenced) a) cil managed
   {
       .maxstack 0
       L_0000: ret
   }

and int is passed by address (the behavior is different if you switch to
new syntax)

::

   .method public instance void F1(int32* modopt([mscorlib]System.Runtime.CompilerServices.IsImplicitlyDereferenced) a) cil managed
   {
       .maxstack 0
       L_0000: ret
   }

I guess it does not make a big deal right? `Until you have an interface
assembly that is compiled in anower compiler and want to implement the
interface <https://connect.microsoft.com/VisualStudio/feedback/details/280487/upgrade-from-1-1-to-2-0-net-c-dll-with-long-parameter-throws-missingmethod-exception>`__.
Now you `have a hard time to figure out how to declare the signature in
the new
syntax <http://stackoverflow.com/questions/4082419/how-to-forward-declare-a-method-in-c-cli-to-match-the-signature-of-a-managed-e>`__.
