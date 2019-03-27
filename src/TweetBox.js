import React, { Component } from 'react';
import './App.css';

class TweetBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ text: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();

    let newText = this.state.text;
    this.setState({text: ''})

    this.props.onSubmitNewTweet(newText);
  }

  render() {
    return(
      <form 
        onSubmit={this.handleSubmit}
        className="tweet-box row"
      >
        <img 
          alt="user's avatar"
          className="small-avatar"
          src="https://img.ifcdn.com/images/d3951bf44788590b80f69c0c65718f7a23eb33c645cb677ee335f81a6e785ee6_3.jpg"
        />
        <input
          value={this.state.text}
          placeholder={'What´s happening?'}
          onChange={this.handleChange}
        />
        <button>Tweet</button>
      </form>
    )
  }
}

export default TweetBox;
