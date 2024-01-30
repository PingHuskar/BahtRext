import SatangFirstDigit from "./SatangFirstDigit";
import SatangSecondDigit from "./SatangSecondDigit";
function PrintSatangs(satangs: string) {
    if (satangs.match(/^0*$/)) return "ถ้วน";
  let satangword: string = `${SatangFirstDigit(satangs[0])}${SatangSecondDigit(
    satangs
  )}สตางค์`;
  return satangword;
}
export default PrintSatangs