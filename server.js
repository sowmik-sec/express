// server creation

// 1. http module
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("request has been mode from browser to server");
  //   console.log(req.method);
  //   console.log(req.url);
  res.setHeader("Content-Type", "text/html");
  //   res.write("<h1>Hello World!</h1>");
  //   res.write("<h3>How are you doing?</h3>");
  //   res.end();
  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
  }
  fs.readFile(path, (err, fileData) => {
    if (err) {
      console.log(err);
    } else {
      //   res.write(fileData);
      res.end(fileData);
    }
  });
});

// port number, host, callback func
server.listen(5000, "localhost", () => {
  console.log("server is listening on port 5000");
});
