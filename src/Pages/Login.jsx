import React from "react";
import { TextField, Button, Stack, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import generateToken from "../utilis/genToken";

export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`
      );
      if (response.status === 200) {
        const users = await response.json();
        if (users.length === 0) {
          navigate("/register");
          throw new Error("User not found or incorrect credentials");
        } else {
          const token = generateToken();
          localStorage.setItem("id", users[0].id);
          console.log(users);
          localStorage.setItem("token", token);
          navigate("/home");
        }
      } else if (response.status === 401) {
        throw new Error("Unauthorized: Incorrect credentials");
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        {/* <h2 className=" text-2xl pl-1  text-gray-500 text-center">welcome again!!</h2> */}
        <Stack
          spacing={3}
          sx={{ minHeight: "70vh", textAlign: "center", marginTop: "100px" }}
        >
          <h1 className="font-bold text-3xl pb-5">LOGIN</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack
              sx={{ alignItems: "center", justifyContent: "center" }}
              spacing={3}
            >
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
                sx={{
                  transition: ".2s",
                  background: "#330033",
                  fontSize: "1.3rem",
                  width: { xs: "50%", sm: "25%", md: "50%" },
                  "&:hover": {
                    background: "#330033",
                    // scale:"1.01", // Change hover color to #330033
                  },
                  "&:active": {
                    background: "#330033", // Change click color to #330033
                  },
                }}
              >
                LOGIN
              </Button>
              <span style={{ fontSize: "1rem", color: "#727272" }}>
                Don't have an account?
                <span>
                  <Link to={"/register"}>Sign up</Link>
                </span>
              </span>
            </Stack>
          </form>
        </Stack>
      </Box>
    </>
  );
}
