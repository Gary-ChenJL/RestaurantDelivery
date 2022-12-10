const pool = require("../database");

const addRestaurant = async (req, res, next) => {
    let sql = `CALL add_restaurant(?,?,?,?)`;
    const { longname, rating, spent, location} = req.body;
    pool.query(sql, [ longname, rating, spent, location], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const addLocation = async (req, res, next) => {
    let sql = `CALL add_restaurant(?,?,?,?)`;
    const { label, x, y, space} = req.body;
    pool.query(sql, [ label, x, y, space], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const startFunding = async (req, res, next) => {
    let sql = `CALL add_restaurant(?,?)`;
    const { owner, longname} = req.body;
    pool.query(sql, [ owner, longname], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

exports.addRestaurant = addRestaurant;
exports.addLocation = addLocation;
exports.startFunding = startFunding;