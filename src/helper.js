// convert ip addresses to number for comparing
export function ipToNumber(ip){
    return parseInt(ip.split('.').map(number => (('000'+number).slice(-3))).join(''))
}