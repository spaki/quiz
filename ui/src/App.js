import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './Components/Question';
import Option from './Components/Option';
import Chart from './Components/Chart';
import QrCode from './Components/QrCode';
import HiddenMenu from './Components/HiddenMenu';
import Helper from './Helper';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      question: { id: "", description: "", options: [] },
      hasVoted: false
    };

    this.updateVoteStatus = this.updateVoteStatus.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion() {
    fetch(Helper.getEndpoint('api/Questions'))
      .then(result => result.json())
      .then(result => this.setState({ question: result }))
      .then(result => this.setState({ hasVoted: this.hasVoted() }));
  }

  updateVoteStatus() {
    this.setState({ hasVoted: this.hasVoted() })
  }

  hasVoted() {
    return localStorage.getItem('questionId') == this.state.question.id && localStorage.getItem('requestKey') != null;
  }

  renderOption(item) {
    return <Option key={item} value={item} questionId={this.state.question.id} updateVoteStatus={this.updateVoteStatus} hasVoted={this.state.hasVoted}/>;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Question description={this.state.question.description}/>
        </div>
        <div className="App-flex-container">
          <div className="App-flex-item">
            <div className="App-options">
              { this.state.question.options.map(this.renderOption) }
            </div>
            <Chart questionId={this.state.question.id} />
          </div>
          <div className="App-flex-item">
            <QrCode />
          </div>
        </div>
        <div>
          <HiddenMenu updateVoteStatus={this.updateVoteStatus} questionId={this.state.question.id}/>
        </div>
      </div>
    );
  }
}

export default App;