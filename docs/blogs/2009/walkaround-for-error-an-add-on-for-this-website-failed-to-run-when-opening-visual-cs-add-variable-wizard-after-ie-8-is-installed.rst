Walkaround for Error : An add-on for this website failed to run. When opening Visual C++’s Add Variable Wizard after IE 8 is installed
======================================================================================================================================
.. post:: 24, Mar, 2009
   :tags: ActiveX,Internet Explorer,Internet Explorer 8,Microsoft Visual Studio,Regmon,Security Programming,Trident (layout engine),Visual C++
   :category: enmsdn,Microsoft,Visual Studio
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!878

   Update: it looks like a lot of people are hitting this page by
   mistake. If you don't write software for a living then this page is
   probably not for you. Download:
   http://jiangsheng.net/Documents/IE8AddZone.zip Prerequisite:
   `Microsoft Visual C++ 2005 SP1 Redistributable Package
   (x86) <http://www.microsoft.com/downloads/details.aspx?familyid=200b2fd9-ae1a-4a14-984d-389c36f85647&displaylang=en>`__
   This program is designed to temporary circumvent the "An add-on for
   this web site failed to run. Check the security settings in Internet
   options for potential conflicts" error in `Visual
   Studio <http://www.microsoft.com/visualstudio>`__ after installing
   IE8. For more details about this problem, visit
   https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=425510
   Update: the VC team's workaround is at
   http://blogs.msdn.com/vcblog/archive/2009/03/28/some-vs2005-and-vs2008-wizards-pop-up-script-error.aspx.
   However, I still suggest copying other settings from a restricted
   zone before modify the 1207 key. Clicking the create button will
   create another `Internet
   Explorer <http://en.wikipedia.org/wiki/Internet_Explorer>`__ security
   zone with the id 1000 that will affect all urls not included in other
   zones. This will allow separate security settings for webbrowser
   control hosting
   `application <http://en.wikipedia.org/wiki/Application_software>`__
   such as Visual Studio. If settings are copied from a trusted
   configuration such as "my computer",a webbrowser control hosting
   application may not experience the aforementioned error. Security
   Remarks: do not visit unsecured web site or use email software on the
   same computer after creating the new zone as the security impact of
   the new zone is not yet tested. Applications that host webbrowser
   control should implement their own `security
   manager <http://msdn.microsoft.com/en-us/library/ms537182(VS.85).aspx>`__
   if they want to run
   `ActiveX <http://en.wikipedia.org/wiki/ActiveX>`__ in the browser
   control. If you received a fix from the IE team for this problem,
   please delete the zone created by this problem by clicking the delete
   button. Visit
   https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=425510
   for the status of this problem. For more information about adding
   zones to IE, visit http://www.nthelp.com/50/addazone.htm . For more
   information about Internet Explorer security zones, visit
   http://support.microsoft.com/kb/182569 For more information about
   Visual C++ wizards, visit
   http://msdn.microsoft.com/en-us/library/aa730846(VS.80).aspx
   Suspicious url actions from
   `Regmon <http://en.wikipedia.org/wiki/RegMon>`__ logs:

   - 2700 URLACTION_INPRIVATE_BLOCKING (Don’t think Visual Studio know
     what is the `private
     mode <http://en.wikipedia.org/wiki/Privacy_mode>`__)
   - 2106 URLACTION_FEATURE_DATA_BINDING (a lot of these in the registry
     log)
   - 1207 URLACTION_ACTIVEX_OVERRIDE_REPURPOSEDETECTION (not sure what
     this is doing, but it is the only one between URLACTION_ACTIVEX_MIN
     and URLACTION_ACTIVEX_MAX)
   - 160A URLACTION_HTML_INCLUDE_FILE_PATH
