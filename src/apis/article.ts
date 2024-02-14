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
