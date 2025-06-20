.. meta::
   :description: I am installing eHMP on Centos 7. Centos 7 has ruby 2.0 out of box, thus the install fails with Following the instructions at https://noobient.com/2019/02/12/in

Finding the right ruby version
==============================
.. post:: 13, May, 2020
   :category: ruby
   :author: me
   :nocomments:

I am installing eHMP on Centos 7. Centos 7 has ruby 2.0 out of box, thus the install

.. code-block::

   chef-client -o workstation --config ~/Projects/vistacore/.chef/knife.rb

fails with

.. code-block::
   
   rb-notify version 0.10.0 needs Ruby 2.2.2 or newer

Following the instructions at
https://noobient.com/2019/02/12/installing-rvm-and-ruby-on-centos-7/ I
got ruby 2.7 installed. However

.. code-block::
   
   sudo chef-client -o workstation --config ~/Projects/vistacore/.chef/knife.rb

fails with the same error.

run

.. code-block::
   
   ruby –version

shows that rvm has no effect on sudo. I am still running the script
against Ruby 2.0

Supposedly I can sudo and install rvm there, but rvm complained and
suggested me to use rvmsudo instead. Then I tried it, rvmsudo doesn’t
carry over my environment, even $HOME, thus the script still fails.

After searching for awhile I found a walkaround

.. code-block::
   
   rvmsudo bash -c "HOME=$HOME; exec bash" chef-client -o workstation --config ~/Projects/vistacore/.chef/knife.rb

This gets the home directory passed to the script, now the script is
complaining

.. code-block::
   
   STDERR: ERROR:  While executing gem ... (OptionParser::InvalidOption)
   invalid option: --no-rdoc

The script was pretty old, I know. I have no time to fix the script, so
I need to downgrade the ruby version. After testing for each version I
settled for 2.3.

.. code-block::
   
   rvm install 2.3
   rvm use 2.3 –default
   sudo gem update --system 2.3

Now the script runs successfully.

