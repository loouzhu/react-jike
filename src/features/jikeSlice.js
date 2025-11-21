import { createSlice } from '@reduxjs/toolkit';
import { loginAPI, getUserInfoAPI } from '@/apis/user';
import { getChannelAPI } from '@/apis/artical';
import { getToken, setToken as _setToken } from '@/utils'

export const jikeSlice = createSlice({
  name: 'jike',
  initialState: {
    token: getToken() || '',
    userInfo: {},
    channelList: []
  },
  reducers: {
    // 修改token
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    // 提交用户信息
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    // 存入频道列表
    setChannelList(state, action) {
      state.channelList = action.payload
    }
  },
});

export const { setToken, setUserInfo, removeToken, setChannelList } = jikeSlice.actions

// 异步方法，用于在完成登录之后获取token
export const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      // 发送异步请求
      const res = await loginAPI(loginForm)
      // 提交同步方法，token存入
      dispatch(setToken(res.data.token))
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

// 获取用户信息的异步方法
export const fetchUserInfo = () => {
  return async (dispatch) => {
    try {
      const res = await getUserInfoAPI()
      dispatch(setUserInfo(res.data))
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

// 获取频道列表的异步方法
export const fetchChannelList = () => {
  return async (dispatch) => {
    try {
      const res = await getChannelAPI()
      dispatch(setChannelList(res.data.channels))
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default jikeSlice.reducer;