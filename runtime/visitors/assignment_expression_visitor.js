var context = require('mediator').context;

module.exports = function(node, scope) {
   var right = context.visit(node.right, scope);
   switch(node.left.type)
   {
      case 'Identifier':
         scope.set(node.left, right);
         break;
   }
   return right;
}
