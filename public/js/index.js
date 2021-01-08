/*
 * Parse DOM for twemojis
 * use npm twemoji to convert from emoji to twemoij
 */
twemoji.parse(document.body);

<<<<<<< HEAD
=======
function pushNewUser(data) {
  console.log(data);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser.id === data.id) {
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
      <div ${currentUser.leader ? `onclick="makeLeader(event, ${data.id}, ${data.id})"` : ''} class="w-8 h-8 rounded-full hover:bg-blue-300 flex items-center justify-center pl-1 cursor-pointer">
        <span class="fa-stack fa-1x user-leader">
        ${data.leader ? '<span class="text-yellow-500 gold-star"><i class="fas fa-star fa-stack-1x"></i></span>' : ''}
          <span><i class="far fa-star fa-stack-1x" aria-hidden="true"></i></span>
        </span>
      </div>
      ${currentUser.leader ? `
        <div onclick="deleteUser(event, ${data.id})" class="w-8 h-8 rounded-full hover:bg-blue-300 flex items-center justify-center pl-1 cursor-pointer">
          <span class="fa-stack fa-1x">
            <span class="text-red-500"><i class="fas fa-trash fa-stack-1x"></i></span>
            <span><i class="fas fa-trash-alt fa-stack-1x"></i></span>
          </span>
        </div>
        ` : ''}
    </div>
    <div class="user-points text-sm p-2 text-green-200 bg-green-600 h-8 rounded absolute -top-4 -right-4">$0</div>
  `;

  twemoji.parse(newUser);

  document.querySelector('#cards-wrapper').append(newUser);
}

function pushUpdatedUser(data) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(data);
  const updatedUser = document.querySelector('#user-' + data.id);
  if (currentUser.id === data.id) {
    updatedUser.querySelector('.user-points').innerHTML = '$' + data.points;

  } else {
    updatedUser.querySelector('.user-name').innerHTML = data.name;
    updatedUser.querySelector('.user-points').innerHTML = '$' + data.points;
  }
}

function pushDeletedUser(data) {

}

function changePortalPhase(data) {
  console.log(data);
  window.location.href = `/liarliar/${data.code}/${data.phase}`;
}

>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
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
<<<<<<< HEAD
// });
=======
// });
>>>>>>> 8d978df8ade19cfa7fcd8463fd9b1c6a9700907e
