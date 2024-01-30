import SPLITPATTERN from "../Consts/SPLITPATTERN"
function IsMoneyValidate (money: string): boolean {
    return SPLITPATTERN.test(money)
}
export default IsMoneyValidate