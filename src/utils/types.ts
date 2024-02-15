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

// 筛选条件
export interface Filter {
  /**
   * 起始时间(指的想让后台从哪个时间开始往后返回数据), 格式年-月-日
   */
  begin_pubdate?: string;
  /**
   * 不传为全部(指的不传递此参数名)
   */
  channel_id?: string;
  /**
   * 截止时间(指的想让后台返回到哪个时间之前的数据), 格式年-月-日
   */
  end_pubdate?: string;
  /**
   * 当前页码(默认为1)
   */
  page?: string;
  /**
   * 当前页条数(默认为10)
   */
  per_page?: string;
  /**
   * 文章状态: 0-草稿, 1-待审核, 2-审核通过, 3-审核失败, 不传为全部(指的参数名也不携带)
   */
  status?: string;
}
