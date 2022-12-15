import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./takeoverdronePage.module.scss";

const Takeoverdronepage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      username : "",
      id: "",
      tag:""
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

    const onChangeTagHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["username"])
      console.log(AddownerInfo["id"])
      console.log(AddownerInfo["tag"])
      axios.post("http://localhost:5000/services/drone/takeover", {
                    
                    username: AddownerInfo["username"],
                    id:AddownerInfo["id"],
                    tag:AddownerInfo["tag"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.takeoverdronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Takeover Drone</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
                    />

                    <Entry 
                        text={"ID: "}
                        name="id"
                        type="text"
                        onChange={onChangeIDHandler}
                    />

                    <Entry 
                        text={"Tag: "}
                        name="tag"
                        type="text"
                        onChange={onChangeTagHandler}
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

export default Takeoverdronepage;