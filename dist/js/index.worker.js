'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

onmessage = function onmessage(e) {
    var _e$data = _slicedToArray(e.data, 2),
        width = _e$data[0],
        height = _e$data[1];

    var data = [];

    for (var i = 0; i < height; i++) {

        for (var j = 0; j < width; j++) {

            var index = i * width * 4 + j * 4,
                light = jittered_sampling(j / width, i / height);

            data[index] = data[index + 1] = data[index + 2] = light < 1 ? light * 255 : 255;

            data[index + 3] = 255;
        }
    }

    console.log('Message received from main script');
    console.log('Posting message back to main script');
    postMessage(data);
};

// 均匀采样
var N1 = 64; //  采样系数
function sampling(x, y) {
    var sum = 0.0;

    for (var i = 0; i < N1; i++) {
        var a = Math.PI * 2 * Math.random();
        sum += trace(x, y, Math.cos(a), Math.sin(a));
    }
    return sum / N1;
}

// 分层采样
var N2 = 64; //  采样系数
function stratified_sampling(x, y) {
    var sum = 0.0;

    for (var i = 0; i < N2; i++) {
        var a = Math.PI * 2 * i / N2;
        sum += trace(x, y, Math.cos(a), Math.sin(a));
    }
    return sum / N2;
}

// 抖动采样
var N3 = 128; //  采样系数
function jittered_sampling(x, y) {
    var sum = 0.0;

    for (var i = 0; i < N3; i++) {
        var a = Math.PI * 2 * (Math.random() + i) / N3;
        sum += trace(x, y, Math.cos(a), Math.sin(a));
    }
    return sum / N3;
}

// 圆形发光体
function circleSDF(x, y, cx, cy, r) {
    var ux = x - cx,
        uy = y - cy;
    return Math.sqrt(ux * ux + uy * uy) - r;
}

//光线步进
var MAX_STEP = 10,
    //最大步数
MAX_DISTANCE = 2.0,
    //最大距离
EPSILON = new Number('1E-6'); //足够近的阈值
function trace(ox, oy, dx, dy) {
    var t = 0.0;
    for (var i = 0; i < MAX_STEP && t < MAX_DISTANCE; i++) {
        var sd = circleSDF(ox + dx * t, oy + dy * t, 0.5, 0.5, 0.1);
        if (sd < EPSILON) return 2.0;
        t += sd;
    }
    return 0.0;
}