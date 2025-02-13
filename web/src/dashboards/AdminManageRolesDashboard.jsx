import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchEmployees } from "../api/manageRoles";
import { Button } from "../elements/Button";
import { Table } from "../elements/Table";

export function AdminManageRolesDashboard() {
  const navigate = useNavigate();
  const {data: employees} = useQuery(["fetchEmployees"], () => fetchEmployees());

  const handleClick = (username) => {
    const params = new URLSearchParams();
    if (username) {
      params.append('username', username);
      navigate(`/admin/updaterole?${params.toString()}`);
    }
  }

  const columns = useMemo(() => ([
    { name: 'Employee Name', dataIndex: 'name' },
    { name: 'Employee Username', dataIndex: 'username' },
    { name: 'Manage Role', dataIndex: 'action', render: (username) => (<Button onClick={() => handleClick(username)} size="small">Update <ArrowRight size={15} strokeWidth="2px" /></Button>)  },
  ]), []);

  return <Layout>
    <Table columns={columns} data={employees} />
    <Button onClick={() => navigate("/admin")}>Back to dashboard <ArrowRight size={15} strokeWidth={'2px'} /></Button>
  </Layout>
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;