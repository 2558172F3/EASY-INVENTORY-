const Mongoose = require("mongoose");

const EmploySchema = new Mongoose.Schema({
  id: { type: Object },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  cc: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  address: { type: String },
});

EmploySchema.methods.employExists = async function (cc) {
  const result = await Mongoose.model("empleados").find({ cc: cc});
  return result.length > 0;
};
    

module.exports = Mongoose.model("empleados", EmploySchema);
