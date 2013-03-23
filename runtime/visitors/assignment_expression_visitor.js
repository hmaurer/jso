module.exports = function(node, context) {
  var right = context.visit(node['right']);
  context.scope.set(node['left']['name'], right);
  return right;
}
