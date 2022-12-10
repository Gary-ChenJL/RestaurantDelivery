import React from "react";
import classes from "./Entry.module.scss";

const Entry = (props) => {
  return (
    <div className={classes.entry}>
      <h2 className={classes.label}>{props.text}</h2>
      <input
        className={classes.input}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Entry;