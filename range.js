"use strict";

let Type = require('./type.js');
let Value = require('./value.js');

class RangeValue extends Value {

  constructor(type) {
    super(type);
    this.value = this.type.low;
  }

  assign(newValue) {
    if (typeof newValue == 'number') {
      if (newValue < this.type.low || newValue > this.type.high) {
        throw Error(`Cannot assign value of ${newValue} to range ${this.type.getName()}: ${this.type.low}..${this.type.high};`);
      }
      this.value = newValue;
    } else if (newValue instanceof RangeValue) {
      return this.assign(newValue.value);
    } else {
      throw Error(`Trying to assign ${newValue.type.toString()} to range ${this.type.getName()}: ${this.type.low}..${this.type.high};`);
    }
  }

  innerToString() {
    return `${this.value}`;
  }

  toString() {
    return `${this.value}`;
  }
}

class RangeType extends Type {
  constructor(decl, env, name) {
    super(decl, env, name);
    this.low = this.decl.low.value;
    this.high = this.decl.high.value;
  }
  makeDefaultValue() {
    return new RangeValue(this);
  }
  toString() {
    let name = this.getName();
    if (name !== undefined) {
      return name;
    }
    return `${this.low}..${this.high}`;
  }
}

module.exports = RangeType;
