var context = require('mediator').context;

function Function(params, block) {
  this.params = params;
  this.block = block;
}

/**
 * Call the function
 */
Function.prototype.call = function(args) {
  var scope = this.block.getScope();
  this.bindParameters(args, scope);
  this.block.call(scope);
}

/**
 * Bind the parameters to the function's arguments (experimental)
 */
Function.prototype.bindParameters = function(args, scope) {
  this.params.each(function(p, index) {
    scope.declare('var', p['name'], context.visit(args[index]) || null);
  });
}

module.exports = Function;
