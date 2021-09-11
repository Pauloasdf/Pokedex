import React from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import loginStyles from "../styles/Login.module.css";
import PokeballGif from "../public/assets/floating-pokeball.gif";
import Image from "next/image";

const LoginCard = () => {
  console.log(process.env.REACT_APP_API_ADDRESS)
  console.log(process.env.REACT_APP_API_PORT)
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
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
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
          fullWidth
        >
          GO!
        </Button>
      </Paper>
    </Grid>
  );
};

export default LoginCard;
