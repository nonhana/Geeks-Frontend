// 封装获取频道列表的逻辑
import { useEffect, useState } from "react";
import { getChannelAPI } from "@/apis/article";

export function useChannel() {
  // 获取频道列表
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    // 1. 封装函数，在函数体内部调用接口
    const getChannelList = async () => {
      const {
        data: { channels },
      } = await getChannelAPI();
      setChannelList(channels);
    };
    // 2. 调用函数
    getChannelList();
  }, []);
  return { channelList };
}
