var context = require('mediator').context;

module.exports = function(node, scope) {
  return context.visit(node.expression, scope);
}
