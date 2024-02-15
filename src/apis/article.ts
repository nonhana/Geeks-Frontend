// src/apis/article.ts
// 封装与文章相关的API请求
import { http } from "@/service";
import { ArticleData } from "@/utils/types";

// 获取频道列表
export const getChannelAPI = () => {
  return http({
    url: "/channels",
    method: "GET",
  });
};

// 发布文章
export const publishArticleAPI = (data: ArticleData) => {
  const { draft, ...formData } = data;
  return http({
    url: `/mp/articles?draft=${draft}`,
    method: "POST",
    data: formData,
  });
};

// 获取文章列表
export const getArticleListAPI = (params: any) => {
  return http({
    url: "/mp/articles",
    method: "GET",
    params,
  });
};

// 删除文章
export const deleteArticleAPI = (id: string) => {
  return http({
    url: `/mp/articles/${id}`,
    method: "DELETE",
  });
};

// 获取文章详情
export const getArtilceDetailAPI = (id: string) => {
  return http({
    url: `/mp/articles/${id}`,
    method: "GET",
  });
};

// 编辑文章
export const editArticleAPI = (id: string, data: ArticleData) => {
  return http({
    url: `/mp/articles/${id}?draft=false`,
    method: "PUT",
    data,
  });
};
