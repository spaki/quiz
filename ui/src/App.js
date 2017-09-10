import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './Components/Question';
import Option from './Components/Option';
import Chart from './Components/Chart';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      question: { id: "", description: "", options: [] }
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion() {
    fetch(this.getEndpoint('api/Questions'))
      .then(result => result.json())
      .then(result => this.setState({ question: result }));
  }

  getEndpoint(ep){
    if(!window.location.hostname.includes('localhost'))
      return ep; // 'http://www.almocando.com.br/' + ep;
      
    return 'http://localhost:5000/' + ep;
  }

  renderOption(item) {
    return <Option value={item} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Question description={this.state.question.description}/>
        </div>
        <div className="App-options">
          { this.state.question.options.map(this.renderOption) }
        </div>
        <Chart questionId={this.state.question.id} />
      </div>
    );
  }
}

export default App;
