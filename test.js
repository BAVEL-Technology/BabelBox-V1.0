let words = require('./seeds/questions2.json')
var fs = require('fs');

let array = words.normal.map((i) => {
  return {
    category: i.category,
    question: i.question,
    answer: i.answer,
    alternate_answers: i.alternate_answers.join(', '),
    suggestions: i.suggestions.join(', ')
  }
})

fs.writeFile('./seeds/questions3.json', JSON.stringify({normal: array}), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
