Misleading Error Message from ablog.post
=========================================================================================================

.. post:: 6 May, 2025
   :tags: ablog
   :category: Sphinx
   :author: me
   :nocomments:

Today I am getting some strange error when I am trying to convert my blogs to the ablog extension of Sphinx. The error log has the following lines

Extension error (ablog.post)!

anaconda3\envs\sphinx\Lib\site-packages\sphinx\events.py", line 415, in emit
        raise ExtensionError(sphinx.errors.ExtensionError: Handler <function process_posts at 0x00000279DBC23EC0> for event 'doctree-read' threw an exception (exception: Losing "ids" attribute: ['index-1', 'index-0'])
	
Luckily only some of the blogs throw this error, by comparing the blogs that fail and those don't, I found that the culprit is the .. index:: directive right before the .. post:: directive. 

Moving the index directive after the post directive solved this problem.

