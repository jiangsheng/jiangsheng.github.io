Windows Update KB2538242 or KB2538243 offered repeatedly
==========================================================

.. post:: 24 Jun, 2011
   :tags: Microsoft Answers, Patch (computing), Visual C++, Windows Update
   :category: Visual C++, Windows Update
   :author: me
   :nocomments:

.. index:: Windows Update KB2538242

.. index:: Windows Update KB2538243


Recently (this post was originally published in 2011) there is an outburst of posts related to the `KB2538242 update <https://support.microsoft.com/en-us/topic/ms11-025-description-of-the-security-update-for-visual-c-2005-sp1-redistributable-package-june-14-2011-ef98bf3e-5f8e-4b30-2951-1cd8219892b5>`_ being offered repeatedly on MSDN’s Visual C++ forums, TechNet’s various Windows security forums and the Windows Update forum on Microsoft Answers forums. Questions about KB2538243 appear as well, but to a less degree.

To save your time going to the forums or calling Microsoft’s free security hotline, this is my answer:

KB2538242 (maybe KB2538243 as well, but I did not find an official response from Microsoft) is defective and will be replaced. In the mean time, you can `pause it <https://learn.microsoft.com/en-us/previous-versions/technet-magazine/ff382716(v=msdn.10)?redirectedfrom=MSDN>`_ and resume after the fix is released (probably in a week or so), or manually download the updates from Microsoft’s download center.

Background:

This update is offered when Microsoft Visual C++ Redistributable is installed along with one of the apps created using a Microsoft software developer tool called Visual C++. To make those app more secure, Microsoft offers security update for the customers of its customers of developer tools. You may not have those components installed, if you did not install one of these apps that ship with Visual C++ components. On a 64bit computer, the system could have both x86 and x64 editions of Visual C++ Redistributable installed, since Visual C++ is a common used component, and it is normal to have 32bit apps and 64bit apps installed on a 64bit system.

Speculation

From reading the reports on Microsoft Answer’s Windows Update forum, Windows Update correctly detects the x64 edition of Visual C++ Redistributable needs to be updated, but downloads the x86 edition to install. Some Windows x64 edition users reports the problem goes away by manually download the x64 edition to install, probably inspired by an `old workaround for a similar issue with KB2467175 <https://answers.microsoft.com/en-us/windows/forum/all/repeatedly-offered-kb2467175-microsoft-visual/aca03e2b-4566-e011-8dfc-68b599b31bf5>`_.

Advertisement

Based on the number of error reports and those “me too” comments, Visual C++ 2005 programs probably have a customer base 9 times larger than Visual C++ 2008. Looks like either those Visual C++ programmers are slow to update their tools, or the customers of those programmers are slow to update their apps.

A Microsoft tech support is quoted as saying (“Visual C++ packages were written by a `‘third party’ <https://answers.microsoft.com/en-us/windows/forum/all/kb2538242-visual-c-redistributable-update-on-june/ba0b6202-c775-4d64-9fd2-21adc49f6e73?page=4>`_. ” Who wrote these update packages? Microsoft’s Visual C++ team should not be called like this. To Windows users, Microsoft is a single entity.

See also

`How to troubleshoot Windows Update or Microsoft Update when you are repeatedly offered an update. <https://learn.microsoft.com/en-us/troubleshoot/windows-client/installing-updates-features-roles/repeatedly-offer-the-same-update>`_