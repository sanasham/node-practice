const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 3000;

// Define a route to trigger opening the calculator
app.get("/open-calculator", (req, res) => {
  // Execute the system command to open the calculator
  exec("code .", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error occurred while opening calculator", err);
      return;
    }
    console.log("Calculator opened successfully");
    res.send("Calculator opened successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
