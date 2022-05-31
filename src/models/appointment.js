const { Schema, model } = require("mongoose");

const AppointSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  customerName: String,
  doctorName: String,
  date: String,
  complaint: String,
});

module.exports = model("Appoints", AppointSchema);
