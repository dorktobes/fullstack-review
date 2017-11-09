const mongoose = require('mongoose');
mongoose.connect('mongod://localhost/fetcher' || 'mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoid: Number, //repo.id
  repoName: String, //repo.name
  url: String, //repo.url
  description: String, //repo.description
  watchersCount: Number,  //repo.watchers_count
  starGazers: Number, //repo.stargazers_count
  forks: Number, //repo.forks_count
  user: String, //repo.owner.login
  userid: Number, //repo.owner.id
  popularityAverage: Number, //average of forks, stargazers, and watchers

  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {

  repos.forEach((repo) => {
    var popularity = (repo.watchers_count + repo.stargazers_count + repo.forks) / 3;
    console.log(repo.name);
    var currentRepo = new Repo({
      repoid: repo.id,
      repoName: repo.name,
      url: repo.url,
      description: repo.description,
      watchersCount: repo.watchers_count,
      starGazers: repo.stargazers_count,
      forks: repo.forks_count,
      user: repo.owner.login,
      userid: repo.owner.id,
      popularityAverage: popularity
    })

    currentRepo.save((err, currentRepo) => {
      if (err) {
        console.log('OH NO', err);
      } else {
        console.log(currentRepo.repoName, 'was succesfully saved')
      }
    })
  })


  // TODO: Your code here
  // This function should save a repo or repos to                --> 'or repos' implies we'll probably accept an array here
  // the MongoDB
}
module.exports.test = () => {  
  Repo.find((err, repos) => {
    if(err) {
      console.log('ERROR', err)
    }
      console.log('SAVED', repos);
  })}
module.exports.save = save;