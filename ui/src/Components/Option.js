import React, { Component } from 'react';

class Option extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: 0
    };
  }

  render() {
    return (
      <a className="App-option" href="#">{this.props.value}</a>
    );
  }
}

export default Option;
