module.exports = function(node, context) {
  var left = context.visit(node['left']);
  var right = context.visit(node['right']);

  switch(node['operator']) {
  case '*':
    return visitMultiplicative(left, right);
    break;
  case '+':
    return visitAdditive(left, right);
    break;
  }
}

function visitMultiplicative(left, right) {
  if(Object.isNumber(left) && Object.isNumber(right)) {
    return left * right;
  } else {
    throw Error('Supported operations: num * num');
  }
}

function visitAdditive(left, right) {
  if(Object.isNumber(left) && Object.isNumber(right)) {
    return left + right;
  } else {
    throw Error('Supported operations: num + num');
  }
}
