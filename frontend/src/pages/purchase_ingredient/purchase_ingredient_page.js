import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./purchaseingredientPage.module.scss";

const Purchaseingredientpage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
      longname : "",
      id: "",
      tag:"",
      barcode:"",
      quantity:""
    }); 

    const onChangeLongnameHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onChangeIDHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["firstname"])
    }

    const onChangeTagHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }

    const onChangeBarcodeHandler = async (event) => {
        var temp = AddownerInfo;
        temp[event.target.name] = event.target.value;
        setAddownerInfo(temp);
        // console.log(AddownerInfo["lastname"])
      }

    const onChangeQuantityHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddownerInfo["longname"])
      console.log(AddownerInfo["id"])
      console.log(AddownerInfo["tag"])
      console.log(AddownerInfo["barcode"])
      console.log(AddownerInfo["quantity"])
      axios.post("http://localhost:5000/services/ingredient/purchase", {
                    
                    longname: AddownerInfo["longname"],
                    id:AddownerInfo["id"],
                    tag:AddownerInfo["tag"],
                    barcode:AddownerInfo["barcode"],
                    quantity:AddownerInfo["quantity"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.purchaseingredientPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Purchase Ingredient</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"longname: "}
                        name="longname"
                        type="text"
                        onChange={onChangeLongnameHandler}
                    />

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
                        text={"quantity: "}
                        name="quantity"
                        type="text"
                        onChange={onChangeQuantityHandler}
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

export default Purchaseingredientpage;