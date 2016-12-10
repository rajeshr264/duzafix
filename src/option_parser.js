// Option parser
function option_parser() {

	// private method
	var parse_glob = function(path_expr) {
		var glob = require('glob');
		return glob.sync(path_expr);
	}

	// exported method
	option_parser.prototype.parse = function() {

		if (process.argv.length == 2) {
			console.log("Error: No arguments specified. Run \'node duzarac.js --help\'");
			process.exit(0);
		}

		var program = require('commander');

		program
			.version('0.0.1')
			.usage('[options]')
			.option('-j, --js <file>[,<file>]', 'Specify a JS file or a Path regex in quotes. For eg: -j parser.js or -j \"src/*.js\"')
			.option('-f, --file <file>', 'Specify a file that contains JS file paths')
			.option('-o, --output <file>', 'Specify the Report file')
			.parse(process.argv);

		// Store all the JS files specified
		var this._js_files = [];

		if (program.js) {
			var f = program.js.split(',');
			for (var i = 0; i < f.length; ++i) {
				var jsf = parse_glob(f[i]);
				this._js_files = this._js_files.concat(jsf);
			}
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
				this._js_files = this._js_files.concat(jsf);
			}
		}

		option_parser.prototype.js_files = this._js_files;

		option_parser.output_file = program.output;

	}
}

module.exports = option_parser;
