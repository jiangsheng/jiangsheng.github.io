.. meta::
   :description: Microsoft Visual C++ and later do not support perl scripts by default. That is, the Developer Studio does not associate any special significance to perl scripts

How to use Visual C++ with Perl
===============================
.. post:: 3, Nov, 2005
   :tags: Perl,Visual C++
   :category: ACC,enmsdn,Microsoft,Visual Studio
   :author: me
   :nocomments:

`Microsoft Visual
C <http://msdn2.microsoft.com/en-us/visualc/default.aspx>`__\ ++
and later do not support perl scripts by default. That is, the
Developer Studio does not associate any special significance to
perl scripts without being informed otherwise. However, there are
several viable options, namely custom build rules, which enable
the creation of projects that depend directly upon perl scripts.
The remainder of this article discusses the following three
methods for adding perl script files to a Visual C++ project:

#. Using custom build rules
#. Using an makefile project
#. Creating an option on the Tools menu to execute perl scripts as
   needed

.. rubric:: Method 1: Using custom build rules
   :name: method-1-using-custom-build-rules

#. Start the Visual C++ Developer Studio, Msdev.exe.

#. Create and save a hello world console project

#. From the Insert menu, choose Files into Project. In the Insert
   Files into Project dialog box, select a perl script an All
   Files Type and press OK

#. From the Build menu, choose Settings. In the Settings For list
   box in the Project Settings dialog box, expand the current
   configuration target such that the perl script file is visible.
   Highlight only the perl script file.

#. Select the Custom Build tab.

#. In the first line of the Build command(s) box, enter the full
   path and file name for perl, the desired `command
   line <http://en.wikipedia.org/wiki/Command-line_interface>`__
   switches, and the path of the perl script. The latter can be
   obtained by right click the file in the file view, and select
   properties from the `context
   menu <http://en.wikipedia.org/wiki/Context_menu>`__. If
   Perl.exe is in the C:PerlBIN directory, the entry would appear
   as follows: C:Perlbinperl.exe Test3.pl < input1.txt

#. Type something in the output box

#. Press OK in the Project Settings dialog box to save your
   changes

#. The target is now ready to be built. From the Build menu,
   select Rebuild All. Perl.exe will be invoked to execute the
   script.

#. The following is the console output :

   | --------------------Configuration: test3 - Win32 Debug--------------------Performing Custom Build Step on Test3.pl
   | Encrypt/Decrypt:dEnter the key:relationsEnter the text:ks me hz bbl ks me mpog aj xse jcsflzsyto be or not to be that is the question
   | Compiling...
   | StdAfx.cpp
   | Compiling...
   | test3.cpp
   | Linking...test3.exe - 0 error(s), 0 warning(s)

.. rubric:: Method 2 Using an makefile project
   :name: method-2-using-an-makefile-project

#. Start the Visual C++ Developer Studio, Msdev.exe.

#. Create a makefile project

#. In the command line box, type the perl command line.  If
   Perl.exe is in the C:\\Perl\\BIN directory, the text would
   appear as follows: C:\\Perl\\bin\\perl.exe Test3.plx <
   input1.txt

#. Type the command line again for the release configuration

#. Click "Finish" to save your changes

#. The target is now ready to be built. From the Build menu,
   select Rebuild All. Perl.exe will be invoked to execute the
   script.

#. The following is the console output :

   | --------------------Configuration: Test2 - Win32 Debug--------------------
   | Encrypt/Decrypt:d
   | Enter the key:relations
   | Enter the text:ks me hz bbl ks me mpog aj xse jcsflzsy  to be or not to be that is the question
   | Test2.exe - 0 error(s), 0 warning(s)

.. rubric:: Method 3 Creating an option on the Tools menu to
   execute perl scripts as needed
   :name: method-3-creating-an-option-on-the-tools-menu-to-execute-perl-scripts-as-needed

Create an option on the Tools menu to execute a perl script as
needed. The following setups can be used to create Tools menu
items that print the current file with line number:

#. From the Tools menu, choose the Customize option

#. Select the Tools tab in the Customize dialog box. Press Add.

#. Specify the complete path to Perl.exe in the Command edit field
   of the Add Tool dialog box, or use the Browse button feature,
   and press OK.

#. Set up the Perl.exe menu option as follows:

      | Menu Text:  &Print Current File with Line Number
      | Command:  
      | Arguments (May vary between versions):  FPrinter.pl $(FileName)$(FileExt)
      | Initial Directory (May vary between versions):  $(FileDir) 
      | Check the box for:   "Redirect to Output Window"

#. Press the Close button.

#. Create a perl script file named FPrinter.pl inside the project
   directory

#. Open FPrinter.pl  in a text editor such as notepad, and type
   the perl script as follows

.. code-block::

   $numArgs = $#ARGV + 1;
   undef $/; # input record separator
   #for every file in command line
   foreach $argnum (0 .. $#ARGV) {
         $FileName=$ARGV[$argnum];   open (SourceFile, $FileName) || die "couldn't open the file!".$FileName;    open(IN,$FileName); $_=<IN>; # slurp! close(IN);  $count=0;   while(m/^(.*)$/mg){     $count++;       print "[".sprintf("%.4d",$count)."]t".$1."n";   }
   }

#. Close and save FPrinter.pl

#. If the current file is FPrinter.pl, the script results will
   appear in the build output window as follows.

      | [0001] $numArgs = $#ARGV + 1;  
      | [0002] undef $/; # input record separator  
      | [0003] #for every file in command line  
      | [0004] foreach $argnum (0 .. $#ARGV) {  
      | [0005] $FileName=$ARGV[$argnum];  
      | [0006] open (SourceFile, $FileName) || die "couldn't open the file!".$FileName;  
      | [0007] open(IN,$FileName);  
      | [0008] $_=<IN>; # slurp!  
      | [0009] close(IN);  
      | [0010] $count=0;  
      | [0011] while(m/^(.*)$/mg){  
      | [0012] $count++;  
      | [0013] print "[".sprintf("%.4d",$count)."]t".$1."n";  
      | [0014] }  
      | [0015] }  
      | [0016]   Tool returned code: 0

References:

- `How to use the Development Studio or Visual Workbench with MASM (MSKB) <http://support.microsoft.com/kb/q106399/>`__
- `Double-click on the trace message in the Output window in Developer Studio to get to the line of code <http://www.codeproject.com/debug/trace_locate.asp>`__ (`CodeProject <http://www.codeproject.com/>`__)

