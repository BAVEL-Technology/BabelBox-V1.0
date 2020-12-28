(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = 'function' == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        function babelJax(method, route, params) {
          return new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                resolve(JSON.parse(xhttp.responseText));
              } else if (xhttp.readyState == 4 && xhttp.status != 200) {
                reject(xhttp.statusText);
              }
            };
            xhttp.open(method, route, true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(JSON.stringify(params));
          });
        }

        module.exports = {
          //bb.create('user', {name: 'steve', portal_id: 1})
          create: function (model, params) {
            let method = 'POST';
            let route = '/api/' + model + 's';
            return new Promise((resolve, reject) => {
              babelJax(method, route, params)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            });
          },
          //bb.read('answer', {round_id: 2})
          read: function (model, params) {
            let method = 'GET';
            let route = '/api/' + model + 's';
            if (params.id) {
              route = '/api/' + model + 's/' + params.id;
            }
            return new Promise((resolve, reject) => {
              babelJax(method, route, params)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            });
          },
          //bb.update('portal', {id: 2, round: 4})
          update: function (model, params) {
            let method = 'PUT';
            let route = '/api/' + model + 's';
            if (params.id) {
              route = '/api/' + model + 's/' + params.id;
            } else {
              return 'Update requires an id!';
            }
            return new Promise((resolve, reject) => {
              babelJax(method, route, params)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            });
          },
          //bb.delete('user', {id: 5})
          delete: function (model, params) {
            let method = 'DELETE';
            let route = '/api/' + model + 's';
            if (params.id) {
              route = '/api/' + model + 's/' + params.id;
            } else {
              return 'Delete requires an id!';
            }
            return new Promise((resolve, reject) => {
              babelJax(method, route, params)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            });
          },
          logout: function () {
            let method = 'POST';
            let route = '/api/users/logout';
            return new Promise((resolve, reject) => {
              babelJax(method, route)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            });
          },
        };
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        const bb = require('../api/index');

        /*
         * Assign a user as the portal leader
         */
        window.logout = async function (portalCode) {
          try {
            let user = await bb.logout();

            window.location.href = `/liarliar/${portalCode}/waiting`;
          } catch (error) {
            console.log(error);
          }
        };

        /*
         * Assign a user as the portal leader
         */
        window.makeLeader = async function (event, id, currentUserId) {
          try {
            let currentUser = await bb.update('user', {
              id: currentUserId,
              leader: '0',
            });
            let user = await bb.update('user', { id, leader: '1' });
            let curretGoldStar = document.querySelector('.gold-star');
            curretGoldStar.remove();

            let elem = event.srcElement;
            let target = elem.parentElement.parentElement;
            let goldStar = document.createElement('SPAN');
            goldStar.classList = 'text-yellow-500 gold-star';
            goldStar.innerHTML = '<i class="fas fa-star fa-stack-1x"></i>';
            target.prepend(goldStar);
          } catch (error) {
            console.log(error);
          }
        };

        /*
         * Delete a user
         */
        window.deleteUser = async function (event, id) {
          try {
            let user = await bb.read('user', { id });
            await bb.delete('user', { id });

            if (user.leader) {
              let portal = await bb.read('portal', { id: user.portal.id });
              let newLeader = await bb.update('user', {
                id: portal.users[0].id,
                leader: '1',
              });
            }

            let elem = event.srcElement;
            let target =
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
            let portalCode = document.querySelector('#portal-name').value;

            let portal = await bb.read('portal', { id: portalCode });

            window.location.href = `/${game}/${portal.code}/${portal.phase}`;
          } catch (error) {
            let button = document.querySelector('#join-portal-button');

            button.classList.remove(
              'bg-blue-400',
              'border-blue-400',
              'hover:text-blue-400'
            );
            button.classList.add(
              'bg-red-400',
              'border-red-400',
              'hover:text-red-400'
            );
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
          let name = document.querySelector('#user-name').value;

          let portal = await bb.create('portal', { game });

          let user = await bb.create('user', { name, portal_id: portal.id });

          window.location.href = `/${game}/${portal.code}/${portal.phase}`;
        };

        /*
         * Create a new user inside the given portal
         */
        window.createUser = async function (portal_id) {
          let name = document.querySelector('#user-name').value;

          let user = await bb.create('user', { name, portal_id });

          let portal = await bb.read('portal', { id: portal_id });

          window.location.href = `/liarliar/${portal.code}/waiting`;
        };

        /*
         * Change a user's name
         */
        window.changeUserName = async function (id) {
          let name = document.querySelector('#user-name-change').value;

          let user = await bb.update('user', { id, name });
        };

        /*
         * Start a new game by creating a new Round
         */
        window.startGame = async function (game, portal_id, roundNum) {
          let portal = await bb.update('portal', {
            id: portal_id,
            phase: 'question',
          });

          let round = await bb.create('round', { portal_id, roundNum });

          window.location.href = `/${game}/${portal.code}/question`;
        };

        /*
         * Submit an answer for a certain round
         */
        window.submitAnswer = async function (user_id, round_id, portal_id) {
          let submission = document.querySelector('#user-answer').value;

          let button = document.querySelector('#submit-answer-button');

          let answer = await bb.create('answer', {
            round_id,
            user_id,
            answer: submission,
          });

          let portal = await bb.update('portal', {
            id: portal_id,
            phase: 'answer',
          });

          button.disabled = true;
          button.innerHTML = 'Answer Locked In!';
        };

        /*
         * Select an answer for a certain round
         */
        window.selectAnswer = async function (
          currentUserId,
          round_id,
          user_id
        ) {
          let currentUser = await bb.read('user', { id: currentUserId });

          if (!user_id) {
            await bb.update('user', {
              id: currentUser.id,
              points: currentUser.points + 100,
            });
          } else {
            let user = await bb.read('user', { id: user_id });

            await bb.update('user', { id: user_id, points: user.points + 25 });
          }

          let buttons = document.getElementsByClassName('answer');

          for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
          }

          let round = await bb.read('round', { id: round_id });

          if (currentUser.leader) {
            await bb.create('round', {
              portal_id: round.portal.id,
              round: round.round + 1,
            });

            await bb.update('portal', {
              id: round.portal.id,
              round: round.round + 1,
              phase: 'waiting',
            });
          }
        };
      },
      { '../api/index': 1 },
    ],
  },
  {},
  [2]
);
