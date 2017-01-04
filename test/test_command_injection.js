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

  	const correct_answer = ["\tCheck: CIEV\tLine Num: 4\tCol: 11\tSuggestion: Use JSON.parse()\n"];

  	t.deepEqual(violations,correct_answer);
});

test('Command Injection 2', t => {

	const js_file = "test/data_files/test2.js";

  	const content = fs.readFileSync(js_file,'utf-8');
  	const ast = esprima.parse(content,{loc:true});
  	var violations = ci_i.run(ast);

  	const correct_answer = ["\tCheck: CIEV\tLine Num: 2\tCol: 14\tSuggestion: Use JSON.parse()\n"];

  	t.deepEqual(violations,correct_answer);
});

test('Command Injection 3', t => {

	const js_file = "test/data_files/example1.js";

  	const content = fs.readFileSync(js_file,'utf-8');
  	const ast = esprima.parse(content,{loc:true});
  	var violations = ci_i.run(ast);

  	const correct_answer = ["\tCheck: CIEV\tLine Num: 13\tCol: 2\tSuggestion: Use JSON.parse()\n"];

  	t.deepEqual(violations,correct_answer);
});