import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchProfileDetails } from "../api/profile";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Loading } from "../elements/Loading";
import { Panel } from "../elements/Panel";

export function ProfileInfoDisplayForm() {
  const navigate = useNavigate();  
  const userType = localStorage.getItem("userType");
  
  const { data: profileData, isLoading, error } = useQuery(["profileData" ], () => fetchProfileDetails());
  
  if (error) {
    console.log(error)
    return 'An error has occurred: ' + error.message;
  }

  const handleClick = () => {
    navigate("/updatepassword");
  };

  const handleBackClick = () => {
    if (userType === 'customer'){
      navigate("/reservations");
    }
    if (userType === 'employee'){
      navigate("/employee");
    }
    if (userType === 'admin'){
      navigate("/admin");
    }
  };

  if (isLoading) return <Loading />;

  return <Panel 
    style={{ 
      width: '35em', 
      alignItems: 'center',
      margin: 'auto' 
      }}>
    <div style={{width: '100%', display: 'flex'}}>
      <div style={{float: 'left', width: '48%'}}>
        <InputWithLabel style={{marginBottom: '2rem'}} width={'100%'} type='text' value={profileData.first_name} label={"First Name"} readOnly/>
        <InputWithLabel style={{marginBottom: '2rem'}} width={'100%'} type='text' value={profileData.email} label={"Email"} readOnly />
        {userType === 'customer' && (<InputWithLabel style={{marginBottom: '2rem'}} width={'100%'} value={profileData.rank} label={"Military Rank"} readOnly/>)}
        {userType !== 'customer' && (<p>&nbsp;</p>)}
        <Button onClick={handleBackClick} >Back to dashboard <ArrowRight size={15} strokeWidth={'2px'} /></Button> 
      </div>
      <div style={{float: 'right', width: '48%', marginLeft: "1rem"}}>
        <InputWithLabel style={{marginBottom: '2rem'}} width={'100%'} value={profileData.last_name} label={"Last Name"} readOnly/>
        {userType === 'customer' && (<InputWithLabel style={{marginBottom: '2rem'}} width={'100%'} value={profileData?.military_affiliation ?? ''} label={"Military Affiliation"} readOnly /> )} 
        {userType === 'customer' && (<InputWithLabel style={{marginBottom: '2rem'}} width={'100%'} value={profileData?.military_status ?? ''} label={"Military Status"} readOnly /> )}
        {userType !== 'customer' && (<p>&nbsp;</p>)}
        {userType !== 'customer' && (<p>&nbsp;</p>)}
        {userType !== 'customer' && (<p>&nbsp;</p>)}
        {userType !== 'customer' && (<p>&nbsp;</p>)}
        {userType !== 'customer' && (<p style={{marginTop: '.2rem'}}>&nbsp;</p>)}
        <Button onClick={handleClick} style={{ float: 'right'}}>Change Password <ArrowRight size={15} strokeWidth={'2px'} /></Button>
      </div>
    </div>  
    
  </Panel>
}