import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useState } from "react";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Panel } from "../elements/Panel";

export function AdminReservationPaymentForm() {
  const [name, setName] = useState('');
  const [cardNumber, setcardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [expiration, setExpiration] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [notes, setNotes] = useState('');

  return <Panel style={{ 
    width: '100%', 
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto' }}>
    <h3 style={{textAlign: 'center'}}>Payment Info</h3>
    <div style={{width: '100%', display: 'block'}}>
      <div style={{float: 'left', width: '45%'}}>
        <p style={{fontSize: '.8rem'}}>Selected Slot #: 1</p>
      </div>
      <div style={{float: 'right', width: '45%'}}>
        <p style={{fontSize: '.8rem'}}>Duration of Stay: 6 nights</p>
      </div>
    </div>
    <InputWithLabel width={'100%'} placeholder={"Enter cardholder name"} label={"Name on Card"} onChange={(e) => setName(e.target.value)} value={name} />
    <InputWithLabel width={'100%'} placeholder={"Enter card number"} label={"Card Number"} onChange={(e) => setcardNumber(e.target.value)} value={cardNumber} />
    
    <div style={{width: '96%', display: 'block', marginRight: '1rem'}}>
      <div style={{float: 'left', width: '45%'}}>
        <InputWithLabel width={'100%'} placeholder={"Enter CVC"} label={"CVC"} onChange={(e) => setCVC(e.target.value)} value={cvc} />
      </div>
      <div style={{float: 'inline', width: '45%'}}>
        <InputWithLabel width={'100%'} placeholder={"Enter expiration date"} label={"Expiration"} onChange={(e) => setExpiration(e.target.value)} value={expiration} />
      </div>
    </div>
    
    <InputWithLabel width={'100%'} placeholder={"Enter contact phone number"} label={"Phone Number"} onChange={(e) => setPhone(e.target.value)} value={phone} />
    <InputWithLabel width={'100%'} placeholder={"Enter customer comments"} label={"Customer Comments"} onChange={(e) => setComments(e.target.value)} value={comments} />
    <InputWithLabel width={'100%'} placeholder={"Enter reservation notes"} label={"Reservation Notes"} onChange={(e) => setNotes(e.target.value)} value={notes} />
    <p style={{marginTop: '0.5rem', textAlign: 'right', marginRight: '1rem', fontSize: '1.5rem'}}>Total: $125.00</p>
    <Button style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '.25rem'}}>Submit <ArrowRight size={15} strokeWidth={'2px'} /></Button>
  </Panel>
}