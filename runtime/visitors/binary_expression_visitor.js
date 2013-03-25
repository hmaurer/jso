var context = require('mediator').context;

module.exports = function(node, scope) {
   var left = context.visit(node.left, scope), right = context.visit(node.right, scope);
   switch(node.operator) {
      case '*':
         return visitMultiplicative(node, left, right, scope);
         break;
      case '+':
         return visitAdditive(node, left, right, scope);
         break;
   }
}

function visitMultiplicative(node, left, right, scope) {
   if(Object.isNumber(left) && Object.isNumber(right)) {
      return left * right;
   }
}

function visitAdditive(node, left, right, scope) {
   if(Object.isNumber(left) && Object.isNumber(right)) {
      return left + right;
   }
}
