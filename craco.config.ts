import { resolve } from "path";
import { whenProd, getPlugin, pluginByName } from "@craco/craco";

export const webpack = {
  // 配置别名路径@
  alias: {
    "@": resolve(__dirname, "src"),
  },
  // 配置webpack
  // 配置CDN
  configure: (webpackConfig: any) => {
    let cdn = {
      js: [] as string[],
    };
    whenProd(() => {
      // key: 不参与打包的包(由dependencies依赖项中的key决定)
      // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
      webpackConfig.externals = {
        react: "React",
        "react-dom": "ReactDOM",
      };
      // 配置现成的cdn资源地址
      // 实际开发的时候 用公司自己花钱买的cdn服务器
      cdn = {
        js: [
          "https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js",
        ],
      };
    });

    // 通过 htmlWebpackPlugin插件 在public/index.html注入cdn资源url
    const { isFound, match } = getPlugin(
      webpackConfig,
      pluginByName("HtmlWebpackPlugin")
    );

    if (isFound) {
      // 找到了HtmlWebpackPlugin的插件
      const htmlWebpackPlugin = match as any;
      htmlWebpackPlugin.userOptions.files = cdn;
    }

    return webpackConfig;
  },
};
