import React from 'react'
import moment from 'moment'
import './shared.css'
import './closed.css'

export default class Closed extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showMore: false
    };
  }

  showMore(e) {
    e.preventDefault();
    this.setState({ showMore: true });
  }

  getPostDate() {
    const { post } = this.props;
    return moment(post.date_gmt).format('MMM D, YYYY H:mm a');
  }

  getShowMore() {
    if (!this.state.showMore) return;
    const { post } = this.props;

    return (
      <div className="show-more">
        <p><b>At {this.getPostDate()}, CMG posted:</b></p>
        <div className="post-content" dangerouslySetInnerHTML={{__html: post.content.rendered }}></div>
      </div>
    )
  }

  render() {
    return (
      <div className="Status Closed">
        <div className="emoji-header"><span role="img" aria-label="poop">💩</span></div>
        <h1>Yes</h1>
        <p className="disclaimer">Note: This assumes 24 hour cleaning time and may not be 100% accurate.</p>

        {(() => {
          if (!this.state.showMore) {
            return (
              <p className="post-link">
                <a href="#" onClick={this.showMore.bind(this)}>More Info</a>
              </p>
            )
          }
        })()}

        {this.getShowMore()}
      </div>
    )
  }
}
