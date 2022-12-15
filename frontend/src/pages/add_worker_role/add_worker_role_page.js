import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addworkerrolePage.module.scss";

const Addworkerrolepage = (props) => {

    const [AddWorkerInfo, setAddWorkerInfo] = useState({
      username : "",
      firstname: "",
      lastname:""
    }); 

    const onChangeUsernameHandler = async (event) => {
      var temp = AddWorkerInfo;
      temp[event.target.name] = event.target.value;
      setAddWorkerInfo(temp);
      // console.log(AddWorkerInfo["username"])
    }

    function refreshPage(){ 
        window.location.reload(); 
    }


    const onSubmitHandler = () => {
      console.log(AddWorkerInfo["username"])
      axios.post("http://localhost:5000/users/employee/worker", {
                    
                    username: AddWorkerInfo["username"],

                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addworkerrolePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Worker Role</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Username: "}
                        name="username"
                        type="text"
                        onChange={onChangeUsernameHandler}
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

export default Addworkerrolepage;