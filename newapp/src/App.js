import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import { Axios } from "./utils/Axios";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import AddUser from "./components/AddUser";
import "./App.css";

function App() {
  const [usersList, setUsersList] = useState([]);
  const [postList, setPostList] = useState([]);

  //Get Users
  useEffect(() => {
    Axios()
      .get("/users")
      .then((res) => setUsersList(res.data))
      .catch((err) => console.log(err));
  }, []);

  //Get Posts
  useEffect(() => {
    Axios()
      .get("/posts")
      .then((res) => setPostList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <nav>
        <h1 className="app-header"> List of Users and Posts </h1>
        <div className="nav-link">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/user-list">User List</NavLink>
          <NavLink to="/post-list">Post List</NavLink>
          <NavLink to="/user-form">Add User</NavLink>
     
        </div>
      </nav>

      <Route exact path="/" />

      <Route
        exact
        path="/user-list"
        render={(props) => <UserList {...props} usersList={usersList} />}
      />

      <Route
        exact
        path="/post-list"
        render={(props) => <PostList {...props} postList={postList} />}
      />

      <Route
        exact
        path="/user-form"
        render={(props) => <AddUser />}
      />


    </div>
  );
}

export default App;
