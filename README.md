Orion
=====

Everything related to the Orion Open Allocation Project Management Tool

Using the Meteor.js framework

meteor is a preview, this is a small project.

Use at your own Risk!


Instructions on running Orion:

( Tested on Ubuntu 12.04 LTS and CentOS 6/RHEL 6 )


Install meteor:

     curl https://install.meteor.com | /bin/sh

Install nodejs 0.8.23:

     wget http://nodejs.org/dist/v0.8.23/node-v0.8.23.tar.gz
     cd node-v0.8.23/
     ./configure
     make -j4
     sudo make install

  NOTE: The 4 in make -j4 needs to be adjusted for your number of cores.


Install meteorite :

     sudo npm install -g meteorite

Clone repo: 

     git clone https://github.com/guimarin/orion.git

Run Orion

     cd orion
     mrt
