import React, { Component } from 'react';

class Option extends Component {
  render() {
    return (
      <li><a>{this.props.value}</a></li>
    );
  }
}

export default Option;
