import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./displayownerviewPage.module.scss";

const Displayownerviewpage = (props) => {

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

        MSGINFO.msg = data.map(({ username, first_name, last_name, address, num_restaurants, num_places, highs, lows, debt  }) => 
        `Username: ${username}, Firstname:${first_name}, Lastname:${last_name}, address:${address}, num_restaurants:${num_restaurants}, num_places:${num_places}, highs:${highs}, lows:${lows}, debt:${debt} `);

    }

    const onSubmitHandler = () => {
      axios.get("http://localhost:5000/users/view/owner")
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
                <h1 className={classes.title}>Display Owner View</h1>
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

export default Displayownerviewpage;