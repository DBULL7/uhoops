const http = require("http");
let fs = require('fs')
const url = "http://59c.ba0.myftpupload.com/"
http.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    fs.writeFile('./data.js', body, (err) => {
      if (err) throw err 
    })
  });
});