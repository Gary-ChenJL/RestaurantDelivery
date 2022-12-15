import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry";
import axios from "axios";

import classes from "./addemployeePage.module.scss";

const Addemployeepage = (props) => {

    const [AddEmployeeInfo, setAddEmployeeInfo] = useState({
      username : "",
      firstname: "",
      lastname:"",
      address:'',
      birthdate:'',
      taxID:'',
      hired:'',
      emloyee_experience:'',
      salary:''
    }); 

    const onChangeUsernameHandler = async (event) => {
      var temp = AddEmployeeInfo;
      temp[event.target.name] = event.target.value;
      setAddEmployeeInfo(temp);
      // console.log(AddEmployeeInfo["username"])
    }

    const onChangeFirstnameHandler = async (event) => {
      var temp = AddEmployeeInfo;
      temp[event.target.name] = event.target.value;
      setAddEmployeeInfo(temp);
      // console.log(AddEmployeeInfo["firstname"])
    }

    const onChangeLastnameHandler = async (event) => {
      var temp = AddEmployeeInfo;
      temp[event.target.name] = event.target.value;
      setAddEmployeeInfo(temp);
      // console.log(AddEmployeeInfo["lastname"])
    }
    const onChangeAddressHandler = async (event) => {
        var temp = AddEmployeeInfo;
        temp[event.target.name] = event.target.value;
        setAddEmployeeInfo(temp);
        // console.log(AddEmployeeInfo["lastname"])
    }
    const onChangeBirthdateHandler = async (event) => {
        var temp = AddEmployeeInfo;
        temp[event.target.name] = event.target.value;
        setAddEmployeeInfo(temp);
        // console.log(AddEmployeeInfo["lastname"])
    }
    const onChangeTaxidHandler = async (event) => {
        var temp = AddEmployeeInfo;
        temp[event.target.name] = event.target.value;
        setAddEmployeeInfo(temp);
        // console.log(AddEmployeeInfo["lastname"])
    }
    const onChangeHiredHandler = async (event) => {
        var temp = AddEmployeeInfo;
        temp[event.target.name] = event.target.value;
        setAddEmployeeInfo(temp);
        // console.log(AddEmployeeInfo["lastname"])
    }
    const onChangeEmployeeExperienceHandler = async (event) => {
        var temp = AddEmployeeInfo;
        temp[event.target.name] = event.target.value;
        setAddEmployeeInfo(temp);
        // console.log(AddEmployeeInfo["lastname"])
    }
    const onChangeSalaryHandler = async (event) => {
        var temp = AddEmployeeInfo;
        temp[event.target.name] = event.target.value;
        setAddEmployeeInfo(temp);
        // console.log(AddEmployeeInfo["lastname"])
    }


    const onSubmitHandler = () => {
      console.log(AddEmployeeInfo["username"])
      console.log(AddEmployeeInfo["firstname"])
      console.log(AddEmployeeInfo["lastname"])
      console.log(AddEmployeeInfo["address"])
      console.log(AddEmployeeInfo["birthdate"])
      console.log(AddEmployeeInfo["taxID"])
      console.log(AddEmployeeInfo["hired"])
      console.log(AddEmployeeInfo["employee_experience"])
      console.log(AddEmployeeInfo["salary"])

      axios.post("http://localhost:5000/users/employee/add", {
                    
                    username: AddEmployeeInfo["username"],
                    first_name:AddEmployeeInfo["firstname"],
                    last_name:AddEmployeeInfo["lastname"],
                    address: AddEmployeeInfo["address"],
                    birthdate:AddEmployeeInfo["birthdate"],
                    taxID:AddEmployeeInfo["taxID"],
                    hired: AddEmployeeInfo["hired"],
                    employee_experience:AddEmployeeInfo["employee_experience"],
                    salary:AddEmployeeInfo["salary"]
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    };
    
    return (
        <div className={classes.addemployeePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Add Employee</h1>
                <div className={classes.entrybox}>
                    
                    <Entry 
                        text={"username: "}
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
                        name="adaress"
                        type="text"
                        onChange={onChangeAddressHandler}
                    />
                    <Entry 
                        text={"Birth Date: "}
                        name="birthdate"
                        type="date"
                        onChange={onChangeBirthdateHandler}
                    />
                    <Entry 
                        text={"Tax ID: "}
                        name="taxID"
                        type="text"
                        onChange={onChangeTaxidHandler}
                    />
                    <Entry 
                        text={"Hired: "}
                        name="hired"
                        type="date"
                        onChange={onChangeHiredHandler}
                    />
                    <Entry 
                        text={"Experience: "}
                        name="employee_experience"
                        type="int"
                        onChange={onChangeEmployeeExperienceHandler}
                    />
                    <Entry 
                        text={"Salary: "}
                        name="salary"
                        type="int"
                        onChange={onChangeSalaryHandler}
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

export default Addemployeepage;