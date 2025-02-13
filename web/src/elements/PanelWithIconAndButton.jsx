import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Panel } from "./Panel";
import { PanelContent } from "./PanelContent";

export function PanelWithIconAndButton(props) {
  const navigate = useNavigate();
  let {width, $flexDirection, iconSrc, buttonText, iconSize, buttonLink} = props;
  return <Panel>
    <PanelContent width={width} flexDirection={$flexDirection}>
      <Icon iconSrc={iconSrc} size={iconSize}/>
      <Button onClick={() => navigate(buttonLink)}>{buttonText} <ArrowRight size={15} strokeWidth={'2px'} /></Button>
    </PanelContent>
  </Panel>
}