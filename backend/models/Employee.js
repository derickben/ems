const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter a last name"],
  },
  dateOfJoining: {
    type: String,
  },
  title: {
    type: String,
    enum: ["Employee", "Manager", "Director", "VP"],
    default: "Employee",
  },
  department: {
    type: String,
    enum: ["IT", "Marketing", "Engineering", "HR"],
    default: "IT",
  },
  employeeType: {
    type: String,
    enum: ["FullTime", "PartTime", "Contract", "Seasonal"],
    default: "FullTime",
  },
  age: {
    type: Number,
    default: 18,
  },
  currentStatus: {
    type: Boolean,
    default: true,
  },
});


const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
