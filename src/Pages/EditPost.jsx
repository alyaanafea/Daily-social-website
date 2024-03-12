import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost({ user, userid }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = useForm();
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        post.reset(data);
      });
  }, [id, post]);
  const { register, handleSubmit, formState } = post;
  const onSubmit = (data) => {
    console.log(data);
    const image = data.image[0];
    const imgUrl = URL.createObjectURL(image);
    const EditedPost = { ...data, id: id, userid: userid, image: imgUrl };
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(EditedPost),
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <>
      <h2 className="mt-20  text-2xl font-semibold">Edit post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          variant="outlined"
          margin="normal"
          {...register("title")}
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
          Edit Post
        </Button>
      </form>
    </>
  );
}
