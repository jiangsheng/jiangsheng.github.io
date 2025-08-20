.. meta::
   :description: As I am a tech person familiar with HTML/CSS/Javascript, the WordPress.Com free plan’s limitations has been an obstacle to my creatively (e.g. add sortable tabl

Merge wordpress.com site with GitHub Pages
=========================================================================================================

.. post:: 7 May, 2025
   :tags: Cloudflare, ABlog, DNS,WordPress
   :category: Sphinx 
   :author: me
   :nocomments:

As I am a tech person familiar with HTML/CSS/Javascript, the WordPress.Com free plan's limitations has been an obstacle to my creatively (e.g. add sortable tables). I have a Github Pages web site running for a few years now and I think now is the time to migrate to github pages. 

I first looked migration tutorials on the internet.  For me the Exporter Plugin (https://blog.netnerds.net/2020/08/migrating-my-wordpress-sites-to-github-pages/) is not an option, as one of the WordPress.Com free plan's limitations is plugin support. Exporting the content looks like the only way to go, but how to import the exported WordPress XML to formats supported by Github Pages is another problem. 

Most guides export as markdown format, which is natively supported by Github's jekyll, but I turned it off on my Pages in favor of Sphinx (https://www.sphinx-doc.org/en/master/index.html) and don't intend to turn it back on. I am also using the ABlog extension for Sphinx (https://ablog.readthedocs.io/en/stable/) to generate tags and categories, which requires some post-processing to add the metadata. 

A good thing is that I know one thing or two about XML. I wrote a small program (https://github.com/jiangsheng/WordPressXmlToStaticFiles) to parse the XML file and extract post content, which is basically HTML encoded in XML. Then I use Pandoc (https://pandoc.org/), in fact the .Net Wrapper PandocNet(https://github.com/SimonCropp/PandocNet) to convert the post HTML to reStructuredText. The RST files then gets build alone with my existing Github Pages content using Sphinx. As Sphinx put everything in the build folder, the WordPressXmlToStaticFiles program also writes HTML pages that redirects WordPress URLs to HTML output in the build folder. 

To be able to find the correct place to put the redirecting pages, I have to study the WordPress exported XML. WordPress has a concept of "slug" for this in its API docs but the term has a different meaning (tags) in the XML format. The WordPress XPath is actually item\Link. Both page title and page content are encoded in CDATA sections. The author of a post is stored in a dc:creator node. The XML format is constantly changing when I am writing the converter, both post publication date and author are now CDATA encoded for some reason. I have to write a function that detect CDATA before node text. Then I copied the generated output to my GitHub Pages repo that is serving the subdomain. 

After finish exporting blogs I added some table of content pages that lists blog posts to get around the build warning "document isn't included in any toctree", and modified CNAME data to point my Github Pages repo to my root domain. Next step is to change my domain provider's DNS setting away from WordPress.com to GitHub Pages. That part is easy, but then my old subdomain would disconnect from GitHub Pages and lose search engine ranking. As GitHub Pages is static, I cannot do a site wide redirect, but I can do it at DNS level via Cloudflare, so I changed the domain's DNS server to Cloudflare and added a redirect rule to redirect my old subdomain. 

After the domain DNS is live on Cloudflare, I got ERR_TOO_MANY_REDIRECTS when visiting my web site. The problem is Cloudflare trying to reach GitHub via HTTP and got redirected to HTTPS (https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/). The solution is to set SSL/TLS encryption mode from Automatic to Full. 

One thing lost in the conversion is comments. As most of my blogs are about tech, the existing Github Pages repo uses a comment system that is based on Github discussions and I don't really have the time to port the comments over. If you are looking for old comments for a specific page, my old WordPress site would be still running, you can check https://jiangshengvc.wordpress.com/ after a few days, or you can find them in the internet archive (https://web.archive.org/web/20240705000000*/http://jiangsheng.net/comments/feed/). 








