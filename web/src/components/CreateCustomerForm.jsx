import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Panel } from "../elements/Panel";
import { SelectWithLabel } from "../elements/SelectWithLabel";

export function CreateCustomerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
    phone: "",
    affiliation: "Air Force",
    rank: "",
    status: "",
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
      [name]: ""
    }))
  };

  const options = [
    { value: 'Air Force', label: 'Air Force' },
    { value: 'Army', label: 'Army' },
    { value: 'Coast Guard', label: 'Coast Guard' },
    { value: 'DoD Authorized Civilian', label: 'DoD Authorized Civilian' },
    { value: 'Marine Corps', label: 'Marine Corps' },
    { value: 'Navy', label: 'Navy' },
    { value: 'Space Force', label: 'Space Force' },
  ];

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
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.affiliation) {
      newErrors.affiliation = 'Affiliation is required';
    }
    if (!formData.rank) {
      newErrors.rank = 'Rank is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Create salt
      let salt = CryptoJS.lib.WordArray.random(10).toString(CryptoJS.enc.Hex);

      const customerData = {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        salt,
        email: formData.email,
        affiliation: formData.affiliation,
        rank: formData.rank,
        status: formData.status,
        phone: formData.phone,
        type: "customer",
      };

      // Call signup function
      const response = await signup(customerData);

      if (response.token) {
        // Send to dashboard page for customer
        navigate("/reservations");
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

  return (
    <Panel style={{ width: '35em', flexDirection: 'column', alignItems: 'center', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center' }}>Join the Adventure</h3>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ float: 'left', width: '48%' }}>
          <InputWithLabel
            width={'100%'}
            placeholder={"Enter first name"}
            label={"First Name"}
            name="firstName"
            onChange={handleFormChange}
            value={formData.firstName}
            $warn={errors.firstName}
          />
          <InputWithLabel
            width={'100%'}
            placeholder={"Enter last name"}
            label={"Last Name"}
            name="lastName"
            onChange={handleFormChange}
            value={formData.lastName}
            $warn={errors.lastName}
          />
          <InputWithLabel
            width={'100%'}
            placeholder={"Enter username"}
            label={"New Username"}
            name="username"
            onChange={handleFormChange}
            value={formData.username}
            $warn={errors.username}
          />
          <InputWithLabel
            type="password"
            width={'100%'}
            placeholder={"Enter password"}
            label={"New Password"}
            name="password"
            onChange={handleFormChange}
            value={formData.password}
            $warn={errors.password}
          />
          <InputWithLabel
            type="password"
            width={'100%'}
            placeholder={"Re-enter password"}
            label={"Re-enter Password"}
            name="confirmedPassword"
            onChange={handleFormChange}
            value={formData.confirmedPassword}
            $warn={errors.confirmedPassword}
          />
        </div>
        <div style={{ float: 'right', width: '48%', marginLeft: ".5rem" }}>
          <InputWithLabel
            width={'100%'}
            placeholder={"Enter phone"}
            label={"Phone"}
            name="phone"
            onChange={handleFormChange}
            value={formData.phone}
            $warn={errors.phone}
          />
          <InputWithLabel
            width={'100%'}
            placeholder={"Enter email"}
            label={"Email"}
            name="email"
            onChange={handleFormChange}
            value={formData.email}
            $warn={errors.email}
          />
          <SelectWithLabel
            options={options}
            placeholder={"Select military affiliation"}
            label1={"Military Affiliation"}
            name="affiliation"
            onChange={handleFormChange}
            value={formData.affiliation}
            $warn={errors.affiliation}
          />
          <InputWithLabel
            width={'100%'}
            placeholder={"Enter Rank"}
            label={"Military Rank"}
            name="rank"
            onChange={handleFormChange}
            value={formData.rank}
            $warn={errors.rank}
          />
          <InputWithLabel
            width={'100%'}
            placeholder={"Enter military status"}
            label={"Military Status"}
            name="status"
            onChange={handleFormChange}
            value={formData.status}
            $warn={errors.status}
          />
        </div>
      </div>
      <Button
        onClick={handleClick}
        style={{ display: 'block', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Create Account <ArrowRight size={15} strokeWidth={'2px'} />
      </Button>
      {errors.accountCreationError && <p style={{ color: 'red', textAlign: "center", paddingTop: "1rem"}}>{errors.accountCreationError}</p>}
    </Panel>
  );
}