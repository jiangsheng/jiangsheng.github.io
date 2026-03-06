.. meta::
   :description: Today I got this error when building my blog based on Sphinx/ABlog extension. When I remove the ABlog post directive, Sphinx indeed gives a warning about the fi

ExtensionError: Could not import extension sphinx.builders.latex 
===================================================================

.. post:: 7 May, 2025
   :tags: ABlog
   :category: Sphinx 
   :author: me
   :nocomments:


Today I got this error when building my blog based on Sphinx after upgrading Sphinx to the latest version. 

.. code-block::

    File "C:\python\envs\sphinx\Lib\site-packages\sphinx\registry.py", line 553, in load_extension
        raise ExtensionError(
    sphinx.errors.ExtensionError: Could not import extension sphinx.builders.latex (exception: No module named 'roman_numerals')

when I do a pip list, the 4.1 version of roman_numerals is indeed installed. Just the build script cannot find it. It probably has something to do with the fact that roman-numerals-py (deprecated) is also installed. Older version of sphinx that requires roman-numerals-py instead of roman_numerals. 

To get rid of deprecated leftovers I removed all installed packages after backing up requirements.txt

.. code-block::

    pip freeze > requirements.txt 
    pip uninstall -r requirements.txt -y

Then reverted requirements.txt and installed the latest version of sphinx. 

.. code-block::

    pip install -r requirements.txt 

The issue goes away after downloading the latest version of dependencies.
