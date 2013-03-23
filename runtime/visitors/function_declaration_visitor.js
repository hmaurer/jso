var RuntimeFunction = require('./../objects/runtime_function');

module.exports = function(node, context) {
  context.scope.declare(
    'def',
    node['id']['name'],
    new RuntimeFunction(context.scope, node['params'], node['body']['body'])
  );
}
