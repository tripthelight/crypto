import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// __dirname 재정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development", // 개발 모드 (배포용이면 'production')
  entry: "./src/client/js/index.js", // 진입점
  output: {
    path: path.resolve("dist"), // 번들 파일 출력 경로
    filename: "bundle.js", // 번들 파일명
    clean: true, // 매 빌드마다 dist 폴더 청소
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
      template: "./src/client/index.html", // 템플릿으로 사용할 HTML 파일
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", // 추출된 CSS 파일명
    }),
  ],
  devServer: {
    static: "./dist",
    port: 8080, // 개발 서버 포트
    hot: true, // HMR 활성화
    open: true, // 브라우저 자동 열기
  },
  resolve: {
    extensions: [".js", ".scss"], // 확장자 생략 허용
    alias: {
      "@": path.resolve(__dirname, "src/client"),
    },
  },
};
