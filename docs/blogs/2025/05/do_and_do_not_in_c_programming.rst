.. meta::
   :description: Don't Use octal literals. If you are using a compiler, ask the vender to issue a warning when a octal literal is being compiled, as Microsoft did (https://web.archive.org/web/20040520193822/http://blogs.msdn.com/ericlippert/archive/2003/10/23/53278.aspx)

Do and Do Not in C Programming
====================================

.. post:: 25 May, 2025
   :tags: CPP
   :category: Programming
   :author: me
   :nocomments:


This post is originally written in 2012. It was lost when moving my web site from Office Live to Windows Live Spaces. I found a dead link to my web site and found an archive from archive.org. So here it is the old article.

Don't

* Use octal literals. If you are using a compiler, ask the vender to issue a warning when a octal literal is being compiled, as Microsoft did ( http://blogs.msdn.com/ericlippert/archive/2003/10/23/53278.aspx )
* Use complex expressions as the test conditions in diverging statements such as if, for and while. Use a helper variable for each fraction of the results, and use the helper variable to construct the final condition expression. If you lose some hundreds of CPU clocks, so be it. How much time will be lost when the CPU is powerful enough to execute such statements in less than 1 millisecond? How much time will be lost when the program goes in a wrong branch and you have to debug it?
* Put strings in the code unless you have to. Strings should be stored in a string table in the resource files for easy modification and globalization.
* Wait for bugs to show up. Modify the memory or the current statement when debugging to test extreme cases.
* Compare boolean values to true. For convenience, functions may return any non-zero value for true. Compare them to false, which is always 0.
* Pass an output string as the format string to formatting functions such as printf. If the output string contains a percent sign, the formatting function will crash.
* Replace multiples and divides with shifts. If your compiler is not smart enough to do it for you, change your compiler.
* Using memset to initialize a small block of memory. Calling memset can be a overhead in such cases.
* Use nested ?= statements. Don't be afraid of straight, stupid if and else statements, they may be even more efficient.
 

Do

* Always use parentheses to clarify operator priority. If anyone need a second to recite the operator priority sheet to read your code, use parentheses to save them some time.
* Put L-value (constants and expressions that don't have memory addresses) on the left-hand side of your comparisons. If your compiler has an option to issue warnings for assignments in comparisons, don't turn it off. Assignments in comparisons are a major bug source since too many times the programmers inadvertently used the assignment operator = in the place of the comparisons operator ==.
* Use the defined operator to test if a symbol is defined or not before using it in a preprocessor macro. Using undefined symbols in preprocessor macros can yield unintended results.
* Insert an assert statement when a piece of code should never be reached (in other words, they are bug trappers), such as the default branch of a switch statement when all possible cases should be explicitly handled.
* Insert comments when anyone need to look up some API documentation to understand your code. Nowadays API functions are too many to be remembered.
* Make a copy of important data so you can recover from bad memory allocation or full disk.
 

Do only if you know what you are doing

* Use stupid table lookup instead of dynamic calculation. Write some code to verity the data before using it. If you can't, don't use the table lookup.
* Use 1-b instead of !b when b is a 0-or-1 Boolean value.
* Use undocumented functions and features


