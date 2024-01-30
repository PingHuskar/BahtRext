import LAST6DIGITPATTERN from "../Consts/LAST6DIGITPATTERN";
import hundredThousandToOne from "./hundredThousandToOne";
import MILLION from "../Consts/MILLION";
import LeandingEdToOne from "./LeandingEdToOne";
import BAHT from "../Consts/BAHT";
let PrintBaht = (money: string) => {
  if (!money) return ``;
  let newMoney: string[] = [];
  let f6 = true;
  while (money != ``) {
    let selectedupto6digit = money!.match(LAST6DIGITPATTERN)![0];
    newMoney.push(
      `${hundredThousandToOne(selectedupto6digit)}${f6 ? "" : MILLION}`
    );
    f6 ? (f6 = !f6) : "";
    money = money.replace(LAST6DIGITPATTERN, "");
  }
  let cleanLeadingEd = LeandingEdToOne(newMoney.reverse().join(""));
  return `${cleanLeadingEd}${BAHT}`;
};
export default PrintBaht