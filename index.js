const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000;
const { MONGO_URI } = require("./key.js");

mongoose.connect(MONGO_URI, {
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
// require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/user"));
// app.use(require("./routes/post"));

app.listen(PORT, () => {
  console.log("Server is Running:", PORT);
});
