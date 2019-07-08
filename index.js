const fs = require('fs');
const resizeImg = require('resize-img');
const path = require('path');
const chalk = require('chalk')
const http = require('http')
const dimension = require('./dimension')
// const app = require ('./front-end')

const origDir = path.join(__dirname, '/img/orig/')
const outputDir = path.join(__dirname, '/img/output/')

// const finalWidth = app(getDimension)
// console.log(finalWidth)

const finalWidth = 300
http.createServer(function (req, res) {
    if (req.url == '/resizer.html') {
        fs.readFile('./resizer.html', function (err, data) {
            fs.readdir(origDir, (err, files) => {
                console.log(chalk.red(`output path is: ${outputDir}`))
                files.forEach((fileName, i) => {
                    const { ratio } = dimension(origDir, fileName)
                    resizeImg(fs.readFileSync(`${origDir}${fileName}`), { width: finalWidth, height: finalWidth / ratio }).then(buf => {
                        fs.writeFileSync(`${outputDir}${fileName}`, buf);
                        if (i === files.length - 1) {
                            res.end('');
                        }
                    })
                })
            })
            res.end(data)
        })
    }
    else if (req.url == '/style.css') {
        fs.readFile('./style.css', function (err, data) {
            res.end(data)
        })
    }
    else if (req.url == '/front-end.js') {
        fs.readFile('./front-end.js', function (err, data) {
            res.end(data)
        })
    }
    else {
        res.end('page is not found')
    }

}).listen(5000)


