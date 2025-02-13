import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
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

  const handleLogin = async (e) => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      e.preventDefault();
      return;
    }

    try {
      const result = await login(formData.username, formData.password);

      if (result.message) {
        // Something went wrong, handle the error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          [result.message === "Invalid password" ? "password" : "loginError"]: result.message,
        }));
        return;
      }

      // Login to the user type dashboard
      const userType = localStorage.getItem("userType");
      if (userType === "customer") {
        navigate("/reservations");
      } else if (userType === "employee") {
        navigate("/employee");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Failed to login: ", error);
    }
  };

  return (
    <Panel>
      <PanelContent width={500}>
        <h2 style={{ textAlign: "center" }}>Welcome Back!</h2>
        <InputWithLabel
          width={"100%"}
          placeholder={"Enter username"}
          label={"Username"}
          name="username"
          onChange={handleFormChange}
          value={formData.username}
          $warn={errors.username}
        />
        <InputWithLabel
          width={"100%"}
          placeholder={"Enter password"}
          label={"Password"}
          name="password"
          type="password"
          onChange={handleFormChange}
          value={formData.password}
          $warn={errors.password}
        />
        <Button
          onClick={handleLogin}
          style={{
            display: "block",
            marginTop: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Login <ArrowRight size={15} strokeWidth={"2px"} />
        </Button>
        <Button
          style={{
            display: "block",
            marginTop: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={() => navigate('/customer/filterslots')}
        >
          Continue as Guest <ArrowRight size={15} strokeWidth={"2px"} />
        </Button>
        <h4 style={{ textAlign: "center" }}>
          Don't have an account? <a href="/register">Sign up!</a>
        </h4>
      </PanelContent>
    </Panel>
  );
}