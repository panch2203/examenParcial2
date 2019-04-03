import React, { Component, Fragment } from 'react';
import './App.css';
import TweetBox from './TweetBox';
import Feed from './Feed';
import axios from 'axios';

const API = 'https://still-garden-88285.herokuapp.com/draft_tweets';
const DEFAULT_QUERY = 'redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: [],
      error: null,
      isLoaded: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    axios.get(API)
      .then(
        result => {
          console.log(result.data);
          this.setState({
            isLoaded: true,
            tweets: result.data.draft_tweets 
          })
        })
        .catch(error => {
          this.setState({
            isLoaded: true,
            error: error
          })
        }
      )
  }

  handleSubmit(newText) {
    this.setState({isLoaded: false});

    // Static UI :(
    // let newTweet = {
    //   id: this.state.tweets.length + 1,
    //   user_name: 'Yvone',
    //   avatar: 'https://img.ifcdn.com/images/d3951bf44788590b80f69c0c65718f7a23eb33c645cb677ee335f81a6e785ee6_3.jpg',
    //   created_at: '11-03-2019',
    //   description: newText
    // };

    // let tweets = this.state.tweets.slice();

    // this.setState({ tweets: tweets.concat(newTweet) });

    // Dynamic UI !
    let newTweet = {
      user_name: 'Yvone',
      avatar: 'https://img.ifcdn.com/images/d3951bf44788590b80f69c0c65718f7a23eb33c645cb677ee335f81a6e785ee6_3.jpg',
      description: newText
    };

    axios.post("https://still-garden-88285.herokuapp.com/draft_tweets", newTweet)
      .then(
        (result) => {
          let newTweets = this.state.tweets.slice();

          this.setState({
            isLoaded: true,
            tweets: newTweets.concat(result.data.draft_tweet)
          });
        })
        .catch(error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, tweets } = this.state;
    let content;

    if (error) {
      content = <div>Error: {error.message}</div>;
    } else {
      return (
        content = (
          <Fragment>
            <TweetBox
              onSubmitNewTweet={this.handleSubmit}
            />
            <Feed 
              tweets={tweets}
              isLoaded={isLoaded}
            />
          </Fragment>
        )
      );
    }

    return (
      <div className="App">
        { content }
      </div>
    )
  }
}

export default App;
