var context = require('mediator').context;

module.exports = function(node, scope) {
  return scope.get(node);
}
