import React from 'react';
import { connect } from 'react-redux';
import './index.less';

@connect(({ topic }) =>({
  topic,
}))
export default class Topic extends React.Component {
  constructor(props) {
    super(props);

    const { match } = props;
    this.state = {
      id: match.params.id,
    }
  }

  componentDidMount() {
    const { id } = this.state;
    this.props.dispatch({
      type: 'fetchTopic',
      payload: {
        id,
      }
    })
  }

  render() {
    const { topic } = this.props;
    const { author } = topic;

    return (
      <div className="container topic">
        <h1 className="title text-center">{topic.title}</h1>
        {
          author && (
            <div className="avatar">
              <img src={`${author.avatar_url}`} />
              <span>{author.loginname}</span>
            </div>
          )
        }

        <div className="topic-content">
          <div dangerouslySetInnerHTML={{__html: topic.content}} />
        </div>
      </div>
    );
  }
}