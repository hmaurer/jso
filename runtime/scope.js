var context = require('mediator').context;

function Scope(parent) {
   this.parent = parent;
   this.data = {};
}

Scope.prototype.set = function(id, value) {
   var name = id.name;
   if(this.has(name))
   {
      switch(this.data[name].kind)
      {
        case 'val':
          context.throwError(id, "Cannot modify val '%0'", name);
          break;
        default:
          this.data[name].value = value;
          break;
      }
   }
   else if(this.has(name, true))
   {
      this.parent.set(id, value);
   }
   else
   {
      context.throwError(id, "Undefined identifier '%0'", name);
   }
}

Scope.prototype.get = function(id) {
   var name = id.name;
   if(this.has(name))
   {
      return this.data[name].value;
   }
   else if(this.has(name, true))
   {
      return this.parent.get(id);
   }
   else
   {
      context.throwError(id, "Undefined identifier '%0'", name);
   }
}

Scope.prototype.has = function(name, deep) {
   deep = deep || false;
   return Object.has(this.data, name) || (deep && this.parent && this.parent.has(name, true));
}

Scope.prototype.declare = function(kind, id, init) {
   var name = id.name;
   if(!this.has(name))
   {
      this.data[name] = {
         kind: kind,
         value: init
      };
   }
   else
   {
     context.throwError(id, "Identifier '%0' already defined", name);
   }
}

module.exports = Scope;
