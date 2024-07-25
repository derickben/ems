import { DataGrid } from "@mui/x-data-grid";
import { ActionDropdown } from "./ActionDropdown";

const EmployeeTable = ({data}) => {
  return (
    <div style={{margin: "0 1rem" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rowHeight={100}
            autoHeight
            columns={[
              { field: "FirstName", headerName: "First Name", width: 130 },
              { field: "LastName", headerName: "Last Name",width: 130 },
              {
                field: "Age", width: 100
              },
              {
                field: "DateOfJoining", width: 130
              },
              { field: "Title", width: 130 },
              { field: "Department", width: 130 },
              { field: "EmployeeType", width: 130 },
              { field: "CurrentStatus", width: 130 },
              {
                field: 'more',
                headerName: 'Actions',
                renderCell: ActionDropdown,
                width: 100
              },
            ]}
            rows={data.employees.map((item) => {
              return {
                id: item["id"],
                FirstName: item["firstName"],
                LastName: item["lastName"],
                Age: item["age"],
                DateOfJoining: item["dateOfJoining"],
                Title: item["title"],
                Department: item["department"],
                EmployeeType: item["employeeType"],
                CurrentStatus: item["currentStatus"] ? "Working" : "Retired",
              };
            })}
          />
        </div>
      </div>
    </div>
  )
}

export default EmployeeTable