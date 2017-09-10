import React, { Component } from 'react';
import ChartBar from './ChartBar';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      options: []
    };
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.getItems(), 1000);
  }

  componentDidUnmount() {
    this.timer = null;
  }

  getItems() {
    if(this.props.questionId != "") {
      fetch(this.getEndpoint('api/questions/' + encodeURIComponent(this.props.questionId) + "/answers"))
        .then(result => result.json())
        .then(result => this.setState({ options: result }));
    }
  }

  getEndpoint(ep){
    if(!window.location.hostname.includes('localhost'))
      return ep; // 'http://www.almocando.com.br/' + ep;
      
    return 'http://localhost:5000/' + ep;
  }

  renderBar(item) {
    return <ChartBar option={item.option} percentage={item.percentage} />;
  }

  render() {
    return (
      <div className="App-chart">
        { this.state.options.map(this.renderBar) }
      </div>
    );
  }
}

export default Chart;
