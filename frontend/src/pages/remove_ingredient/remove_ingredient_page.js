import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./removeingredientPage.module.scss";

const Removeingredientpage = (props) => {

    const [AddownerInfo, setAddownerInfo] = useState({
        barcode : ""
    }); 

    const onChangeBarcodeHandler = async (event) => {
      var temp = AddownerInfo;
      temp[event.target.name] = event.target.value;
      setAddownerInfo(temp);
      // console.log(AddownerInfo["username"])
    }

    const onSubmitHandler = () => {
      console.log(AddownerInfo["barcode"])
      axios.post("http://localhost:5000/services/ingredient/remove", {
                    
                    barcode: AddownerInfo["barcode"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.removeingredientPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Remove Ingredient</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"barcode: "}
                        name="barcode"
                        type="text"
                        onChange={onChangeBarcodeHandler}
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

export default Removeingredientpage;