.. meta::
   :description: After checking the source code of the PyData theme, it is apparent that the theme’s __init__.py force the setting to be on. If not on, then it sets the config a

Sphinx project always rebuild after installing the ablog extension
=========================================================================================================

.. post:: 8 May, 2025
   :tags: ablog, pydata
   :category: Sphinx
   :author: me
   :nocomments:

After checking the source code of the PyData theme, it is apparent that the theme's __init__.py force the setting to be on. If not on, then it sets the config and forces a full rebuild.

.. code-block:: python

    if "ablog" in app.config.extensions and not _config_provided_by_user( 
        app, "fontawesome_included" 
    ): 
    app.config.fontawesome_included = True 

The solution is setting 

.. code-block:: python

    fontawesome_included = True

in conf.py. 

