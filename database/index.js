const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher');
const Promise = require('bluebird');

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
if (!repos.length) {
  return;
}
return new Promise(function(resolve, reject) {

  let repoDocs = repos.map((repo) => {
    var popularity = (repo.watchers_count + repo.stargazers_count + repo.forks) / 3;
    
    return new Repo({
      repoid: repo.id,
      repoName: repo.name,
      url: repo.html_url,
      description: repo.description,
      watchersCount: repo.watchers_count,
      starGazers: repo.stargazers_count,
      forks: repo.forks_count,
      user: repo.owner.login,
      userid: repo.owner.id,
      popularityAverage: popularity
    });  
  });


  let storedCount = 0;
  let totalToStore = repoDocs.length;


  repoDocs.forEach(function (currentRepo) {
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
          storedCount++;
          console.log('succesffuly saved ' + currentRepo.repoName);
        }).then(() => {
          if(storedCount === totalToStore) {
            resolve();
            console.log('NEEDS TO RERENDER NOW!')
          }
        })
      } else {
        storedCount++;
        console.log('Repo ' + currentRepo.repoName+' already exists');
        if(storedCount === totalToStore) {
          console.log('NEEDS TO RERENDER NOW!')
          resolve();
        }
      }
    })  
  })
}).then(()=>{
  console.log('NEEDS TO RERENDER NOW!')
  return true;
})
  
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