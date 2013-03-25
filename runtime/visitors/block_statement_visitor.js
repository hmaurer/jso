var context = require('mediator').context;

var JSOBlock = require('./../objects/jso_block');

module.exports = function(node, scope) {
   return new JSOBlock(scope, node.body);
}
