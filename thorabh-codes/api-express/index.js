const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.fv2y9wr.mongodb.net/sample?retryWrites=true&w=majority"
  )
  .then(() => console.log("database connection established successfully"))
  .catch((err) => {
    console.log("database connection error");
  });

//user related information

//schema for users

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is mandatory"],
    },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory"],
    },
  },
  { timestamps: true }
);

// user model
const userModel = mongoose.model("User", userSchema);

// endpoints to create user

app.post("/users", (req, res) => {});

//Product related information

//schema

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is mandatory"],
    },
    price: {
      type: Number,
      required: [true, "price is mandatory"],
      min: 1,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is mandatory"],
    },
    category: {
      type: String,
      enum: ["Clothing", "Electronics", "Household"],
    },
  },
  { timestamps: true }
);

// models

const productModel = mongoose.model("Product", productSchema);

app.get("/products", (req, res) => {
  productModel
    .find()
    .then((data) => res.send({ data, message: "got all items" }))
    .catch((err) => {
      console.log("error occured while fetching items");
    });
});

app.get("/products/:id", (req, res) => {
  console.log(req.params.id);

  productModel
    .findOne({ _id: req.params.id })
    .then((data) => res.send({ data, message: "got all items" }))
    .catch((err) => {
      console.log("error occured while fetching items");
    });
});

app.delete("/products/:id", (req, res) => {
  console.log(req.params.id);

  productModel
    .deleteOne({ _id: req.params.id })
    .then((info) => res.send({ message: "successfully deleted item" }))
    .catch((err) => {
      console.log("error occured while deleting items");
    });
});

app.put("/products/:id", (req, res) => {
  console.log(req.params.id);
  const product = req.body;
  console.log("product object", product);
  productModel
    .updateOne({ _id: req.params.id }, product)
    .then((data) => res.send({ data, message: "successfully updated item" }))
    .catch((err) => {
      console.log("error occured while updating items");
    });
});

app.get("/testing/:id", middleware, (req, res) => {
  res.send({ message: " Testing successful" });
});

function middleware(req, res, next) {
  if (req.params.id < 10) {
    res.send({ message: " please enter a valid id" });
  } else {
    next();
  }
}
app.post("/products/", (req, res) => {
  const product = req.body;
  console.log("product ", product);
  productModel.create(product).then((document) => {
    res.send({ data: document, message: "product created" });
  });
});

app.delete("/products/:id", (req, res) => {
  console.log(req.params.id);
  res.send({ message: "delete Success" });
});

app.put("/products/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send({ message: "update Success" });
});

app.listen(8000, () => console.log("server is running "));
