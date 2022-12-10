import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./removepilotviewPage.module.scss";

const Removepilotviewpage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      username : "",
      firstname: "",
      lastname:""
    }); 

    const onChangeUsernameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onChangeFirstnameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["firstname"])
    }

    const onChangeLastnameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["username"])
      console.log(AddownerInfo["firstname"])
      console.log(AddownerInfo["lastname"])
      axios.post("http://localhost:5000/mvp/employee/worker", {
                    
                    username: AddownerInfo["username"],
                    firstname:AddownerInfo["firstname"],
                    lastname:AddownerInfo["lastname"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.removepilotviewPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Remove Pilot View</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
                    />

                    <Entry 
                        text={"First Name: "}
                        name="firstname"
                        type="text"
                        onChange={onChangeFirstnameHandler}
                    />

                    <Entry 
                        text={"Last Name: "}
                        name="lastname"
                        type="text"
                        onChange={onChangeLastnameHandler}
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

export default Removepilotviewpage;