import './src/css/app'

import Worker from './src/worker/index.worker.js'
import wasm_url from './src/wat/simple.wat'

import srce_url from './src/scre/test.scre'

// import render from './src/js/basic'

let str = "Hello world!"

document.getElementById("app").innerHTML = str

// render(document.getElementById("canvas"))

const
    ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    imageData = ctx.createImageData(height,width),
    data = imageData.data



let myWorker = Worker()

document.body.onclick = function() {
    myWorker.postMessage([canvas.width,canvas.height])
    console.log('Message posted to worker')
}

myWorker.onmessage = function(e) {
    console.log('Message received from worker')

    e.data.forEach((v,i) => {
        data[i] = v
    });

    ctx.putImageData(imageData, 0, 0);
}


function fetchAndInstantiate(url, importObject) {
    return fetch(url).then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, importObject)
    ).then(results =>
      results.instance
    );
  }

// fetchAndInstantiate(wasm_url).then(function(instance) {
//     alert(instance.exports.add(1, 2));  // "3"
//     alert(instance.exports.sub(1, 2));  // "-1"
//     alert(instance.exports.mul(3, 2));  // "6"
//     alert(instance.exports.div(3, 2));  // "1"
//     alert(instance.exports.rem(3, 2));  // "1"
//  })


fetchAndInstantiate(srce_url).then(function(instance) {
    alert(instance.exports.func());  // "3"
 })

// alert(srce_url)