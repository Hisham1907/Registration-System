import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const user = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  };
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);

  const navigate = useNavigate();
  async function registerUser(values) {
    try {
      const { data } = await axios.post(
        " https://dev.backend-api.goldady.com/user-api/auth/register",
        values
      );
      if (data.message.en == "User registered successfully.")
        setsuccessMsg("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err.response.data.message);
      setErrorMsg(err.response.data.message);
     }
  }

  const validation = (values) => {
    setErrorMsg(null);

    const errors = {};

    if (!values.first_name) {
      errors.first_name = "First name field is required";
    } else if (values.first_name.length < 3 || values.first_name.length > 10) {
      errors.first_name = "First name must be between 3 to 10 characters";
    }

    if (!values.last_name) {
      errors.last_name = "Last name field is required";
    } else if (values.last_name.length < 3 || values.last_name.length > 10) {
      errors.last_name = "Last name must be between 3 to 10 characters";
    }

    if (!values.username) {
      errors.username = "Username field is required";
    } else if (values.username.length < 3 || values.username.length > 15) {
      errors.username = "Username must be between 3 to 15 characters";
    }

    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    if (!values.phone) {
      errors.phone = "Phone number field is required";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Please enter a valid Egyptian phone number.";
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!values.email) {
      errors.email = "Email field is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!values.password) {
      errors.password = "Password field is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long, include both uppercase and lowercase letters, numbers, and symbols.";
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = "Please confirm your password";
    } else if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    return errors;
  };

  const FormikObj = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validate: validation,
  });

  return (
    <>
      {successMsg ? <Alert severity="success">{successMsg}</Alert> : ""}
      {errorMsg ? <Alert severity="error">Error</Alert> : ""}
      <Box className="main sm:p-6 md:p-10">
        <Paper
          component="form"
          variant="form"
          className="p-5  m-auto bg sm:w-2/3 lg:w-1/2"
          onSubmit={FormikObj.handleSubmit}
        >
          <Typography component="h6" variant="h6" className="py-5">
            Register
          </Typography>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
            <TextField
              name="first_name"
              onChange={FormikObj.handleChange}
              onBlur={FormikObj.handleBlur}
              value={FormikObj.values.first_name}
              label="First Name"
              variant="outlined"
              className="w-full"
              error={
                FormikObj.errors.first_name && FormikObj.touched.first_name
              }
              helperText={
                FormikObj.errors.first_name && FormikObj.touched.first_name
                  ? FormikObj.errors.first_name
                  : ""
              }
            />
            <TextField
              name="last_name"
              onChange={FormikObj.handleChange}
              onBlur={FormikObj.handleBlur}
              value={FormikObj.values.last_name}
              label="Last Name"
              variant="outlined"
              className="w-full"
              error={FormikObj.errors.last_name && FormikObj.touched.last_name}
              helperText={
                FormikObj.errors.last_name && FormikObj.touched.last_name
                  ? FormikObj.errors.last_name
                  : ""
              }
            />
            <TextField
              name="username"
              onChange={FormikObj.handleChange}
              onBlur={FormikObj.handleBlur}
              value={FormikObj.values.username}
              label="Username"
              variant="outlined"
              className="w-full"
              error={FormikObj.errors.username && FormikObj.touched.username}
              helperText={
                FormikObj.errors.username && FormikObj.touched.username
                  ? FormikObj.errors.username
                  : ""
              }
            />
            <TextField
              name="phone"
              onChange={FormikObj.handleChange}
              onBlur={FormikObj.handleBlur}
              value={FormikObj.values.phone}
              label="Phone"
              type="tel"
              variant="outlined"
              className="w-full"
              error={FormikObj.errors.phone && FormikObj.touched.phone}
              helperText={
                FormikObj.errors.phone && FormikObj.touched.phone
                  ? FormikObj.errors.phone
                  : ""
              }
            />
            <div className="col-span-full">
              <TextField
                name="email"
                onChange={FormikObj.handleChange}
                onBlur={FormikObj.handleBlur}
                value={FormikObj.values.email}
                label="Email"
                type="email"
                variant="outlined"
                className="w-full"
                error={FormikObj.errors.email && FormikObj.touched.email}
                helperText={
                  FormikObj.errors.email && FormikObj.touched.email
                    ? FormikObj.errors.email
                    : ""
                }
              />
            </div>
            <TextField
              name="password"
              onChange={FormikObj.handleChange}
              onBlur={FormikObj.handleBlur}
              value={FormikObj.values.password}
              label="Password"
              type="password"
              variant="outlined"
              className="w-full"
              error={FormikObj.errors.password && FormikObj.touched.password}
              helperText={
                FormikObj.errors.password && FormikObj.touched.password
                  ? FormikObj.errors.password
                  : ""
              }
              autoComplete="new-password"
            />
            <TextField
              name="password_confirmation"
              onChange={FormikObj.handleChange}
              onBlur={FormikObj.handleBlur}
              value={FormikObj.values.password_confirmation}
              label="Confirm Password"
              type="password"
              variant="outlined"
              className="w-full"
              error={
                FormikObj.errors.password_confirmation &&
                FormikObj.touched.password_confirmation
              }
              helperText={
                FormikObj.errors.password_confirmation &&
                FormikObj.touched.password_confirmation
                  ? FormikObj.errors.password_confirmation
                  : ""
              }
              autoComplete="new-password"
            />
          </div>
          <Button
            variant="contained"
            disabled={!FormikObj.isValid || !FormikObj.dirty}
            type="submit"
            color="error"
          >
            Register
          </Button>
        </Paper>
      </Box>
    </>
  );
}
