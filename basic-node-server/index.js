const http = require('http');
const fs = require('fs');
const httpServer = http.createServer((req, res) => {
  const log = `${Date.now()} New request received\n`;
  fs.appendFile('log.txt', log, (err, log) => {
    res.end('logs added successfully');
  });
  res.end(req.socket?.remoteAddress);
});

httpServer.listen(9000, () => {
  console.log(`server is listening on 9000`);
});
