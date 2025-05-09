Bug in Security Update for Visual C++ Redistributable Package: April 12, 2011 causes program error on Windows 2000
==================================================================================================================
.. post:: 17, Apr, 2011
   :tags: Deployment,Microsoft Foundation Class Library,Redistributable,Visual C++,Windows 2000
   :category: enmsdn,MFC,Microsoft,Visual Studio
   :author: jiangshengvc
   :nocomments:

Update:Microsoft's Visual C++ team has `released workarounds on the
problem. <http://blogs.msdn.com/b/vcblog/archive/2011/04/26/10158277.aspx>`__ AVG
has released an utility that can revert the KB2467175 update,
downloadable
at http://twitter.blog.avg.com/2011/04/avg-feedback-update-26411.html

`Avira <http://www.free-av.com/>`__ is
`reporting <http://www.avira.com/en/support-for-home-knowledgebase-detail/kbid/829>`__
that its `AntiVir <http://en.wikipedia.org/wiki/Avira>`__ software
throws "The procedure entry point FindActCtxSectionStringW could not be
located in the `dynamic link
library <http://en.wikipedia.org/wiki/Dynamic-link_library>`__
`KERNEL32.dll <http://en.wikipedia.org/wiki/Microsoft_Windows_library_files>`__."
error after installing the update released earlier this week. 

This is
caused by the introduction of FindActCtxSectionStringW in the MFC update
which is distributed to affected computers where the Visual C++
Redistributable is installed by affected programs. I guess
`Microsoft <http://en.wikipedia.org/wiki/Microsoft>`__ did not test the
update on `Windows 2000 <http://en.wikipedia.org/wiki/Windows_2000>`__
since Windows 2000's support has expired, and indeed removed Windows
2000 from the supported platform list of the redistributables on the
Microsoft download center page, but nonetheless those who develop
software using Visual  C++ 2005 and Visual  C++ 2008, two currently
supported products, would still not able to support Windows 2000 users
after this update (KB2467174  and KB2467175). 

Microsoft already
`withdrawn the update to fix this
issue <http://forum.avast.com/index.php?topic=76351.0>`__. On April 21,
2001, Microsoft re-released the update, and made only a `detection
change <http://www.microsoft.com/technet/security/bulletin/ms11-025.mspx>`__,
means the update won't be offered to Windows 2000 again. 

Suggestion to
end users and `software
developers <http://en.wikipedia.org/wiki/Software_developer>`__ who
already installed the update on Windows 2000: Uninstall the April 12,
2011 updates, remove leftovers mentioned in the KB articles identified
by the updates and install the ATL security update versions (search in
download.microsoft.com to get those updates) for now. 

Suggestion to
software developers: Call
`SetSearchPathMode <http://msdn.microsoft.com/en-us/library/dd266735(v=vs.85).aspx>`__
to turn on the safe dll searching mode at the beginning of the app, and
join the discussion\ ` Always ask the developer before applying a
security fix or service pack to Visual Studio that need changed the C++
runtime DLLs
ATL/MFC/CRT <https://connect.microsoft.com/VisualStudio/feedback/details/662511/always-ask-the-developer-before-applying-a-security-fix-or-service-pack-to-visual-studio-that-need-changed-the-c-runtime-dlls-atl-mfc-crt>`__.

Affected software:

- `Mozilla
  Firefox <http://support.mozilla.com/en-US/questions/666809>`__ (90%
  users have this issue this week)
- Avira AntiVir
- `Avast!
  Antivirus <http://social.msdn.microsoft.com/Forums/en-US/vcgeneral/thread/51955563-7ea5-4afc-aede-a2b33cf66c9d>`__
- `SonicWall <http://www.sonicwall.com/>`__
- `AVG Free version
  9 <http://www.computing.net/answers/security/avgfrwexe-win2000-procedure-entry-point-not/35032.html>`__,
  `AVG
  8.5 <http://isc.incidents.org/diary/April+2011+Microsoft+Black+Tuesday+Summary/10693>`__
- `Nokia PC Suite
  6.85 <http://www.spywarefri.dk/forum/viewthread/81141/>`__
- Logitech Setpoint Mouse Software
- `Adobe Acrobat
  8.1.4 <http://forums.adobe.com/message/3624802?tstart=0>`__
- `BeDraw
  DXF <http://www.farchi.jp/forum/viewtopic.php?showtopic=6860>`__
- `Exchange 2000
  Server <http://groups.google.com/group/microsoft.public.exchange.admin/browse_thread/thread/b7d2d495377bb210#>`__
- `Symantec Endpoint
  Protection <http://www.symantec.com/business/support/index?page=content&id=TECH158779>`__

Other known issues in this update can be found in a \ \ `follow up
post <http://blogs.msdn.com/b/vcblog/archive/2011/06/17/10175518.aspx>`__\ \ 
at the Visual C++ blog.

Alternative error message: 

* プロシージャエントリポイントFindActCtxSectionStringWがダイナミックリンクライブラリKERNEL32.dllから見つかりません
* 无法定位程序输入点FindActCtxSectionStringW于动态链接库KERNEL32.dll上