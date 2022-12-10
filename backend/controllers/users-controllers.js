const pool = require("../database");

const addOwner = async (req, res, next) => {
    let sql = `CALL add_owner(?,?,?,?,?)`;
    const { username, first_name, last_name, address, birthdate } = req.body;
    pool.query(sql, [username, first_name, last_name, address, birthdate ], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const addEmployee = async (req, res, next) => {
    let sql = `CALL add_employee(?,?,?,?,?,?,?,?,?)`;
    const { username, first_name, last_name, address, birthdate
        , taxID, hired, employee_experience, salary} = req.body;
    pool.query(sql, [username, first_name, last_name, address, birthdate
        , taxID, hired, employee_experience, salary ], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const addWorkerRole = async (req, res, next) => {
    let sql = `CALL add_worker_role(?)`;
    const { username } = req.body;
    console.log(username);
    pool.query(sql, [username], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const hireEmployee = async (req, res, next) => {
    let sql = `CALL hire_employee(?,?)`;
    const { username, id } = req.body;
    console.log(username);
    pool.query(sql, [username, id], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const fireEmployee = async (req, res, next) => {
    let sql = `CALL fire_employee(?,?)`;
    const { username, id } = req.body;
    console.log(username);
    pool.query(sql, [username, id], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const removePilotRole = async (req, res, next) => {
    let sql = `CALL remove_pilot_role(?)`;
    const { username} = req.body;
    console.log(username);
    pool.query(sql, [username], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

exports.addWorkerRole = addWorkerRole;
exports.addOwner = addOwner;
exports.addEmployee = addEmployee;
exports.hireEmployee = hireEmployee;
exports.fireEmployee = fireEmployee;
exports.removePilotRole = removePilotRole;