const twemoji = require('twemoji')

let arguments = process.argv.slice(2);
console.log(arguments[0])

console.log(twemoji.convert.fromCodePoint(arguments[0]))
