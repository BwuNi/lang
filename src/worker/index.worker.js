onmessage = function(e) {
    const [width,height] = e.data

    let data = []

    for (let i = 0; i < height; i++) {

        for (let j = 0; j < width; j++) {

            let index = i * width * 4 + j * 4,
                light = jittered_sampling(j / width, i / height)

            data[index] = data[index + 1] = data[index + 2] =
                light < 1
                    ? light * 255
                    : 255

            data[index + 3] = 255

        }
    }

    console.log('Message received from main script');
    console.log('Posting message back to main script');
    postMessage(data);
}




// 均匀采样
const N1 = 64 //  采样系数
function sampling(x, y) {
    let sum = 0.0;

    for (let i = 0; i < N1; i++) {
        let a = Math.PI * 2 * Math.random();
        sum += trace(x, y, Math.cos(a), Math.sin(a));
    }
    return sum / N1;
}

// 分层采样
const N2 = 64 //  采样系数
function stratified_sampling(x, y) {
    let sum = 0.0;

    for (let i = 0; i < N2; i++) {
        let a = Math.PI * 2 * i / N2;
        sum += trace(x, y, Math.cos(a), Math.sin(a));
    }
    return sum / N2;
}

// 抖动采样
const N3 = 128 //  采样系数
function jittered_sampling(x, y) {
    let sum = 0.0;

    for (let i = 0; i < N3; i++) {
        let a = Math.PI * 2 * (Math.random() + i) / N3;
        sum += trace(x, y, Math.cos(a), Math.sin(a));
    }
    return sum / N3;
}

// 圆形发光体
function circleSDF(x, y, cx, cy, r) {
    const ux = x - cx, uy = y - cy;
    return Math.sqrt(ux * ux + uy * uy) - r;
}


//光线步进
const
    MAX_STEP = 10, //最大步数
    MAX_DISTANCE = 2.0, //最大距离
    EPSILON = new Number('1E-6') //足够近的阈值
function trace(ox, oy, dx, dy) {
    let t = 0.0;
    for (let i = 0; i < MAX_STEP && t < MAX_DISTANCE; i++) {
        let sd = circleSDF(ox + dx * t, oy + dy * t, 0.5, 0.5, 0.1);
        if (sd < EPSILON)
            return 2.0;
        t += sd;
    }
    return 0.0;
}