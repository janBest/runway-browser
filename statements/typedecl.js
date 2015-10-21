"use strict";

let makeType = require('../typefactory.js');
let Statement = require('./statement.js');

// type T : Boolean;

class TypeDecl extends Statement {
  constructor(parsed, env) {
    super(parsed, env);
    this.env.assignType(this.parsed.id.value, makeType(this.parsed.type, this.env, this.parsed.id));
  }

  typecheck() {
    // no-op
  }

  execute() {
    // no-op
  }

  toString(indent) {
    return `${indent}type ${this.parsed.id.value} : ...;`;
  }
}

module.exports = TypeDecl;
