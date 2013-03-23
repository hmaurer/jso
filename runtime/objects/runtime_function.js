var Scope = require('./../scope');
var Context = require('./../context');

function RuntimeFunction(parent_scope, params, body) {
  this.parent_scope = parent_scope;
  this.params = params;
  this.body = body;
}

/**
 * Call the function
 */
RuntimeFunction.prototype.call = function(args) {
  var context = new Context();
  context.scope = new Scope(this.parent_scope);
  bindParameters(this.params, args, context);
  this.body.each(function(e) {
    context.visit(e);
  });
}

/**
 * Bind the parameters to the function's arguments (experimental)
 */
function bindParameters(params, args, context) {
  params.each(function(p, index) {
    context.scope.declare('var', p['name'], context.visit(args[index]) || null);
  });
}

module.exports = RuntimeFunction;
