import { gql } from "@apollo/client";

export const ADD_EMPLOYEE= gql`
  mutation addEmployee($firstName: String!, $lastName: String!, $age: Int, $title: EmployeeTitle, $dateOfJoining: String, $department: EmployeeDepartment, $employeeType: EmployeeType ) {
    addEmployee(firstName: $firstName, lastName: $lastName, age: $age, title: $title, dateOfJoining: $dateOfJoining, department: $department, employeeType: $employeeType) {
      id
      firstName
      lastName
      age
      title
      dateOfJoining
      department
      employeeType
      currentStatus
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      lastName
      firstName
    }
  }
`;
