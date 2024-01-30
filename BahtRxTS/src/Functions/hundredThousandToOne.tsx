import padWithLeadingZeros from "./padWithLeadingZeros";
import SPECIALTWO from "../Consts/SPECIALTWO";
import TEN from "../Consts/TEN";
import SPECIALONE from "../Consts/SPECIALONE";
import THAINUMBERWORDS from "../Consts/THAINUMBERWORDS";
import REVERSETHAIDIGITWORDS from "../Consts/REVERSETHAIDIGITWORDS";
function hundredThousandToOne (digits: string) {
  let word: string = ``;
  let c: number = 0;
  let digitspadWithLeadingZeros: string = padWithLeadingZeros(digits, 6);
  for (let digit of digitspadWithLeadingZeros) {
    let numDigit: number = parseInt(digit);
    if (!(numDigit === 0)) {
      if (c == 4 && numDigit == 2) {
        word += `${SPECIALTWO}${TEN}`;
      } else if (c == 4 && numDigit == 1) {
        word += TEN;
      } else if (
        c == 5 &&
        numDigit == 1 &&
        parseInt(digitspadWithLeadingZeros[4]) != 0
      ) {
        word += SPECIALONE;
      } else {
        word += `${THAINUMBERWORDS[numDigit]}${REVERSETHAIDIGITWORDS[c]}`;
      }
    }
    c++;
  }
  return word;
};
export default hundredThousandToOne