import React, { Component } from 'react';

class Question extends Component {
  render() {
    return (
      <h2>
        {this.props.description}
      </h2>
    );
  }
}

export default Question;
