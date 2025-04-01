# -*- coding: utf-8 -*-
#
# Configuration file for the Sphinx documentation builder.
#
# This file does only contain a selection of the most common options. For a
# full list see the documentation:
# http://www.sphinx-doc.org/en/stable/config

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys

import os
import sys

sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('_ext'))

# -- Project information -----------------------------------------------------

project = u'jiangsheng'
copyright = u'2018-, Sheng Jiang'
author = u'Sheng Jiang'

html_title=u'jiangsheng\'s docs'

# The short X.Y version
version = u''
# The full version, including alpha/beta/rc tags
release = u'1'


# -- General configuration ---------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
#
# needs_sphinx = '1.0'

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.doctest',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.mathjax',
    'sphinx.ext.ifconfig',
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages',
    'sphinx_sitemap',
    'edit_on_github',
    'linuxdoc.rstFlatTable'
]
edit_on_github_project  = 'jiangsheng/jiangsheng.github.io'
edit_on_github_url = 'docs/'
edit_on_github_branch = 'master/docs'

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
#
# source_suffix = ['.rst', '.md']
source_suffix = '.rst'

# The master toctree document.
master_doc = 'reference'

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = u'zh-CN'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path .
exclude_patterns = []

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
#html_theme = 'alabaster'
html_theme = 'pydata_sphinx_theme'


# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#
#html_theme_options = {
#     'page_width': 'auto',
#     'body_max_width': 'auto'
#     }

# Theme options are theme-specific and customize the look and feel of a
# theme further.
html_theme_options = {
"navbar_start": ["navbar-logo"],
"navbar_center": ["navbar-nav"],
"navbar_end": ["navbar-icon-links"],
"navbar_persistent": ["search-button"],
"article_footer_items": ["comments"],
"navigation_with_keys":True
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

# Custom sidebar templates, must be a dictionary that maps document names
# to template names.
#
# The default sidebars (for documents that don't match any pattern) are
# defined by theme itself.  Builtin themes are using these templates by
# default: ``['localtoc.html', 'relations.html', 'sourcelink.html',
# 'searchbox.html']``.
#
# html_sidebars = {}
html_sidebars = {
    '**': [
        'globaltoc.html',
        'relations.html',
        'searchbox.html',
        'sourcelink.htm',
        ],
    'index': [
        'globaltoc.html',
        'relations.html',
        'searchbox.html',
        'sourcelink.htm',
        ],
}
html_baseurl='https://git.jiangsheng.net/build/html/'

# -- Options for HTMLHelp output ---------------------------------------------

# Output file base name for HTML help builder.
htmlhelp_basename = 'jiangshengdoc'


# -- Options for LaTeX output ------------------------------------------------

latex_elements={# The paper size ('letterpaper' or 'a4paper').
'papersize':'a4paper',# The font size ('10pt', '11pt' or '12pt').
'pointsize':'12pt','classoptions':',oneside','babel':'',#必須
'inputenc':'',#必須
'utf8extra':'',#必須
# Additional stuff for the LaTeX preamble.
'preamble': r"""
\usepackage{xeCJK}
\usepackage{indentfirst}
\setlength{\parindent}{2em}
\setCJKmainfont{WenQuanYi Micro Hei}
\setCJKmonofont[Scale=0.9]{WenQuanYi Micro Hei Mono}
\setCJKfamilyfont{song}{WenQuanYi Micro Hei}
\setCJKfamilyfont{sf}{WenQuanYi Micro Hei}
\XeTeXlinebreaklocale "zh"
\XeTeXlinebreakskip = 0pt plus 1pt
"""}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title,
#  author, documentclass [howto, manual, or own class]).
latex_documents = [
    (master_doc, 'jiangsheng.tex', u'jiangsheng Documentation',
     u'Sheng Jiang', 'manual'),
]


# -- Options for manual page output ------------------------------------------

# One entry per manual page. List of tuples
# (source start file, name, description, authors, manual section).
man_pages = [
    (master_doc, 'jiangsheng', u'jiangsheng Documentation',
     [author], 1)
]


# -- Options for Texinfo output ----------------------------------------------

# Grouping the document tree into Texinfo files. List of tuples
# (source start file, target name, title, author,
#  dir menu entry, description, category)
texinfo_documents = [
    (master_doc, 'jiangsheng', u'jiangsheng Documentation',
     author, 'jiangsheng', 'One line description of project.',
     'Miscellaneous'),
]


# -- Options for Epub output -------------------------------------------------

# Bibliographic Dublin Core info.
epub_title = project
epub_author = author
epub_publisher = author
epub_copyright = copyright

# The unique identifier of the text. This can be a ISBN number
# or the project homepage.
#
# epub_identifier = ''

# A unique identification for the text.
#
# epub_uid = ''

# A list of files that should not be packed into the epub file.
epub_exclude_files = ['search.html']


# -- Extension configuration -------------------------------------------------

# -- Options for intersphinx extension ---------------------------------------

# Example configuration for intersphinx: refer to the Python standard library.
intersphinx_mapping = {'python': ('https://docs.python.org/3', None)}

# -- Options for todo extension ----------------------------------------------

# If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = True

	
# google analytics
googleanalytics_id = 'UA-30166843-2'

sitemap_locales = ['zh-CN']
sitemap_url_scheme = "{version}{link}"
def setup(app):
    app.add_css_file('css/custom.css')
    app.add_js_file("https://www.googletagmanager.com/gtag/js?id=G-BP5YBNN42N")
    app.add_js_file("google_analytics_tracker.js")
   