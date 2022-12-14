import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./refueldronePage.module.scss";

const Refueldronepage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      id : "",
      tag: "",
      morefuel:""
    }); 

    const onChangeIDHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onChangeTagHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["firstname"])
    }

    const onChangeMorefuelHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["id"])
      console.log(AddownerInfo["tag"])
      console.log(AddownerInfo["morefuel"])
      axios.post("http://localhost:5000/services/drone/refuel", {
                    
                    id: AddownerInfo["id"],
                    tag:AddownerInfo["tag"],
                    morefuel:AddownerInfo["morefuel"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.refueldronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Refuel Drone</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"id: "}
                        name="id"
                        type="text"
                        onChange={onChangeIDHandler}
                    />

                    <Entry 
                        text={"tag: "}
                        name="tag"
                        type="text"
                        onChange={onChangeTagHandler}
                    />

                    <Entry 
                        text={"More Fuel: "}
                        name="morefuel"
                        type="text"
                        onChange={onChangeMorefuelHandler}
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

export default Refueldronepage;