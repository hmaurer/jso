var context = require('mediator').context;

function JSOFunction(params, block) {
   this.params = params;
   this.block = block;
}

/**
* Call the function
*/
JSOFunction.prototype.call = function(args) {
   var scope = this.block.getScope();
   this.bindParameters(args, scope);
   return this.block.call(scope);
}

/**
* Bind the parameters to the function's arguments (experimental)
*/
JSOFunction.prototype.bindParameters = function(args, scope) {
   this.params.each(function(param, index) {
      scope.declare('var', param, context.visit(args[index]) || null);
   });
}

module.exports = JSOFunction;
