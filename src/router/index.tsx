// src/router/index.ts
// 进行路由的配置

import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";

// 配置路由懒加载
// 1. 使用lazy函数对组件进行懒加载
const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

// 配置路由实例
// 2. 使用Suspense组件对懒加载的组件进行包裹
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="加载中">
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/article",
        element: (
          <Suspense fallback="加载中">
            <Article />
          </Suspense>
        ),
      },
      {
        path: "/publish",
        element: (
          <Suspense fallback="加载中">
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
