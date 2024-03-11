import React, { useEffect, useState } from "react";
import PostCard from "../Components/post";

export default function Home(props) {
  const { users, userid, user } = props;
  const [posts, setPosts] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [user, setuser] = useState({});
  // const userid = localStorage.getItem("id");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    // const fetchusers = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:3000/users`);
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch users");
    //     }
    //     const data = await response.json();
    //     // console.log(data);
    //     setUsers(data);
    //     const user = data.find((ele) => ele.id === userid);
    //     // console.log(user);
    //     setuser(user);
    //   } catch (error) {
    //     console.error("Error fetching posts:", error);
    //   }
    // };

    // fetchusers();
    fetchPosts();
  }, [posts]);
  return (
    <>
      {" "}
      {/* <ResponsiveAppBar user={user} /> */}
      <div className="mt-24">
        <h2 className="mb-20 text-2xl font-semibold	ml-5">Latest Posts</h2>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            users={users}
            userid={userid}
            posts={posts}
          />
        ))}
      </div>
    </>
  );
}
