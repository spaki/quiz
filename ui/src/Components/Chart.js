import React, { Component } from 'react';
import ChartBar from './ChartBar';
import Helper from '../Helper';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      answers: [],
      total: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getItems(), 1000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  getItems() {
    if(this.props.questionId !== "") {
      fetch(Helper.getEndpoint('api/questions/' + encodeURIComponent(this.props.questionId) + "/answers"))
        .then(result => result.json())
        .then(result => this.setState({ answers: result.answers, total: result.total }));
    }
  }

  renderBar(item) {
    return <ChartBar key={item.option} option={item.option} percentage={item.percentage} />;
  }

  render() {
    if(this.state.answers.length > 0)
      return (
        <div>
          <div className="App-chart-outside">
            <div className="App-chart">
              { this.state.answers.map(this.renderBar) }
              </div>
            </div>
          <div>
            Total: { this.state.total }
          </div>
        </div>
      );

    return (
      <div>
        <i>loading...</i>
      </div>
    );
  }
}

export default Chart;
