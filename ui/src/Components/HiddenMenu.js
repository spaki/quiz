import React, { Component } from 'react';
import Helper from '../Helper';

class HiddenMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      visible: false
    };

    this.setVisibleState = this.setVisibleState.bind(this);
    this.deleteAllAnswers = this.deleteAllAnswers.bind(this);
    this.deleteCache = this.deleteCache.bind(this);
  }

  setVisibleState() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }

  deleteAllAnswers() {
    fetch(Helper.getEndpoint('api/questions/' + encodeURIComponent(this.props.questionId) + "/answers"), {
      method: 'DELETE'
    })
    .then(result => {
      this.deleteCache();
    });
  }

  deleteCache() {
    localStorage.removeItem('responseKey');
    localStorage.removeItem('requestKey');
    localStorage.removeItem('votedValue');
    localStorage.removeItem('questionId');
    this.props.updateVoteStatus();
  }

  render() {
    if(!this.state.visible)
      return (
        <div className="App-hidden-menu App-hidden-menu-invisible">
            <div>
              <a href="javascript:;" onClick={this.setVisibleState}>Show</a>
            </div>
        </div>
      );

      return (
        <div>
          <div>
            <a href="javascript:;" onClick={this.setVisibleState}>Hide</a>
          </div>
          <div>
            <br />
          </div>
          <div>
            <a href="javascript:;" onClick={this.deleteAllAnswers}>Delete all Answers</a>
          </div>
          <div>
            <a href="javascript:;" onClick={this.deleteCache}>Delete my cache</a>
          </div>
          <div>
            <br />
          </div>
        </div>
      );
  }
}

export default HiddenMenu;
