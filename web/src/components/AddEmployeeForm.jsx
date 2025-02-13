import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { signup } from "../api/auth";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";

export function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmedPassword: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }))
  };

  const handleClick = async () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.confirmedPassword) {
      newErrors.confirmedPassword = 'Rentry of password is required';
    }
    if (formData.password !== formData.confirmedPassword) {
      newErrors.confirmedPassword = 'Passwords must match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Create salt
      let salt = CryptoJS.lib.WordArray.random(10).toString(CryptoJS.enc.Hex);

      const employeeData = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        salt,
        type: "employee",
      };
      
      // Call signup function
      const response = await signup(employeeData);

      if (response.message) {
        // display success message and clear out form
        setSuccessMessage(response.message);

        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          confirmedPassword: ""
        });

        setErrors({});
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          accountCreationError: response.message,
        }));
        return;
      }

    } catch (error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        accountCreationError: 'An error occurred while creating the account. Please try again.',
      }));
      console.error('Signup failed:', error);
    }
  };

  return <Panel>
    {successMessage && <p style={{ color: 'green', textAlign: "center", paddingTop: "1rem"}}>{successMessage}</p>}
    <PanelContent width={500}>
        <InputWithLabel width={'100%'} placeholder={"Enter employee's first name"} label={"First Name"} onChange={handleFormChange} name="firstName" value={formData.firstName} $warn={errors.firstName}/>
        <InputWithLabel width={'100%'} placeholder={"Enter employee's last name"} label={"Last Name"} onChange={handleFormChange} name="lastName" value={formData.lastName} $warn={errors.lastName} />
        <InputWithLabel width={'100%'} placeholder={"Enter employee username"} label={"Employee Username"} onChange={handleFormChange} name="username" value={formData.username} $warn={errors.username} />
        <InputWithLabel type="password" width={'100%'} placeholder={"Enter employee password"} label={"Employee Password"} onChange={handleFormChange} name="password" value={formData.password} $warn={errors.password} />
        <InputWithLabel type={"password"} width={'100%'} placeholder={"Re-enter employee password"} label={"Confirm Employee Password"} onChange={handleFormChange} name="confirmedPassword" value={formData.confirmedPassword} $warn={errors.confirmedPassword} />
        <Button onClick={handleClick} style={{ display: 'block', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto'}}>Add Employee <ArrowRight size={15} strokeWidth={'2px'} /></Button>
    </PanelContent>
    {errors.accountCreationError && <p style={{ color: 'red', textAlign: "center", paddingTop: "1rem"}}>{errors.accountCreationError}</p>}
  </Panel>
} 
