var context = require('mediator').context;

var Function = require('./../objects/function');

module.exports = function(node, scope) {
   var block = context.visit(node.body);
   scope.declare(
      'def',
      node.id,
      new Function(node.params, block)
   );
}
