import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react'

const ThumbUpButton = {
  backgroundColor: 'rgb(115, 250, 179)',
  border: 'none',
  borderRadius: '5px',
}

const ThumbDownButton = {
  backgroundColor: 'rgb(15, 250, 179)',
  border: 'none',
  borderRadius: '5px',
}

const ThumbStyle = {
  backgroundColor: 'red',
  border: 'none',
  padding: '5px',
  borderRadius: '5px',
  margin: '1rem'
}

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
        <i className="upVote">{this.state.upVote}</i>
        <button className="voteUp" style={{border: 'none', backgroundColor: 'transparent'}} onClick={this.up}><ThumbUpIcon style={ThumbUpButton} /></button>
        <button className="voteDown" style={{border: 'none', backgroundColor: 'transparent'}} onClick={this.down}><ThumbDownIcon style={ThumbDownButton} /></button>
        <i className="downVote">{this.state.downVote}</i>
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
    this.setState({
      voted: false,
      upVote: 0,
      downVote: 0
    });
  }
}
