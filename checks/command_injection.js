// CommonJS module style
function command_injection() {

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
		var violations = [];

		// publish the info about the found eval() instances
		if (eval_func_instances != undefined ) { 
			for (i=0;i<eval_func_instances.length;i++) {
				var str = "\tCheck: CIEV" + "\tLine Num: " + eval_func_instances[i].loc.start.line 
						  + "\tCol: " + eval_func_instances[i].loc.start.column + '\n';
				violations.push(str);
			}
		}

		return violations;
	}
}

module.exports = command_injection;