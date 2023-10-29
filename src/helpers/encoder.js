const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

function toRadix64(s) {
    let result = ''

    // start from the end
    for (let i = 0; i < s.length; i = i + 6) {
        result += digits[parseInt(s.slice(i, i + 6 > s.length ? s.length : i + 6).padEnd(6, '0'), 2)]
    }

    return result
}

function parseRadix64(s) {
    let result = ''

    Array.from(s).map(v => digits.indexOf(v).toString(2).padStart(6, '0')).forEach(v => {
        result += v // reverse
    })

    return result
}

/**
 * @param {(number | number[])[][]} data 
 * @returns {string}
 */
export function encode(data) {
    let bin = ''
    for (let i = 0; i < data.length; i++) {
        const count = data[i][1].length
        bin += data[i][0].toString(2).padStart(7, '0') // chara index
        bin += count.toString(2).padStart(5, '0') // style count

        for (let j = 0; j < count; j++) {
            bin += data[i][1][j].toString(2).padStart(5, '0')
        }
    }

    return toRadix64(bin)
}

/**
 * @param {string} r64
 * @returns {(number | number[])[][]}
 */
export function decode(r64) {
    const origin = parseRadix64(r64)

    const result = []
    for (let i = 0; i < origin.length;) {
        if (i + 7 >= origin.length) break // ignore padding

        // read the first 7 bits (chara)
        const tmp = [parseInt(origin.slice(i, i + 7), 2), []]
        i += 7

        // read the next 5 bits (style count)
        const count = parseInt(origin.slice(i, i + 5), 2)
        i += 5

        // read the next count * 5 bits (lb)
        for (let j = 0; j < count; j++) {
            tmp[1].push(parseInt(origin.slice(i, i + 5), 2))
            i += 5
        }
        
       result.push(tmp)
    }

    return result
}

const data = [
    [1, [0, 0, 4, 0]],
    [2, [20, 10]],
    [3, [0, 10, 0, 4]],
    [4, [20, 10, 4, 4]],
    [5, [20, 10, 4, 4]]
]

const enc = encode(data)
console.log(enc)
console.log(decode(enc))