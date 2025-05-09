Fix sphinxcontrib-googleanalytics on Sphinx 1.8
===============================================
.. post:: 5, Jan, 2019
   :category: Uncategorized
   :author: jiangshengvc
   :nocomments:

The Google Analytics extension from

python -m pip install  sphinxcontrib-googleanalytics

does not work on Sphinx 1.8. When I run it, I get the following error

Could not import extension sphinxcontrib.googleanalytics (exception:
cannot import name 'ExtensionError' from 'sphinx.application'
(c:\\python37\\lib\\site-packages\\sphinx\\application.py))

Fix is to change

C:\\Python37\\Lib\\site-packages\\sphinxcontrib\\googleanalytics.py 

Line 4

from

from sphinx.application import ExtensionError

to

from sphinx.errors import ExtensionError

After that I get another warning

WARNING: extension 'sphinxcontrib.googleanalytics' returned an
unsupported object from its setup() function; it should return None or a
metadata dictionary

Fix is to change the last line from

return app

to

return {'version': '0.1'}
