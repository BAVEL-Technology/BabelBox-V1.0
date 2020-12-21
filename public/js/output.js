(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const bb = require('./liarLiarAPIWrapper/index')

/*
* Parse DOM for twemojis
* use npm twemoji to convert from emoji to twemoij
*/
twemoji.parse(document.body);

/*
* Parse DOM for twemojis
* use npm twemoji to convert from emoji to twemoij
*/
function formatQuestion (question) {
  question = question.substring('<BLANK>', '________')

  return question
}

/*
* Hover effect on "BABELBOX"
*/
window.big = function (event) {
  let letter = event.srcElement
  letter.classList.add('scale-150')
  if (letter.previousSibling.nodeType != Node.TEXT_NODE) {
    let previousLetter = letter.previousSibling
    previousLetter.classList.add('scale-125')
    if (previousLetter.previousSibling.nodeType != Node.TEXT_NODE) {
      previousLetter.previousSibling.classList.add('scale-100')
    }
  }
  if (letter.nextSibling.nodeType != Node.TEXT_NODE) {
    let nextLetter = letter.nextSibling
    nextLetter.classList.add('scale-125')
    if (nextLetter.nextSibling.nodeType != Node.TEXT_NODE) {
      nextLetter.nextSibling.classList.add('scale-100')
    }
  }
}
window.small = function (event) {
  let letter = event.srcElement
  letter.classList.remove('scale-150')
  if (letter.previousSibling.nodeType != Node.TEXT_NODE) {
    let previousLetter = letter.previousSibling
    previousLetter.classList.remove('scale-125')
    if (previousLetter.previousSibling.nodeType != Node.TEXT_NODE) {
      previousLetter.previousSibling.classList.remove('scale-100')
    }
  }
  if (letter.nextSibling.nodeType != Node.TEXT_NODE) {
    let nextLetter = letter.nextSibling
    nextLetter.classList.remove('scale-125')
    if (nextLetter.nextSibling.nodeType != Node.TEXT_NODE) {
      nextLetter.nextSibling.classList.remove('scale-100')
    }
  }
}

/*
* Join the portal with the given portal name
*/
window.joinPortal = function (game) {
  let portal = document.querySelector('#portal-name').value;

  window.location.href = `/${game}/${portal}`;
}

/*
* Create a new portal, and then create a new user, and enter that portal
*/
window.createPortal = async function (game) {
  let name = document.querySelector('#user-name').value;

  let portal = await bb.create('portal', { game })
  console.log(portal)
  let user = await bb.create('user', {name, portal_id: portal.id})

  window.location.href = `/${game}/${portal.code}`
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
  let portal = await bb.read('portal', {id: portal_id})

  let round = await bb.create('round', {portal_id, roundNum})

  window.location.href = `/${game}/${portal.code}/question`
}

/*
* Submit an answer for a certain round
*/
window.submitAnswer = async function (user_id, round_id) {
  let submission = document.querySelector('#user-answer').value;

  let answer = await bb.create('answer', {round_id, user_id, answer: submission})
}

/*
* Select an answer for a certain round
*/
window.selectRightAnswer = async function (user_id, round_id) {
  let user = await bb.read('user', {id: user_id})

  let round = await bb.read('round', {id: round_id})

  await bb.update('user', {id: user_id, points: (user.points + 100)})

  nextRound(user, round)
}

/*
* Select an answer for a certain round
*/
window.selectLie = async function (currentUserId, user_id, round_id) {
  let user = await bb.read('user', {id: user_id})

  let currentUser = await bb.read('user', {id: currentUserId})

  let round = await bb.read('round', {id: round_id})

  await bb.update('user', {id: user_id, points: (user.points + 50)})

  nextRound(currentUser, round)
}

/*
* Move the portal to the next round
*/
async function nextRound (currentUser, round) {
  if (currentUser.leader) {
    await bb.create('round', {portal_id: round.portal.id, round: (round.round + 1)})

    await bb.update('portal', {id: round.portal.id, round: (round.round + 1)})
  }
}

},{"./liarLiarAPIWrapper/index":2}],2:[function(require,module,exports){
function babelJax (method, route, params) {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText))
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
          reject(JSON.parse(xhttp.statusText))
        }
      };
    xhttp.open(method, route, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(params));
  })
}

module.exports = {
  //bb.create('user', {name: 'steve', portal_id: 1})
  create: function (model, params) {
    let method = "POST"
    let route = "/api/" + model + "s"
    return new Promise((resolve, reject) => {
      babelJax(method, route, params).then((response) => resolve(response))
    })
  },
  //bb.read('answer', {round_id: 2})
  read: function (model, params) {
    let method = "GET"
    let route = "/api/" + model + "s"
    if (params.id) {
      route = "/api/" + model + "s/" + params.id
    }
    return new Promise((resolve) => {
      babelJax(method, route, params).then((response) => resolve(response))
    })
  },
  //bb.update('portal', {id: 2, round: 4})
  update: function (model, params) {
    let method = "PUT"
    let route = "/api/" + model + "s"
    if (params.id) {
      route = "/api/" + model + "s/" + params.id
    } else {
      return 'Update requires an id!'
    }
    return new Promise((resolve) => {
      babelJax(method, route, params).then((response) => resolve(response))
    })
  },
  //bb.delete('user', {id: 5})
  delete: function (model, params) {
    let method = "GET"
    let route = "/api/" + model + "s"
    if (params.id) {
      route = "/api/" + model + "s/" + params.id
    } else {
      return 'Delete requires an id!'
    }
    return new Promise((resolve) => {
      babelJax(method, route, params).then((response) => resolve(response))
    })
  }
}

},{}]},{},[1]);
