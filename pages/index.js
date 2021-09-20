import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import loginStyles from "../styles/Login.module.css";
import { useRouter } from 'next/router'

const home = () => {
  const router = useRouter();
  const [imgClassName, setImgClassName] = useState(loginStyles.floating);
  const [clicked, setClicked] = useState(false);
  const imageClick = () => {
    setImgClassName(loginStyles.growing);
    setTimeout(() => {
      setClicked(true)
    }, 800);
  }

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    if (clicked)
      router.push("/Login")
  }, [clicked]);

  return (
    <>
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
    </>
  );
};
export default home;