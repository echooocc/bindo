import React, { Component } from 'react';

export default class UserTable extends Component{
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