import React, { Component } from 'react';
import 'whatwg-fetch';
import Loading from './Loading';
import Open from './Open';
import Closed from './Closed';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      poolClosed: false,
      closedPost: null
    }

    /// 24 hours in milliseconds
    this.closedPeriod = 24 * 60 * 60 * 1000;
  }

  async componentWillMount() {
    const resp = await fetch("/api/latest");
    const json = await resp.json();

    const post = this.determinePoolClosed(json);

    this.setState({
      loading: false,
      poolClosed: post !== false,
      closedPost: post
    });
  }

  determinePoolClosed(posts) {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      if (this.titleMatches(post) && this.withinCleaningWindow(post)) {
        return post;
      }
    }

    return false;
  }

  titleMatches(post) {
    return post.title.rendered.match(/pool closed/i);
  }

  withinCleaningWindow(post) {
    const postDate = (new Date(post.date_gmt)).getTime();
    const now = (new Date()).getTime();

    return (now - postDate) < this.closedPeriod;
  }

  getContent() {
    if (this.state.loading) return <Loading />;
    return this.state.poolClosed ? <Closed post={this.state.closedPost} /> : <Open />;
  }

  render() {
    return (
      <div className="App">
        {this.getContent()}
      </div>
    );
  }
}

export default App;
