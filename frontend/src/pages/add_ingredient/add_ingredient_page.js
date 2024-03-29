import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addingredientPage.module.scss";

const Addingredientpage = (props) => {

    const [AddIngredientInfo, setAddIngredientInfo] = useState({
      barcode : "",
      iname: "",
      weight:""
    }); 

    const onChangeBarcodeHandler = async (event) => {
      var temp = AddIngredientInfo;
      temp[event.target.name] = event.target.value;
      setAddIngredientInfo(temp);
      // console.log(AddIngredientInfo["username"])
    }

    const onChangeInameHandler = async (event) => {
      var temp = AddIngredientInfo;
      temp[event.target.name] = event.target.value;
      setAddIngredientInfo(temp);
      // console.log(AddIngredientInfo["firstname"])
    }

    const onChangeWeightHandler = async (event) => {
      var temp = AddIngredientInfo;
      temp[event.target.name] = event.target.value;
      setAddIngredientInfo(temp);
      // console.log(AddIngredientInfo["lastname"])
    }

    function refreshPage(){ 
        window.location.reload(); 
    }


    const onSubmitHandler = () => {
      console.log(AddIngredientInfo["barcode"])
      console.log(AddIngredientInfo["iname"])
      console.log(AddIngredientInfo["weight"])
      axios.post("http://localhost:5000/services/ingredient/add", {
                    
                    barcode: AddIngredientInfo["barcode"],
                    name:AddIngredientInfo["iname"],
                    weight:AddIngredientInfo["weight"]
                }).then(() => {
                    alert("Success")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addingredientPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Ingredient</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"Barcode: "}
                        name="barcode"
                        type="text"
                        onChange={onChangeBarcodeHandler}
                    />

                    <Entry 
                        text={"Name: "}
                        name="iname"
                        type="text"
                        onChange={onChangeInameHandler}
                    />

                    <Entry 
                        text={"Weight: "}
                        name="weight"
                        type="int"
                        onChange={onChangeWeightHandler}
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

export default Addingredientpage;