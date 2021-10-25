import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
const Login = () => {
  const {state, dispatch} = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const Logindata = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darker-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "login successfull",
            classes: "#43a047 green darker-1",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>instagram</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => Logindata()}
        >
          login
        </button>
        <h5>
          <Link to="/signin">Don't have an account </Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
