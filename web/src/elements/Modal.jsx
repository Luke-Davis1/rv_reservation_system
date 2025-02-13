import { X } from '@styled-icons/feather/X';
import styled from "styled-components";
import { Panel } from "./Panel";

export function Modal({ open, onClose, children }) {

  if (open) return <>
    <Frost onClick={() => onClose()} />
    <ModalBody>
      <XIcon onClick={() => onClose()} />
      {children}
    </ModalBody>
  </>

  return <></>
}

const Frost = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #b1b1b1;
  opacity: 0.5;
`;

const ModalBody = styled(Panel)`
  z-index: 2;
  position: absolute; 
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

const XIcon = styled(X)`
  height: 20px;
  width: 20px;
  stroke-width: 2px;
  position: absolute;
  top: 11px;
  right: 11px;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover{
    outline: 1px solid #b1b1b1;
  }
`;