import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import { useHistory } from "react-router-dom";

function PostList() {
  const history = useHistory();
  const [posts, setPost] = useState([]);

  // GET LIST OF USERS //
  useEffect(() => {
    Axios()
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPost(res.data);
      });
  }, []);

  return (
    <div className="main">
      {posts ? (
        posts.map((post) => {
          return (
            <div className="row">
              <div className="column">
                <div className="content" key={post.id}>
                  <h3>{post.user_id}</h3>
                  <h3 className="card-title">Contents: {post.text}</h3>
                  {/* <p className="card-text">{user.id}</p> */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>Awesome list of Posts</h1>
      )}
    </div>
  );
}
export default PostList;
