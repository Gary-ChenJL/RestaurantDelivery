import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./fireemployeePage.module.scss";

const Fireemployeepage = (props) => {

    const [AddFireInfo, setAddFireInfo] = useState({
      username : "",
      id: ""
    }); 

    const onChangeUsernameHandler = async (event) => {
      var temp = AddFireInfo;
      temp[event.target.name] = event.target.value;
      setAddFireInfo(temp);
      // console.log(AddFireInfo["username"])
    }

    const onChangeIDHandler = async (event) => {
      var temp = AddFireInfo;
      temp[event.target.name] = event.target.value;
      setAddFireInfo(temp);
      // console.log(AddFireInfo["firstname"])
    }



    const onSubmitHandler = () => {
      console.log(AddFireInfo["username"])
      console.log(AddFireInfo["id"])
      axios.post("http://localhost:5000/users/employee/fire", {
                    
                    username: AddFireInfo["username"],
                    id:AddFireInfo["id"],
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.fireemployeePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Fire Employee</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
                    />

                    <Entry 
                        text={"Service ID: "}
                        name="id"
                        type="text"
                        onChange={onChangeIDHandler}
                    />
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create} onClick={onSubmitHandler}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Fireemployeepage;