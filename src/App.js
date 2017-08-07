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
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState(function(){return {users: users}}));
  }

  handleFilterName(event) {
    let target = event.currentTarget;
    console.log(target.value);
    this.setState(function(prevState){return {filterName: target.value}});
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
        </form>
      </div>
    );
  }
}



export default App;
