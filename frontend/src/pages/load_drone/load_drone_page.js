import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./loaddronePage.module.scss";

const Loaddronepage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      id : "",
      tag: "",
      barcode:"",
      morepackage:"",
      price:""
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

    const onChangeBarcodeHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }

    const onChangeMorePackageHandler = async (event) => {
        var temp = AddownerInfo;
        temp[event.target.name] = event.target.value;
        setAddownerInfo(temp);
        // console.log(AddownerInfo["lastname"])
      }

    const onChangePriceHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["id"])
      console.log(AddownerInfo["tag"])
      console.log(AddownerInfo["barcode"])
      console.log(AddownerInfo["morepackage"])
      console.log(AddownerInfo["price"])
      axios.post("http://localhost:5000/services/drone/load", {
                    
                    id: AddownerInfo["id"],
                    tag:AddownerInfo["tag"],
                    barcode:AddownerInfo["barcode"],
                    morepackage:AddownerInfo["morepackage"],
                    price:AddownerInfo["price"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.loaddronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Load Drone</h1>
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
                        text={"barcode: "}
                        name="barcode"
                        type="text"
                        onChange={onChangeBarcodeHandler}
                    />

                    <Entry 
                        text={"More Package: "}
                        name="morepackage"
                        type="text"
                        onChange={onChangeMorePackageHandler}
                    />

                    <Entry 
                        text={"price: "}
                        name="price"
                        type="text"
                        onChange={onChangePriceHandler}
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

export default Loaddronepage;