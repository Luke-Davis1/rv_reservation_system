import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import calendarIcon from "../assets/calendar.svg";
import plugIcon from "../assets/plug-fill.svg";
import rvImage from "../assets/rv-mountains.jpg";
import tentIcon from "../assets/tent-solid.svg";
import { Button } from "../elements/Button";
import { Icon } from "../elements/Icon";

export function Home() {
  const navigate = useNavigate();
  return <>
    <img src={rvImage} style={{ height: '60vh', width: "100%", opacity: 0.8, objectFit: 'fill' }} />
    <div style={{ position: "absolute", top: "25%", left: "2%"}}>
      <h1 style={{ fontFamily: "Notable", fontWeight: 400, fontSize: "3.5em", wordSpacing: "10px" }}>BOOK YOUR ADVENTURE</h1>
      <Button style={{fontSize: "2em"}} onClick={() => navigate("/login")}>Book now <ArrowRight size={15} strokeWidth={'2px'} /></Button>
    </div>
    <IconList>
      <IconWithLabel>
        <Icon iconSrc={tentIcon} size={150} />
        <p>Cozy Campgrounds</p>
      </IconWithLabel>
      <IconWithLabel>
        <Icon iconSrc={plugIcon} size={150} />
        <p>Rv Hookups</p>
      </IconWithLabel>
      <IconWithLabel>
        <Icon iconSrc={calendarIcon} size={150} />
        <p>Easy Booking</p>
      </IconWithLabel>
    </IconList>
  </>
};

const IconList = styled.div`
  padding-top: 2%;
  display: flex;
  justify-content: center;
  gap: 50%;
`

const IconWithLabel = styled.div`
  text-align:center;
  font-size: 1.2rem;
  font-weight: 600;
`