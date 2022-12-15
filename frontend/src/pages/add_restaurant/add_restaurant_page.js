import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addrestaurantPage.module.scss";

const Addrestaurantpage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      longname : "",
      rating: "",
      spent:"",
      location:""
    }); 

    const onChangeLongnameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onChangeRatingHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["firstname"])
    }

    const onChangeSpentHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }

    const onChangeLocationHandler = async (event) => {
        var temp = AddownerInfo;
        temp[event.target.name] = event.target.value;
        setAddownerInfo(temp);
        // console.log(AddownerInfo["lastname"])
      }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["longname"])
      console.log(AddownerInfo["rating"])
      console.log(AddownerInfo["spent"])
      console.log(AddownerInfo["location"])
      axios.post("http://localhost:5000/locations/restaurant/add", {
                    
                    longname: AddownerInfo["longname"],
                    rating:AddownerInfo["rating"],
                    spent:AddownerInfo["spent"],
                    location:AddownerInfo["location"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addrestaurantPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Restaurant</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Longname: "}
                        name="longname"
                        type="text"
                        onChange={onChangeLongnameHandler}
                    />

                    <Entry 
                        text={"Rating: "}
                        name="rating"
                        type="text"
                        onChange={onChangeRatingHandler}
                    />

                    <Entry 
                        text={"Spent: "}
                        name="spent"
                        type="text"
                        onChange={onChangeSpentHandler}
                    />

                    <Entry 
                        text={"Location: "}
                        name="location"
                        type="text"
                        onChange={onChangeLocationHandler}
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

export default Addrestaurantpage;