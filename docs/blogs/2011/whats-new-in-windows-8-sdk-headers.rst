What&rsquo;s new in Windows 8 Developer Preview SDK headers
===========================================================
.. post:: 17, Sep, 2011
   :tags: Application programming interface,Microsoft Visual Studio,Microsoft Windows,Operating Systems,Software development kit,windows 8 Developer Preview
   :category: enmsdn,Microsoft,Visual C++
   :author: jiangshengvc
   :nocomments:

This is by no means a complete list but just some observation on files
that caught my eye. Some are just regular header file updates for
Windows 7 and does not necessary require Windows 8. Some other APIs
moved to `header files <http://en.wikipedia.org/wiki/Header_file>`__
with more readable names. 

Improvements are focused, of course, in
natural input, efficiency, gaming experience and IE. You can hear the
silence scream of “Tablet!Tablet!Tablet!” here. Note Windows 8 is still
a developer preview and there is no guarantee any new feature will
survive the final cut or there won’t be new API for existing features
add in Beta/RC/Gold. 

UI: 

There is no improvement in the
`GDI <http://en.wikipedia.org/wiki/Graphics_Device_Interface>`__-based
shell common controls. No surprise here. The new UI would be based on
WinRT and will use GPU to render instead of CPU. There are COM API for
printing, which is traditionally performed via GDI. 

A lot of Direct2D
and Direct3D improvements. XAudio2 added and battery/pad support  added
to `XInput <http://en.wikipedia.org/wiki/DirectInput>`__. Improvement in
3D rendering, device removal during capturing and stream seeking in
Windows Media Foundation. API for H264 codec. 

Shell `Header
guard <http://en.wikipedia.org/wiki/Include_guard>`__ for IE5.01 or
lower are removed. Building for Windows 2000 is now practically
impossible. Some header guard switched to NTDDI_VERSION. There is A new
camera UI control based on COM. Somehow the version guard of
Shell_NotifyIconGetRect is lost, this might be a header file bug.

Networking: 

Lots of IE 10 APIs and HTML 5 support.
`ActiveScript <http://en.wikipedia.org/wiki/Active_Scripting>`__
optimized for multiple instance and webworker. Also there is a new
IActiveScriptContext interface to get url, line and offset of the
script. New timeout configuration in WinInet.
`ActiveX <http://en.wikipedia.org/wiki/ActiveX>`__ filtering, and
options to enable/disable audio/video plugins added for IE security
zones. 

Others

Accessibility for windowless controls and lots of `UI
automation <http://en.wikipedia.org/wiki/Microsoft_UI_Automation>`__
improvements, including grid and spreadsheet types. Candidate list
integration and async document support with Text Service Framework. ARM
support to .Net APIs.  A lot of pointer device and touch messages,
notification and drawing.
