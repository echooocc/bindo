import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filterName: ''
    };
    this.handleFilterName = this.handleFilterName.bind(this);
    this.sortTableAscend = this.sortTableAscend.bind(this);
    this.sortTableDescend = this.sortTableDescend.bind(this);
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState(function(){return {users: users}}));
  }

  handleFilterName(event) {
    let target = event.currentTarget;
    this.setState(function(prevState){return {filterName: target.value}});
  }

  sortTableAscend(){
     let sortedUser = this.state.users;
     sortedUser.sort(function(a, b){return b.id - a.id;});
     this.setState(function(){return {users: sortedUser}})
  }

  sortTableDescend(){
     let sortedUser = this.state.users;
     sortedUser.sort(function(a, b){return a.id - b.id;});
     this.setState(function(){return {users: sortedUser}})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.state.users.map(user =>
          user.name.toLowerCase().indexOf(this.state.filterName)>=0 ? <div key={user.id}>{user.name}</div> : ''
        )}
        <form>
          <input type="text" value={this.state.filterName} onChange={this.handleFilterName} />
          <button type="button" onClick={this.sortTableAscend}>ascend</button>
          <button type="button" onClick={this.sortTableDescend}>descent</button>
        </form>
      </div>
    );
  }
}



export default App;
