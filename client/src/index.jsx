import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []//<<------repos go here
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: "POST",
      url:"http://localhost:1128/repos", //<======this needs to be changed for deploy, it is currently hard coded
      data: term,
      success: () => {
        console.log('posted', term);
        this.getRepos();
      },
      error: () => {console.log('error', term)}
    })
  }

  getRepos () {
    $.ajax({
      method: "GET",
      url:"http://localhost:1128/repos", //<======this needs to be changed for deploy, it is currently hard coded
      success: (repos) => {
      console.log('rerendered');
      this.setState({repos: repos});
    },
      error: (error) => {console.log('error!', error);}
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
  componentDidMount() {
    this.getRepos();
  }
}

ReactDOM.render(<App />, document.getElementById('app'));