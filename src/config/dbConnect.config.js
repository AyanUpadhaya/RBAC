const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_DEV_URI);
    console.log(`Connected to ${con.connection.host}, ${con.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnect;
