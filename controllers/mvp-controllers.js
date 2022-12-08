const pool = require("../database");

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


const addIngredient = async (req, res, next) => {
    let sql = `CALL add_ingredient(?,?,?)`;
    const { barcode, name, weight} = req.body;
    pool.query(sql, [barcode, name, weight], (err, result) => {
        if (err) return next(new Error("Ingredient creation error"));
        return res.status(201)
                  .json({ success: true });
    });
};

exports.addWorkerRole = addWorkerRole;
exports.addIngredient = addIngredient;