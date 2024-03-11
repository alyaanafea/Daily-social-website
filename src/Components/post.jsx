import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  IconButton,
  CardHeader,
  Avatar,
  CardActions,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const PostCard = ({ post, users, userid }) => {
  const user = users.find((user) => user.id === post.userid);
  // console.log(user);
  const isAuthor = userid === post.userid;

  const handleDelete = async () => {
    console.log("Delete post:", post.id);
    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "DELETE",
    });
  };
  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: "600px",
        margin: "auto",
        marginBottom: "40px",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      {isAuthor && (
        <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
          <Link to={`/post/${post.id}`}>
            <Edit />
          </Link>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </CardActions>
      )}
      <CardHeader
        avatar={<Avatar src={user.profilePic} />}
        title={user.username}
        subheader={user.email}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post.title || ""}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: "1.5" }}>
          {post.body || ""}
        </Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          component="img"
          src={post.image || ""}
          alt={post.title}
          sx={{ width: "100%", maxHeight: "600px", objectFit: "cover" }}
        />
      )}
    </Card>
  );
};

export default PostCard;
