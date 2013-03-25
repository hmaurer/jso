var colors = require('colors');

function Context() {
}

/**
* Visit a node
*/
Context.prototype.visit = function(node, scope) {
   var visitor = require('./visitors/' + getVisitorName(node));
   return visitor(node, scope);
}

/**
* Throw an error and dumps tracking informations
*/
Context.prototype.throwError = function(node, message) {
   message = formatString(message, Array.prototype.slice.call(arguments, 2));
   console.log("(Runtime error) ".red + message);
   console.log("(Debug infos) ".blue + JSON.stringify(node['track'], null, 2));
   process.exit(1);
}

/**
* Spawn a new child scope
*/
Context.prototype.spawnScope = function(parent) {
   var Scope = require('./scope');
   return new Scope(parent);
}

/**
* Get the name of the visitor from the node type
*/
function getVisitorName(node) {
   var pattern = /(.{1,})([A-Z])/g;
   return node.type.replace(pattern, '$1_$2').toLowerCase() + '_visitor';
}

/**
* Format a string
*/
function formatString(string, args) {
   for(var i = 0; i < args.length; i++)
   {
      string = string.replace('%' + i, args[i]);
   }
   return string;
}

module.exports = Context;
