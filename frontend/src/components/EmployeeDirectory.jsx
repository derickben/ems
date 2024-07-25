import { useQuery } from "@apollo/client";
import {GET_EMPLOYEES} from '../queries/employeeQueries'
import EmployeeSearch from "./EmployeeSearch";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeTable from "./EmployeeTable";

const EmployeeDirectory = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong...</p>;

  return (
    <>
      {
        !loading && !error && 
          <>
            <EmployeeSearch />
            <EmployeeCreate />
            <EmployeeTable data={data}/>
          </>
      }
    </>
  )
}

export default EmployeeDirectory;