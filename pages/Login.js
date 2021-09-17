import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import loginStyles from "../styles/Login.module.css";
import LoginCard from "../components/LoginCard";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [result, setResult] = useState(false);
  const getResult = (value) => setResult(value);
  useEffect(() => {
    if (result.approved) {
      router.push("Pokedex");
    }
  }, [result]);
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={loginStyles.redBackground}>
        <LoginCard validationFunction={getResult} />
      </Grid>
    </>
  );
};
export default Login;

