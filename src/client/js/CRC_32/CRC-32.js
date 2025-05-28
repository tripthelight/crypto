import "@/js/common/common.js";
import "@/assets/scss/CRC_32/common.scss";
import CRC32 from "crc-32";

/*
const data = "Hello, World!";
const crc = CRC32.str(data);
console.log(crc >>> 0); // 부호 없는 32비트 정수로 출력
*/

// encryption
const IPT_EN_PLAIN = document.getElementById("IPT_EN_PLAIN");
const EN_PLAIN_BTN = document.querySelector(".encryption .btn-plain");
const HASH_EL = document.querySelector(".encryption .hash");

EN_PLAIN_BTN.onclick = async () => {
  const plaintext = IPT_EN_PLAIN.value;
  if (plaintext === "") return alert("평문을 입력하세요");

  const hash = CRC32.str(plaintext) >>> 0;

  HASH_EL.innerHTML = hash.toString(16);
};
