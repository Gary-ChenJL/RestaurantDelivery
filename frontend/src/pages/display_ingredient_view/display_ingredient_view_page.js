import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./displayingredientviewPage.module.scss";

const Displayingredientviewpage = (props) => {

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
        <div className={classes.displayviewPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Display Ingredient View</h1>
                <div className={classes.entrybox}>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/ViewPage" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create} onClick={onSubmitHandler}>
                        Show
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Displayingredientviewpage;