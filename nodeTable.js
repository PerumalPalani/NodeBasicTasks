var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var buffer = require('buffer');
var arr = [];
http.createServer((req, res) => {
    if (req.url === '/post' && req.method === 'POST') {
        var txt = '';
        req.on('data', (chunk) => {
            txt += chunk.toString();
        });
        console.log(txt);
        req.on('end', () => {
            let { id, fname, mnum, eid, add, deg, gender, txt1 } = qs.parse(txt);
            const obj = { id: id, fname: fname, mnum: mnum, eid: eid, add: add, deg: deg, gender: gender, txt1: txt1 };
            arr.push(obj);
            console.log(gender);
            console.log(typeof id);
            //these comment section it's have bug--
            fs.writeFileSync("./data.json", JSON.stringify(arr));
            /* var mydata;
            fs.readFile('./nodeTable.html', (err, data1) => {
                if (err) {
                    throw err;
                } else {

                    mydata = data1;
                }
            }); */
            res.writeHead(301, { Location: 'http://127.0.0.1:8080/nodeTable.html' }).end();
            /* res.write(`<table ${border = '2px solid black;'} ${cellspacing = '2px;'} ${cellpadding = '2px;'}>
            <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Email Id</th>
            <th>Address</th>
            <th>Degree</th>
            <th>Gender</th>
            <th>Comment</th>
            </tr>
            <tr>
            <td>${id}</td>
            <td>${fname}</td>
            <td>${mnum}</td>
            <td>${eid}</td>
            <td>${add}</td>
            <td>${deg}</td>
            <td>${gender}</td>
            <td>${txt1}</td>
            </tr>
            </table>`); */
            // res.write(mydata);
            // res.end();
        });
    }
    else if (req.url === '/put' && req.method === 'POST') {
        var txt = '';
        req.on('data', (chunk) => {
            txt += chunk.toString();
        });
        console.log(txt);
        req.on('end', () => {
            let { id, fname, mnum, eid, add, deg, gender, txt1 } = qs.parse(txt);
            const obj = { id: id, fname: fname, mnum: mnum, eid: eid, add: add, deg: deg, gender: gender, txt1: txt1 };
            let check = arr.find((e) => e.id === parseInt(id));
            if (check) {
                check.fname = fname;
                check.mnum = mnum;
                check.eid = eid;
                check.add = add;
                check.deg = deg;
                check.gender = gender;
                check.txt1 = txt1;
                fs.writeFileSync("./data.json", JSON.stringify(arr));
                res.writeHead(301, { Location: 'http://127.0.0.1:8080/nodeTable.html' }).end();
            } else {
                arr.push(obj);
                console.log(gender);
                //these comment section it's have bug--
                fs.writeFileSync("./data.json", JSON.stringify(arr));

                res.writeHead(301, { Location: 'http://127.0.0.1:8080/nodeTable.html' }).end();
            }
        });
    }
    else if (req.url === '/delete' && req.method === 'POST') {
        var txt = '';
        req.on('data', (chunk) => {
            txt += chunk.toString();
        });
        console.log(txt);
        req.on('end', () => {
            let { id } = qs.parse(txt);

            let check = arr.findIndex((e) => e.id === parseInt(id));
            if (check != -1) {
                arr.splice(check, 1);
                fs.writeFileSync("./data.json", JSON.stringify(arr));
                res.writeHead(301, { Location: 'http://127.0.0.1:8080/nodeTable.html' }).end();
            } 
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page not found');
    }

}).listen(3038);
console.log('Server is running!!');
