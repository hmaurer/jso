ast = {};

/* Program */
ast.createProgram = function(body) {
  return {
    type: 'Program',
    body: body
  }
}

/* Inspect Statement; just for debugging */
ast.createInspectStatement = function() {
  return {
    type: 'InspectStatement'
  }
}

/* Return Statement */
ast.createReturnStatement = function(argument) {
  return {
    type: 'ReturnStatement',
    argument: argument
  }
}

/* Function Declaration */
ast.createFunctionDeclaration = function(id, params, body) {
  return {
    type: 'FunctionDeclaration',
    id: id,
    params: params,
    body: body
  }
}

/* Lambda Expression */
ast.createLambdaExpression = function(params, body) {
  return {
    type: 'LambdaExpression',
    params: params,
    body: body
  }
}

/* Call Expression */
ast.createCallExpression = function(callee, arguments) {
  return {
    type: 'CallExpression',
    callee: callee,
    arguments: arguments
  }
}

/* Variable Declaration */
ast.createVariableDeclaration = function(kind, declarations) {
  return {
    type: 'VariableDeclaration',
    declarations: declarations,
    kind: kind
  }
}

/* Variable Declarator */
ast.createVariableDeclarator = function(id, init) {
  return {
    type: 'VariableDeclarator',
    id: id,
    init: init
  }
}

/* Block statement */
ast.createBlockStatement = function(body) {
  return {
    type: 'BlockStatement',
    body: body
  }
}

/* Expression statement */
ast.createExpressionStatement = function(expression) {
  return {
    type: 'ExpressionStatement',
    expression: expression
  }
}

/* Assignement Expression */
ast.createAssignmentExpression = function(operator, left, right) {
  return {
    type: 'AssignmentExpression',
    operator: operator,
    left: left,
    right: right
  }
}

/* Binary Expression, i.e. 3 * 4 */
ast.createBinaryExpression = function(operator, left, right) {
  return {
    type: 'BinaryExpression',
    operator: operator,
    left: left,
    right: right
  }
}

/* Unary Expression */
ast.createUnaryExpression = function(operator, argument) {
  return {
    type: 'UnaryExpression',
    operator: operator,
    argument: argument
  }
}

/* Identifier */
ast.createIdentifier = function(name) {
  return {
    type: 'Identifier',
    name: name
  }
}

/* Literal, i.e. Numeric, String, Boolean,... */
ast.createNumericLiteral = function(raw) {
  return {
    type: 'Literal',
    value: parseFloat(raw)
  }
}

module.exports = ast;
