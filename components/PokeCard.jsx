import React from "react";
import styles from "../styles/Home.module.css";

const PokeCard = (props) => {
  return (
    <>
      <div className={styles.card}>
        {props.image}
        <hr />
        {props.children}
      </div>
    </>
  );
};

export default PokeCard;
