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

1. **/mvp/employee/worker**   POST
```json
sample input format:
{
    "username": "testusername", 
}

successful output format
{
    "success": true
}

sample frontend axios POST request:
{
axios.post("http://localhost:5000/mvp/employee/worker", {
                    username: "testusername"
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
}
```