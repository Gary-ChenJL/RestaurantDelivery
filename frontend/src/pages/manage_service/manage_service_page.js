import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./manageservicePage.module.scss";

const Manageservicepage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      username : "",
      id: ""
    }); 

    const onChangeUsernameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onChangeIDHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["firstname"])
    }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["username"])
      console.log(AddownerInfo["id"])
      axios.post("http://localhost:5000/services/manage", {
                    
                    username: AddownerInfo["username"],
                    id:AddownerInfo["id"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.manageservicePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Manage Service</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
                    />

                    <Entry 
                        text={"id: "}
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

export default Manageservicepage;