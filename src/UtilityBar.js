import React, { Component } from 'react';

export default class UtilityBar extends Component {
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