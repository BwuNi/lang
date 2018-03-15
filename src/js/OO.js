export {bind} 

function bind(obj, _this) {
    for (let i in obj) {
        if (typeof obj[i] === 'function')
            obj[i] = new Proxy(obj[i],{
                apply: (tar, o, args) => (tar(_this,...args))
            })
    }

    return obj
}