setInterval(() => {
  let letters = document.querySelector('#portal-name').value.length;
  let width = letters >= 11 ? ' w-full' : ' w-' + letters + '/12';
  let classes = 'status-bar border-b-4 border-pink-400 absolute top-7';
  document.querySelector('.status-bar').classList = classes + width;
}, 100)

window.joinPortal = async function (game) {
  let portal = document.querySelector('#portal-name').value;

  window.location.href = `/${game}/${portal}`;
}

window.createPortal = function (game) {
  var name = document.querySelector('#user-name').value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200)
      {
        var portal = JSON.parse(xhr.responseText)
        var xhrUser = new XMLHttpRequest();
        xhrUser.onreadystatechange = function () {
          if (xhrUser.readyState == 4 & xhrUser.status == 200) {
            console.log(xhrUser.status)
            window.location.href = `/${game}/${portal.code}`
          }
        }
        xhrUser.open("POST", "/api/users", true);
        xhrUser.setRequestHeader('Content-Type', 'application/json');
        xhrUser.send(JSON.stringify({
          name,
          portal_id: portal.id
        }))
      }
    };
  xhr.open("POST", '/api/portals', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      game
  }));
}

window.createUser = function (portal_id) {
  let name = document.querySelector('#user-name').value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200)
      {
        let response = JSON.parse(xhr.responseText)
        window.location.href = `/${game}/${response.code}`
      }
    };
  xhr.open("POST", '/api/users', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      name, portal_id
  }));
}
