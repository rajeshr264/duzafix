// CommonJS module style
function command_injection() {

	var _violations = [];

	// callback function
	function isEvalIdentifier(node) {

		//console.log(JSON.stringify(node));
		if ((node.type == "Identifier") && (node.name == "eval")) {
			return true;
		} else
			return false;
	}

	command_injection.prototype.run = function(ast) {  

		let ast_walker = require('esprima-ast-utils');
		var eval_func_instances = ast_walker.filter(ast, isEvalIdentifier);

		// publish the info about the found eval() instances
		if (eval_func_instances != undefined ) { 
			for (i=0;i<eval_func_instances.length;i++) {
				var str = "Line Num: " + eval_func_instances[i].loc.start.line 
						  + " Col: " + eval_func_instances[i].loc.start.column;
				_violations.push(str);
			}
		}

		return _violations;
	}
}

module.exports = command_injection;