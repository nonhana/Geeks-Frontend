// src/utils/types.ts
// 用于定义公用的类型（interface）

// 发布文章表单数据
export interface ArticleData {
  draft: boolean;
  title: string;
  content: string;
  cover: {
    type: number;
    images: string[];
  };
  channel_id: number;
}
