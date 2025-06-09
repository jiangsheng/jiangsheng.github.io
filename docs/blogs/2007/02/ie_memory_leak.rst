.. meta::
   :description: For automated applications such as parsers, the WebBrowser control may not be appropriate. Under IE4 there were several memory leak problems manifested when the control was repeatedly instantiated and destroyed and also, on occasions, when the control was merely navigated from page to page. Almost all of these problems were fixed and incorporated in the IE5 release. However new memory leaks were introduced in the script engine, the URL navigation history, and the security system.

Memory Leak in the Internet Explorer WebBrowser Control
========================================================

.. post:: 28 Feb, 2007   
   :tags: MSHTML
   :category: Win32
   :author: me
   :nocomments:   

For automated applications such as parsers, the WebBrowser control may not be appropriate. Under IE4 there were several memory leak problems manifested when the control was repeatedly instantiated and destroyed and also, on occasions, when the control was merely navigated from page to page. Almost all of these problems were fixed and incorporated in the IE5 release. However new memory leaks were introduced in the script engine, the URL navigation history, and the security system. There is no word at this time on when these problems will be fixed. Unfortunately, some leaks ( the travel log that enable you to go back, for example) have been declared to be "by design" by the development team. For those applications where this is not possible it may be necessary for the customer to use a WebBrowser control from a non-Microsoft vendor that is designed for the type of long term continuous real-time activity that your are developing for.

If you need a similar interface, try the Mozilla ActiveX Control (I know little about it, so I am not sure it leaks memory or not) at https://web.archive.org/web/20010920144243/http://www.iol.ie/~locka/mozilla/control.htm. Apparently, you need to have Mozilla installed to use this Activex control. A hosting sample can be found at https://web.archive.org/web/20030422065641/www.codeproject.com/useritems/iemozilla.asp .

For UI-less parsers, try to use the MSHTML directly. A sample named WalkAll can be found in MSDN. Another suggestion is to write a guardian application to restart the automated application when memory is running short.

See also

Drip — A utility to detect and measure IE's memory leaks. https://web.archive.org/web/20070207103409/http://outofhanwell.com/ieleak/index.php?title=Main_Page
IE Leak Patterns — Microsoft's analysis of IE's memory leak problem. https://web.archive.org/web/20070226174249/http://msdn.microsoft.com/library/en-us/ietechcol/dnwebgen/ie_leak_patterns.asp