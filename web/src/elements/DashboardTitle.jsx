import styled from "styled-components";

export function DashboardTitle({ title }) {
  const user = localStorage.getItem("user");

  return <Layout>
    <h2>{title}</h2>
    {(user !== undefined && user !== null) && <User>Welcome, {user}</User>}
  </Layout>
}


const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
`;

const User = styled.h5`
  position: absolute;
  right: 0;
`;