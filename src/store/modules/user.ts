// src/store/modules/user.ts
// 放置和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { getProfileAPI, loginAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  // 初始化相关的状态
  initialState: {
    token: getToken() || "",
    userInfo: {} as any,
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // 手动持久化存储：往localStorage存储token
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    reset(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, reset } = userStore.actions;
const userReducer = userStore.reducer;

// 异步方法
// 登录
const fetchLogin = (loginForm: any) => {
  return async (dispatch: any) => {
    // 1. 发送异步请求
    const res = await loginAPI(loginForm);
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};
// 获取用户个人信息
const fetchUserInfo = () => {
  return async (dispatch: any) => {
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, setToken, fetchUserInfo, reset };
export default userReducer;
