'use strict'

const pat = /^VILOVEUL_/i

const abuilder = Object.keys(process.env)
  .filter(key => pat.test(key))
  .reduce((env, key) => {
  env[key] = process.env[key];
  return env;
}, 
{
  NODE_ENV: '"production"'
})

module.exports = abuilder
