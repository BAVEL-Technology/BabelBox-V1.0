const { toast } = require('./tailwind-toast/twtoast.js');

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
    <div class="emoji cursor-pointer rounded-full hover:bg-blue-300 p-2">${data.avatar}</div>
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
    toast().success(' ', ' You fooled someone! + $25!').with({ shape: 'pill', icon: '🤑' }).show();
  }
}

function pushUpdatedUser(data) {
  console.log(data);
  const currentPortal = JSON.parse(localStorage.getItem('currentPortal'));
  if (currentPortal.id !== data.portal.id) {
    return;
  }
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(data);
  const updatedUser = document.querySelector('#user-' + data.id);
  if (currentUser.id === data.id) {
    updatedUser.querySelector('.user-points').innerHTML = '$' + data.points;
    updatedUser.querySelector('.emoji').innerHTML = data.avatar;
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
    updatedUser.querySelector('.emoji').innerHTML = data.avatar;
  }
  twemoji.parse(document.body);
}

function pushDeletedUser(data) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentPortal = JSON.parse(localStorage.getItem('currentPortal'));
  console.log(data);
  const updatedUser = document.querySelector('#user-' + data.id);
  if (currentUser.id == data.id) {
    window.location.href = `/liarliar/${currentPortal.code}/waiting`;
  }
  if (updatedUser) {
    updatedUser.remove();
  }
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
