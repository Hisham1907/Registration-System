import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const user = {
    username: "",
    password: "",
  };
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);

  const navigate = useNavigate();
  async function loginUser(values) {
    try {
      const { data } = await axios.post(
        " https://dev.backend-api.goldady.com/user-api/auth/login",
        values
      );
      console.log(data.message.en);

      if (data.message.en == "User logged in successfully.")
        setsuccessMsg("Logged in successfully");

      setTimeout(() => {
        navigate("/Home");
      }, 2000);
    } catch (err) {
      console.log(err.response.data.message);
      setErrorMsg(err.response.data.message);
    }
  }

  const validation = (values) => {
    setErrorMsg(null);

    const errors = {};

    if (!values.username) {
      errors.username = "Username field is required";
    } else if (values.username.length < 3 || values.username.length > 15) {
      errors.username = "Username must be between 3 to 15 characters";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!values.password) {
      errors.password = "Password field is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long, include both uppercase and lowercase letters, numbers, and symbols.";
    }

    return errors;
  };

  const FormikObj = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validate: validation,
  });

  return (
    <>
      {successMsg ? <Alert severity="success">{successMsg}</Alert> : ""}
      {errorMsg ? (
        <Alert severity="error">
          There is an error in the username or password.
        </Alert>
      ) : (
        ""
      )}
      <Box className="main sm:p-6 md:p-10">
        <Paper
          component="form"
          variant="form"
          className="p-5  m-auto bg sm:w-2/3 lg:w-1/2 "
          onSubmit={FormikObj.handleSubmit}
        >
          <Typography component="h6" variant="h6" className="py-5">
            Welcome Back
          </Typography>
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
            sx={{ mb: "16px" }}
          />
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
            sx={{ mb: "16px" }}
            autoComplete="new-password"
          />

          <Button
            variant="contained"
            disabled={!FormikObj.isValid || !FormikObj.dirty}
            type="submit"
            color="error"
          >
            Login
          </Button>
        </Paper>
      </Box>
    </>
  );
}
