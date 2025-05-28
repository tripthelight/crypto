/**
 * AES secret key 전략
 * 내가 암/복호화 해야 할 HASH에 대한 secret key를 상대 peer가 가지고 있음
 * secret key는 첫 접속 시 server에서 각자 내려받은 후 sessionStorage에 저장
 */

import "@/js/common/common.js";
import "@/assets/scss/storage/common.scss";
import encodeChar from "@/js/functions/encodeChar";

/**
 * 목적 : sessionStorage 개별 key와 plain text 비교
 * sessionStorage에 key와 value가 있을 경우
 * 상대 peer에게 검증 요청
 * 상대 peer는 자신의 secret key와 비교하여
  - 복호화 될경우 true를 응답 받음
  - 복호화 안될경우 false를 응답 받음
 */
/*
// key: "gameName" / value: "indianPocker"
window.sessionStorage.setItem("U2FsdGVkX19eaNE0TomYn+igEoK0bHywvnfqeqy8ykM=", "U2FsdGVkX1+xPkbtvz3LtnGBeZiZcIedQMCSyfXNnsY=");

const obfuscationKey = String.fromCharCode(...[66, 86, 68, 73, 69, 65, 73, 66, 75, 69]);
console.log("gameName : ", obfuscationKey);

// 상대 peer에게 sessionStorage의 "gameName" key가 있는지 검증 요청 보내기
const sendKeyParams = {
  // hash
  h: "U2FsdGVkX19eaNE0TomYn+igEoK0bHywvnfqeqy8ykM=", // "gameName"
  // plain text
  p: obfuscationKey,
};
console.log(sendKeyParams);

// 상대 peer에게 sessionStorage의 "gameName" value가 있는지 검증 요청 보내기
const obfuscationVal = String.fromCharCode(...[68, 74, 69, 77, 70, 75, 76, 86, 68, 69]);
console.log("indianPocker : ", obfuscationVal);

const sendValParams = {
  // hash
  h: window.sessionStorage.getItem("U2FsdGVkX19eaNE0TomYn+igEoK0bHywvnfqeqy8ykM="), // 'indianPocker'
  // plain text
  p: obfuscationVal,
};
console.log(sendValParams);
*/

// =======================================================================================

/**
 * 목적 : 전체 sessionStorage key중 내가 찾고싶은 plain text의 key가 있는지 체크
 * sessionStorage에 key가 있는지 체크
 * 상대 peer에게 key 유무 체크 요청
 * key가 있으면 존재유무(Existence) true와 암호화된 key를 응답 받음
  - 응답받은 암호화된 key의 암호화된 value를 상대 peer에게 다시 검증해야됨 
 * key가 없으면 존재유무(Existence) false를 응답 받음
 */

/*
const obfuscationKey = String.fromCharCode(...[77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // "IKVUDKLWOD" : gameState key
const sendCheckParams = {
  // sessionStorage All keys
  k: Object.keys(sessionStorage),
  // plain text
  p: obfuscationKey,
};
console.log(sendCheckParams);
*/

// =======================================================================================

/**
 * 목적 : 난독화 된 plain text를 보내고, 암호화된 hash를 받음
 * 바꾸고 싶은 data를 상대 peer에게 보냄
 * 상대 peer는 plain text와 자신의 secret key로 암호화 후 응답 줘야함
 */
// 'Base64로 Encode된 문자' 를 전달 -> (https://emn178.github.io/online-tools/base64_encode.html)
const hashVal = encodeChar("ODc3NDY1ODA4OTg1OTA4NDcyODI=");
console.log(hashVal);

const sendChangeParams = {
  // plain text
  p: hashVal,
};
console.log(sendChangeParams);
