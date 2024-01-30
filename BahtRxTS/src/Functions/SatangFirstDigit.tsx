import TEN from "../Consts/TEN";
import SPECIALTWO from "../Consts/SPECIALTWO";
import THAINUMBERWORDS from "../Consts/THAINUMBERWORDS";
function SatangFirstDigit(digit: string) {
  if (digit === "0") return ``;
  if (digit === "1") return `${TEN}`;
  if (digit === "2") return `${SPECIALTWO}${TEN}`;
  return `${THAINUMBERWORDS[parseInt(digit)]}${TEN}`;
}
export default SatangFirstDigit