// 测试token是否成功的注入
import { http } from "@/service";
import { useEffect } from "react";

const Layout = () => {
  useEffect(() => {
    http.get("/user/profile");
  }, []);
  return <div>this is Layout</div>;
};

export default Layout;
