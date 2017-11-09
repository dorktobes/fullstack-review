const request = require('request');
const config = require('../config.js');
const save = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  var data = '';
  request.get(options)
  .on('data', (packet) => {
    data += packet;
  }).on('end', ()=> {
    //send this to DB
    var repos = JSON.parse(data);
    save.save(repos);
  }).on('error', (err) => {
    console.log(err);
  });
}

module.exports.getReposByUsername = getReposByUsername;