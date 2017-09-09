import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './Components/Question';
import Option from './Components/Option';
import Chart from './Components/Chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { options:  ["111", "2 2 2", "333 333 333"] };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Question description="ma oeeeeeeee"/>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          { this.state.options.map((item,i) => <Option value={item} />) }
        </ul>
        <Chart />
      </div>
    );
  }
}

export default App;
