import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils/request'
export const jikeSlice = createSlice({
  name: 'jike',
  initialState: {
    token: localStorage.getItem('token') || ''
  },
  reducers: {
    // 修改token
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    }
  },
});

// 异步方法，用于在完成登录之后获取token
export const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      // 发送异步请求
      const res = await request.post('/authorizations', loginForm)
      // 提交同步方法，token存入
      dispatch(setToken(res.data.token))
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default jikeSlice.reducer;

export const { setToken } = jikeSlice.actions