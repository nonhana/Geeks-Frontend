import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";
// 引入汉化包，使日期选择器显示中文
import locale from "antd/es/date-picker/locale/zh_CN";
// 导入资源
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/imgs/error.png";
import { useChannel } from "@/hooks/useChannels";
import { useEffect, useState } from "react";
import { deleteArticleAPI, getArticleListAPI } from "@/apis/article";
import { Filter } from "@/utils/types";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate();
  const { channelList } = useChannel();
  // 定义状态枚举
  const statusMap: Map<number, JSX.Element> = new Map([
    [0, <Tag color="warning">待审核</Tag>],
    [2, <Tag color="success">审核通过</Tag>],
  ]);

  // 删除
  const onConfirm = async (data: any) => {
    console.log(data);
    await deleteArticleAPI(data.id);
    setReqData({ ...reqData }); // 单纯的刷新列表
  };
  // 准备列数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover: any) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      // data - 后端返回的状态，根据他做不同的渲染
      // 1 - 待审核
      // 2 - 审核通过
      render: (data: number) => statusMap.get(data),
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data: any) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="删除文章"
              description="确定要删除这篇文章吗？"
              onConfirm={() => onConfirm(data)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 筛选功能实现
  // 1. 准备参数
  const [reqData, setReqData] = useState<Filter>({
    begin_pubdate: "",
    channel_id: "",
    end_pubdate: "",
    page: "1",
    per_page: "10",
    status: "",
  });
  // 2. 获取筛选数据
  const onFinish = async (values: any) => {
    console.log(values);
    // 3. 把收集到的数据放到reqData中（不可变的方式）
    setReqData({
      ...reqData,
      begin_pubdate: values.date[0].format("YYYY-MM-DD"),
      end_pubdate: values.date[1].format("YYYY-MM-DD"),
      status: values.status,
      channel_id: values.channel_id,
    });
    // 4. 重新拉取文章列表并渲染
    // reqData发生变化后，会直接触发useEffect，重新拉取文章列表，无需手动调用
  };

  // 获取文章列表
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData);
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, [reqData]);

  // 分页功能实现
  const onPageChange = (page: number) => {
    setReqData({ ...reqData, page: page.toString() });
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 240 }}>
              {channelList.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: Number(reqData.per_page),
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
