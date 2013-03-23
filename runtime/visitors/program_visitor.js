var Scope = require('./../scope');

module.exports = function(node, context) {
  context.scope = new Scope();

  var result;
  node['body'].each(function(child) {
    result = context.visit(child);
  });
  console.log(result);
}
