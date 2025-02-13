import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchEmployee, updateEmployeeStatus } from "../api/manageRoles";
import { Button } from "../elements/Button";
import { Loading } from "../elements/Loading";
import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";
import { SelectWithLabel } from "../elements/SelectWithLabel";

export function UpdateRoleForm() {
  // Get the username from the url to update
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    return { username }
  }, [location.search]);
  const [desiredRole, setDesiredRole] = useState('employee');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  
  // Fetch the employee's status
  const {data: employeeData, isLoading, refetch} = useQuery(["EmployeeStatus", params], () => fetchEmployee(params));
  if (isLoading) return <Loading />;
  
  const options = [
    { value: 'employee', label: 'Employee' },
    { value: 'admin', label: 'Administrator' },
    { value: 'inactive', label: 'Inactive' },
  ];
  
  let currentRoleLabel = options.find(option => option.value === employeeData.type)?.label || '';

  const updateHandler = async (e) => {
    // make sure role isn't same as current role
    if (employeeData.type === desiredRole) {
      // not going to update to current role
      setError("Can't update employee to status they currently hold");
      e.preventDefault();
    }

    try {
      // make request to change status
      const response = await updateEmployeeStatus({username: employeeData.username, desiredRole});
  
      if (response.message) {
        setSuccessMessage(response.message);
        setError("");
        await refetch(); // reload the data without reloading the page
      } else {
        setError("Something went wrong updating status");
        return;
      }
    } catch (error) {
      setError("Something went wrong with the database trying to update status");
      console.error('Something failed:', error);
    }
  }

  return <>
  <Layout>
    <Panel>
      {successMessage && <p style={{ color: 'green', textAlign: "center", paddingTop: "1rem"}}>{successMessage}</p>}
      <PanelContent width={500}>
        <p style={{ fontSize:'1.1rem', letterSpacing:'1px', fontWeight:'500'}}>Employee Username</p>
        <p><strong>{employeeData.username}</strong></p>
        <p style={{ fontSize:'1.1rem', letterSpacing:'1px', fontWeight:'500'}}>Current Role</p>
        <p><strong>{currentRoleLabel}</strong></p>
        <SelectWithLabel placeholder={"Desired Role"} options= {options} label1={"Desired Role"} onChange={(e) => setDesiredRole(e.target.value)} value={desiredRole} />
        <Button onClick={updateHandler} style={{ display: 'block', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>Update Role <ArrowRight size={15} strokeWidth={'2px'} /></Button>
      </PanelContent>
      {error && <p style={{ color: 'red', textAlign: "center", paddingTop: "1rem"}}>{error}</p>}
    </Panel>
    <Button onClick={() => navigate("/admin/manageroles")}>Back to manage roles <ArrowRight size={15} strokeWidth={'2px'} /></Button>
  </Layout>
  </>
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;