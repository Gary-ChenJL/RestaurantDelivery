import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./removedronePage.module.scss";

const Removedronepage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      id : "",
      tag: ""
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

    function refreshPage(){ 
        window.location.reload(); 
    }

    


    const onSubmitHandler = () => {
      console.log(AddownerInfo["id"])
      console.log(AddownerInfo["tag"])
      axios.post("http://localhost:5000/services/drone/remove", {
                    
                    id: AddownerInfo["id"],
                    tag:AddownerInfo["tag"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.removedronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Remove Drone</h1>
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

export default Removedronepage;