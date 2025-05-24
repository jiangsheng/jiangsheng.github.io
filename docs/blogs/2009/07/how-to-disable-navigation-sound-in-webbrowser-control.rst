.. meta::
   :description: User kill211 does not like the click sound when he calls WebBrowser.Navigate. He wonders if there is a way to disable it without modifying HKEY_CURRENT_USER\App

How to disable navigation sound in webbrowser control
=====================================================
.. post:: 6, Jul, 2009
   :tags: Internet Explorer,Internet Explorer 6,Internet Explorer 7,Internet Explorer 8,Internet Explorer 9,Registry,Trident (layout engine),WebBrowser Control
   :category: enmsdn,Microsoft,Visual C++
   :author: me
   :nocomments:

User kill211 does not like the click sound when he calls
WebBrowser.Navigate. He `wonders if there is a way to disable it without
modifying
HKEY_CURRENT_USER\\AppEvents\\Schemes\\Apps\\Explorer\\Navigating, which
has effect on other
applications. <http://topic.csdn.net/u/20090703/16/5b7f68f7-6e60-4b50-a564-0d16a3974be6.html>`__

Unfortunately, the
`API <http://en.wikipedia.org/wiki/Application_programming_interface>`__
for disabling sound is introduced in
`IE7 <http://en.wikipedia.org/wiki/Internet_Explorer_7>`__. The
FEATURE_DISABLE_NAVIGATION_SOUNDS feature can be toggled `using registry
or the CoInternetSetFeatureEnabled
API <http://msdn.microsoft.com/en-us/library/ms537184%28VS.85%29.aspx>`__.

*Update: A good news is that in IE9 beta, the navigating sound is
disabled by default. It helps the users who want to listen to music
while navigating. For the visual impaired users,* `the sound can be
turned on in accessibility
options <http://msdn.microsoft.com/en-us/ie/ff959805.aspx#_Accessibility_considerations>`__\ *.*

The
`PlaySound <http://msdn.microsoft.com/en-us/library/dd743680(VS.85).aspx>`__
API is still available for the users `who want to play the click sound
themselves <http://social.msdn.microsoft.com/forums/en-US/vbgeneral/thread/4557abb0-0c99-4eca-8a04-7f1d30e5f627>`__,
I am not sure why it could be useful though.

Black history: some old theme software overwrites the start.wav file
instead of `changing the click sound file name in
HKEY_CURRENT_USER\\AppEvents\\Schemes\\Apps\\Explorer\\Navigating. <http://support.microsoft.com/kb/201901>`__
`This can cause IE6 to hang. <http://support.microsoft.com/kb/319303>`__
(The IE team call the article “Internet Explorer Navigation Sound
Update”, which seems to follow the tradition of choosing confusing
article titles such as `WebApp.exe Enables User to Move WebBrowser
Ctrl <http://support.microsoft.com/kb/189634>`__ for an code example
that enable navigating to folders in the webbrowser control)

