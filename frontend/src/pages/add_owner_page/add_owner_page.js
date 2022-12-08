import React from "react";
import { Link } from "react-router-dom";

import classes from "./DetailPage.module.scss";


const add_owner_page = (props) => {

    var text = `Procedure Page`;
    
    return (
        <div className={classes.HomePage}>
          <div className={classes.content}>
            <h2 className={classes.title}>{text}</h2>
          </div>
        </div>
      );
};

export default add_owner_page;