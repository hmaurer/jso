module.exports = function(node, context) {
  node['declarations'].each(function(e) {
    var init = e['init'] && context.visit(e['init']) || null;
    context.scope.declare(node['kind'], e['id']['name'], init);
  });
}
