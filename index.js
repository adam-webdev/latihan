const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const { MONGO_URI } = require("./key.js");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongoose connected yeahh");
});
mongoose.connection.on("err mongoose", (err) => {
  console.log("mongoose", err);
});

require("./models/user");
require("./models/news");
require("./models/product");
require("./models/producerprice");
require("./models/directory");
require("./models/pestmanagement");
require("./models/plantingguide");
require("./models/discussion");
require("./models/complain");
require("./models/plant");
require("./models/erdkk");
require("./models/field");
require("./models/comments");

app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/user"));
app.use(require("./routes/news"));
app.use(require("./routes/product"));
app.use(require("./routes/producerprice"));
app.use(require("./routes/directory"));
app.use(require("./routes/pestmanagement"));
app.use(require("./routes/plantingguide"));
app.use(require("./routes/discussion"));
app.use(require("./routes/complain"));
app.use(require("./routes/plant"));
app.use(require("./routes/erdkk"));
app.use(require("./routes/field"));
app.use(require("./routes/comments"));
// app.use(require("./routes/post"));

app.listen(port, () => {
  console.log("Server is Running:", port);
});
