ABlog Exception Missing title from Invisible Character
===================================================================

.. post:: 7 May, 2025
   :tags: ABlog
   :category: Sphinx 
   :author: me
   :nocomments:


Today I got this error when building my blog based on Sphinx/ABlog extension. 

.. code-block::

    sphinx.errors.ExtensionError: Handler <function process_posts> for event 'doctree-read' threw an exception (exception: Missing title)

When I remove the ABlog post directive, Sphinx indeed gives a warning about the file's title:

.. code-block::

    WARNING: toctree contains reference to document ..... that doesn't have a title: no link will be generated [toc.no_title]

Opening the document in a Hex editor reveals that the document has a unicode character U+200B in the header marker. Removing it solved the issue. 

The document was generated from PanDoc (see :doc:`merge_wordpress.com_site_with_github_pages`), not sure why it inserts a zero-width space. 