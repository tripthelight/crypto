import "@/js/common/common.js";
import "@/assets/scss/WebCrypto/common.scss";
import base64ToArrayBuffer from "@/js/functions/base64ToArrayBuffer";

// S : 대칭키 암호화 - AES-GCM
/*
// 암호화 함수
async function encrypt(plaintext, key, iv) {
  const enc = new TextEncoder();
  const data = enc.encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data
  );

  return ciphertext;
}

// 복호화 함수
async function decrypt(ciphertext, key, iv) {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}

// 키 생성
async function generateKey() {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // extractable
    ["encrypt", "decrypt"]
  );
  return key;
}

(async () => {
  // console.log("AES-GCM -------------------------");
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12바이트 IV (AES-GCM 권장)
  const key = await generateKey();

  const plaintext = "Hello, WebCrypto!";
  console.log("iv :::::::::::::: ", iv);
  console.log("key ::::::::::::: ", key);
  console.log("원본 ::::::::::::: ", plaintext);

  // 암호화
  const ciphertext = await encrypt(plaintext, key, iv);
  console.log("암호문(Base64) :::: ", btoa(String.fromCharCode(...new Uint8Array(ciphertext))));

  // 복호화
  const decryptedText = await decrypt(ciphertext, key, iv);
  console.log("복호문 :::::::::::: ", decryptedText);
})();
// E : 대칭키 암호화 - AES-GCM
*/

/**
 * variables
 */
const keySet = {
  iv: null,
  key: null,
};

/**
 * functions
 */
// 키 생성
async function generateKey() {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // extractable
    ["encrypt", "decrypt"]
  );
  return key;
}

// 암호화 함수
async function encrypt(plaintext, key, iv) {
  const enc = new TextEncoder();
  const data = enc.encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data
  );

  return ciphertext;
}

// 복호화 함수
async function decrypt(ciphertext, key, iv) {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}

/**
 * 명령
 */
// generateKey
const GENERATE_KEY_EL = document.querySelector(".generateKey");
const IV_EL = GENERATE_KEY_EL.querySelector(".iv span");
const KEY_EL = GENERATE_KEY_EL.querySelector(".key span");

async function makeKey() {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12바이트 IV (AES-GCM 권장)
  keySet.iv = iv;
  window.sessionStorage.setItem("iv", iv);
  // IV_EL.innerHTML = JSON.stringify(iv, null, 2);
  IV_EL.innerHTML = `${JSON.stringify(iv)}`;

  const key = await generateKey();
  keySet.key = key;
  window.sessionStorage.setItem("key", JSON.stringify(key));

  // key를 html element에 표시하기 위해 - CryptoKey를 export (JWK 방식)
  const exported = await crypto.subtle.exportKey("jwk", key);
  // KEY_EL.innerHTML = JSON.stringify(exported, null, 2);
  KEY_EL.innerHTML = `${JSON.stringify(exported)}`;
}

// encryption
const IPT_EN_PLAIN = document.getElementById("IPT_EN_PLAIN");
const EN_PLAIN_BTN = document.querySelector(".encryption .btn-plain");
const HASH_EL = document.querySelector(".encryption .hash");

EN_PLAIN_BTN.onclick = async () => {
  const plaintext = IPT_EN_PLAIN.value;
  if (plaintext === "") return alert("평문을 입력하세요");

  await makeKey();
  const { iv, key } = keySet;

  // 암호화
  const ciphertext = await encrypt(plaintext, key, iv);
  console.log("1 ciphertext :: ", ciphertext);
  // 암호화 : Base64로 변환:
  // 실제 전송/저장할 때는 보통 Base64로 저장하는 편이 많음
  const base64Ciphertext = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
  console.log("2 base64Ciphertext :: ", base64Ciphertext);

  // 복원: Base64 → ArrayBuffer
  const restoredArrayBuffer = base64ToArrayBuffer(base64Ciphertext);
  console.log("3 restoredArrayBuffer :: ", restoredArrayBuffer);

  // 암호화 : Hex로 변환:
  const hexCiphertext = Array.from(new Uint8Array(ciphertext))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log(hexCiphertext);

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

    const { iv, key } = keySet;

    // 복원: Base64 → ArrayBuffer
    const ciphertext = base64ToArrayBuffer(hashtext);

    // 복호화
    const decryptedText = await decrypt(ciphertext, key, iv);
    PLAIN_EL.innerHTML = decryptedText;
  } catch (error) {
    IPT_DE_CHIPER.value = "";
    PLAIN_EL.innerHTML = "";
    console.error(error);
    alert("iv와 key가 변경되었습니다");
  }
};
