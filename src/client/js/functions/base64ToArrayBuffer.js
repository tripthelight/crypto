export default (base64) => {
  const binaryString = atob(base64); // Base64 → 바이너리 문자열
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer; // ArrayBuffer 반환
};
