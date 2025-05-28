import express from "express";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { password } = req.body;

  // 비밀번호 해시화
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // DB에 hash를 저장하는 로직 (예시)
  console.log("저장된 해시:", hash);

  res.send("회원가입 완료!");
});

app.listen(8000, () => {
  console.log("서버 실행 중 (포트: 8000)");
});
