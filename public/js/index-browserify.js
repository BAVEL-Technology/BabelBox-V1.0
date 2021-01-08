(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const h = require('../utils/helpers')
const options = require('../utils/options.json')
const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'ten', 'eleven']

class Snackbar {
  constructor (color, icon, duration, positionX, positionY, fontColor, fontTone, tone, shape, speed) {
    this.color = color,
      this.icon = icon,
      this.duration = duration,
      this.positionX = positionX,
      this.positionY = positionY,
      this.fontColor = fontColor,
      this.fontTone = fontTone,
      this.tone = tone,
      this.shape = shape,
      this.speed = speed,
      this.buttons = [],
      this.html,
      this.id,
      this.title,
      this.message
  }

  as (shape) {
    this.shape = shape
    return this
  }

  for (ms) {
    this.duration = ms
    return this
  }

  from (positionY, positionX = this.positionX) {
    this.positionX = positionX
    this.postionY = positionY
    return this
  }

  with (params) {
    Object.keys(params).forEach((p) => {
      let object = params
      if (options.includes(p)) {
        eval('this.' + p + ' = ' + 'object.' + p)
      }
    })
    return this
  }

  default (title, message) {
    this.title = title
    this.message = message
    return this
  }

  danger (title, message) {
    this.title = title
    this.message = message
    this.color = 'red'
    this.fontColor = 'gray'
    this.icon = 'fas fa-hand-paper'
    return this
  }

  success (title, message) {
    this.title = title
    this.message = message
    this.color = 'green'
    this.fontColor = 'gray'
    this.icon = 'fas fa-check'
    return this
  }

  warning (title, message) {
    this.title = title
    this.message = message
    this.color = 'yellow'
    this.fontColor = 'gray'
    this.icon = 'fas fa-exclamation-triangle'
    return this
  }

  addButtons (...buttonObjects) {
    this.buttons = buttonObjects
    return this
  }

  hide () {
    let snackbar = document.querySelector("#" + this.id)
    snackbar.classList.remove(`${this.positionY === 'top' ? 'translate-y-36' : '-translate-y-36'}`)
    snackbar.classList.add(`${this.positionY === 'top' ? '-translate-y-36' : 'translate-y-36'}`)
    setTimeout(() => {
      snackbar.remove()
    }, (this.speed + 100))
  }

  show () {
    this.shape = this.shape === 'pill' ? 'rounded-full' : 'rounded'
    let wrapper = document.createElement('DIV')
    wrapper.classList = `absolute ease-in-out transform duration-${this.speed} -${this.positionY}-24 flex justify-${this.positionX} w-full`
    wrapper.innerHTML = eval('`' + h.getFile('../templates/snackbar.toast') + '`')
    this.id = `tawilwind-snackbar-${numbers[Math.floor(Math.random() * Math.floor(11))]}`
    wrapper.id = this.id
    let buttonWrapper = wrapper.querySelector('.twsnackbar').querySelector('#buttons')
    this.buttons.forEach((button) => {
      let newButton = document.createElement('DIV')
      newButton.classList = `cursor-pointer hover:bg-${this.color}-${(parseInt(this.tone) + 100)} p-2 rounded flex justify-center items-center`
      newButton.innerHTML = `<b class="uppercase"> ${Object.keys(button)[0]}</b>`
      newButton.onclick = Object.values(button)[0]
      buttonWrapper.append(newButton)
    })
    document.body.prepend(wrapper)
    setTimeout(() => {
      document.querySelector("#" + this.id)
        .classList
        .add(`${this.positionY === 'top' ? 'translate-y-36' : '-translate-y-36'}`)
    }, 1)
  }
}

module.exports = Snackbar

},{"../utils/helpers":5,"../utils/options.json":6}],2:[function(require,module,exports){
const h = require('../utils/helpers')
const options = require('../utils/options.json')
const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'ten', 'eleven']

class Toast {
  constructor (color, icon, duration, positionX, positionY, fontColor, fontTone, tone, shape, speed) {
    this.color = color,
    this.icon = icon,
    this.duration = duration,
    this.positionX = positionX,
    this.positionY = positionY,
    this.fontColor = fontColor,
    this.fontTone = fontTone,
    this.tone = tone,
    this.shape = shape,
    this.speed = speed,
    this.buttons = [],
    this.html,
    this.id,
    this.title,
    this.message
  }

  as (shape) {
    this.shape = shape
    return this
  }

  for (ms) {
    this.time = ms
    return this
  }

  from (positionY, positionX = this.positionX) {
    this.positionX = positionX
    this.postionY = positionY
    return this
  }

  with (params) {
    Object.keys(params).forEach((p) => {
      let object = params
      if (options.includes(p)) {
        eval('this.' + p + ' = ' + 'object.' + p)
      }
    })
    return this
  }

  default (title, message) {
    this.title = title
    this.message = message
    return this
  }

  danger (title, message) {
    this.title = title
    this.message = message
    this.color = 'red'
    this.fontColor = 'gray'
    this.icon = 'fas fa-hand-paper'
    return this
  }

  success (title, message) {
    this.title = title
    this.message = message
    this.color = 'green'
    this.fontColor = 'gray'
    this.icon = 'fas fa-check'
    return this
  }

  warning (title, message) {
    this.title = title
    this.message = message
    this.color = 'yellow'
    this.fontColor = 'gray'
    this.icon = 'fas fa-exclamation-triangle'
    return this
  }

  show () {
    this.shape = this.shape === 'pill' ? 'rounded-full' : 'rounded'
    let wrapper = document.createElement('DIV')
    wrapper.classList = `absolute ease-in-out transform duration-${this.speed} -${this.positionY}-24 flex justify-${this.positionX} w-full`
    wrapper.innerHTML = `<div class="twthis mx-4 text-${this.fontColor}-${this.fontTone} px-6 py-4 border-0 ${this.shape} relative mb-4 bg-${this.color}-${this.tone}">
      <span class="text-xl inline-block mr-5 align-middle">
        <i class="${this.icon}"></i>
      </span>
      <span class="inline-block align-middle mr-8">
        <b class="title">${this.title}</b> ${this.message}
      </span>
    </div>`
    this.id = `tawilwind-toast-${numbers[Math.floor(Math.random() * Math.floor(11))]}`
    wrapper.id = this.id
    document.body.prepend(wrapper)
    let toast = document.querySelector("#" + this.id)
    setTimeout(() => {
      toast.classList.add(`${this.position === 'top' ? '-translate-y-36' : 'translate-y-36'}`)
    }, 1)
    setTimeout(() => {
      let toast = document.querySelector("#" + this.id)
      toast.classList.remove(`${this.position === 'top' ? '-translate-y-36' : 'translate-y-36'}`)
      toast.classList.add(`${this.position === 'top' ? 'translate-y-36' : '-translate-y-36'}`)
    }, this.duration)
    setTimeout(() => {
      toast.remove()
    }, (this.duration + this.speed + 100))
  }
}

module.exports = Toast

},{"../utils/helpers":5,"../utils/options.json":6}],3:[function(require,module,exports){
{
  //default values
  modules: [
    //custom modules
  ]
}

},{}],4:[function(require,module,exports){
const config = require('./twtoast.config.js')
const Toast = require('./classes/Toast')
const Snackbar = require('./classes/Snackbar')

if (config.methods) {
  config.methods.forEach((method) => {
    eval('Toast.prototype.' + Object.keys(method)[0] + ' = ' + Object.values(method))
    eval('Snackbar.prototype.' + Object.keys(method)[0] + ' = ' + Object.values(method))
  })
}

module.exports = {
  toast: () => {
    return new Toast(
      config.color ? config.color : 'blue',
      config.icon ? config.icon : 'fas fa-bell',
      config.duration ? config.duration : 3000,
      config.positionX ? config.positionX : 'center',
      config.positionY ? config.positionY : 'top',
      config.fontColor ? config.fontColor : 'grey',
      config.fontTone ? config.fontTone : 100,
      config.tone ? config.tone : 500,
      config.shape ? config.shape : 'square',
      config.speed ? config.speed : 500
    )
  },

  snackbar: () => {
    return new Snackbar(
      config.color ? config.color : 'blue',
      config.icon ? config.icon : 'fas fa-bell',
      config.duration ? config.duration : 3000,
      config.positionX ? config.positionX : 'center',
      config.positionY ? config.positionY : 'top',
      config.fontColor ? config.fontColor : 'grey',
      config.fontTone ? config.fontTone : 100,
      config.tone ? config.tone : 500,
      config.shape ? config.shape : 'square',
      config.speed ? config.speed : 500
    )
  }
}

},{"./classes/Snackbar":1,"./classes/Toast":2,"./twtoast.config.js":3}],5:[function(require,module,exports){
function getFile(file) {
  var x = new XMLHttpRequest();
  x.open('GET', file, false);
  x.send();
  return x.responseText;
}

module.exports = {
  getFile: getFile
}

},{}],6:[function(require,module,exports){
module.exports=[
  "color",
  "title",
  "message",
  "icon",
  "duration",
  "postion",
  "fontColor",
  "fontTone",
  "tone",
  "shape",
  "speed"
]

},{}],7:[function(require,module,exports){
const { toast } = require('tailwind-toast');

const socket = io();
socket.io.connect(window.location.hostname);
socket.on('new user', pushNewUser);
socket.on('updated user', pushUpdatedUser);
socket.on('deleted user', pushDeletedUser);
socket.on('phase changed', changePortalPhase);
socket.on('You fooled someone', toastToFoolingSomeone);

/*
 * Parse DOM for twemojis
 * use npm twemoji to convert from emoji to twemoij
 */
twemoji.parse(document.body);

function pushNewUser(data) {
  const currentPortal = JSON.parse(localStorage.getItem('currentPortal'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser.id === data.id || currentPortal.id !== data.portal_id) {
    return;
  }

  if (!document.querySelector('.user-points')) {
    return;
  }

  const newUser = document.createElement('DIV');
  newUser.classList = 'card my-6 flex items-center justify-between bg-green-400 w-full text-gray-700 p-4 text-xl lg:text-4xl md:text-3xl text-center rounded-xl tracking-widest shadow-lg hover:shadow-xl transform hover:-translate-y-2';
  newUser.id = 'user-' + data.id;
  newUser.innerHTML =
  `
    <div class="emoji">${data.avatar}</div>
      <p class="user-name">${data.name}</p>
    <div class="flex flex-col text-sm justify-between">
      <div ${currentUser.leader ? `onclick="makeLeader(${data.id}, ${currentUser.id})"` : ''} class="make-leader w-8 h-8 rounded-full hover:bg-blue-300 flex items-center justify-center pl-1 cursor-pointer">
        <span class="fa-stack fa-1x user-leader">
        <span class="${!data.leader ? 'hidden ' : ''}text-yellow-500 gold-star"><i class="fas fa-star fa-stack-1x"></i></span>
          <span><i class="far fa-star fa-stack-1x" aria-hidden="true"></i></span>
        </span>
      </div>
      <div onclick="deleteUser(event, ${data.id})" class="w-8 ${!currentUser.leader ? 'hidden' : ''} user-trash h-8 rounded-full hover:bg-blue-300 flex items-center justify-center pl-1 cursor-pointer">
        <span class="fa-stack fa-1x">
          <span class="text-red-500"><i class="fas fa-trash fa-stack-1x"></i></span>
          <span><i class="fas fa-trash-alt fa-stack-1x"></i></span>
        </span>
      </div>
    </div>
    <div class="user-points text-sm p-2 text-green-200 bg-green-600 h-8 rounded absolute -top-4 -right-4">$0</div>
  `;

  twemoji.parse(newUser);

  document.querySelector('#cards-wrapper').append(newUser);
}

function toastToFoolingSomeone (data) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(data.id === currentUser.id) {
    toast().success(' ', 'You fooled someone! + $25!').with({ shape: 'pill' }).show();
  }
}

function pushUpdatedUser(data) {
  const currentPortal = JSON.parse(localStorage.getItem('currentPortal'));
  if (currentPortal.id !== data.portal_id) {
    return;
  }
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(data);
  const updatedUser = document.querySelector('#user-' + data.id);
  if (currentUser.id === data.id) {
    updatedUser.querySelector('.user-points').innerHTML = '$' + data.points;
    if (data.leader == 1 || data.leader == true) {
      console.log('Change Leader!')
      updatedUser.querySelector('.gold-star').classList.remove('hidden');
      console.log(updatedUser.querySelector('.user-leader'))
      let userCards = document.querySelectorAll('.card')
      userCards.forEach((card) => {
        const userId = card.id.split('-')[1]
        if (userId != data.id) {
          card.querySelector('.make-leader').onclick = () => makeLeader(userId, data.id);
          card.querySelector('.user-leader').querySelector('.gold-star').classList.add('hidden')
          card.querySelector('.user-trash').classList.remove('hidden')
        }
      })
    }

  } else {
    updatedUser.querySelector('.user-name').innerHTML = data.name;
    updatedUser.querySelector('.user-points').innerHTML = '$' + data.points;
  }
  // updatedUser.querySelector('.user-trash').classList.remove('hidden');

}

function pushDeletedUser(data) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentPortal = JSON.parse(localStorage.getItem('currentPortal'));
  console.log(data);
  const updatedUser = document.querySelector('#user-' + data.id);
  if (currentUser.id == data.id) {
    window.location.href = `/liarliar/${currentPortal.code}/waiting`;
  }
  updatedUser.remove();
}

function changePortalPhase(data) {
  console.log(data);
  window.location.href = `/liarliar/${data.code}/${data.phase}`;
}

// ====================================================
// GSAP AND BARBA PAGE TRANSITION ANIMATION PROPERTIES
// // ====================================================
// $(document).ready(function () {
//   // basic barba/gsap page transition animation
//   barba.init({
//     sync: true,
//     transitions: [
//       {
//         name: "opacity-transition",
//         leave(data) {
//           return gsap.to(data.current.container, {
//             opacity: 0,
//           });
//         },
//         enter(data) {
//           return gsap.from(data.next.container, {
//             opacity: 0,
//           });
//         },
//       },
//     ],
//   });
// });

},{"tailwind-toast":4}]},{},[7]);
