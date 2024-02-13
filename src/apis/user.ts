// src/apis/user.ts
// 封装与用户相关的API请求
import { http } from "@/service";

// 登录
export const loginAPI = (data: any) => {
  return http({
    url: "/authorizations",
    method: "POST",
    data,
  });
};

// 获取用户信息
export const getProfileAPI = () => {
  return http({
    url: "/user/profile",
    method: "GET",
  });
};
