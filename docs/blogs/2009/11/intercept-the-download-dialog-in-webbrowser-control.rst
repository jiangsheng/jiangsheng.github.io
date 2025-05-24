.. meta::
   :description: User rsd102 looks already find the solution to his question when he posted the question to CSDN, except for one missing piece. The sample he found is for overri

Intercept the download dialog in webbrowser control
===================================================
.. post:: 4, Nov, 2009
   :tags: Active Template Library,Trident (layout engine),Visual C++,WebBrowser Control
   :category: CSDN,enmsdn,Microsoft,Visual Studio
   :author: me
   :nocomments:

User rsd102 `looks already find the solution to his
question <http://topic.csdn.net/u/20091028/16/db45edcc-bc4a-42e7-950a-93c0c78f0a01.html>`__
when he posted the question to `CSDN <http://community.csdn.net>`__,
except for one missing piece. The sample he found is for overriding the
global download manager, and what he need is a process wide override. 

It
looks like rsd102 is loving research. He found more than he can
understand initially. After being suggested twice with the vague IE
`SDK <http://en.wikipedia.org/wiki/Software_development_kit>`__
documentation he decided to post the sample code he was working on. And
when the final answer was given he had problem adopting it. 

The answer
was for adding INewWindowManager, not IDownloadManager, to the
webbrowser site, and it has undisclosed error that prevented his
adoption. In
`VC6 <http://msdn2.microsoft.com/en-us/visualc/default.aspx>`__ things
are easier-there is not much browser host support-so the user settled
with a VC6 solution.

It is pleasant to see a user doing active research
before positing a question, however we may not see the question online
if the user take some time reading the documentation he found during
research.

