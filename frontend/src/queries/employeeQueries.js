import { gql } from "@apollo/client";

const GET_EMPLOYEES = gql`
  query getEmployees {
    employees {
      id
      firstName
      lastName
      title
      department
      employeeType
      age
      currentStatus
      dateOfJoining
    }
  }
`;

const GET_EMPLOYEE = gql`
  query getEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      title
      department
      employeeType
      age
      currentStatus
      dateOfJoining
    }
  }
`;

export {GET_EMPLOYEES, GET_EMPLOYEE};