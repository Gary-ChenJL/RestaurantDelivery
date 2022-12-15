import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addpilotrolePage.module.scss";

const Addpilotrolepage = (props) => {

    const [AddPilotroleInfo, setAddPilotroleInfo] = useState({
      username : "",
      licenseID: "",
      pilot_experience:""
    }); 

    const onChangeUsernameHandler = async (event) => {
      var temp = AddPilotroleInfo;
      temp[event.target.name] = event.target.value;
      setAddPilotroleInfo(temp);
      // console.log(AddPilotroleInfo["username"])
    }

    const onChangeLicenseIDHandler = async (event) => {
      var temp = AddPilotroleInfo;
      temp[event.target.name] = event.target.value;
      setAddPilotroleInfo(temp);
      // console.log(AddPilotroleInfo["firstname"])
    }

    const onChangePilotexperienceHandler = async (event) => {
      var temp = AddPilotroleInfo;
      temp[event.target.name] = event.target.value;
      setAddPilotroleInfo(temp);
      // console.log(AddPilotroleInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddPilotroleInfo["username"])
      console.log(AddPilotroleInfo["licenseID"])
      console.log(AddPilotroleInfo["pilot_experience"])
      axios.post("http://localhost:5000/users/pilot/add", {
                    
                    username: AddPilotroleInfo["username"],
                    licenseID:AddPilotroleInfo["licenseID"],
                    pilot_experience:AddPilotroleInfo["pilot_experience"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addpilotrolePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Pilot Role</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
                    />

                    <Entry 
                        text={"License ID: "}
                        name="licenseID"
                        type="text"
                        onChange={onChangeLicenseIDHandler}
                    />

                    <Entry 
                        text={"Pilot Experience: "}
                        name="pilot_experience"
                        type="int"
                        onChange={onChangePilotexperienceHandler}
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

export default Addpilotrolepage;