import React from "react";
import GitHubLogin from "react-github-login";
import { API_URL, GH_CLIENT_ID } from "./config.js";

const onSuccess = (response) => {
  const authorizeToken = response.code.toString();
  fetch(`${API_URL}/oauth/redirect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: authorizeToken }),
  })
    .then(function (response) {
      if (!response.ok) {
        alert("Login failed. Try again !!");
        throw new Error("Login failed - ", response);
      }
      return response.json();
    })
    .then((response) => {
      localStorage.setItem("token", response);
      localStorage.setItem("Authenticated", true);
      var x = document.getElementById("loginDiv");
      x.style.display = "none";
      x = document.getElementById("logoutDiv");
      x.style.display = "block";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const onFailure = (error) => {
  alert("Login failed !! Try again !!");
  console.log(error);
};
export const NavBar = () => {
  return (
    <div>
      <nav>
        <br />
        <div id="loginDiv">
          <GitHubLogin
            clientId={GH_CLIENT_ID}
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
