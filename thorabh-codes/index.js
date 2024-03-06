// console.log("hello world!");
// const fs = require("fs");
// const data = fs.readFileSync("test.txt", "utf8");
// console.log(data);

// fs.writeFileSync("xyz.txt", "hello world");

// console.log("*********Asynchronous *****************");

// fs.readFile("test.txt", "utf8", (err, data) => {
//   console.log("err", err);
//   console.log("data", data);
// });
// console.log("async test end");

const os = require("os");

console.log(os.platform());
console.log(os.hostname());
console.log(os.freemem());
console.log(os.homedir());
