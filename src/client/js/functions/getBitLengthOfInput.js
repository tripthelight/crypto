export default (inputText) => {
  // 입력 문자열을 UTF-8 바이트 배열로 변환
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(inputText);

  // 바이트 수 * 8 = 비트 수
  const bitLength = utf8Bytes.length * 8;

  return bitLength;
};
