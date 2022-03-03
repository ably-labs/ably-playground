import React, { useState } from 'react'

export class Vote extends React.Component {
  constructor() {
    super();

    this.state = {
      voted: false,
      upVote: 0,
      downVote: 0,
    };

    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div>
      <div>
        <span className="upVote">{this.state.upVote}</span>
        <button className="voteUp" onClick={this.up}>UP</button>
        <button className="voteDown" onClick={this.down}>DOWN</button>
        <span className="downVote">{this.state.downVote}</span>
      </div>
      <div>
        <button className="reset" onClick={this.reset}>Reset Votes</button>
      </div>
      </div>
    );
  }

  up() {
    if (this.state.voted) {
      return;
    }
    this.setState({
      upVote: this.state.upVote + 1,
    });
    this.state.voted = true;
  }

  down() {
    if (this.state.voted || this.state.downVote == 0) {
      return;
    }
    this.setState({
      downVote: this.state.downVote - 1,
    });
    this.state.voted = true;
  }

  reset() {
      console.log('reset vote');
    this.setState({
      voted: false,
      upVote: 0,
      downVote: 0
    });
  }
}
