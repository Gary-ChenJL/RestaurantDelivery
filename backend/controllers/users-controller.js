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

const addPilotRole = async (req, res, next) => {
    let sql = `CALL add_pilot_role(?,?,?)`;
    const { username, licenseID, experience} = req.body;
    console.log(username);
    pool.query(sql, [username, licenseID, experience], (err, result) => {
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

const displayOwnerView = async (req, res, next) => {
    let sql = `select * FROM restaurant_supply_express.display_owner_view`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({result});
        console.log(result.length);
    })
};

const displayEmployeeView = async (req, res, next) => {
    let sql = `select * FROM restaurant_supply_express.display_employee_view`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({result});
        console.log(result.length);
    })
};


const displayPilotView = async (req, res, next) => {
    let sql = `select * FROM restaurant_supply_express.display_pilot_view`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({result});
        console.log(result.length);
    })
};

exports.addWorkerRole = addWorkerRole;
exports.addOwner = addOwner;
exports.addPilotRole = addPilotRole;
exports.addEmployee = addEmployee;
exports.hireEmployee = hireEmployee;
exports.fireEmployee = fireEmployee;
exports.removePilotRole = removePilotRole; 
exports.displayOwnerView = displayOwnerView;
exports.displayEmployeeView = displayEmployeeView;
exports.displayPilotView = displayPilotView;