### Backend setup instructions
1. Change environment variables in **‘nodemon.json’**.
2. MySQL database clean-up and setup
```
Open MySQL workbench

Run ./SQL_database/cs4400_database_v2 schema_and_data.sql

Run ./SQL_database/cs4400_phase3_stored_procedures_team33.sql
```
3. run backend
```
cd node_backend

// Install all the dependencies
npm install

// Start the server
npm start
```
Note:

Check out these articles if you run into some bugs
https://stackoverflow.com/questions/52815608/er-not-supported-auth-mode-client-does-not-support-authentication-protocol-requ
<br />

Before running the script, add the following lines to either of the file. Change the 'root' and 'password' accordingly
```

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

```
To initialize the database，run cs4400_database_v2 schema_and_data.mysql in the workbench


<br />

### Backend API

When sending request from frontend，put data in request body

<br />

Note: when using routes from <mark>users-route.js</mark>, add <mark>/users/...</mark> to routes;\
from <mark>services-route.js</mark>, add <mark>/services/...</mark> to routes;\
from <mark>locations-route.js</mark>, add <mark>/locations/...</mark> to routes


1. **/users/employee/worker**   POST
```json
sample input format:
{
    "username": "testusername", 
}

successful output format
{
    "success": true
}
```

```js
sample frontend axios POST request:
{
axios.post("http://localhost:5000/users/employee/worker", {
                    username: "testusername"
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
}
```
2. **/users/view/pilot** GET
```json
successful output format
{
    "result": [
        {
            "username": "agarcia7",
            "licenseID": "610623",
            "experience": 38,
            "num_drones": 4,
            "num_locations": 2
        }, 
        ...
    ]
}
```

```js
sample frontend axios GET request:
{
axios.get("http://localhost:5000/users/view/pilot")
                .then((res)=> {
                    const data = res.data;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
}
```
<br />

### All Routes

1. **Procedure routes**  

    <mark>/users</mark> routes:
    ``` 
    add_worker_role: /employee/worker

    add_owner: /owners

    add_pilot: /pilot/add

    add_employee: /employee/add

    hire_employee: /employee/hire

    fire_employee: /employee/fire

    remove_pilot: /pilot/remove
    ```

    <mark>/services</mark> routes:

    ```
    add_ingredient: /ingredient/add

    add_drone: /drone/add

    add_service: /add

    manage_service: /manage

    takeover_drone: /drone/takeover

    join_swarm: /drone/joinswarm

    leave_swarm: /drone/leaveswarm

    load_drone: /drone/load

    refuel_drone: /drone/refuel

    fly_drone: /drone/fly

    purchase_ingredient: /ingredient/purchase

    remove_ingredient: /ingredient/remove

    remove_drone: /drone/remove
    ```

    <mark> /locations </mark> routes:
    ```
    add_restaurant: /restaurant/add

    add_location: /add

    start_funding: /restaurant/fund
    ```

2. **View routes**

    <mark>/users</mark> routes:
    ```
    display_owner_view: /view/owner

    display_employee_view: /view/employee

    display_pilot_view: /view/pilot
    ```

    <mark>/services</mark> routes:
    ```
    display_ingredient_view: /view/ingredient

    display_service_view: /view/service
    ```
    <mark> /locations </mark> routes:
    ```
    display_location_view: /view/location
    ```
