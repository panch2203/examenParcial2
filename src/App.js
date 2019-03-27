import React, { Component, Fragment } from 'react';
import './App.css';
import TweetBox from './TweetBox';
import Feed from './Feed';

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
    // You will want to do some fetching!
  }

  handleSubmit(newText) {
    // this.setState({isLoaded: false});

    // Static UI :(
    let newTweet = {
      id: this.state.tweets.length + 1,
      user_name: 'Yvone',
      avatar: 'https://img.ifcdn.com/images/d3951bf44788590b80f69c0c65718f7a23eb33c645cb677ee335f81a6e785ee6_3.jpg',
      created_at: '11-03-2019',
      description: newText
    };

    let tweets = this.state.tweets.slice();

    this.setState({ tweets: tweets.concat(newTweet) });

    // Dynamic UI !
    // we will need to build some Data to send
    // let newTweet = {
    // };

    // And some options too
    let headers = {};
    headers['Content-Type'] = 'application/json';

    const options = {
      headers: headers,
      method: 'POST'
      // body: JSON.stringify(newTweet) such a nice place to send Data
    };

    // how about some more fetching here? YEAH!
    // Don't forget to tell the state, data isLoaded!
    // this.setState({isLoaded: true});
    
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
