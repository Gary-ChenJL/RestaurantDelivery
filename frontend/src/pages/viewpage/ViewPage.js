import React from "react";
import { Link } from "react-router-dom";

import classes from "./ViewPage.module.scss";

const ViewPage = (props) => {
    // var identity = localStorage.getItem("identity");/
    var text = `View Page`;
  
    let html;
    let html2;

    
    html = (
      <div className={classes.buttons}>
        <button className={classes.button_click}>
          <Link
            style={{ paddingTop: 15, paddingBottom: 15 }}
            className={classes.link_click}
            to="/ViewPage/display_owner_view"
          >
            display owner view
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link 
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to="/ViewPage/display_employee_view" 
          className={classes.link_click}>
            display employee view
          </Link>
        </button>
        <button
          className={classes.button_click}
        >
          <Link
            className={classes.link_click}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            to="/ViewPage/display_pilot_view"
          >
            display pilot view
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link
            className={classes.link_click}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            to={"/ViewPage/display_location_view"}
          >
            display location view
          </Link>
        </button>
      </div>
    );
  
    html2 = (
      <div className={classes.buttons}>
        <button className={classes.button_click}>
          <Link
            className={classes.link_click}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            to={"/ViewPage/display_ingredient_view"}
          >
            display ingredient view
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link
            className={classes.link_click}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            to={"/ViewPage/display_service_view"}
          >
            display service view
          </Link>
        </button>
      </div>
    );
  
  
    return (
      <div className={classes.HomePage}>
        <div className={classes.content}>
          <h2 className={classes.title}>{text}</h2>
          {html}
          {html2}

        </div>
      </div>
    );
  };
  
  export default ViewPage;