Solitude
===
Solitude is a clutter less writing tool for writers who want some inspiration ala tweets while they write. Its a simple writer with a twitter feed where you can get inspiration by supplying inspirational words, phrases of hashtags to search by. Feel free to fork and contribute. Send a pull request if you feel your additions are noteworthy.


Build, package and install
-------------------------------------
To build this project you need to have nodejs and requirejs installed. To package as a Chrome app you need google chrome. Since it is meant as a Chrome app it currently only supports google Chrome. Or more precisely the css is webkit specific.

To build on OSX:

	cd /path/to/Solitude
	/path/to/requirejs/build/build.sh app.build.js

To package .crx (Chrome app) on OSX:

	cd /path/to/Solitude/build
	/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension=./Solitude/
	
To install:

	open Google Chrome -> Extensions -> drag .crx file into the window -> Accept

