import React from "react";
import "./App.css";
import GitHubLogin from "react-github-login";

const onSuccess = (response) => {
  const authorizeToken = response.code.toString();
  console.log("login.................", authorizeToken);
  var x = document.getElementById("loginDiv");
  x.style.display = "none";
  x = document.getElementById("logoutDiv");
  x.style.display = "block";
  fetch(`http://localhost:8000/oauth/redirect`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: authorizeToken }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("ans...", response);
      //localStorage.setItem("token", response.data.token);
      //   checkAuthentication();
      //   history.push("/");
      //   window.location.reload();
    });
};
const onFailure = (error) => {
  console.log(error);
};
export const NavBar = () => {
  return (
    <div>
      <nav>
        <br />
        <div id="loginDiv">
          <GitHubLogin
            clientId="be6a068ddd512d05a292"
            redirectUri=""
            onSuccess={onSuccess}
            onFailure={onFailure}
            id="login"
          />
        </div>
        &emsp;
        <div id="logoutDiv" style={{ display: "none" }}>
          <button id="logout" name="logout" type="submit">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};
