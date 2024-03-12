import { useEffect, useState } from "react";
import AddPostPage from "./Pages/AddPost";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Routes, BrowserRouter, Route, Navigate} from "react-router-dom";
import ResponsiveAppBar from "./Components/Navbar";
import EditPost from "./Pages/EditPost";

function App() {
  const userid = localStorage.getItem("id");
  const [users, setUsers] = useState([]);
  const [user, setuser] = useState({});

  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        // console.log(data);
        setUsers(data);
        const user = data.find((ele) => ele.id === userid);
        // console.log(user);
        setuser(user);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchusers();
  }, []);

  return (
    <BrowserRouter>
      {token && <ResponsiveAppBar token={token} user={user} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<Home users={users} user={user} userid={userid} />}
        />
        <Route
          path="/post/:id"
          element={<EditPost user={user} userid={userid} />}
        />
        <Route
          path="/post/add"
          element={<AddPostPage userid={userid} user={user} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  

  //   <BrowserRouter>
  // {token && <ResponsiveAppBar token={token} user={user} />}
  // <Routes>
  //  <Route path="/" element={!token?<Login />:<Navigate to={"/home"} />} />
  //  <Route
  //    path="/home"
  //    element={token?<Home users={users} user={user} userid={userid} />:<Login />}
  //  />
  //  <Route
  //    path="/post/:id"
  //    element={token?<EditPost user={user} userid={userid} />:<Login/>}
  //  />
  //  <Route
  //    path="/post/add"
  //    element={token?<AddPostPage userid={userid} user={user} />:<Login/>}
  //  />
  //  <Route path="/register" element={< Register />} />
  // </Routes>
  // </BrowserRouter> 
  );
  
}

export default App;

