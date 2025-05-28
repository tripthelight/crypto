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
