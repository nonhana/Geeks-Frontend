// src/components/AuthRoute.tsx
// 高阶组件：有token，正常渲染组件，否则跳转到登录页
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

function AuthRoute(props: { children: any }) {
  const token = getToken();
  if (token) {
    return props.children;
  } else {
    return <Navigate to={"/login"} replace />;
  }
}

export default AuthRoute;
