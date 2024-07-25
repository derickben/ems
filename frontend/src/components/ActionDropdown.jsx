import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../mutations/employeeMutations";

import MenuItem from "@mui/material/MenuItem";
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { GET_EMPLOYEES } from "../queries/employeeQueries";
import { useNavigate } from "react-router-dom";


const ActionDropdown = (props) => {
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    variables: { id: props.row.id },
    update(cache, { data: { deleteEmployee } }) {
      const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
      cache.writeQuery({
        query: GET_EMPLOYEES,
        data: {
          employees: employees.filter(
            (employee) => employee.id !== deleteEmployee.id
          ),
        },
      });
    },
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize useNavigate


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    setAnchorEl(null);
    navigate(`/employees/${props.row.id}`); // Navigate to the employee profile page
  };


  const handleEdit = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    await deleteEmployee();
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleViewProfile}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </>
  );
};

export { ActionDropdown };
