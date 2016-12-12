# duzarac : run static checks for security holes on server-side javascript code
To run it:
1. git clone https://github.com/rajeshr264/duzarac.git
2. cd duzarac
3. npm install 
4. node duzarac.js --help (shows the options)

Sample run:
1. node duzarac.js -j test/data_files/test1.js -o /tmp/report.log (report will be in: /tmp/report.log)
2. node duzarac.js -f test/data_files/js_files.txt (report filename will be generated)


To be able to run tests: 
1. npm install --only=dev
2. npm t
