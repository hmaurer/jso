var context = require('mediator').context;

function JSOBlock(parent_scope, body) {
   this.parent_scope = parent_scope;
   this.body = body;
}

/**
 * Spawn child scope
 */
JSOBlock.prototype.getScope = function() {
   return context.spawnScope(this.parent_scope);
}

/**
 * Call the block using the given scope
 */
JSOBlock.prototype.call = function(scope) {
   var result;
   this.body.each(function(e) {
      result = context.visit(e, scope);
      return e.type != 'ReturnStatement';
   });
   return result;
}

module.exports = JSOBlock;