import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./adddronePage.module.scss";

const Adddronepage = (props) => {

    const [AdddroneInfo, setAdddroneInfo] = useState({
        id: '', 
        tag: '', 
        fuel: '', 
        capacity: '', 
        sales: '', 
        flown_by: ''
    }); 

    const onChangeIdHandler = async (event) => {
      var temp = AdddroneInfo;
      temp[event.target.name] = event.target.value;
      setAdddroneInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onChangeTagHandler = async (event) => {
      var temp = AdddroneInfo;
      temp[event.target.name] = event.target.value;
      setAdddroneInfo(temp);
      // console.log(AddownerInfo["firstname"])
    }
    const onChangeFuelHandler = async (event) => {
        var temp = AdddroneInfo;
        temp[event.target.name] = event.target.value;
        setAdddroneInfo(temp);
        // console.log(AddownerInfo["firstname"])
      }

    const onChangeCapacityHandler = async (event) => {
      var temp = AdddroneInfo;
      temp[event.target.name] = event.target.value;
      setAdddroneInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }

    const onChangeSalesHandler = async (event) => {
        var temp = AdddroneInfo;
        temp[event.target.name] = event.target.value;
        setAdddroneInfo(temp);
        // console.log(AddownerInfo["lastname"])
      }

      const onChangeFlownbyHandler = async (event) => {
        var temp = AdddroneInfo;
        temp[event.target.name] = event.target.value;
        setAdddroneInfo(temp);
        // console.log(AddownerInfo["lastname"])
      }


    const onSubmitHandler = () => {
      console.log(AdddroneInfo["id"])
      console.log(AdddroneInfo["tag"])
      console.log(AdddroneInfo["fuel"])
      console.log(AdddroneInfo["capacity"])
      console.log(AdddroneInfo["sales"])
      console.log(AdddroneInfo["flown_by"])
      axios.post("http://localhost:5000/services/drone/add", {
                    
                    id: AdddroneInfo["id"],
                    tag:AdddroneInfo["tag"],
                    fuel:AdddroneInfo["fuel"],
                    capacity:AdddroneInfo["capacity"],
                    sales:AdddroneInfo["sales"],
                    flown_by:AdddroneInfo["flown_by"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.adddronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Drone</h1>
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
                        type="int"
                        onChange={onChangeTagHandler}
                    />

                    <Entry 
                        text={"Fuel: "}
                        name="fuel"
                        type="int"
                        onChange={onChangeFuelHandler}
                    />
                    <Entry 
                        text={"Capacity: "}
                        name="capacity"
                        type="int"
                        onChange={onChangeCapacityHandler}
                    />
                    <Entry 
                        text={"Sales: "}
                        name="sales"
                        type="int"
                        onChange={onChangeSalesHandler}
                    />
                    <Entry 
                        text={"Flown by: "}
                        name="flown_by"
                        type="text"
                        onChange={onChangeFlownbyHandler}
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

export default Adddronepage;