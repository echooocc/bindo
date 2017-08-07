import React, { Component } from 'react';
import 'milligram';
import './App.css';

function UserDetail({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <img src={user.image} alt="avatar"/>
      <p>age: {user.age}</p>
      <p>gender: {user.gender}</p>
      <p>email: {user.email}</p>
      <p>phone: {user.phone}</p>
      <p>phrase: {user.phrase}</p>
    </div>
  );
}

class UtilityBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
    this.handleSortAscend = this.handleSortAscend.bind(this);
    this.handleSortDescend = this.handleSortDescend.bind(this);
  }

  handleFilterNameChange = (e) => {
    let target = e.currentTarget;
    this.props.handleFilterName(target.value) ;
  }

  handleSortAscend(e) {
    e.preventDefault();
    return this.props.handleSort('ascend');
  }

  handleSortDescend(e) {
    e.preventDefault();
    return this.props.handleSort('descend');
  }

  render() {
    return (
      <div className="row" style={{marginBottom: 10}}>
        <input type="text" className="column" placeholder="Search for names" value={this.props.filterName} onChange={this.handleFilterNameChange} />
        <button type="button" className="column column-20 button button-clear" onClick={this.handleSortAscend}>age &uarr;</button>
        <button type="button" className="column column-20 button button-clear" onClick={this.handleSortDescend}>age &darr;</button>
      </div>
    );
  }
}

class UserTable extends Component{
  constructor(props) {
    super(props);
    this.handleClickOnUserDetail = this.handleClickOnUserDetail.bind(this);
  }

  handleClickOnUserDetail(e){
    //click on table cell, event should be captured on parent node(table row)
    let target = e.target.parentNode;
    e.preventDefault();
    return this.props.handleOnUserDetail(target);
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody onClick={this.handleClickOnUserDetail}>
          {this.props.users.map(user =>
            user.name.toLowerCase().indexOf(this.props.filterName)>=0 ? <tr key={user.id} id={user.id}><td>{user.name}</td><td> {user.age}</td></tr> : ''
          )}
        </tbody>
      </table>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userDetail: [],
      filterName: ''
    };
    this.handleFilterName = this.handleFilterName.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleOnUserDetail = this.handleOnUserDetail.bind(this);
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState(function(){return {users: users}}));
  }

  handleFilterName(filterName) {
    this.setState(function(){return {filterName: filterName}});
  }

  handleSort(action)  {
    let sortedUser = this.state.users;
    if (action === 'ascend') {
     sortedUser.sort(function(a, b){return a.age -b.age;});
    } else {
     sortedUser.sort(function(a, b){return b.age - a.age;});
    }
    this.setState(function(){return {users: sortedUser}})
  }

  handleOnUserDetail(target){
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
        <UtilityBar 
          handleFilterName = {this.handleFilterName}
          handleSort = {this.handleSort}
        />
        <div className="row">
          <div className="column">
            <UserTable
              users = {this.state.users}
              filterName = {this.state.filterName}
              handleOnUserDetail = {this.handleOnUserDetail}
            />
          </div>
          <div className="column">
            {this.state.userDetail.length > 0 ? <UserDetail user={this.state.userDetail[0]} /> : ''}
          </div>
        </div>
      </div>
    );
  }
}


export default App;