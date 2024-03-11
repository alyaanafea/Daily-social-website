import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import generateRandomId from "../utilis/genId";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddPostContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: 400,
  margin: "auto",
  marginTop: 20,
});

const AddPostPage = ({ user, userid }) => {
 
  const navigate = useNavigate();
  const post = useForm({
    defaultValues: {
      title: "",
      body: "",
      image: "",
    },
  });

   const {register, handleSubmit, formState } = post
   const onSubmit = (data) => {
    // console.log(data);
    const id = generateRandomId();
    // console.log(data.image);
    const image = data.image[0];
    const imgUrl = URL.createObjectURL(image)
    console.log(imgUrl);
    const newPost = { ...data,image:imgUrl, id,userid };
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <>
     {/* <ResponsiveAppBar user={user} /> */}
      <AddPostContainer>
        <h2 className="mt-20  text-2xl font-semibold">Write New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            variant="outlined"
            margin="normal"
            {...register("title"
        
            )}
            fullWidth
          />
          <TextField
            label="Body"
            variant="outlined"
            margin="normal"
            {...register("body")}
            fullWidth
            multiline
            rows={4}
          />
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            style={{ marginBottom: 10 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Post
          </Button>
        </form>
      </AddPostContainer>
    </>
  );
};

export default AddPostPage;
