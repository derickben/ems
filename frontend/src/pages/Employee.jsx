import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE } from "../queries/employeeQueries";
import { useParams } from "react-router-dom";
import EmployeeSearch from "../components/EmployeeSearch";

export const Employee = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_EMPLOYEE, { variables: { id } });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error("GraphQL Error:", error);
        return <p>Something Went Wrong...</p>;
    }

    const employee = data.employee;

    return (
        <div>
            <EmployeeSearch />
            <h1>Employee Profile</h1>
            <p><strong>ID:</strong> {employee.id}</p>
            <p><strong>First Name:</strong> {employee.firstName}</p>
            <p><strong>Last Name:</strong> {employee.lastName}</p>
            <p><strong>Title:</strong> {employee.title}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Employee Type:</strong> {employee.employeeType}</p>
            <p><strong>Age:</strong> {employee.age}</p>
            <p><strong>Current Status:</strong> {employee.currentStatus? "Working" : "Retired"}</p>
            <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
            {/* Add more fields as necessary */}
        </div>
    );
}
