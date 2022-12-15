import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./displaypilotviewPage.module.scss";

const Displaypilotviewpage = (props) => {

    const [MSGINFO, SetMSGINFO] = useState({
        msg:[]
      }); 


    const [AddownerInfo, setAddownerInfo] = useState({
      username : "",
      firstname: "",
      lastname:""
    }); 

    function SaveMSG(obj){
        const data = obj.result;

        MSGINFO.msg = data.map(({ username, licenseID, experience, num_drones, num_locations}) => 
        `username:${username}, licenseID:${licenseID}, experience:${experience}, num_drones:${num_drones}, num_locations:${num_locations}                  `);

        
    }

    const onSubmitHandler = () => {
      axios.get("http://localhost:5000/users/view/pilot")
                .then(data => SaveMSG(data.data))
                .catch((error) => {
                    alert(error.response.data.message);
                });

    };

    const onShow = () => {
        // msg = MSGINFO.msg;
        const msg1 = MSGINFO.msg
        SetMSGINFO({
            msg: msg1
        })
        console.log(MSGINFO.msg)
      };
    
    return (
        <div className={classes.displayviewPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Display Pilot View</h1>
                <button className={classes.back}>
                        <Link to="/ViewPage" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create} onClick={onSubmitHandler}>
                        Fetch
                    </button>
                    <button className={classes.create} onClick={onShow}>
                        Show
                    </button>
                <div className={classes.entrybox}>
                <p>{MSGINFO.msg}</p>
                </div>
                <div className={classes.buttons}>
                    
                </div>
            </div>
        </div>
    );
};

export default Displaypilotviewpage;