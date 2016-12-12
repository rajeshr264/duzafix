// main
var option_parser = require("./src/option_parser.js");
var opt_i = new option_parser();

var argv = process.argv;
opt_i.run(argv);


var command_injection = require("./checks/command_injection.js");
var ci_i = new command_injection();
var esprima = require('esprima');
var fs = require('fs');

var report = require("./src/report.js");
var report_i = new report();

for (var jsf_i = 0;jsf_i<opt_i.js_files.length;++jsf_i) {
	const js_file = opt_i.js_files[jsf_i];
  	const content = fs.readFileSync(js_file,'utf-8');
  	const ast = esprima.parse(content,{loc:true});
  	var violations = ci_i.run(ast);
  	report_i.add_violation(js_file,violations);
}

report_i.publish(opt_i.output_file);

