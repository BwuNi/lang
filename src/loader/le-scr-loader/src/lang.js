// import STR from './str'
const STR = require('./str')

let res = [],
    call = [res],
    target = res,
    temp_str = ''


    module.exports= function (source) {

    STR(source)
        .forEach(
            mapChar
        )
    console.log(

        res
    )


    return `(module
        (func $func (result i32)
        `+ toStr(res[0]) + `)
        (export "func" (func $func))
    )
        `
}

function mapChar(char) {
    if (char === '(') {
        if (temp_str) throw 'Err'

        let _target = []

        target.push(_target)
        call.push(_target)
        target = _target
    } else if (char === ')') {
        if (temp_str) {
            target.push(temp_str)
            temp_str = ''
        }
        call.pop()
        target = call[call.length - 1]
    } else if (/[0-9]/.test(char)) {
        temp_str += char
    } else if (/\+|\-|\*|\//.test(char)) {
        temp_str += char
    } else if (char === ' ') {
        if (temp_str) {
            target.push(temp_str)
            temp_str = ''
        }
    }

}

function toStr(node) {
    let func = 'i32.',
        s1 = '',
        s2 = ''
    if (node[0] == '+') {
        func += 'add'
    } else if (node[0] == '-') {
        func += 'sub'
    } else if (node[0] == '*') {
        func += 'mul'
    } else if (node[0] == '/') {
        func += 'div_s'
    } else {
        throw node[0]

    }

    if (typeof node[1] == 'string') {
        s1 = 'i32.const ' + node[1] + '\n'
    } else {
        s1 = toStr(node[1])
    }

    if (typeof node[2] == 'string') {
        s2 = 'i32.const ' + node[2] + '\n'
    } else {
        s2 = toStr(node[2])
    }

    return s1 + s2 + func + '\n'
}