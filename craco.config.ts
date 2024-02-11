import { resolve } from "path";

export const webpack = {
  // 配置别名路径@
  alias: {
    "@": resolve(__dirname, "src"),
  },
};
