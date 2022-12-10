import React from "react";
import { Link } from "react-router-dom";

import classes from "./ProcedurePage.module.scss";

const ProcedurePage = (props) => {
  // var identity = localStorage.getItem("identity");/
  var text = `Procedure Page`;

  let html;
  let html2;
  let html3;
  let html4;
  let html5;
  let html6;
  
  html = (
    <div className={classes.buttons}>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}

          to="/add_owner"
          style={{ paddingTop: 20, paddingBottom: 20 }}
        >
          add_owner
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link 
        style={{ paddingTop: 15, paddingBottom: 15 }}
        to="/add_employee" 
        className={classes.link_click}>
          add_employee
        </Link>
      </button>
      <button
        className={classes.button_click}
      >
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to="/add_pilot_role"
        >
          add_pilot_role
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/add_worker_role"}
        >
          add_worker_role
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
          to={"/add_ingredient"}
        >
          add_ingredient
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/add_drone"}
        >
          add_drone
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to="/add_restaurant"
        >
          add_restaurant
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link 
        to="/add_service" 
        style={{ paddingTop: 15, paddingBottom: 15 }}
        className={classes.link_click}>
          add_service
        </Link>
      </button>
    </div>
  );

  html3 = (
    <div className={classes.buttons}>
      <button
        className={classes.button_click}
      >
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to="/add_location"
        >
          add_location
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/start_funding"}
        >
          start_funding
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/hire_employee"}
        >
          hire_employee
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/fire_employee"}
        >
          fire_employee
        </Link>
      </button>
    </div>
  )

  html4 = (
    <div className={classes.buttons}>
      <button
        className={classes.button_click}
      >
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to="/manage_service"
        >
          manage_service
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/takeover_drone"}
        >
          takeover_drone
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/join_swarm"}
        >
          
          join_swarm
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/leave_swarm"}
        >
          leave_swarm
        </Link>
      </button>
    </div>
  )

  html5 = (
    <div className={classes.buttons}>
      <button
        className={classes.button_click}
      >
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to="/load_drone"
        >
          load_drone
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/refuel_drone"}
        >
          refuel_drone
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/fly_drone"}
        >
          fly_drone
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/purchase_ingredient"}
        >
          purchase_ingredient
        </Link>
      </button>
    </div>
  )

  html6 = (
    <div className={classes.buttons}>
      <button
        className={classes.button_click}
      >
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to="/remove_ingredient"
        >
          remove_ingredient
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/remove_drone"}
        >
          remove_drone
        </Link>
      </button>
      <button className={classes.button_click}>
        <Link
          className={classes.link_click}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          to={"/remove_pilot_view"}
        >
          remove_pilot_view
        </Link>
      </button>
    </div>
  )

  return (
    <div className={classes.HomePage}>
      <div className={classes.content}>
        <h2 className={classes.title}>{text}</h2>
        {html}
        {html2}
        {html3}
        {html4}
        {html5}
        {html6}
      </div>
    </div>
  );
};

export default ProcedurePage;