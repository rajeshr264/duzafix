function command_injection(options) {
	
	this._ast = options.ast;

	if (!options.ast) {
		throw new Error('Esprima-AST object must be specified as an input parameter.');
	}

	var this._result_strings = [];

	// callback function
	function isEvalIdentifier(node) {

		//console.log(JSON.stringify(node));
		if ((node.type == "Identifier") && (node.name == "eval")) {
			return true;
		} else
			return false;
	}	

	var command_injection.prototype.run = function() {  

		let ast_walker = require('esprima-ast-utils');
		var eval_func_instances = ast_walker.filter(ast, isEvalIdentifier);

		// publish the info about the found eval() instances
		if (eval_func_instances != undefined ) { 
			for (i=0;i<eval_func_instances.length;i++) {
				var str = "Line Num: " + eval_func_instances[i].loc.start.line 
						  + " Col: " + eval_func_instances[i].loc.start.column;
				this._result_strings = this._result_strings.concat(str);
			}
		}
	}
}

module.exports = command_injection;