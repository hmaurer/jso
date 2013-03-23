module.exports = function(node, context) {
  return context.visit(node['expression']);
}
