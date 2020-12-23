const words = require('../jsonDB/words.json');

function pickCode() {
  const word1 = words[Math.floor(Math.random() * words.length)];
  const word2 = words[Math.floor(Math.random() * words.length)];
  return word1 + '-' + word2;
}

module.exports = pickCode;
