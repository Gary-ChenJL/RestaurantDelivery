import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addownerPage.module.scss";

const Addownerpage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      username : "",
      firstname: "",
      lastname:"",
      address:'',
      birthdate:''
    }); 

    function refreshPage(){ 
        window.location.reload(); 
    }

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
    const onChangeAddressHandler = async (event) => {
        var temp = AddownerInfo;
        temp[event.target.name] = event.target.value;
        setAddownerInfo(temp);
        // console.log(AddownerInfo["lastname"])
      }

    const onChangeBirthdateHandler = async (event) => {
        var temp = AddownerInfo;
        temp[event.target.name] = event.target.value;
        setAddownerInfo(temp);
        // console.log(AddownerInfo["lastname"])
      }
  


    const onSubmitHandler = () => {
      console.log(AddownerInfo["username"])
      console.log(AddownerInfo["firstname"])
      console.log(AddownerInfo["lastname"])
      console.log(AddownerInfo["address"])
      console.log(AddownerInfo["birthdate"])

      axios.post("http://localhost:5000/users/owners", {
                    
                    username: AddownerInfo["username"],
                    first_name:AddownerInfo["firstname"],
                    last_name:AddownerInfo["lastname"],
                    address:AddownerInfo["address"],
                    birthdate:AddownerInfo["birthdate"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addownerPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Owner</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
                    />

                    <Entry 
                        text={"First Name: "}
                        name="firstname"
                        type="text"
                        onChange={onChangeFirstnameHandler}
                    />

                    <Entry 
                        text={"Last Name: "}
                        name="lastname"
                        type="text"
                        onChange={onChangeLastnameHandler}
                    />
                    <Entry 
                        text={"Address: "}
                        name="address"
                        type="text"
                        onChange={onChangeAddressHandler}
                    />
                    <Entry 
                        text={"Birth Date: "}
                        name="birthdate"
                        type="date"
                        onChange={onChangeBirthdateHandler}
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

export default Addownerpage;