import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function BoxAuthenticate() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [msg, setMsg] = useState(false);
  const [size, setSize] = useState("");

  async function auth() {
    try {
      if (!user || !password) {
        throw new Error("Empty fields");
      }
      const credentials = {
        userId: user,
        password: password,
      };
      const auth = await api.post("/authenticate", credentials);
      if (auth.data.status === "provisional") {
        setIsNew(true);
      } else {
        setIsNew(false);
        back();
        setMsg("Login successfully");
      }
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        setMsg(data.msg);
      } else {
        setMsg(err.message);
      }
    }
  }

  async function authInitial() {
    try {
      if (!user || !password || !newPassword || !confirmNewPassword) {
        throw new Error("Empty fields!");
      }

      const credentials = {
        userId: user,
        passwordOld: password,
        passwordNew: newPassword,
      };

      if (newPassword !== confirmNewPassword) {
        throw new Error("Password Fields not equal");
      }
      const auth = await api.post("/authenticate/initial", credentials);

      if (auth.data.user) {
        setMsg("Password changed successfully!");
        setIsNew(false);
        setUser("");
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );

        const sizePassword = auth.data.strength;
        if (sizePassword <= 30) {
          setSize("Senha fraca");
        } else if (sizePassword > 30 && sizePassword <= 55) {
          setSize("Senha média");
        } else {
          setSize("Senha forte");
        }
      }
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        setMsg(data.msg);
      } else {
        setMsg(err.message);
      }
    }
  }

  function back() {
    setIsNew(false);
    setUser("");
    setPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setMsg("");
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  }

  function testPassword() {
    let strength = 0;
    //if (newPassword.match(/[a-z]/) && newPassword.match(/[0-9]/)) {
    if (newPassword.length <= 7) {
      strength += 10;
    } else if (newPassword.length > 7) {
      strength += 25;
    }

    if (newPassword.match(/[a-z]+/) && newPassword.match(/[0-9]+/)) {
      //Check lower case and numbers
      strength += 10;
    }

    if (
      newPassword.match(/[A-Z]+/) &&
      newPassword.match(/[a-z]+/) &&
      newPassword.match(/[0-9]+/)
    ) {
      //Check upper case, lower case and numbers
      strength += 20;
    }

    if (
      newPassword.match(/\W+/) &&
      newPassword.match(/[A-Z]+/) &&
      newPassword.match(/[a-z]+/) &&
      newPassword.match(/[0-9]+/)
    ) {
      //Check if exists metaCharacter
      strength += 30;
    }
    // }
    if (strength <= 30) {
      setSize("Senha fraca");
    } else if (strength > 30 && strength <= 55) {
      setSize("Senha média");
    } else {
      setSize("Senha forte");
    }
  }

  return (
    <div className="App">
      <div className="mainBox">
        {isNew && (
          <div className="flowBox">
            <span onClick={back}>
              <i className="far fa-arrow-alt-circle-left fa-2x"></i>
            </span>
          </div>
        )}

        <label>Login</label>
        <input
          type="text"
          name="login"
          onChange={(e) => setUser(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isNew ? (
          <>
            <div className="passwordBox">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  testPassword();
                }}
              />
            </div>
            <div className="passwordBox">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <p className="helpText">* Required alphanumeric</p>
          </>
        ) : (
          <div></div>
        )}

        <span className="responseMsg">{msg}</span>

        <span className="responseSize">{newPassword && size}</span>

        <div className="secondaryBox">
          <button onClick={!isNew ? auth : authInitial}>Login</button>
        </div>

        <div className="linkBox">
          <Link to="/createUser">Create user</Link>
          <Link to="/recovery">Forgot my password</Link>
        </div>
      </div>
    </div>
  );
}
