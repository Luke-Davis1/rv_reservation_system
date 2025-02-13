import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { updatePassword } from "../api/auth";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";

export function AdminUpdatePasswordForm({ }) {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmedPassword: ""
  });

  const [message, setMessage] = useState("");
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

  const handleClick = async () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    }
    if (!formData.confirmedPassword) {
      newErrors.confirmedPassword = 'Re-entry of new password is required';
    }
    if (formData.newPassword != formData.confirmedPassword) {
      newErrors.confirmedPassword = 'New passwords must match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Create new salt
      let newSalt = CryptoJS.lib.WordArray.random(10).toString(CryptoJS.enc.Hex);

      const userData = {
        username: formData.username,
        newPassword: formData.newPassword,
        newSalt,
        updateType: "admin"
      };

      // Call function to update password
      const response = await updatePassword(userData);

      if (response.message) {
        // display message and clear out form
        setMessage(response.message);

        setFormData({
          username: "",
          newPassword: "",
          confirmedPassword: ""
        });

        setErrors({});
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          passwordChangeError: "Something went wrong changing passwords",
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
    {message && <p style={{ color: message.includes("Success") ? "green": "red", textAlign: "center", paddingTop: "1rem" }}>{message}</p>}
    <PanelContent width={500}>
      <InputWithLabel 
        width={'100%'} 
        placeholder={"Enter employee/customer username"} 
        label={"Employee/Customer Username"} 
        onChange={handleFormChange} 
        value={formData.username} 
        $warn={errors.username} 
        name="username"
      />
      <InputWithLabel 
        width={'100%'} 
        type="password"
        placeholder={"Enter new password"} 
        label={"New Password"} 
        onChange={handleFormChange} 
        value={formData.newPassword} 
        $warn={errors.newPassword} 
        name="newPassword"
      />
      <InputWithLabel 
        width={'100%'} 
        type="password"
        placeholder={"Re-enter password"} 
        label={"Re-renter Password"} 
        onChange={handleFormChange} 
        value={formData.confirmedPassword} 
        $warn={errors.confirmedPassword} 
        name="confirmedPassword"
      />
      <Button 
        onClick={handleClick} 
        style={{ display: 'block', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto' }}
        >Update Password <ArrowRight size={15} strokeWidth={'2px'} />
      </Button>
    </PanelContent>
    {errors.passwordChangeError && <p style={{ color: 'red', textAlign: "center", paddingTop: "1rem" }}>{errors.passwordChangeError}</p>}
  </Panel>
}
