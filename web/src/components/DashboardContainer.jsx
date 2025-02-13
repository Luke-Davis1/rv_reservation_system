import styled from "styled-components";
import { DashboardTitle } from "../elements/DashboardTitle";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function DashboardContainer({ title, dashboard, $width, hideUser, headerPosition }) {

  return <>
    <Header position={headerPosition} />
    <DashboardLayout $width={$width} >
      {!hideUser && <DashboardTitle title={title} />}
      {dashboard}
    </DashboardLayout>
    <Footer />
  </>
}

const DashboardLayout = styled.div`
  width: ${({ $width }) => $width ? $width : '95%'};
  height: 100%;
  min-height: 100dvh;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;