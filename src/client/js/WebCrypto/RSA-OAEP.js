import "@/js/common/common.js";
import "@/assets/scss/WebCrypto/common.scss";
import base64ToArrayBuffer from "@/js/functions/base64ToArrayBuffer";

/*
// S : 비대칭키 암호화 - RSA-OAEP
// 공개키/비밀키 쌍 생성
const keyPair = await crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]), // 보통 65537
    hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"]
);

// 암호화 (공개키 사용)
const plaintext = new TextEncoder().encode("Hello RSA!");
const ciphertext = await crypto.subtle.encrypt(
  {
    name: "RSA-OAEP",
  },
  keyPair.publicKey,
  plaintext
);

// 암호화 (공개키 사용) Base64로 변환:
// 실제 전송/저장할 때는 보통 Base64로 저장하는 편이 많음
const base64Ciphertext = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));

// 암호화 (공개키 사용) Hex로 변환:
const hexCiphertext = Array.from(new Uint8Array(ciphertext))
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");

// 복호화 (비밀키 사용)
const decrypted = await crypto.subtle.decrypt(
  {
    name: "RSA-OAEP",
  },
  keyPair.privateKey,
  ciphertext
);

console.log("RSA-OAEP -------------------------");
console.log("keyPair ::::::::::::: ", keyPair.publicKey);
console.log("keyPair ::::::::::::: ", keyPair.privateKey);
console.log("ciphertext :::::::::: ", ciphertext);
console.log("base64Ciphertext :::: ", base64Ciphertext);
console.log("hexCiphertext :::::::", hexCiphertext);
console.log("decrypted :::::::::::", new TextDecoder().decode(decrypted));
// E : 비대칭키 암호화 - RSA-OAEP
*/

/**
 * variables
 */
const keySet = {
  keyPair: null,
};

/**
 * functions
 */
// 공개키/비밀키 쌍 생성
async function generateKey() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), // 보통 65537
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  keySet.keyPair = keyPair;
}

// 암호화 (공개키 사용)
async function encrypt(plaintext) {
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    keySet.keyPair.publicKey,
    plaintext
  );

  return ciphertext;
}

// 복호화 함수
async function decrypt(ciphertext) {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    keySet.keyPair.privateKey,
    ciphertext
  );
  return decrypted;
}

/**
 * 명령
 */

// encryption
const IPT_EN_PLAIN = document.getElementById("IPT_EN_PLAIN");
const EN_PLAIN_BTN = document.querySelector(".encryption .btn-plain");
const HASH_EL = document.querySelector(".encryption .hash");

EN_PLAIN_BTN.onclick = async () => {
  const plaintext = IPT_EN_PLAIN.value;
  if (plaintext === "") return alert("평문을 입력하세요");

  await generateKey();

  const encodePlaintext = new TextEncoder().encode(plaintext);
  // 공개키로 암호화
  const ciphertext = await encrypt(encodePlaintext);

  // 암호화 (공개키 사용) Base64로 변환:
  // 실제 전송/저장할 때는 보통 Base64로 저장하는 편이 많음
  const base64Ciphertext = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
  HASH_EL.innerHTML = base64Ciphertext;
};

// decryption
const IPT_DE_CHIPER = document.getElementById("IPT_DE_CHIPER");
const EN_CHIPER_BTN = document.querySelector(".decryption .btn-chiper");
const PLAIN_EL = document.querySelector(".decryption .plain");

EN_CHIPER_BTN.onclick = async () => {
  try {
    const hashtext = IPT_DE_CHIPER.value;
    if (hashtext === "") return alert("HASH를 입력하세요");

    // 복원: Base64 → ArrayBuffer
    const ciphertext = base64ToArrayBuffer(hashtext);

    // 복호화
    const decryptedText = await decrypt(ciphertext);
    const decodeDecryptedText = new TextDecoder().decode(decryptedText);
    PLAIN_EL.innerHTML = decodeDecryptedText;
  } catch (error) {
    IPT_DE_CHIPER.value = "";
    PLAIN_EL.innerHTML = "";
    console.error(error);
    alert("publicKey와 privateKey가 변경되었습니다");
  }
};
