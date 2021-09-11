import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import loginStyles from "../styles/Login.module.css";
import LoginCard from "../components/LoginCard";

const Login = () => {
  const [imgClassName, setImgClassName] = useState(loginStyles.floating);
  const [clicked, setClicked] = useState(false);
  const imageClick = () => {
    setImgClassName(loginStyles.growing);
    setTimeout(() => {
      setClicked(true)
    }, 800);
  }
  return (
    <>
      {!clicked &&
        <Grid container className={loginStyles.outerContainer}>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            item xs={12}
            className={loginStyles.blackBackground}
          >
            <img src="/assets/pokedex.png" className={imgClassName} onClick={() => imageClick()}></img>
          </Grid>
        </Grid>
      }
      {clicked &&
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={loginStyles.redBackground}>
          <LoginCard />
        </Grid>
      }
    </>
  );
};
export default Login;
