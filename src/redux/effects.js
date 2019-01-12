import  * as Api from "../services";
import { call, put, takeEvery } from 'redux-saga/effects'

/**
 * 副作用处理 effects：
 *  用于异步处理请求
 * */
export const effects = {
  // 获取话题列表
  *fetchTopics({ payload }) {
    console.log('effects fetchTopics');
    const res = yield call(Api.topics, payload);
    if (res.success) {
      yield put({
        type: 'topics',
        payload: {
          topics: res.data,
        }
      });
    }
  },
  // 获取话题详情
  *fetchTopic({ payload }) {
    console.log('effects fetchTopic');
    const res = yield call(Api.topic, payload);
    if (res.success) {
      yield put({
        type: 'topic',
        payload: {
          topic: res.data,
        }
      });
    }
  },
  // 获取用户已收藏主题
  *fetchCollected({ payload }) {
    console.log('effects fetchCollected');
    const res = yield call(Api.collected, payload);
    if (res.success) {
      yield put({
        type: 'collected',
        payload: {
          collected: res.data,
        }
      });
    }
  }
}

/**
 * 异步 action 监听：
 *  dispatch 对应的action时，调用对应的异步处理方法
 * */
export function* watcher() {
  console.log('saga watcher');
  yield takeEvery('fetchTopics', effects.fetchTopics);
  yield takeEvery('fetchTopic', effects.fetchTopic);
  yield takeEvery('fetchCollected', effects.fetchCollected);
}