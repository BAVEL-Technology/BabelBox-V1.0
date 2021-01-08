const bb = require('../api/index');
const { toast } = require('tailwind-toast');

const anotherSocket = io();

/*
 * Handle errors from the server
 */
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');
if (error) {
  toast().danger(' ', error).with({ shape: 'pill' }).show();
}

/*
* Show modal to select a new avatar
*/

let showModal = false;

window.showAvatars = function (id) {
  const avatars = [{img: "🐵", name: 'George'},{img: "🦊", name: 'Mr. Fox'},
  {img: "🐨", name: 'Sydney'},{img: "🐲", name: 'Mushu'},{img: "🥸", name: 'Sherlock'},
  {img: "🤓", name: 'Christian'},{img: "🤖", name: 'Bender'},{img: "👺", name: 'Oni'},
  {img: "🤡", name: 'Pennywise'}];
  if (!showModal) {
    let modal = document.createElement('DIV');
    modal.classList = 'fixed z-10 inset-0 overflow-y-auto';
    modal.id = 'modal';
    modal.innerHTML = `
    <div style="font-family: 'Sniglet', cursive;" class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 bg-gray-800 bg-opacity-75">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-green-100 text-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <p class="text-2xl text-center pt-4">Pick an avatar!</p>
        <div id="charecters" class="h-full flex-wrap flex items-center justify-center">
        </div>
      </div>
    </div>
    `
    avatars.forEach((a) => {
      modal.querySelector('#charecters').innerHTML += `
      <p onclick="changeAvatar('${a.img}', ${id})" class="m-4 flex flex-col justify-center items-center ">
        <span class="my-1 rounded-full p-2 hover:bg-blue-100 cursor-pointer transform duration-150 hover:-translate-y-1 text-6xl md:text-7xl lg:text-8xl">${a.img}</span>
        <span class="text-xl my-1">${a.name}</span>
      </p>
      `
    })
    twemoji.parse(modal);
    document.body.prepend(modal);
  } else {
    document.querySelector('#modal').remove();
  }
  showModal = !showModal;
};

/*
* Change user Avatar
*/

window.changeAvatar = async function (avatar, id) {
  await bb.update('user', {id, avatar});
  document.querySelector('#modal').remove();
  showModal = !showModal;
}
/*
 * Assign a user as the portal leader
 */
window.logout = async function (portalCode) {
  try {
    await bb.logout();

    window.location.href = `/liarliar/${portalCode}/waiting`;
  } catch (error) {
    console.log(error);
  }
};

/*
* If sockets work we wont use
*/
window.checkPortalStatus = async function (id) {
  const portal = await bb.read('portal', { id });
  const status = portal.phase;
  return status;
};

/*
 * Assign a user as the portal leader
 */
window.makeLeader = async function (id, currentUserId) {
  try {
    const oldLeader = await bb.update('user', {
      id: currentUserId,
      leader: '0',
    });
    const newLeader = await bb.update('user', { id, leader: '1' });

    const newLeaderCard = document.querySelector('#user-' + id);
    console.log(newLeaderCard)
    const target = newLeaderCard.querySelector('.user-leader');
    console.log(target)
    const goldStar = target.querySelector('.gold-star');
    goldStar.classList.remove('hidden')

    const currentUserCard = document.querySelector('#user-' + currentUserId);
    console.log(currentUserCard)
    const curretGoldStar = currentUserCard.querySelector('.gold-star');
    console.log(curretGoldStar)
    curretGoldStar.classList.add('hidden')
    console.log('removed')
    const userCards = document.querySelectorAll('.card');
    userCards.forEach((card) => {
      const userId = card.id.split('-')[1];
      card.querySelector('.user-trash').classList.add('hidden');
      card.querySelector('.make-leader').onclick = '';
    })
  } catch (error) {
    console.log(error);
  }
};

/*
 * Copy the code to clipboard!
 */
window.copyCode = function () {
  const code = document.querySelector('#portal-code').innerHTML.trim();
  const elem = document.createElement('textarea');
  document.body.appendChild(elem);
  elem.value = code;
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
  toast().success(' ', 'Copied to clipboard!').with({ shape: 'pill' }).show();
};

/*
 * Delete a user
 * We said you cannot delete yourself, and only the leader can delete
 */
window.deleteUser = async function (event, id) {
  try {
    await bb.delete('user', { id });

    const elem = event.srcElement;
    const target =
      elem.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    target.remove();
  } catch (error) {
    console.log(error);
  }
};

/*
 * Join the portal with the given portal name
 */
window.joinPortal = async function (game) {
  try {
    const portalCode = document.querySelector('#portal-name').value;

    // const portal = await bb.read('portal', { id: portalCode });
    // If it trys to go to the portal it'll just send you back,
    // But it is nice to see that shake
    window.location.href = `/${game}/${portalCode}/waiting`;
  } catch (error) {
    const button = document.querySelector('#join-portal-button');

    button.classList.remove(
      'bg-blue-400',
      'border-blue-400',
      'hover:text-blue-400'
    );
    button.classList.add('bg-red-400', 'border-red-400', 'hover:text-red-400');
    button.classList.add('shake');

    setTimeout(function () {
      button.classList.remove('shake');
    }, 400);
  }
};

/*
 * Create a new portal, and then create a new user, and enter that portal
 */
window.createPortal = async function (game) {
  const name = document.querySelector('#user-name').value;

  const portal = await bb.create('portal', { game });

  await bb.create('user', { name, portal_id: portal.id });

  window.location.href = `/${game}/${portal.code}/${portal.phase}`;
};

/*
 * Create a new user inside the given portal
 */
window.createUser = async function (portal_id) {
  const name = document.querySelector('#user-name').value;

  await bb.create('user', { name, portal_id });

  const portal = await bb.read('portal', { id: portal_id });

  window.location.href = `/liarliar/${portal.code}/waiting`;
};

/*
 * Change a user's name
 */
window.changeUserName = async function (id) {
  const name = document.querySelector('#user-name-change').value;

  await bb.update('user', { id, name });
};

/*
 * Start a new game by creating a new Round
 */
window.startGame = async function (game, portal_id, roundNum) {
  const question_start_time = Date.now();

  const answer_start_time = question_start_time + 20000;

  const round = await bb.create('round', {
    portal_id,
    round: roundNum,
    question_start_time,
    answer_start_time,
  });
  const portal = await bb.update('portal', {
    id: portal_id,
    phase: 'question',
  });
  console.log(round);
  window.location.href = `/${game}/${portal.code}/question`;
};

/*
 * Submit an answer for a certain round
 */
window.submitAnswer = async function (user_id, round_id) {
  const submission = document.querySelector('#user-answer').value;

  const button = document.querySelector('#submit-answer-button');
  const input = document.querySelector('#user-answer');
  await bb.update('user', { id: user_id, question_lock: true });
  await bb.create('answer', {
    round_id,
    user_id,
    answer: submission,
  });

  button.disabled = true;
  input.disabled = true;
  button.innerHTML = 'Answer Locked In!';
};

/*
 * Select an answer for a certain round
 */
window.selectAnswer = async function (currentUserId, round_id, user_id) {
  const currentUser = await bb.update('user', {
    id: currentUserId,
    answer_lock: true,
  });

  if (!user_id) {
    await bb.update('user', {
      id: currentUser.id,
      points: currentUser.points + 100,
    });
    toast()
      .success('Great!', 'You got the right answer!')
      .with({ shape: 'pill' })
      .show();
  } else {
    const user = await bb.read('user', { id: user_id });
    const liar = await bb.update('user', { id: user_id, points: user.points + 25 });
    anotherSocket.emit('I got it wrong', liar);
    toast().danger('Doh!', 'You were fooled!').with({ shape: 'pill' }).show();
  }

  const buttons = document.getElementsByClassName('answer');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
};
