var Scope = require('./../scope');
var Context = require('./../context');

module.exports = function(node, context) {
  var fn = context.scope.get(node['callee']['name']);
  fn.call(node['arguments']);
}
