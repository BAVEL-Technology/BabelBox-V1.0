const bb = require('./api/index')

/*
* Parse DOM for twemojis
* use npm twemoji to convert from emoji to twemoij
*/
twemoji.parse(document.body);

/*
* Join the portal with the given portal name
*/
window.joinPortal = async function (game) {
  try {
    let portalCode = document.querySelector('#portal-name').value;

    let portal = await bb.read('portal', {id: portalCode})

    window.location.href = `/${game}/${portal.code}/${portal.phase}`;
  } catch (error) {
    let button = document.querySelector('#join-portal-button')

    button.classList.remove('bg-blue-400', 'border-blue-400', 'hover:text-blue-400')
    button.classList.add('bg-red-400', 'border-red-400', 'hover:text-red-400')
    button.classList.add('shake')

    setTimeout(function(){ button.classList.remove('shake'); }, 400)
    console.log(error)
  }
}

/*
* Create a new portal, and then create a new user, and enter that portal
*/
window.createPortal = async function (game) {
  let name = document.querySelector('#user-name').value;

  let portal = await bb.create('portal', { game })

  let user = await bb.create('user', {name, portal_id: portal.id})

  window.location.href = `/${game}/${portal.code}/${portal.phase}`
}

/*
* Create a new user inside the given portal
*/
window.createUser = async function (portal_id) {
  let name = document.querySelector('#user-name').value;

  let user = await bb.create('user', {name, portal_id})
}

/*
* Start a new game by creating a new Round
*/
window.startGame = async function (game, portal_id, roundNum) {
  let portal = await bb.update('portal', {id: portal_id, phase: 'question'})

  let round = await bb.create('round', {portal_id, roundNum})

  window.location.href = `/${game}/${portal.code}/question`
}

/*
* Submit an answer for a certain round
*/
window.submitAnswer = async function (user_id, round_id, portal_id) {
  let submission = document.querySelector('#user-answer').value;

  let button = document.querySelector('#submit-answer-button')

  let answer = await bb.create('answer', {round_id, user_id, answer: submission})

  let portal = await bb.update('portal', {id: portal_id, phase: 'answer'})

  button.disabled = true;
  button.innerHTML = 'Answer Locked In!'
}

/*
* Select an answer for a certain round
*/
window.selectAnswer = async function (currentUserId, round_id, user_id) {
  let currentUser = await bb.read('user', {id: currentUserId})

  if (!user_id) {
    await bb.update('user', {id: currentUser.id, points: (currentUser.points + 100)})
  } else {
    let user = await bb.read('user', {id: user_id})

    await bb.update('user', {id: user_id, points: (user.points + 100)})
  }

  let buttons = document.getElementsByClassName('answer')

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true
  }

  let round = await bb.read('round', {id: round_id})
  console.log(currentUser)
  if (currentUser.leader) {
    await bb.create('round', {portal_id: round.portal.id, round: (round.round + 1)})

    await bb.update('portal', {id: round.portal.id, round: (round.round + 1), phase: 'waiting'})
  }
}
