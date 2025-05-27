import "@/js/common/common.js";
import "@/assets/scss/bcryptjs/common.scss";
import bcrypt from "bcryptjs";
import preCode from "@/js/functions/preCode";

// Encryption
const EN_PLAIN_INTUT = document.getElementById("IPT_EN_PLAIN");
const EN_PLAIN_BTN = document.querySelector(".encryption .btn-plain");
const EN_HASH_EL = document.querySelector(".encryption .hash");
const EN_HASH_INNER = EN_HASH_EL.getElementsByTagName("span");

EN_PLAIN_BTN.onclick = () => {
  const txtPlain = EN_PLAIN_INTUT.value;
  if (txtPlain === "") return alert("평문을 입력하세요");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(txtPlain, salt);
  EN_HASH_INNER[0].innerHTML = preCode(hash);
};

// Decryption
const DE_CHIPER_INTUT = document.getElementById("IPT_CHIPER");
const DE_PLAIN_INTUT = document.getElementById("IPT_DE_PLAIN");
const MATCH_EL = document.querySelector(".isMatch");
const MATCH_BTN = MATCH_EL.querySelector(".btn-match");
const MATCH_INNER = MATCH_EL.getElementsByTagName("span");
MATCH_BTN.onclick = async () => {
  const txtChiper = DE_CHIPER_INTUT.value;
  if (txtChiper === "") return alert("암호문을 입력하세요");
  const txtPlain = DE_PLAIN_INTUT.value;
  if (txtPlain === "") return alert("평문을 입력하세요");

  const result = await bcrypt.compare(txtPlain, txtChiper);
  MATCH_INNER[0].innerHTML = result;
  /*
  bcrypt.compare(txtPlain, txtChiper, (err, res) => {
    MATCH_INNER[0].innerHTML = result;
  });
  */
};
