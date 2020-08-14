import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import { useHistory } from "react-router-dom";

function UserList() {
  const history = useHistory();
  const [users, setUser] = useState([]);

  // GET LIST OF USERS //
  useEffect(() => {
    Axios()
      .get("/users")
      .then((res) => {
        console.log(res);
        setUser(res.data);
      });
  }, []);

  return (
    <div className="main">
      {users ? (
        users.map((user) => {
          return (
            <div className="row">
              <div className="column">
                <div className="content" key={user.id}>
                  <h3 className="card-title">Name: {user.name}</h3>
                  <p className="card-text">{user.id}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>HELLO USERS</h1>
      )}
    </div>
  );
}
export default UserList;
