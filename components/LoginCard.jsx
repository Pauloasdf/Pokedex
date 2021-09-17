import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import loginStyles from "../styles/Login.module.css";
import PokeballGif from "../public/assets/floating-pokeball.gif";
import Image from "next/image";
import DoRequest from "../services/reqService";

const LoginCard = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    async function loginRequest() {
      let result = await DoRequest(
        "login",
        { username, password },
        "POST",
        false
      );
      result = await result.json();
      if (result && result.approved) {
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("username", username);
      }
      props.validationFunction(result);
    }
    loginRequest();
  };

  return (
    <Grid className={loginStyles.loginComponent}>
      <Paper elevation={10} className={loginStyles.paperStyle}>
        <Grid align="center">
          <Image src={PokeballGif} height={150} width={150} />
          <h2>Unlock Pokedex</h2>
        </Grid>
        <TextField
          label="Trainer name"
          placeholder="Enter Trainer name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          required
        />
        <br />
        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={loginStyles.singInButton}
          onClick={() => handleSubmit()}
          fullWidth
        >
          GO!
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginCard;
