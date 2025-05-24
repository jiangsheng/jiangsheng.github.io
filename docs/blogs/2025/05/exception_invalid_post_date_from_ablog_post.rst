.. meta::
   :description: Today I am getting some strange error when I am trying to convert my blogs to the ablog extension of Sphinx. The error log has the following lines Extension err

Misleading Error Message from ablog.post Part 2
=========================================================================================================

.. post:: 17 May, 2025
   :tags: ablog
   :category: Sphinx
   :author: me
   :nocomments:

Today I am getting some strange error when I am trying to convert my blogs to the ablog extension of Sphinx. The error log has the following lines

    Extension error (ablog.post)!

    raise ExtensionError(
        sphinx.errors.ExtensionError: Handler <function process_posts at 0x000001B06685FEC0> for event 'doctree-read' threw an exception (exception: invalid post date in:


Luckily only some of the blogs throw this error, by comparing the blogs that fail and those don't, I found that the culprit is the .. index:: directive right before the .. post:: directive. 

Moving the index directive after the post directive solved this problem.

Update: I am getting the same error again when the post begins with a blog quote. Adding an link target anchor solved the issue. ABlog seems to be too greedy to look for directive. 


