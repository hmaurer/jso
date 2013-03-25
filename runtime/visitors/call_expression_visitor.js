var context = require('mediator').context;

module.exports = function(node, scope) {
  var fn = scope.get(node.callee);
  return fn.call(node.arguments);
}
