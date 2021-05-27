import React, { useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

export default function RecoveryUser() {
  const [user, setUser] = useState("");
  const [msg, setMsg] = useState(false);

  async function sendEmail() {
    try {
      const credentials = {
        userId: user,
      };
      await api.post("/user/recovery", credentials);

      setMsg("Check your email. A new password was sent!");
      setUser("");

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

        <label>Insert your UserId</label>
        <input
          type="text"
          name="data"
          onChange={(e) => setUser(e.target.value)}
        />

        <span className="responseMsg">{msg}</span>

        <div className="secundaryBox">
          <button onClick={sendEmail}>Submmit</button>
        </div>
        <div className="linkBox"></div>
      </div>
    </div>
  );
}
