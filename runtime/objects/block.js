var context = require('mediator').context;

function Block(parent_scope, body) {
  this.parent_scope = parent_scope;
  this.body = body;
}

/**
 * Spawn child scope
 */
Block.prototype.getScope = function() {
   return context.spawnScope(this.parent_scope);
}

/**
 * Call the block using the given scope
 */
Block.prototype.call = function(scope) {
  this.body.each(function(e) {
    context.visit(e, scope);
  });
}

module.exports = Block;
