const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

//config
const dbConnect = require("./config/dbConnect.config.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

//app
const app = express();
const port = process.env.PORT || 5000;
//middlewares
app.use(express.json());
app.use(cors());
//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/", function (req, res) {
  res.send("Welcome to role based auth server");
});

//listen to port

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
//connect to mongo database
dbConnect();
