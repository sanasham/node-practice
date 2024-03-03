const http = require("http");
const fs = require("fs");
const url = require("url");
const parse = require("nodemon/lib/cli/parse");
// create server instance

http
  .createServer(function (req, res) {
    console.log(req.url);
    console.log(req.method);
    const parsedUrl = url.parse(req.url, true);
    console.log(url.parse(req.url, true));
    //res.end("dummy response");
    const customData = fs.readFileSync("./product.json", "utf-8");
    if (
      parsedUrl.pathname === "/products" &&
      parsedUrl.query.id == undefined &&
      req.method === "GET"
    ) {
      fs.readFile("./product.json", "utf-8", function (err, data) {
        if (err) {
          console.log("error occured while reading product.json file");
        } else {
          //console.log(JSON.parse(data));
          res.end(customData);
        }
      });
      // res.end("Product data loaded successfully");
    } else if (
      parsedUrl.pathname === "/products" &&
      parsedUrl.query.id !== undefined &&
      req.method === "GET"
    ) {
      let data = JSON.parse(customData);
      let product = data.find((prod) => {
        return prod.id === Number(parsedUrl.query.id);
      });

      if (product != undefined) {
        res.end(JSON.stringify(product));
      } else {
        res.end(JSON.stringify({ message: "product not found" }));
      }
    } else if (req.method === "POST" && parsedUrl.pathname === "/products") {
      let product = "";
      req.on("data", (chunk) => {
        product = product + chunk;
      });
      req.on("end", () => {
        console.log("final chunk data", product);
        let productArray = JSON.parse(customData);
        let newArray = JSON.parse(product);
        productArray.push(newArray);
        //console.log("product array", productArray);
        fs.writeFile("./product.json", JSON.stringify(productArray), (err) => {
          if (err == null) {
            res.end(
              JSON.stringify({ message: "new product added successfully" })
            );
          }
        });
      });
    }
  })
  .listen(8000);
