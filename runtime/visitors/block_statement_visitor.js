var context = require('mediator').context;

var Block = require('./../objects/block');

module.exports = function(node, scope) {
   return new Block(scope, node.body);
}
