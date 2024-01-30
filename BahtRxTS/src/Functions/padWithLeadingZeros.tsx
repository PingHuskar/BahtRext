// https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number
function padWithLeadingZeros (num: string, totalLength: number) {
    return String(num).padStart(totalLength, '0');
}

export default padWithLeadingZeros