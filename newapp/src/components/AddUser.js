import React from "react";
import { Axios } from "../utils/Axios";



class AddUser extends React.Component {
  state = {
    post: {
      id: "",
      name: "",
    },
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    Axios()
      .post("/users/", this.state)
      .then((res) => {
        console.log(res);
        this.props.history.push("/user-list");
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <h1> Add New User</h1>
        <form action="/user-list" onSubmit={this.handleSubmit}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            autoComplete="off"
          />



          <button type="submit">Add User</button>
        </form>
      </div>
    );
  }
}

export default AddUser;
