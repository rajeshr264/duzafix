// Option parser
function option_parser() {

	// private method
	var parse_glob = function(path_expr) {
		var glob = require('glob');
		return glob.sync(path_expr);
	}

	// exported method
	option_parser.prototype.run = function(argv) {

		if (argv.length == 0) {
			console.log("Error: No arguments specified. Run \'node duzarac.js --help\'");
			process.exit(0);
		}

		var program = require('commander');

		program
			.version('0.0.1')
			.usage('[options]')
			.option('-j, --js <file>[,<file>]', 'Specify comma seperated JS files or a Path regex in quotes. For eg: -j parser.js,sh.js or -j \"src/*.js\"')
			.option('-f, --file <file>', 'Specify a file that contains JS file paths')
			.option('-o, --output <file>', 'Specify the Report file')
			.parse(argv);

		// Store all the JS files specified
		var _js_files = [];

		if (program.js) {
			var f = program.js.split(',');
		
			for (var i = 0; i < f.length; ++i) {
				var jsf = parse_glob(f[i]);
				_js_files = _js_files.concat(jsf);
			}
			program.js = undefined;//reset because it caused AVA test failures
		}  

		if (program.file) {
			var fs = require('fs');
			var contents = fs.readFileSync(program.file, 'utf8');
			var f = contents.split('\n');
			for (var i = 0; i < f.length; i++) {
				if (f[i].length == 0) {
					continue;
				}
				var jsf = parse_glob(f[i]);
				_js_files = _js_files.concat(jsf);
			}
			program.file = undefined;//reset because it caused AVA test failures
		}


		if (_js_files.length == 0) {
			console.log("Error: No javascript files specified via -j or -f options.");
			process.exit(1);

		}

		option_parser.prototype.js_files = _js_files;

		option_parser.prototype.output_file = program.output;

		program.output=undefined;//reset because it caused AVA test failures
	}
}

module.exports = option_parser;
