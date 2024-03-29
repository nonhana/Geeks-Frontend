import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  editArticleAPI,
  getArtilceDetailAPI,
  publishArticleAPI,
} from "@/apis/article";
import { ArticleData } from "@/utils/types";
import { useChannel } from "@/hooks/useChannels";

const { Option } = Select;

const Publish = () => {
  const { channelList } = useChannel();

  // 提交表单
  const onFinish = async (values: any) => {
    // 校验封面类型是否和实际的图片数量匹配
    if (imageList.length !== imageType)
      return message.warning("请选择正确数量的封面图片");
    const { title, content, channel_id } = values;
    // 按照接口文档的格式处理表单数据
    const formData: ArticleData = {
      draft: false,
      title,
      content,
      cover: {
        type: imageType,
        // 这里的url处理逻辑只是在新增的时候进行处理的
        images: imageList.map((item: any) => {
          if (item.response) return item.response.data.url;
          return item.url;
        }),
      },
      channel_id,
    };
    // 调用接口提交
    // 调用不同的接口：新增/编辑
    if (articleId) {
      // 更新接口
      await editArticleAPI(articleId, formData);
    } else {
      await publishArticleAPI(formData);
    }
  };

  // 上传图片
  const [imageList, setImageList] = useState([]);
  const onUploadChange = (info: any) => {
    console.log(info.fileList);
    setImageList(info.fileList);
  };

  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e: any) => {
    console.log(e.target.value);
    setImageType(e.target.value);
  };

  // 回填数据
  const [searchParams] = useSearchParams(); // useSearchParams是一个hook，用于获取url中的查询参数
  const articleId = searchParams.get("id");
  // 获取表单实例
  const [form] = Form.useForm();
  useEffect(() => {
    // 1. 根据id获取数据
    async function getArticleDetail() {
      if (!articleId) return;
      const res = await getArtilceDetailAPI(articleId);
      form.setFieldsValue({
        ...res.data,
        type: res.data.cover.type,
      });
      // 回填图片列表
      setImageType(res.data.cover.type);
      setImageList(
        res.data.cover.images.map((url: string) => ({
          url,
        }))
      );
    }
    getArticleDetail();
    // 2. 调用实例方法，完成回填
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType="picture-card"：以卡片形式展示
              showUploadList：展示上传列表
            */}
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onUploadChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
