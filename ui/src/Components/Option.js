import React, { Component } from 'react';
import Helper from '../Helper';

class Option extends Component {
  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
  }

  vote() {
    localStorage.setItem('votedValue', this.props.value);

    fetch(Helper.getEndpoint('api/questions/' + encodeURIComponent(this.props.questionId) + "/answers"), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestKey: this.getRequestKey(),
        option: this.props.value,
      })
    })
    .then(result => result.json())
    .then(result => {
      this.setResponseKey(result);
      this.props.updateVoteStatus();
    });
  }

  setResponseKey(entity) {
    localStorage.setItem('responseKey', entity.responseKey);
  }

  getRequestKey() {
    var result = localStorage.getItem('requestKey');

    if(result == null) {
      result = this.getNewGuid();
      localStorage.setItem('requestKey', result);
    }

    return result;
  }

  getNewGuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  isVotedOption() {
    return localStorage.getItem('votedValue') == this.props.value;
  }

  render() {
    if(this.isVotedOption()) {
      return (
        <a className="App-option App-option-voted">{this.props.value}</a>
      );
    } else if(this.props.hasVoted) {
      return (
        <a className="App-option App-option-disabled">{this.props.value}</a>
      );
    } else {
      return (
        <a className="App-option" href="#" onClick={this.vote}>{this.props.value}</a>
      );
    }
  }
}

export default Option;
