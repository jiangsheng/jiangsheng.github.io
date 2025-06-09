.. meta::
   :description: Today I am getting some strange error when I am trying to convert my blogs to the ablog extension of Sphinx. The error log has the following lines Extension err

Another Aggressive Looking Ahead and Misleading Error Message from ablog.post
=========================================================================================================

.. post:: 6 May, 2025
   :tags: ABlog
   :category: Sphinx
   :author: me
   :nocomments:

Today I am getting some strange error when I am trying to convert my blogs to the ablog extension of Sphinx. The error log has the following lines

        Extension error (ablog.post)!

        anaconda3\envs\sphinx\Lib\site-packages\sphinx\events.py", line 415, in emit
                raise ExtensionError(sphinx.errors.ExtensionError: Handler <function process_posts at 0x00000279DBC23EC0> for event 'doctree-read' threw an exception (exception: Losing "ids" attribute: ['index-1', 'index-0'])
	
The page has the same date format as pages that successfully got compiled. The problem obviously come from elsewhere. 

the .. post:: directive is right after the page title and before a quoted (indented) paragraph. The page title is also ahead of the post directive in other pages that successfully got compiled, so the problem is the quotation. 

Remove the indent solved the problem for the moment, as the indention is actually from the conversion and not needed. In the context of actually wanted quotation, an link target anchor is probably needed. ABlog seems to be too greedy to look for directive. 


