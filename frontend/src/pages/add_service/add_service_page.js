import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addservicePage.module.scss";

const Addservicepage = (props) => {

    const [AddServiceInfo, setAddServiceInfo] = useState({
      id : "",
      longname: "",
      homebase:"",
      manager:''
    }); 

    const onChangeIdHandler = async (event) => {
      var temp = AddServiceInfo;
      temp[event.target.name] = event.target.value;
      setAddServiceInfo(temp);
      // console.log(AddServiceInfo["username"])
    }

    const onChangeLongnameHandler = async (event) => {
      var temp = AddServiceInfo;
      temp[event.target.name] = event.target.value;
      setAddServiceInfo(temp);
      // console.log(AddServiceInfo["firstname"])
    }

    const onChangeHomebaseHandler = async (event) => {
      var temp = AddServiceInfo;
      temp[event.target.name] = event.target.value;
      setAddServiceInfo(temp);
      // console.log(AddServiceInfo["lastname"])
    }
    const onChangeManagerHandler = async (event) => {
        var temp = AddServiceInfo;
        temp[event.target.name] = event.target.value;
        setAddServiceInfo(temp);
        // console.log(AddServiceInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddServiceInfo["id"])
      console.log(AddServiceInfo["longname"])
      console.log(AddServiceInfo["homebase"])
      console.log(AddServiceInfo["manager"])
      axios.post("http://localhost:5000/services/add", {
                    
                    id: AddServiceInfo["id"],
                    longname:AddServiceInfo["longname"],
                    homebase:AddServiceInfo["homebase"],
                    manager:AddServiceInfo["manager"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addservicePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Service</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Service ID: "}
                        name="id"
                        type="text"
                        onChange={onChangeIdHandler}
                    />

                    <Entry 
                        text={"Full Name: "}
                        name="longname"
                        type="text"
                        onChange={onChangeLongnameHandler}
                    />

                    <Entry 
                        text={"Home Base: "}
                        name="homebase"
                        type="text"
                        onChange={onChangeHomebaseHandler}
                    />

                    <Entry 
                        text={"Manager: "}
                        name="manager"
                        type="text"
                        onChange={onChangeManagerHandler}
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

export default Addservicepage;