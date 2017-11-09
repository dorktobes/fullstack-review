const express = require('express');
const helpers = require('../helpers/github.js');
let app = express();
const dbFuncs = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
	console.log('POST REQUEST');
	req.on('data', (packet) => {
	  var username = packet + '';
	  if (helpers.getReposByUsername(username)) {
	  	res.statusCode =201;
	  	res.end();
	  }
	})
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
	let repos = dbFuncs.retreive();
    repos.then((repos) =>{
      console.log(repos);
  		res.body = repos;
  		res.statusCode = 200;
  		res.end();
    });
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

