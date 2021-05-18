import { clg } from './demo.js'
clg('a', 'b')

let a = {
    // s: 1
}

let { b = 3 } = a || {}
console.log(b)