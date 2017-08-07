import React, { Component } from 'react';
import 'milligram';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userDetail: [],
      filterName: ''
    };
    this.handleFilterName = this.handleFilterName.bind(this);
    this.sortTableAscend = this.sortTableAscend.bind(this);
    this.sortTableDescend = this.sortTableDescend.bind(this);
    this.handleClickOnUserDetail = this.handleClickOnUserDetail.bind(this);
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState(function(){return {users: users}}));
  }

  handleFilterName(event) {
    let target = event.currentTarget;
    this.setState(function(prevState){return {filterName: target.value}});
  }

  sortTableAscend(){
     let sortedUser = this.state.users;
     sortedUser.sort(function(a, b){return a.age - b.age;});
     this.setState(function(){return {users: sortedUser}})
  }

  sortTableDescend(){
     let sortedUser = this.state.users;
     sortedUser.sort(function(a, b){return b.age - a.age;});
     this.setState(function(){return {users: sortedUser}})
  }

  handleClickOnUserDetail(event){
    //click on table cell, event should be captured on parent node(table row) 
    let target = event.target.parentNode;
    let users = this.state.users;
    let userDetail = users.filter(function(user){
      return user.id.toString()=== target.id;
    });
    this.setState(function(){return {userDetail: userDetail}});
  }

  render() {
    return (
      <div className="container">
        <h2>Bindo Code Chanllenge</h2>
        <div className="row" style={{marginBottom: 10}}>
          <input type="text" className="column" placeholder="Search for names" value={this.state.filterName} onChange={this.handleFilterName} />
          <button type="button" className="column column-20 button button-clear" onClick={this.sortTableAscend}>age &uarr;</button>
          <button type="button" className="column column-20 button button-clear" onClick={this.sortTableDescend}>age &darr;</button>
        </div>
        <div className="row">
          <div className="column">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody onClick={this.handleClickOnUserDetail}>
              {this.state.users.map(user =>
                user.name.toLowerCase().indexOf(this.state.filterName)>=0 ? <tr key={user.id} id={user.id}><td>{user.name}</td><td> {user.age}</td></tr> : ''
              )}
              </tbody>
            </table>
          </div>
          <div className="column">
          {this.state.userDetail.length > 0 ?
            <div>
              <h2>{this.state.userDetail[0].name}</h2>
              <img src={this.state.userDetail[0].image} alt="avatar"/>
              <p>gender: {this.state.userDetail[0].gender}</p>
              <p>email: {this.state.userDetail[0].email}</p>
              <p>phone: {this.state.userDetail[0].phone}</p>
              <p>phrase: {this.state.userDetail[0].phrase}</p>   
            </div> : ''
          }
          </div>
        </div>
      </div>
    );
  }
}



export default App;
