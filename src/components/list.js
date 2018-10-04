import React from 'react'
import { Skeleton, List, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'

export default class Lists extends React.PureComponent {
  static state = {}

  render() {
    return (
      <React.Fragment>
        {this.props.status === 'fetching' && (
          <div className="entry-normal">
            {Array.from({
              length: 25
            }).map((_, i) => (
              <Skeleton loading={true} active avatar key={i} />
            ))}
          </div>
        )}

        {this.props.status === 'success' &&
          this.props.data.map((topic) => (
            <div className="list-item" key={topic.TopicId}>
              <div className="list-item--score">{topic.MatchedCount}</div>

              <div className="list-item-title">
                <Link to={`/topic/${topic.TopicId}`}>{topic.Title}</Link>
              </div>

              <div className="list-item-meta">
                <span>{topic.FullCount} entry</span>
              </div>
            </div>
          ))}
      </React.Fragment>
    )
  }
}
