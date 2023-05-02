var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((req, res) => {
    var path = url.parse(req.url).pathname;
    console.log(path);
    if(path === '/nodeTable.html'){
        fs.readFile(__dirname + path, function(err, data){
            if(err) throw err;
            res.writeHead(301, {'Content-Type':'text/html'});
            res.write(data);
            res.end();
        });
    }
    //this code not responding--
    /* req.on('data', chunk => {
        txt += chunk.toString();
    });
    req.on('end', () => {
        fs.readFile('./nodeTable.html', function (err, data) {
            if (err) throw err;
            res.writeHead(200, { 'Content-type': 'text/html' });
            return res.end(data);
        });
    }); */
}).listen(5000);

console.log('Html server it is running!!!');