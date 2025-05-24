.. meta::
   :description: I know, it is long overdue. Microsoft discontinued it a decade ago. And Office is not meant to be embedded. I even advised people to not use it in new developme

Farewell, dsoframer
===================
.. post:: 11, Mar, 2018
   :tags: dsoframer,Office
   :category: Microsoft
   :author: me
   :nocomments:

I know, it is long overdue. Microsoft discontinued it a decade ago. And
`Office is not meant to be
embedded <https://social.msdn.microsoft.com/Forums/vstudio/en-US/127bd801-525d-41c3-8516-cac7c68ec43b/location-of-dsoframer-download?forum=csharpgeneral>`__.
I even advised people to not use it in new development almost a decade
ago. Then why I keep using it for so long?

Because customers don’t want changes. I work in the medical field, where
some of the clients still use telnet to interface with their medical
software that are probably older than I am. Once you get people hooked
to a UI it is hard to change that. The fact that Microsoft discontinues
dsoframer means nothing to them – once I use it, I own it. It is like
Microsoft having to release an Office update for the old equation editor
made by MathType 16 years ago. So I have been doing patchwork as much as
I can to keep dsoframer alive.

It might be a blessing in disguise that Office 2016 finally broke
dsoframer on Windows 10 in a way that I can’t fix. The control just keep
calculates the scrolling sizes wrong. I have to work on a solution for
customers who can accept a side-by-side UI instead of embedding Office.
Shortly after I published the update Microsoft dropped the bomb that
`the MSI edition of Office is being
discontinued <https://blogs.technet.microsoft.com/windowsitpro/2018/02/01/changes-to-office-and-windows-servicing-and-support/>`__,
I have to say that I am lucky to have some doctors finally start
accepting the side by side UI. Maybe the rest will also get use to it
now there’s no alternative.

Some issues I encountered over the years

The click-to-run edition of Office dropped the registry entries required
by dsoframer to function .

.Net Programmability support is not a default install option of Office

Adobe Acrobat Reader shipped with dsoframer too, and uninstall either
the reader or my app breaks the remaining one. Note to self: GuidGen on
samples.

Does not open document if Office is running

Various drawing issues.

I supported embedding Word longer than the Outlook team, I am really not
proud of that.

