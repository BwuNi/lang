import {bind} from './OO'

export default STR

function STR(str) {
    const _ = {
        str
    }

    const outside = {
            forEach,
            map,
            reduce,
            filter,
            getStr,
            setStr
        },
        inside = {
            str,
        }

    return bind(outside,inside)
}


function forEach(_, func) {
    for(let i = 0;i < _.str.length;i++){
        func(_.str[i],i,_.str)
    }
}


function map(_, func) {
    let res = ''
    for(let i = 0;i < _.str.length;i++){
        res += func(_.str[i],i,_.str)
    }
    return STR(res)
}


function reduce(_, func,def) {
    let res = def
    for(let i = 0;i < _.str.length;i++){
        func(res,_.str[i],i,_.str)
    }
    return STR(res)
}

function filter(_,func){
    let res = ''
    for(let i = 0;i < _.str.length;i++){
        res += func(_.str[i],i,_.str)?_.str[i]:''
    }
    return STR(res)
}

function getStr(_){
    return _.str
}


function setStr(_,value){
    _.str = value
    return _
}