export default function(canvas){
    if (!canvas.getContext) return

    const 
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height,
        imageData = ctx.createImageData(height,width),
        data = imageData.data

    for(let i = 0; i <data.length;i+=4){
        data[i] = Math.floor(255 * Math.random())
        data[i+1] = Math.floor(255 * Math.random()) 
        data[i+2] = Math.floor(255 * Math.random()) 
        data[i+3] = Math.floor(255 * Math.random())
    }

    ctx.putImageData(imageData, 0, 0);

}
