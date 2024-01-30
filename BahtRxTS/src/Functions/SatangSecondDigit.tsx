import SPECIALONE from "../Consts/SPECIALONE";
import THAINUMBERWORDS from "../Consts/THAINUMBERWORDS";
function SatangSecondDigit(digit: string) {
  if (digit[1] === undefined || digit[1] === "0") return "";
  if (digit[0] !== "0" && digit[1] === "1") return SPECIALONE;
  return `${THAINUMBERWORDS[parseInt(digit[1])]}`;
}
export default SatangSecondDigit