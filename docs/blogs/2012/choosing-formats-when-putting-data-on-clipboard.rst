Choosing formats when putting data on clipboard
===============================================
.. post:: 21, Mar, 2012
   :tags: clipboard
   :category: enmsdn,Webbrowser control
   :author: jiangshengvc
   :nocomments:

The topic is from a forum discussion
at https://web.archive.org/web/20131020094354/http://social.msdn.microsoft.com/Forums/windowsdesktop/en-US/94bb2db4-3ca2-4cd8-9f7c-6dd9aab6fd18/need-help-to-complete-gdi-program-to-loadsave-to-clipboard?forum=windowssdk

Generally an application should provide data in as many formats as possible so more applications can recognize the data. For example, IE stores text data in CF_UNICODETEXT, CF_TEXT and CF_HTML formats.

Because a lot of application would stop enumerating the clipboard on its first supported format, to avoid data lose in round trips, clipboard formats that contain the most information should be placed on the clipboard first, followed by less descriptive formats. For example, CF_HTML first, CF_UNICODETEXT second and CF_TEXT last. Sometimes you get to choose from the paste format (e.g. paste special in Microsoft Word), but that's the exception, not many program can paste the format that is not the first supported format (e.g. you don't have paste special in Microsoft Paint).

Of course sometimes you want to limit, say, the format being exposed to the clipboard, e.g. `when copying code from Visual Studio but expect the code to make a round trip back to Visual Studio without the formatting <https://web.archive.org/web/20150311163109/http://blogs.msdn.com/b/kirillosenkov/archive/2010/06/07/copy-code-in-html-format-with-visual-studio-2010.aspx>`__, then you may want to put a less descriptive format first. 

If using the webbrowser control as the text editor, you can remove the formatting in pasting by `implementing
OnFilterDataObject <http://blog.csdn.net/jiangsheng/article/details/3800>`__.

 
