const fs = require("fs");
const http = require("http");
const url = require("url");

const port = 8000;
const allproducts = fs.readFileSync(
  `${__dirname}/data/allproducts.json`,
  "utf-8"
);
const allproductsObj = JSON.parse(allproducts);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/") {
    res.end("Welcome...");
  } else if (pathName === "/api") {
    res.writeHead("200", {
      "Content-type": "application/json",
    });
    res.end(allproducts);
  } else {
    res.writeHead("404", {
      "Conent-type": "text/html",
      "my-own-header": "404 error found",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server is listening at port ${port}`);
});
