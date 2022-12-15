import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./removepilotrolePage.module.scss";

const Removepilotrolepage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      username : ""
    }); 

    const onChangeUsernameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    function refreshPage(){ 
        window.location.reload(); 
    }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["username"])
      axios.post("http://localhost:5000/users/pilot/remove", {
                    
                    username: AddownerInfo["username"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.removepilotrolePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Remove Pilot Role</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
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

                    <button className={classes.create} onClick={refreshPage}>
                        refresh
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Removepilotrolepage;