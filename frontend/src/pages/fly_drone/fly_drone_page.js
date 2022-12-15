import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./flydronePage.module.scss";

const Flydronepage = (props) => {

    const [AddFlydroneInfo, setAddFlydroneInfo] = useState({
      id : "",
      tag : "",
      destination: ''
    }); 

    const onChangeIdHandler = async (event) => {
      var temp = AddFlydroneInfo;
      temp[event.target.name] = event.target.value;
      setAddFlydroneInfo(temp);
      // console.log(AddFlydroneInfo["username"])
    }

    const onChangeTagHandler = async (event) => {
      var temp = AddFlydroneInfo;
      temp[event.target.name] = event.target.value;
      setAddFlydroneInfo(temp);
      // console.log(AddFlydroneInfo["firstname"])
    }
    const onChangeDestinationHandler = async (event) => {
        var temp = AddFlydroneInfo;
        temp[event.target.name] = event.target.value;
        setAddFlydroneInfo(temp);
        // console.log(AddFlydroneInfo["firstname"])
      }

    function refreshPage(){ 
        window.location.reload(); 
    }



    const onSubmitHandler = () => {
      console.log(AddFlydroneInfo["id"])
      console.log(AddFlydroneInfo["tag"])
      console.log(AddFlydroneInfo["destination"])
      axios.post("http://localhost:5000/services/drone/fly", {
                    
                    id: AddFlydroneInfo["id"],
                    tag:AddFlydroneInfo["tag"],
                    destination:AddFlydroneInfo["destination"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.flydronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Fly Drone</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Service ID: "}
                        name="id"
                        type="text"
                        onChange={onChangeIdHandler}
                    />

                    <Entry 
                        text={"Drone Tag: "}
                        name="tag"
                        type="text"
                        onChange={onChangeTagHandler}
                    />

                    <Entry 
                        text={"Destination: "}
                        name="destination"
                        type="text"
                        onChange={onChangeDestinationHandler}
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

export default Flydronepage;