import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from '../../containers/Carousel';

@connect(({ topics, collected }) => ({
  topics,
  collected,
}))
export default class Home extends React.Component {
  componentDidMount() {
    // 获取数据列表
    this.props.dispatch({
      type: 'fetchTopics',
    });

    // 获取用户收藏列表
    this.props.dispatch({
      type: 'fetchCollected',
      payload: {
        name: 'zWorker9902',
      }
    });
  }

  render() {
    const { topics, collected } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <h1 className="text-center">欢迎来到学习社区</h1>
            <div className="col-xs-8 home">
              <Carousel />

              <h4>话题首页</h4>
              <div className="list-container">
                <ul className="note-list">
                  {
                    topics.map((d) =>
                      <li className="list-group-item" key={d.id}>
                        <Link to={`/topic/${d.id}`}>{d.title}</Link>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
            <div className="col-xs-4 home">
              <h4>我的收藏</h4>
              <div className="list-container">
                <ul className="note-list">
                  {
                    collected.map((d) =>
                      <li className="list-group-item" key={d.id}>
                        <Link to={`/topic/${d.id}`}>{d.title}</Link>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}