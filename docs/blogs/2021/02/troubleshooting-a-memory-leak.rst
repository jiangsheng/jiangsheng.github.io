.. meta::
   :description: Got called into a memory leak troubleshooting. The application was leaking memory at 1mb per second. In memory profiler, most of the growing memory are used by

Troubleshooting a memory leak
=============================
.. post:: 27, Feb, 2021
   :category: Programming
   :author: me
   :nocomments:

Got called into a memory leak troubleshooting. 

The application was
leaking memory at 1mb per second. In memory profiler, most of the
growing memory are used by byte[] and RuntimeMethodHandle (growing at
around a million per minute). Initially I thought it is a disposing
problem, but the memory occupied by disposable objects does not increase
over time. 

Looking at the RuntimeMethodHandle instances, I found that it
is closely associated with DynamicResolver, whose instance count grows
in a much smaller but steady rate. This leads me to kissdodog’s post
`Windbg + .Net .NET Memory Profiler
排查内存泄露 <https://www.cnblogs.com/kissdodog/p/3926840.html>`__ but
kissdodog only located the problem and didn’t give a cause (some
coworker got the blame and fixed it). 

Then I want to see if there’s any
GDI leak and added handle columns to task manager, surprisingly there’s
a handle leak growing at 1/2 per second, but then there is no memory map
in the code. Under Process Explorer’s handle view,  the leaking handles
are revealed as user tokens, which is even more puzzling because the
code doesn’t deal with windows logins. But at least this gives me some
clear indicator to divide and conquer. 

By commenting out portions of
code (more like a human binary search) and watching Task Manager
religiously, I found the issue is caused by creating
XslCompiledTransform in a loop, something KB316775 cited as a design
limitation that the dynamic assemblies can’t be unloaded. Obviously this
isn’t fixed even in .Net 4.8. The KB was no longer published by
Microsoft and I had to `read it off a
mirror <https://www.betaarchive.com/wiki/index.php?title=Microsoft_KB_Archive/316775>`__.
Once the problem is located the fix is easy, making those
XslCompiledTransform objects singleton solved the issue.

