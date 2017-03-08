// // work with pathes in OPERATIONAL systems
// os
//
// const path = require('path');
//
// const path2file = ['dir1', 'dir2', 'dir3', 'file.txt'].join(path.sep)
// const path2file2 = path.join('dir1','dir2', 'dir3', 'file.txt')
//
// const absPath = path.resolve('bin', 'fsn')
// path.dirname(absPath)// full path without bin
// path.extname(path2file2)
// console.log(path.parse(path.resolve('name.txt')))
//
// // _________________________________________________________________
//
//
// const fs = require('fs');
// //syncron
// try {
//   fs.readFile('name', function() {
//
//   })
// } catch(err){
//   //...
// }
//
// fs.readFile('name', function() {
//   if(err) return console.error(err);
//
// })
//
//
// // отправка сообщений по чанкам из файлов
// fs.createReadStream('name').pipe(process.stdout);
// // прочитывание из файла и запись в другой файл
// fs.createReadStream('name').pipe(fs.createWriteStream('name2'));
//
// fs.writeFile('name', 'str', function(err) {
//   if (err) { return ... }
// })
//
// fs.stat()
//   .isFile()
//   .isDirectory()
//   .isSocket()
//
//
// // owner writes
// fs.chown()
// // modificate writes
// fs.chmod()
//
// fs.read()
// fs.readdir()
//
// // удаление файла
// fs.unlink()
//
// // создание директорий
// mkdirp
// mv
// del
//
// // watch files
// chokidar


const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');

// node request redirects, promises, streams, retries, automagically handling gzip/deflate
// const got = require('got');

http.createServer((req, res) => {

  if(req.url === '/favicon.ico') {
    res.writeHead(404);
    res.end();
    return
  }
  res.writeHead(200, {'Content-Type':'text/html'})

  http.get('http://netvertise.co.il/jobs', itc => {
    var $ = cheerio.load(itc),
        a = $('a').html()
        ;
    console.log(itc);

    if (itc.statusCode !== 200) {
      return console.log(itc.statusCode);
    }

    itc.setEncoding('utf8');

    let data='';

    itc.on('data', chunk => data += chunk)
    itc.on('end', () => {
      res.end(data);
    })

    itc.on('error', err => {
      console.error(err);
    })
  })
}).listen(7777)
