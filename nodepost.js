var http = require('http');
var url = require('url');
var qs = require('querystring');
http.createServer((req, res)=>{
    console.log(req.method);
    console.log(req.url);
    if(req.method === 'POST' && req.url === '/add'){
    var txt = '';
    req.on('data', chunk =>{
        txt += chunk.toString();
    });
    console.log(txt);
    req.on('end',()=>{
        let {fname, lname} = qs.parse(txt);
        let add = Number(fname) + Number(lname);
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(`Your Addition value is =  ${add}`);
        // res.write(`Your full_Name is: ${fname} ${lname}`);
        res.end();
    });
    }
   /*  else{
        res.writeHead(404, {'Content-Type':'Text/Plain'});
        res.write('404 Error page not found!!!');
        res.end();
    } */
    
}).listen(3033);
console.log('Request is running!!!');