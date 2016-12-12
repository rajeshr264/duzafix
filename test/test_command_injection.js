import test from 'ava';

var command_injection = require("../checks/command_injection.js");
var ci_i = new command_injection();
var esprima = require('esprima');
var fs = require('fs');

test('Command Injection 1', t => {

	const js_file = "test/data_files/test1.js";

  	const content = fs.readFileSync(js_file,'utf-8');
  	const ast = esprima.parse(content,{loc:true});
  	var violations = ci_i.run(ast);

  	const correct_answer = ["Line Num: 4 Col: 11"];

  	t.deepEqual(violations,correct_answer);
});