function MoneyLaundering (money: string): string {
    let removeComma: string = money.replace(/,/g, "");
    let removeCommaAndTrailingZeros: string = removeComma.replace(/^0+/g, "");
    return removeCommaAndTrailingZeros;
};
export default MoneyLaundering