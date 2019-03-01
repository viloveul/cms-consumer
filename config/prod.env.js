'use strict'

const fs = require('fs')
const dotenv = require('dotenv')
const merge = require('webpack-merge')

const pat = /^VILOVEUL_/i
const viloveul = new Object()
const configs = dotenv.parse(fs.readFileSync('.env'))
for (let c in configs) {
  if (pat.test(c)) {
    viloveul[c] = '"' + configs[c] + '"'
  }
}

module.exports = merge(viloveul, {
  NODE_ENV: '"production"'
})
