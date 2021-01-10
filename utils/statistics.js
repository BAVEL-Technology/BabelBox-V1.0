require('dotenv').config();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { v4: uuidv4 } = require('uuid');
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appsqcJDYiL04He6l');

function geoLocate(ip) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        resolve(JSON.parse(xhttp.responseText));
      } else if (xhttp.readyState == 4 && xhttp.status != 200) {
        reject(xhttp.statusText);
      }
    };
    xhttp.open('GET', 'https://tools.keycdn.com/geo.json?host=' + ip, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  });
}

const record = async (ip, time, page, action, agent, pageLoad) => {
  let location = await geoLocate(ip);
  let country = location.data.country_code;
  let region = location.data.region_code;
  let zip = location.data.zip;
  let city = location.data.city;
  let id = uuidv4();

  base('Analytics').create([
    {
      "fields": {
        id,
        page,
        ip,
        country,
        region,
        city,
        zip,
        time,
        action,
        pageLoad,
        agent
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
}

module.exports = {
  record: record
}
