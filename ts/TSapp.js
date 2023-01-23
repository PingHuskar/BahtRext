var SPECIALONE = "\u0E40\u0E2D\u0E47\u0E14";
var SPECIALTWO = "\u0E22\u0E35\u0E48";
var TEN = "\u0E2A\u0E34\u0E1A";
var BAHT = "\u0E1A\u0E32\u0E17";
var THAINUMBERWORDS = ["\u0E28\u0E39\u0E19\u0E22\u0E4C", "\u0E2B\u0E19\u0E36\u0E48\u0E07", "\u0E2A\u0E2D\u0E07", "\u0E2A\u0E32\u0E21", "\u0E2A\u0E35\u0E48", "\u0E2B\u0E49\u0E32", "\u0E2B\u0E01", "\u0E40\u0E08\u0E47\u0E14", "\u0E41\u0E1B\u0E14", "\u0E40\u0E01\u0E49\u0E32", "\u0E2A\u0E34\u0E1A"];
var REVERSETHAIDIGITWORDS = ["แสน", "หมื่น", "พัน", "ร้อย", "สิบ", ""];
function MoneyInvalid(money) {
    return "Your Input is Invalid Format!\nThis is Your Input : ".concat(money, "\nTry Again");
}
function MoneyLaundering(money) {
    var removeComma = money.replace(/,/g, "");
    var removeCommaAndTrailingZeros = removeComma.replace(/^0+/g, "");
    return removeCommaAndTrailingZeros;
}
;
function IsMoneyValidate(money) {
    var validMoneyPattern = /^(\d+)(\.\d{0,2})?$/;
    return validMoneyPattern.test(money);
}
function splitIntFrac(money) {
    var splitPattern = /^(\d+)(\.\d{0,2}?)?$/;
    var match = money.match(splitPattern);
    var _a = match, moneyFull = _a[0], moneyInt = _a[1], moneyFrac = _a[2];
    moneyFrac === undefined
        ? (moneyFrac = "")
        : (moneyFrac = moneyFrac.replace(/^\./, ""));
    return [moneyFull, moneyInt, moneyFrac];
}
;
var padWithLeadingZeros = function (num, totalLength) {
    // https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number
    return String(num).padStart(totalLength, '0');
};
var hundredThousandToOne = function (digits) {
    var word = "";
    var c = 0;
    var digitspadWithLeadingZeros = padWithLeadingZeros(digits, 6);
    for (var _i = 0, digitspadWithLeadingZeros_1 = digitspadWithLeadingZeros; _i < digitspadWithLeadingZeros_1.length; _i++) {
        var digit = digitspadWithLeadingZeros_1[_i];
        var numDigit = parseInt(digit);
        if (!(numDigit === 0)) {
            if (c == 4 && numDigit == 2) {
                word += "".concat(SPECIALTWO).concat(TEN);
            }
            else if (c == 4 && numDigit == 1) {
                word += TEN;
            }
            else if (c == 5 && numDigit == 1) {
                word += SPECIALONE;
            }
            else {
                word += "".concat(THAINUMBERWORDS[numDigit]).concat(REVERSETHAIDIGITWORDS[c]);
            }
        }
        c++;
    }
    return word;
};
var LeandingEdToOne = function (money) { return money.replace(/^เอ็ด(?=(ล้าน)+)/, "\u0E2B\u0E19\u0E36\u0E48\u0E07"); };
var PrintBaht = function (money) {
    var LAST6DIGITPATTERN = /\d{1,6}$/g;
    var millionCount = 0;
    var millionWord = "\u0E25\u0E49\u0E32\u0E19";
    var newMoney = [];
    while (money != "") {
        var selectedupto6digit = money.match(LAST6DIGITPATTERN)[0];
        newMoney.push("".concat(hundredThousandToOne(selectedupto6digit)).concat(millionWord.repeat(millionCount)));
        money = money.replace(LAST6DIGITPATTERN, "");
        millionCount++;
    }
    var cleanLeadingEd = LeandingEdToOne(newMoney.reverse().join(""));
    return cleanLeadingEd;
};
var SatangFirstDigit = function (digit) {
    if (digit === "0")
        return "";
    if (digit === "1")
        return "".concat(TEN);
    if (digit === "2")
        return "".concat(SPECIALTWO).concat(TEN);
    return "".concat(THAINUMBERWORDS[parseInt(digit)]).concat(TEN);
};
var SatangSecondDigit = function (digit) {
    if (digit === undefined || digit === "0")
        return "";
    if (digit === "1")
        return SPECIALONE;
    return "".concat(THAINUMBERWORDS[parseInt(digit)]);
};
var PrintSatangs = function (satangs) {
    if (satangs === "")
        return "ถ้วน";
    var satangword = "".concat(SatangFirstDigit(satangs[0])).concat(SatangSecondDigit(satangs[1]), "\u0E2A\u0E15\u0E32\u0E07\u0E04\u0E4C");
    return satangword;
};
var numberWithSeperator = function (num, sep) {
    // https://stackoverflow.com/a/2901298/13237580
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
};
var BahtText = function (money) {
    var cleanedMoney = MoneyLaundering(money);
    if (!IsMoneyValidate(cleanedMoney))
        return MoneyInvalid(money);
    var _a = splitIntFrac(cleanedMoney), moneyFull = _a[0], moneyInt = _a[1], moneyFrac = _a[2];
    return "".concat(numberWithSeperator(money, ","), " \u0E2D\u0E48\u0E32\u0E19\u0E27\u0E48\u0E32 \"").concat(PrintBaht(moneyInt)).concat(BAHT).concat(PrintSatangs(moneyFrac), "\"");
};
var testcases = [
    "1462207924791968999999.11",
    "1462207924791968999999.4",
    "1462207924791968999999.70",
    "1462207924791968999999.25",
    "1462207924791968999921.",
    "1462207924791968999999",
    "9007199254740992",
];
for (var _i = 0, testcases_1 = testcases; _i < testcases_1.length; _i++) {
    var testcase = testcases_1[_i];
    console.log(BahtText(testcase));
}
