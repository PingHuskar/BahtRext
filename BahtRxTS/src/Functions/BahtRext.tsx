import BAHT from "../Consts/BAHT";
import THAINUMBERWORDS from "../Consts/THAINUMBERWORDS";
import MoneyInvalid from "./MoneyInvalid";
import MoneyLaundering from "./MoneyLaundering";
import IsMoneyValidate from "./IsMoneyValidate";
import SplitIntFrac from "./SplitIntFrac";
import PrintBaht from "./PrintBaht";
import PrintSatangs from "./PrintSatangs";
function BahtRext(money: string) {
  if (!money) return ``;
  let cleanedMoney: string = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney) || money === `.`)
    return MoneyInvalid(money);
  let [moneyFull, moneyInt, moneyFrac] = SplitIntFrac(cleanedMoney);
  if (moneyFull.match(/^(0*)(\.0*)?$/))
    return `${THAINUMBERWORDS[0]}${BAHT}ถ้วน`;
  // toast(`${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}`,{
  //   toastId: money
  // })
  return `${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}`;
  // return `${THB.format(parseFloat(moneyFull))} อ่านว่า "${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}"`;
}
export default BahtRext