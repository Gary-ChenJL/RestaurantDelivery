import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addlocationPage.module.scss";

const Addlocationpage = (props) => {

    const [AddLocationInfo, setAddLocationInfo] = useState({
      label: "",
      x_coord: "",
      y_coord:"",
      space: ''
    }); 

    const onChangeLabelHandler = async (event) => {
      var temp = AddLocationInfo;
      temp[event.target.name] = event.target.value;
      setAddLocationInfo(temp);
      // console.log(AddLocationInfo["username"])
    }

    const onChangeXcoordHandler = async (event) => {
      var temp = AddLocationInfo;
      temp[event.target.name] = event.target.value;
      setAddLocationInfo(temp);
      // console.log(AddLocationInfo["firstname"])
    }

    const onChangeYcoordHandler = async (event) => {
      var temp = AddLocationInfo;
      temp[event.target.name] = event.target.value;
      setAddLocationInfo(temp);
      // console.log(AddLocationInfo["lastname"])
    }
    const onChangeSpaceHandler = async (event) => {
        var temp = AddLocationInfo;
        temp[event.target.name] = event.target.value;
        setAddLocationInfo(temp);
        // console.log(AddLocationInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddLocationInfo["label"])
      console.log(AddLocationInfo["x_coord"])
      console.log(AddLocationInfo["y_coord"])
      console.log(AddLocationInfo["space"])
      axios.post("http://localhost:5000/locations/add", {
                    
                    label: AddLocationInfo["label"],
                    x:AddLocationInfo["x_coord"],
                    y:AddLocationInfo["y_coord"],
                    space:AddLocationInfo["space"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addlocationPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Location</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Label: "}
                        name="label"
                        type="text"
                        onChange={onChangeLabelHandler}
                    />

                    <Entry 
                        text={"X Coordinate: "}
                        name="x_coord"
                        type="int"
                        onChange={onChangeXcoordHandler}
                    />

                    <Entry 
                        text={"Y Coordinate: "}
                        name="y_coord"
                        type="int"
                        onChange={onChangeYcoordHandler}
                    />
                    <Entry 
                        text={"Space: "}
                        name="space"
                        type="int"
                        onChange={onChangeSpaceHandler}
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

export default Addlocationpage;