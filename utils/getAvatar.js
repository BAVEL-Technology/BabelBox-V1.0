const avatars = require('../jsonDB/avatars.json')

function getAvatar () {
  return avatars[Math.floor(Math.random() * avatars.length)]
}

module.exports = getAvatar
