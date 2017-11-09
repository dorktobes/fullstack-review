const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher');

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
    });  
    // console.log(Repo);
    Repo.find({repoid: currentRepo.repoid}, function(error, repos) {
      console.log('CHECKING FOR DUPES........');
      if(error) {
        console.log(error);
        return;
      }
      if (repos.length === 0) {
        console.log('SAVING...');
        currentRepo.save(function(error, currentRepo) {
          if (error) {
            console.log(error);
            return;
          }
          console.log('succesffuly saved ' + currentRepo.repoName);
        })
      } else {
        console.log('Repo ' + currentRepo.repoName+' already exists');
      }
    })
  })
  return true;
}

let retreive = () => {
  return Repo.find().
  limit(25).
  sort('-popularityAverage').
  exec((err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return data;
  });
}

module.exports.save = save;
module.exports.retreive = retreive;