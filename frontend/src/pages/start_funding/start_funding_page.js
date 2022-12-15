import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./startfundingPage.module.scss";

const Startfundingpage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      owner : "",
      longname: ""
    }); 

    const onChangeOwnerHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onChangeLongnameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["firstname"])
    }

    const onSubmitHandler = () => {
      console.log(AddownerInfo["owner"])
      console.log(AddownerInfo["longname"])
      axios.post("http://localhost:5000/locations/restaurant/fund", {
                    
                    owner: AddownerInfo["owner"],
                    longname:AddownerInfo["longname"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.startfundingPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Start Funding</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Owner: "}
                        name="owner"
                        type="text"
                        onChange={onChangeOwnerHandler}
                    />

                    <Entry 
                        text={"Long Name: "}
                        name="longname"
                        type="text"
                        onChange={onChangeLongnameHandler}
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

export default Startfundingpage;