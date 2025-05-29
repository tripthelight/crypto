import "@/js/common/common.js";
import "@/assets/scss/imageToBase64/common.scss";

export async function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const fileInput = document.getElementById("fileInput");
const output = document.getElementById("output");

fileInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const base64String = await imageToBase64(file);
    console.log("base64String :: ", base64String);

    output.textContent = base64String; // 변환된 Base64 문자열 출력
  } else {
    output.textContent = "유효한 이미지 파일을 선택해주세요.";
  }
});
