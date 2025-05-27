import "@/js/common/common.js";
import "@/assets/scss/AES/common.scss";
import CryptoJS from "crypto-js";
import getBitLengthOfInput from "@/js/functions/getBitLengthOfInput";
import secretKeyBiteCheck from "@/js/functions/secretKeyBiteCheck";

/*
// 암호화할 문자열과 비밀 키
const plaintext = "Hello, World!";
const secretKey = "my-secret-key";

// AES로 암호화
const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
console.log("암호화된 문자열:", ciphertext);

// AES로 복호화
const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
const decrypted = bytes.toString(CryptoJS.enc.Utf8);
console.log("복호화된 문자열:", decrypted);
*/
function makeKeyAES() {
  // 브라우저에서 안전하게 256비트 AES 키 생성
  const keyBuffer256 = new Uint8Array(32); // AES-256 - 32바이트 = 256비트
  window.crypto.getRandomValues(keyBuffer256); // 랜덤값 채우기
  const secretKey256 = Array.from(keyBuffer256)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log(secretKey256);

  const keyBuffer192 = new Uint8Array(24); // AES-192 -  24바이트(192비트)
  window.crypto.getRandomValues(keyBuffer192); // 랜덤값 채우기
  const secretKey192 = Array.from(keyBuffer192)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log(secretKey192);

  const keyBuffer128 = new Uint8Array(16); // AES-128 -  16바이트(128비트)
  window.crypto.getRandomValues(keyBuffer128); // 랜덤값 채우기
  const secretKey128 = Array.from(keyBuffer128)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log(secretKey128);
}
makeKeyAES();
////////////////////////////////////////////////////////////////////

// secretKey
const SELECT_EL = document.querySelector(".secretKey select");

// Encryption
const IPT_PLAIN = document.getElementById("IPT_PLAIN");
const IPT_EN_SECRETKEY = document.getElementById("IPT_EN_SECRETKEY");
const EN_PLAIN_BTN = document.querySelector(".encryption .btn-plain");
const HASH_EL = document.querySelector(".encryption .hash");

EN_PLAIN_BTN.onclick = () => {
  const secrettext = SELECT_EL.value;
  const plaintext = IPT_PLAIN.value;
  if (plaintext === "") return alert("평문을 입력하세요");
  const secretKeytext = IPT_EN_SECRETKEY.value;
  if (secretKeytext === "") return alert("key를 입력하세요");

  const checkBite = secretKeyBiteCheck(secrettext, getBitLengthOfInput(secretKeytext), true);
  if (!checkBite) return;

  // AES로 암호화
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKeytext).toString();
  HASH_EL.innerHTML = ciphertext;
};

// Decryption
const IPT_HASH = document.getElementById("IPT_HASH");
const IPT_DE_SECRETKEY = document.getElementById("IPT_DE_SECRETKEY");
const DE_DECRYPT_BTN = document.querySelector(".decryption .btn-decryption");
const PLAIN_EL = document.querySelector(".decryption .plain");

DE_DECRYPT_BTN.onclick = () => {
  const secrettext = SELECT_EL.value;
  const hashtext = IPT_HASH.value;
  if (hashtext === "") return alert("HASH를 입력하세요");
  const secretKeytext = IPT_DE_SECRETKEY.value;
  if (secretKeytext === "") return alert("key를 입력하세요");

  const checkBite = secretKeyBiteCheck(secrettext, getBitLengthOfInput(secretKeytext), false);
  if (!checkBite) return;

  // AES로 복호화
  const bytes = CryptoJS.AES.decrypt(hashtext, secretKeytext);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  PLAIN_EL.innerHTML = decrypted;
};
