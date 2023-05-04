import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let SPECIALONE: string = `เอ็ด`
let SPECIALTWO: string = `ยี่`
let TEN: string = `สิบ`;
let BAHT: string = `บาท`;
let MILLION: string = `ล้าน`;

let SPLITPATTERN: RegExp = /^(\d*)(\.\d{0,2}0*)?$/;
let LAST6DIGITPATTERN: RegExp = /\d{1,6}$/g;

let THAINUMBERWORDS: string[] = [`ศูนย์`,`หนึ่ง`,`สอง`,`สาม`,`สี่`,`ห้า`,`หก`,`เจ็ด`,`แปด`,`เก้า`,`สิบ`]
let REVERSETHAIDIGITWORDS: string[] = ["แสน", "หมื่น", "พัน", "ร้อย", "สิบ", ""]

function MoneyInvalid (money: string): string {
  return `Your Input is Invalid Format!\nThis is Your Input : ${money}\nTry Again`;
}
function MoneyLaundering (money: string): string {
  let removeComma: string = money.replace(/,/g, "");
  let removeCommaAndTrailingZeros: string = removeComma.replace(/^0+/g, "");
  return removeCommaAndTrailingZeros;
};
function IsMoneyValidate (money: string): boolean {
  return SPLITPATTERN.test(money)
}

function splitIntFrac (money: string): string[] {
  let match: RegExpMatchArray | null = money.match(SPLITPATTERN);
  let [moneyFull, moneyInt, moneyFrac] = match!;
  moneyFrac === undefined
    ? (moneyFrac = "")
    : (moneyFrac = moneyFrac.replace(/^\./, ""));
  return [moneyFull, moneyInt, moneyFrac];
};

let padWithLeadingZeros = (num: string, totalLength: number) => {
    // https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number
    return String(num).padStart(totalLength, '0');
}

let hundredThousandToOne = (digits: string) => {
  let word: string = ``;
  let c: number = 0
  let digitspadWithLeadingZeros: string = padWithLeadingZeros(digits,6)
  for (let digit of digitspadWithLeadingZeros) {
    let numDigit: number = parseInt(digit)
    if (!(numDigit === 0)) {
        if (c == 4 && numDigit == 2) {
            word += `${SPECIALTWO}${TEN}`
        } else if (c == 4 && numDigit == 1) {
            word += TEN
        } else if (c == 5 && numDigit == 1 && parseInt(digitspadWithLeadingZeros[4]) != 0) {
            word += SPECIALONE
        } else {
            word += `${THAINUMBERWORDS[numDigit]}${REVERSETHAIDIGITWORDS[c]}`;
        }
    }
    c++
  }
  return word;
};

let LeandingEdToOne = (money: string) => money.replace(/^เอ็ด(?=(ล้าน)+)/,`หนึ่ง`)

let PrintBaht = (money: string) => {
  if (!money) return ``
  let newMoney: string[] = [];
  let f6 = true
  while (money != ``) {
    let selectedupto6digit = money!.match(LAST6DIGITPATTERN)![0];
    newMoney.push(
      `${hundredThousandToOne(selectedupto6digit)}${f6 ? "" : MILLION}`
    );
    f6 ? f6 = !f6 : ""
    money = money.replace(LAST6DIGITPATTERN, "");
  }
  let cleanLeadingEd = LeandingEdToOne(newMoney.reverse().join(""))
  return `${cleanLeadingEd}${BAHT}`;
};

let SatangFirstDigit = (digit: string) => {
  if (digit === "0") return ``;
  if (digit === "1") return `${TEN}`;
  if (digit === "2") return `${SPECIALTWO}${TEN}`;
  return `${THAINUMBERWORDS[parseInt(digit)]}${TEN}`;
};
let SatangSecondDigit = (digit: string) => {
  if (digit[1] === undefined || digit[1] === "0") return "";
  if (digit[0] !== "0" && digit[1] === "1") return SPECIALONE;
  return `${THAINUMBERWORDS[parseInt(digit[1])]}`;
};
let PrintSatangs = (satangs: string) => {
  if (satangs.match(/^0*$/)) return "ถ้วน";
  let satangword: string = `${SatangFirstDigit(satangs[0])}${SatangSecondDigit(
    satangs
  )}สตางค์`;
  return satangword;
};

// https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/
let THB: Intl.NumberFormat = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
});

let BahtText = (money: string) => {
  if (!money) return ``
  let cleanedMoney: string = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney) || money === `.`) return MoneyInvalid(money)
  let [moneyFull, moneyInt, moneyFrac] = splitIntFrac(cleanedMoney);
  if (moneyFull.match(/^(0*)(\.0*)?$/)) return `${THAINUMBERWORDS[0]}${BAHT}ถ้วน`
  // toast(`${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}`,{
  //   toastId: money
  // })
  return `${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}`;
  // return `${THB.format(parseFloat(moneyFull))} อ่านว่า "${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}"`;
}

function App() {
  const [num, setNum] = useState(localStorage.getItem(`num`) || 0)

  return (
    <div className="App">
      <div className="output">
        {BahtText(num.toString())}
      </div>
      <div className="">
        <input type="text" onChange={(e) => {
          e.preventDefault()
          localStorage.setItem(`num`,e.currentTarget.value)
          setNum(localStorage.getItem(`num`)!)
          toast.dismiss()
        }} value={num} />
      </div>
      <div className="">
      <button onClick={(e) => {
          e.preventDefault()
          navigator.clipboard.writeText(BahtText(num.toString()))
          toast.dismiss()
          toast(`Copied ${BahtText(num.toString())}`,{
            toastId: `copy`
          })
        }}>Copy</button>
      </div>
      <ToastContainer limit={7} />
    </div>
  )
}

export default App
