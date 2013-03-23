function Scope(parent) {
  this.parent = parent;
  this.data = {};
}

Scope.prototype.set = function(name, value) {
  if(this.has(name)) {
    if(this.data[name].kind != 'val') {
      this.data[name].value = value;
    } else {
      throw Error("Cannot modify val '" + name + "'");
    }
  } else if(this.has(name, true)) {
    this.parent.set(name, value);
  } else {
    throw Error("Undefined name '" + name + "'.");
  }
}

Scope.prototype.get = function(name) {
  if(this.has(name)) {
    return this.data[name].value;
  } else if(this.has(name, true)) {
    return this.parent.get(name);
  } else {
    throw Error("Undefined name '" + name + "'.");
  }
}

Scope.prototype.has = function(name, deep) {
  deep = deep || false;
  return Object.has(this.data, name) || (deep && this.parent && this.parent.has(name, true));
}

Scope.prototype.declare = function(kind, name, init) {
  if(!this.has(name)) {
    this.data[name] = {
      kind: kind,
      value: init
    };
  } else {
    throw Error("Name '" + name + "' already defined");
  }
}

module.exports = Scope;
