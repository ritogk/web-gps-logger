const path = require("path")
module.exports = {
  entry: {
    main: "/src/main.ts",
  },
  devtool: "cheap-module-source-map",
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader", // inject CSS to page
          },
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要あり。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}

if (process.env.NODE_ENV !== "production") {
  module.exports.mode = "development"
  module.exports.devtool = "inline-source-map"
} else {
  module.exports.mode = "production"
  module.exports.devtool = false
  module.exports.optimization.minimize = true
}
