// console.log("test");
const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const dbConnection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://admin:admin@cluster0.fv2y9wr.mongodb.net/sample?retryWrites=true&w=majority"
    )
    .then(() => console.log("database connection sucessfull"))
    .catch((err) => {
      console.log("database connection error occered", err);
    });
};
dbConnection();
//schema  -- structure of how the data/document will look like

const userScema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is mandatory"],
    },
    age: {
      type: Number,
      min: [20, "Minimum age is 20 please enter more than 20"],
      maz: 100,
    },
    password: {
      type: String,
      required: [true, "Password must be entered"],
      minLength: [8, "Minimum length is 8"],
      maxLength: [12, "Maximum length is 12"],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "developer"],
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userScema);

let user = {
  name: "Nazeena1",
  password: "password",
  role: "developer",
  age: 35,
};

//insert data

userModel
  .create(user)
  .then((response) => {
    console.log(response);
    console.log("data instered");
  })
  .catch((err) => {
    console.log("error occured while inserting data", err);
  });

/// fetching data from mongodb

// userModel
//   .find({ name: "vali" })
//   .then((data) => {
//     // return data;
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("error occured while fetching data");
//   });

// it will give first occurence

// userModel
//   .findOne({ name: "vali" })
//   .then((data) => {
//     // return data;
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("error occured while fetching data");
//   });

// sort data

// userModel
//   .find()
//   .sort({ age: -1 })
//   .then((data) => {
//     // return data;
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("error occured while fetching data");
//   });

// limit only 2 data
userModel
  .find()
  .limit(2)
  .then((data) => {
    // return data;
    console.log(data);
  })
  .catch((err) => {
    console.log("error occured while fetching data");
  });

// delete one

// userModel
//   .deleteOne({ age: 30 })
//   .then((info) => {
//     // return data;
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log("error occured while fetching data");
//   });

// delete many

// userModel
//   .deleteMany({ age: 30 })
//   .then((info) => {
//     // return data;
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log("error occured while fetching data");
//   });

// update one

// userModel
//   .updateOne({ age: 40 }, { age: 35 })
//   .then((info) => {
//     // return data;
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log("error occured while fetching data");
//   });
