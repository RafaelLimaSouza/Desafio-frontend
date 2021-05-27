import React, { useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [msg, setMsg] = useState(null);

  async function CreateUser() {
    try {
      const credentials = {
        name: name,
        userId: user,
        emailAddress: email,
      };
      await api.post("/user", credentials);
      setMsg("User created with success. Check your email!");
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    } catch (err) {
      const { data } = err.response;
      setMsg(data.msg);
    }
  }

  return (
    <div className="App">
      <div className="mainBox">
        <div className="flowBox">
          <Link to="/">
            <i className="far fa-arrow-alt-circle-left fa-2x"></i>
          </Link>
        </div>
        <p>Create the UserId. Insert name and email.</p>
        <p>We will send the password in your contact.</p>

        <br />
        <br />

        <label>UserId</label>
        <input
          type="text"
          name="login"
          onChange={(e) => setUser(e.target.value)}
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="responseMsg">{msg ? msg : ""}</p>

        <div className="secundaryBox">
          <button type="button" onClick={CreateUser}>
            Submit
          </button>
        </div>
        <div className="linkBox"></div>
      </div>
    </div>
  );
}
