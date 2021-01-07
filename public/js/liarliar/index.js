const bb = require('../api/index');
const { toast } = require('tailwind-toast');

/*
* Handle errors from the server
*/
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');
if(error) {
  toast().danger(' ', error).with({shape: 'pill'}).show();
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

window.checkPortalStatus = async function (id) {
  const portal = await bb.read('portal', { id });
  const status = portal.phase;
  return status;
};

/*
 * Assign a user as the portal leader
 */
window.makeLeader = async function (event, id, currentUserId) {
  try {
    await bb.update('user', {
      id: currentUserId,
      leader: '0',
    });
    await bb.update('user', { id, leader: '1' });
    const curretGoldStar = document.querySelector('.gold-star');
    curretGoldStar.remove();

    const elem = event.srcElement;
    const target = elem.parentElement.parentElement;
    const goldStar = document.createElement('SPAN');
    goldStar.classList = 'text-yellow-500 gold-star';
    goldStar.innerHTML = '<i class="fas fa-star fa-stack-1x"></i>';
    target.prepend(goldStar);
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
  toast().success(' ', 'Copied to clipboard!').with({shape: 'pill'}).show();
};

/*
 * Delete a user
 */
window.deleteUser = async function (event, id) {
  try {
    const user = await bb.read('user', { id });
    await bb.delete('user', { id });

    if (user.leader) {
      const portal = await bb.read('portal', { id: user.portal.id });
      await bb.update('user', {
        id: portal.users[0].id,
        leader: '1',
      });
    }

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

    const portal = await bb.read('portal', { id: portalCode });

    window.location.href = `/${game}/${portal.code}/${portal.phase}`;
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
  const portal = await bb.update('portal', {
    id: portal_id,
    phase: 'question',
  });

  const question_start_time = Date.now();

  const answer_start_time = question_start_time + 30000;

  await bb.create('round', { portal_id, round: roundNum, question_start_time, answer_start_time });

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
  const currentUser = await bb.update('user', { id: currentUserId, answer_lock: true });

  if (!user_id) {
    await bb.update('user', {
      id: currentUser.id,
      points: currentUser.points + 100,
    });
    toast().success('Great!', 'You got the right answer!').with({shape: 'pill'}).show();
  } else {
    const user = await bb.read('user', { id: user_id });

    await bb.update('user', { id: user_id, points: user.points + 25 });
    toast().danger('Doh!', 'You were fooled!').with({shape: 'pill'}).show();
  }

  const buttons = document.getElementsByClassName('answer');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
};
