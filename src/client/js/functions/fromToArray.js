/**
 * Base64로 Encode된 합쳐진 숫자 문자를 숫자 배열로 전환
 * @param {string} str 합쳐진 문자로된 숫자
 * @returns {Array<number>} 합쳐졌던 문자를 2자리씩 끊어서 배열로 변경
 */
export default (str) => {
  return Array.from({ length: str.length / 2 }, (_, i) => Number(str.slice(i * 2, i * 2 + 2)));
};
