import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../api/auth";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";


export function UserUpdatePasswordForm({}) {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: ""
  });
  const [errors, setErrors] = useState({});
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
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

  const handleClick = async () => {
    const newErrors = {};
    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Old password is required';
    }
    if (!formData.newPassword1) {
      newErrors.newPassword1 = 'New password is required';
    }
    if (!formData.newPassword2) {
      newErrors.newPassword2 = 'Re-entry of new password is required';
    }
    if (formData.newPassword2 != formData.newPassword1) {
      newErrors.newPassword2 = 'New passwords must match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Create new salt
      let newSalt = CryptoJS.lib.WordArray.random(10).toString(CryptoJS.enc.Hex);

      const userData = {
        username: localStorage.getItem("username"),
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword2,
        newSalt,
        updateType: "personal"
      };

      // Call function to update password
      const response = await updatePassword(userData);

      if (response.message) {
        alert("Password Changed Successfully")
        navigate("/profile");
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          passwordChangeError: "Old password incorrect",
        }));
        return;
      }

    } catch (error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordChangeError: 'Password change failed',
      }));
      console.error('Password change failed:', error);
    }
  };


  return <Panel>
    <PanelContent width={400}>
      <InputWithLabel width={'100%'} 
        placeholder={"Enter old password"} 
        label={"Old Password"} 
        name="oldPassword"
        type="password"
        value={formData.oldPassword}
        onChange={handleFormChange}
        $warn={errors.oldPassword} 
      />
      <InputWithLabel width={'100%'} 
        placeholder={"Enter new password"} 
        label={"New Password"} 
        name="newPassword1"
        type="password"
        value={formData.newPassword1}
        onChange={handleFormChange}
        $warn={errors.newPassword1} 
      />
      <InputWithLabel width={'100%'} 
        placeholder={"Re-enter new password"} 
        label={"Re-enter New Password"} 
        name="newPassword2"
        type="password"
        value={formData.newPassword2}
        onChange={handleFormChange}
        $warn={errors.newPassword2} 
      />
      {errors.passwordChangeError && <p style={{ color: 'red', textAlign: "center", paddingTop: "1rem"}}>{errors.passwordChangeError}</p>}
      <Button onClick={handleClick} style={{ display: 'block', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>Update Password <ArrowRight size={15} strokeWidth={'2px'} /></Button>
      <Button onClick={handleBackClick} style={{ display: 'block', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>Back to dashboard <ArrowRight size={15} strokeWidth={'2px'} /></Button> 
    </PanelContent>
  </Panel>
}