import SPLITPATTERN from "../Consts/SPLITPATTERN";
function SplitIntFrac(money: string): string[] {
  let match: RegExpMatchArray | null = money.match(SPLITPATTERN);
  let [moneyFull, moneyInt, moneyFrac] = match!;
  moneyFrac === undefined
    ? (moneyFrac = "")
    : (moneyFrac = moneyFrac.replace(/^\./, ""));
  return [moneyFull, moneyInt, moneyFrac];
}
export default SplitIntFrac