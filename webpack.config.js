import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

// __dirname 재정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development", // 개발 모드 (배포용이면 'production')
  entry: {
    main: "./src/client/js/index.js", // '/' 경로
    bcryptjs: "./src/client/js/bcryptjs/bcryptjs.js", // '/bcrypt' 경로
    AES: "./src/client/js/AES/AES.js", // '/AES' 경로
    WebCrypto: "./src/client/js/WebCrypto/WebCrypto.js", // '/WebCrypto' 경로
    AES_GCM: "./src/client/js/WebCrypto/AES-GCM.js", // '/AES-GCM' 경로
    RSA_OAEP: "./src/client/js/WebCrypto/RSA-OAEP.js", // '/RSA-OAEP' 경로
    CRC_32: "./src/client/js/CRC_32/CRC-32.js", // '/CRC-32' 경로
    storage: "./src/client/js/storage/storage.js", // '/storage' 경로
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
      chunks: ["AES"], // AES.js만 포함
    }),
    new HtmlWebpackPlugin({
      filename: "WebCrypto.html",
      template: "./src/client/views/WebCrypto/WebCrypto.html",
      chunks: ["WebCrypto"], // WebCrypto.js만 포함
    }),
    new HtmlWebpackPlugin({
      filename: "AES_GCM.html",
      template: "./src/client/views/WebCrypto/AES-GCM.html",
      chunks: ["AES_GCM"], // AES-GCM.js만 포함
    }),
    new HtmlWebpackPlugin({
      filename: "RSA_OAEP.html",
      template: "./src/client/views/WebCrypto/RSA-OAEP.html",
      chunks: ["RSA_OAEP"], // RSA-OAEP.js만 포함
    }),
    new HtmlWebpackPlugin({
      filename: "CRC_32.html",
      template: "./src/client/views/CRC_32/CRC-32.html",
      chunks: ["CRC_32"], // RSA-OAEP.js만 포함
    }),
    new HtmlWebpackPlugin({
      filename: "storage.html",
      template: "./src/client/views/storage/storage.html",
      chunks: ["storage"], // storage.js만 포함
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
        { from: /^\/$/, to: "/index.html" },
        { from: /^\/bcryptjs$/, to: "/bcryptjs.html" },
        { from: /^\/AES$/, to: "/AES.html" },
        { from: /^\/WebCrypto$/, to: "/WebCrypto.html" },
        { from: /^\/AES_GCM$/, to: "/AES_GCM.html" },
        { from: /^\/RSA_OAEP$/, to: "/RSA_OAEP.html" },
        { from: /^\/CRC_32$/, to: "/CRC_32.html" },
        { from: /^\/storage$/, to: "/storage.html" },
      ],
    },
  },
  resolve: {
    extensions: [".js", ".scss"], // 확장자 생략 허용
    alias: {
      "@": path.resolve(__dirname, "src/client"),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // 주석 제거
          },
          compress: true, // 압축 최적화
          mangle: true, // 난독화
        },
        extractComments: false, // 별도의 LICENSE 파일 생성 방지
      }),
    ],
  },
};
