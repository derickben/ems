import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../mutations/employeeMutations";
import { GET_EMPLOYEES } from "../queries/employeeQueries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

const titles = [
  {
    value: "Employee",
    label: "Employee",
  },
  {
    value: "Manager",
    label: "Manager",
  },
  {
    value: "Director",
    label: "Director",
  },
  {
    value: "VP",
    label: "VP",
  },
];

const departments = [
  {
    value: "IT",
    label: "IT",
  },
  {
    value: "Marketing",
    label: "Marketing",
  },
  {
    value: "HR",
    label: "HR",
  },
  {
    value: "Engineering",
    label: "Engineering",
  },
];

const employeeTypes = [
  {
    value: "FullTime",
    label: "Fulltime",
  },
  {
    value: "PartTime",
    label: "Parttime",
  },
  {
    value: "Contract",
    label: "Contract",
  },
  {
    value: "Seasonal",
    label: "Seasonal",
  },
];

const EmployeeCreate = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(20);
  const [title, setTitle] = useState("Employee");
  const [department, setDepartment] = useState("IT");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [employeeType, setEmployeeType] = useState("FullTime");


  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    variables: { firstName, lastName, age, title, department, dateOfJoining,employeeType },
    update(cache, { data: { addEmployee } }) {
      const { employees } = cache.readQuery({ query: GET_EMPLOYEES });

      cache.writeQuery({
        query: GET_EMPLOYEES,
        data: { employees: [...employees, addEmployee] },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    addEmployee({
      variables: { firstName, lastName, age: parseInt(age, 10), title, department, dateOfJoining,employeeType },
    });
    setFirstName("");
    setLastName("");
    setAge(20);
    setTitle("Employee");
    setDateOfJoining("");
    setDepartment("IT");
    setEmployeeType("FullTime");
    handleClose();
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} style={{margin: "3rem 1rem"}}>
        Create Employee
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            margin="dense"
            id="dateOfJoining"
            name="dateOfJoining"
            helperText="Date of Joining"
            type="date"
            fullWidth
            variant="standard"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
          />

          <TextField
            id="outlined-select-title"
            select
            label=""
            fullWidth
            variant="standard"
            helperText="Please select title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            {titles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-department"
            select
            label=""
            fullWidth
            variant="standard"
            helperText="Please select department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-employee-type"
            select
            label=""
            fullWidth
            variant="standard"
            helperText="Please select employee-type"
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
          >
            {employeeTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeCreate;
