
/**
 * 初始化State
 * */
const initState = {
  topics: [],
  topic: {},
  collected: [],
}

/**
 * 纯函数 reducer：
 * 传入旧 state 和 action，从而返回一个信息state
 * */
export const reducers = (state = initState, { type, payload }) => {
  console.log('reducers:', type);
  switch(type) {
    case 'fetchTopics': {
      return {
        ...state,
      }
    }
    case 'topics': {
      return {
        ...state,
        topics: payload.topics,
      }
    }
    case 'topic': {
      return {
        ...state,
        topic: payload.topic,
      }
    }
    case 'collected': {
      return {
        ...state,
        collected: payload.collected,
      }
    }
    default: {
      return state;
    }
  }
}

