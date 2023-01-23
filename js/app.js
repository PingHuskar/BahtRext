const SPECIALONE = `เอ็ด`
const SPECIALTWO = `ยี่`
const TEN = `สิบ`;
const BAHT = `บาท`;
const MILLION = `ล้าน`;

const LAST6DIGITPATTERN = /\d{1,6}$/g;
const splitPattern = /^(\d+)(\.\d{0,2}?)?$/;

const THAINUMBERWORDS = [`ศูนย์`,`หนึ่ง`,`สอง`,`สาม`,`สี่`,`ห้า`,`หก`,`เจ็ด`,`แปด`,`เก้า`,`สิบ`]
const REVERSETHAIDIGITWORDS = ["แสน", "หมื่น", "พัน", "ร้อย", "สิบ", ""]

const MoneyInvalid = (money) => `Your Input is Invalid Format!\nThis is Your Input : ${money}\nTry Again`;

const MoneyLaundering = (money) => {
  const removeComma = money.replace(/,/g, "");
  const removeCommaAndTrailingZeros = removeComma.replace(/^0+/g, "");
  return removeCommaAndTrailingZeros;
};
const IsMoneyValidate = (money) => /^(\d+)(\.\d{0,2})?$/.test(money);
const splitIntFrac = (money) => {
  const match = money.match(splitPattern);
  let [moneyFull, moneyInt, moneyFrac] = match;
  moneyFrac === undefined
    ? (moneyFrac = "")
    : (moneyFrac = moneyFrac.replace(/^\./, ""));
  return [moneyFull, moneyInt, moneyFrac];
};

const padWithLeadingZeros = (num, totalLength) => {
    // https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number
    return String(num).padStart(totalLength, '0');
}

const hundredThousandToOne = (digits) => {
  let word = ``;
  let c = 0
  const digitspadWithLeadingZeros = padWithLeadingZeros(digits,6)
  for (let digit of digitspadWithLeadingZeros) {
    digit = parseInt(digit)
    if (!(digit === 0)) {
        if (c == 4 && digit == 2) {
            word += `${SPECIALTWO}${TEN}`
        } else if (c == 4 && digit == 1) {
            word += TEN
        } else if (c == 5 && digit == 1 && digitspadWithLeadingZeros[4] != 0) {
            word += SPECIALONE
        } else {
            word += `${THAINUMBERWORDS[digit]}${REVERSETHAIDIGITWORDS[c]}`;
        }
    }
    c++
  }
  return word;
};

const LeandingEdToOne = (money) => money.replace(/^เอ็ด(?=(ล้าน)+)/,`หนึ่ง`)

const PrintBaht = (money) => {
  let newMoney = [];
  let f6 = true
  while (money != ``) {
    let selectedupto6digit = money.match(LAST6DIGITPATTERN)[0];
    newMoney.push(
      `${hundredThousandToOne(selectedupto6digit)}${f6 ? "" : MILLION}`
    );
    f6 ? f6 = !f6 : ""
    money = money.replace(LAST6DIGITPATTERN, "");
  }
  const cleanLeadingEd = LeandingEdToOne(newMoney.reverse().join(""))
  return cleanLeadingEd;
};

const SatangFirstDigit = (digit) => {
  if (digit == 0) return ``;
  if (digit == 1) return `${TEN}`;
  if (digit == 2) return `${SPECIALTWO}${TEN}`;
  return `${THAINUMBERWORDS[parseInt(digit)]}${TEN}`;
};
const SatangSecondDigit = (digit) => {
  if (digit[1] === undefined || digit[1] === "0") return "";
  if (digit[0] !== "0" && digit[1] === "1") return SPECIALONE;
  return `${THAINUMBERWORDS[parseInt(digit[1])]}`;
};
const PrintSatangs = (satangs) => {
  if (satangs === "") return "ถ้วน";
  let satangword = `${SatangFirstDigit(satangs[0])}${SatangSecondDigit(
    satangs
  )}สตางค์`;
  return satangword;
};

const numberWithSeperator = (num,sep) => {
    // https://stackoverflow.com/a/2901298/13237580
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

const BahtText = (money) => {
  const cleanedMoney = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney)) return MoneyInvalid(money)
  const [moneyFull, moneyInt, moneyFrac] = splitIntFrac(cleanedMoney);
  return `${numberWithSeperator(money,",")} อ่านว่า "${PrintBaht(moneyInt)}${BAHT}${PrintSatangs(moneyFrac)}"`;
};

while (true) {
  try {
    let ans = BahtText(prompt("Enter a number"))
    alert(ans)
    console.log(ans)
  } catch (error) {
    console.log(`Back To The Loop`)
  }
}
