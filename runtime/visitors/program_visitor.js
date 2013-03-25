var context = require('mediator').context;

module.exports = function(node, scope) {
  var result;
  node.body.each(function(child) {
    result = context.visit(child, scope);
  });
  return result;
}
