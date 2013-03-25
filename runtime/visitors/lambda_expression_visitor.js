var context = require('mediator').context;

var JSOFunction = require('./../objects/jso_function');

module.exports = function(node, scope) {
   var block = context.visit(node.body, scope);
   return new JSOFunction(node.params, block);
}
