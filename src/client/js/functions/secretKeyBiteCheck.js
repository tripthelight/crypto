function clearEl(_case) {
  const HASH_EL = document.querySelector(".encryption .hash");
  const PLAIN_EL = document.querySelector(".decryption .plain");
  if (_case) {
    HASH_EL.innerHTML = "";
  } else {
    PLAIN_EL.innerHTML = "";
  }
}

export default (key, bite, _case) => {
  if (key === "") return true;

  if (key === "AES-256") {
    if (bite < 256) {
      clearEl(_case);
      alert(bite + " : select key를 256bite 이상 입력하세요.");
      return false;
    }
  } else if (key === "AES-192") {
    if (bite < 192) {
      clearEl(_case);
      alert(bite + " : select key를 192bite 이상 입력하세요.");
      return false;
    }
  } else if (key === "AES-128") {
    if (bite < 128) {
      clearEl(_case);
      alert(bite + " : select key를 128bite 이상 입력하세요.");
      return false;
    }
  }
  return true;
};
