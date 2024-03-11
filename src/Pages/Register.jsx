import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import generateRandomId from "../utilis/genId";

export default function Register() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    const id = generateRandomId();
    const newUser = { ...data, id };
    fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    }).then(() => {
      navigate("/");
    });
  };
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <>
      <Box
        sx={{
          border: "3px solid #33004c",
          borderRadius: "8px",
          width: { xs: "60%", sm: "70%", md: "35%" },
          height: "40%",
          paddingTop: "30px",
          margin: " auto",
          mt: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
          }}
        >
          <span className="text-fuchsia-950 font-serif"> Welcome In Daily</span>
        </Typography>
        <Stack
          spacing={3}
          sx={{ minHeight: "70vh", textAlign: "center", marginTop: "100px" }}
        >
          <h1 className="font-bold text-3xl pb-5">SignUp</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack
              sx={{ alignItems: "center", justifyContent: "center" }}
              spacing={3}
            >
              <TextField
                label="Username"
                type="text"
                placeholder="Enter your Name"
                {...register("username", {
                  required: "Username is required",
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{ width: { xs: "90%", sm: "80%", md: "90%" } }}
              />
              <TextField
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ width: { xs: "90%", sm: "80%", md: "90%" } }}
              />
              <TextField
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value: /^[A-Za-z\d]{6,}$/,
                    message:
                      "Password must contain only letters and/or numbers",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ width: { xs: "90%", sm: "80%", md: "90%" } }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  transition: ".2s",
                  background: "#330033",
                  fontSize: "1.3rem",
                  width: { xs: "50%", sm: "25%", md: "50%" },
                  "&:hover": {
                    background: "#330033",
                  },
                  "&:active": {
                    background: "#330033",
                  },
                }}
              >
                SignUp
              </Button>
              <span style={{ fontSize: "1rem", color: "#727272" }}>
                Already have an account?
                <span>
                  <Link to={"/"}>Login</Link>
                </span>{" "}
              </span>
            </Stack>
          </form>
        </Stack>
      </Box>
    </>
  );
}
