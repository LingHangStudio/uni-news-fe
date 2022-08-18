const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  outputDir: "news",
  assetsDir: "static",
  configureWebpack: (config) => {
    config.name = "WusterHelperNews";
  },
  chainWebpack: (config) => {
    config.optimization.minimizer("terser").tap((args) => {
      Object.assign(args[0].terserOptions.compress, {
        // 生产模式 console.log 去除
        // warnings: false , // 默认 false
        // drop_console:  ,
        // drop_debugger: true, // 默认也是true
        pure_funcs: ["console.log"],
      });
      return args;
    });
  },
});
