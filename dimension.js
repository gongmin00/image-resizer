const sizeOf = require('image-size')

module.exports = (origDir, fileName) =>{
    const dimension = sizeOf(origDir+fileName)
    return {
        ratio: dimension.width/dimension.height
    }
}