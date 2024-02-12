import router from "@/router";
import { getToken, removeToken } from "@/utils";
import axios from "axios";

const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 500000,
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 操作config，注入token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 监控状态码401：token失效
    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { http };
