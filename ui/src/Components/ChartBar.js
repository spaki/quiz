import React, { Component } from 'react';

class ChartBar extends Component {
  render() {
    return (
      <div className="App-chart-option" style={{ width: this.props.percentage + "%" }}>
        {this.props.option} ({this.props.percentage}%)
      </div>
    );
  }
}

export default ChartBar;
