var context = require('mediator').context;

function JSOFunction(params, block) {
   this.params = params;
   this.block = block;
}

/**
 * Call the function
 */
JSOFunction.prototype.call = function(node) {
   var scope = this.block.getScope();
   this.bindParameters(node, scope);
   return this.block.call(scope);
}

/**
 * Bind the parameters to the function's arguments
 */
JSOFunction.prototype.bindParameters = function(node, scope) {
   var args = node.arguments;
   if(args.length < this.params.length) {
      context.throwError(node, "The function take more than %0 arguments.", args.length)
   }
   this.params.each(function(param, index) {
      scope.declare('var', param, context.visit(args[index]) || null);
   });
}

module.exports = JSOFunction;
