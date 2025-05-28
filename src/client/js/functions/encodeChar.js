import fromToArray from "@/js/functions/fromToArray";

/**
 * EX) GAME_NAME : "BVDIEAIBKE" -> [66, 86, 68, 73, 69, 65, 73, 66, 75, 69] -> "66866873696573667569" -> "NjY4NjY4NzM2OTY1NzM2Njc1Njk="
 * Base64로 Encode 된 문자를 파라미터로 받아서 평문자열을 리턴
 * @param {string} str Base64로 Encode 된 문자
 * @returns {string} Base64로 Encode 된 문자 -> Decode -> 배열로 변경 -> 문자열로 변경
 */
export default (str) => {
  return String.fromCharCode(...fromToArray(new TextDecoder().decode(Uint8Array.from(atob(str), (c) => c.charCodeAt(0)))));
};
