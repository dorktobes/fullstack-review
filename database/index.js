const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoid: Number, //repo.id
  repoName: String, //repo.name
  url: String, //repo.url
  description: String, //repo.description
  watchersCount: Number, //repo.watchers_count
  user: String, //repo.owner.login
  userid: Number, //repo.owner.id

  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to                --> 'or repos' implies we'll probably accept an array here
  // the MongoDB
}

module.exports.save = save;