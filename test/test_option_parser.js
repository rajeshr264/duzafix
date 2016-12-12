import test from 'ava';

var option_parser = require("../src/option_parser.js");
var opt_i = new option_parser();

test('-j,-f options test', t => {
  var argv =
    ['/usr/local/Cellar/node/7.1.0/bin/node',
      '/Users/rradhakr/project/nodejs/duzarac/duzarac.js',
      '-j', 'test/data_files/test1.js,test/data_files/test2.js',
      '-f', 'test/data_files/js_files.txt'
    ];

  opt_i.parse(argv);
  const correct_answer =
    ['test/data_files/test1.js',
      'test/data_files/test2.js',
      'test/data_files/example1.js'
    ];

  t.deepEqual(correct_answer, opt_i.js_files);
});

test('-j,-o options test', t => {
  var argv =
    ['/usr/local/Cellar/node/7.1.0/bin/node',
      '/Users/rradhakr/project/nodejs/duzarac/duzarac.js',
      '-j', 'test/data_files/test2.js',
      '-o', 'test.log'
    ];

  opt_i.parse(argv);
  const correct_answer = ['test/data_files/test2.js'];

 // t.deepEqual(correct_answer, opt_i.js_files);
  t.deepEqual('test.log', opt_i.output_file);
});