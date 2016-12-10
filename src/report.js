// This module hosts functionality to print the final report. It follows the CommonJS module API.

function report() {

	// data members
	this._report_filename = "";
	this._total_checks_ran = {};
	this._violations_found = {};

	// public APIs
	report.prototype.add_violation = function(filename, check_tag, line_number, column_number) {

		// store all violations array of strings, per filename 
		const str = "\tCheck#: " + check_tag + "\tLine#: " + line_number + "\tCol#: " + column_number + "\n";
		if (filename in this._violations_found) { // has this filename been registered before?
			var value = this._violations_found[filename];
			value += str;
			this._violations_found[filename] = value; //  append this violation to existing list
		} else {
			this._violations_found[filename] = str; //  add first violation
		}
	}

	report.prototype.publish = function(filename) {

		const fs = require('fs');

		if (filename == undefined) {
			// generate a report file name in current dir based on today's date.
			filename = new Date().getTime();
			filename += ".secrpt";
		}
		this._report_filename = filename;
		
		console.log("Info: Writing report to file: " + this._report_filename);

		var report_preamble = "\n//\tDUZARAC report\n";
		report_preamble += "//\tDate: " + new Date().toDateString() + " " + new Date().toTimeString() + '\n';
		fs.appendFileSync(this._report_filename,report_preamble);

		// iterate over the _violations_found hash table and print out the violations
		for (const filename in this._violations_found) {
			fs.appendFileSync(this._report_filename,"\nFile : " + filename + "\n");
			fs.appendFileSync(this._report_filename,this._violations_found[filename]);
		}
	}
}
module.exports = report;