function LeandingEdToOne(money: string) { 
    return money.replace(/^เอ็ด(?=(ล้าน)+)/,`หนึ่ง`)
}
export default LeandingEdToOne