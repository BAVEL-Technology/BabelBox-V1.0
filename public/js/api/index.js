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
