function Context() {
  this.scope = null;
}

Context.prototype.visit = function(node) {
  var visitor = require('./visitors/' + getVisitorName(node));
  return visitor(node, this);
}

function getVisitorName(node) {
  var pattern = /(.{1,})([A-Z])/g;
  return node.type.replace(pattern, '$1_$2').toLowerCase() + '_visitor';
}

module.exports = Context;
