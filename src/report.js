// This module hosts functionality to print the final report. It follows the CommonJS module API.

function report() {

	// data members
	var _report_filename = "";
	var _total_checks_ran = {};
	var _violations_found = {};

	// public APIs
	report.prototype.add_violation = function(filename, check_tag, line_number, column_number) {

		// store all violations array of strings, per filename 
		const str = "\tCheck#: " + check_tag + "\tLine#: " + line_number + "\tCol#: " + column_number + "\n";
		if (filename in _violations_found) { // has this filename been registered before?
			var value = _violations_found[filename];
			value += str;
			_violations_found[filename] = value; //  append this violation to existing list
		} else {
			_violations_found[filename] = str; //  add first violation
		}
	}

	report.prototype.publish = function(filename) {

		const fs = require('fs');

		if (filename == undefined) {
			// generate a report file name in current dir based on today's date.
			filename = new Date().getTime();
			filename += ".secrpt";
		}
		_report_filename = filename;
		
		console.log("Info: Writing report to file: " + _report_filename);

		var report_preamble = "\n//\tDUZARAC report\n";
		report_preamble += "//\tDate: " + new Date().toDateString() + " " + new Date().toTimeString() + '\n';
		fs.appendFileSync(_report_filename,report_preamble);

		// iterate over the _violations_found hash table and print out the violations
		for (const filename in _violations_found) {
			fs.appendFileSync(_report_filename,"\nFile : " + filename + "\n");
			fs.appendFileSync(_report_filename,_violations_found[filename]);
		}
	}
}
module.exports = report;