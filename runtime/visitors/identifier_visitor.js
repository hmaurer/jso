module.exports = function(node, context) {
  return context.scope.get(node['name']);
}
