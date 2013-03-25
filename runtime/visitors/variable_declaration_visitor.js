var context = require('mediator').context;

module.exports = function(node, scope) {
  node.declarations.each(function(declarator) {
    var init = declarator.init && context.visit(declarator.init, scope) || 0;
    scope.declare(node.kind, declarator.id, init);
  });
}
