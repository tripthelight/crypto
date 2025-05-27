import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// __dirname 재정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development", // 개발 모드 (배포용이면 'production')
  entry: {
    main: "./src/client/js/index.js", // '/' 경로
    bcryptjs: "./src/client/js/bcryptjs/bcryptjs.js", // '/bcrypt' 경로
    AES: "./src/client/js/AES/AES.js", // '/AES' 경로
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js", // 중요!
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // node_modules 제외
        use: {
          loader: "babel-loader", // 최신 JS 문법 트랜스파일링
        },
      },
      {
        test: /\.scss$/, // scss 파일 처리
        use: [
          MiniCssExtractPlugin.loader, // CSS 추출
          "css-loader", // css import 해석
          "sass-loader", // scss -> css 변환
        ],
      },
      {
        test: /\.html$/, // html 파일 처리
        use: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 이미지 처리
        type: "assets/images",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // 최종 빌드되는 파일 이름
      template: "./src/client/index.html", // 템플릿
      chunks: ["main"], // main.js만 포함
    }),
    new HtmlWebpackPlugin({
      filename: "bcryptjs.html",
      template: "./src/client/views/bcryptjs/bcryptjs.html",
      chunks: ["bcryptjs"], // bcrypt.js만 포함
    }),
    new HtmlWebpackPlugin({
      filename: "AES.html",
      template: "./src/client/views/AES/AES.html",
      chunks: ["AES"], // bcrypt.js만 포함
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", // 추출된 CSS 파일명
    }),
  ],
  devServer: {
    static: "./dist",
    port: 8080,
    hot: true,
    open: false,
    historyApiFallback: {
      rewrites: [
        { from: /^\/bcryptjs$/, to: "/bcryptjs.html" },
        { from: /^\/AES$/, to: "/AES.html" },
        { from: /^\/$/, to: "/index.html" },
      ],
    },
  },
  resolve: {
    extensions: [".js", ".scss"], // 확장자 생략 허용
    alias: {
      "@": path.resolve(__dirname, "src/client"),
    },
  },
};
