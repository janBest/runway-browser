"use strict";

let makeType = require('../typefactory.js');
let Statement = require('./statement.js');

class ParamDecl extends Statement {
  constructor(parsed, env) {
    super(parsed, env);
    let type = makeType(this.parsed.type, this.env);
    let value = type.makeDefaultValue();
    if (this.parsed.default !== undefined) {
      value.assign(this.parsed.default.value);
    }
    env.assignVar(this.parsed.id.value, value);
  }

  execute() {
    // no-op
  }
}

module.exports = ParamDecl;