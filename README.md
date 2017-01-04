# duzarac : run static checks for security holes on server-side javascript code
*Welcome to Duzarac!*

__Requirements__
* node.js version: v6.9.2+

__Checkout the code__
* git clone https://github.com/rajeshr264/duzarac.git
* cd duzarac
* npm install
* node duzarac.js --help (shows the options)

__Sample run:__

* node duzarac.js -j test/data_files/test1.js -o /tmp/report.log (report will be in: /tmp/report.log)
* node duzarac.js -f test/data_files/js_files.txt (JS file paths are in js_files.txt, report filename will be generated)

__To run AVA tests:__

* npm install --only=dev
* npm t


Webpage: https://rajeshr264.github.io/duzarac


