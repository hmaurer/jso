var context = require('mediator').context;

var JSOFunction = require('./../objects/jso_function');

module.exports = function(node, scope) {
   var block = context.visit(node.body, scope);
   var fn = new JSOFunction(node.params, block);
   scope.declare('fun', node.id, fn);
}
