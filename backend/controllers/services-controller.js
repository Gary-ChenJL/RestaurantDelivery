const pool = require("../database");

const addIngredient = async (req, res, next) => { 
    let sql = `CALL add_ingredient(?,?,?)`;
    const { barcode, name, weight} = req.body;
    pool.query(sql, [barcode, name, weight], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const addDrone = async (req, res, next) => {
    let sql = `CALL add_drone(?,?,?,?,?,?)`;
    const { id, tag, fuel, capacity, sales, flown_by} = req.body;
    pool.query(sql, [ id, tag, fuel, capacity, sales, flown_by], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const addService = async (req, res, next) => {
    let sql = `CALL add_service(?,?,?,?)`;
    const { id, longname, homebase, manager} = req.body;
    pool.query(sql, [ id, longname, homebase, manager], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const manageService = async (req, res, next) => {
    let sql = `CALL manage_service(?,?)`;
    const { username, id} = req.body;
    pool.query(sql, [ username, id], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const takeoverDrone = async (req, res, next) => {
    let sql = `CALL takeover_drone(?,?,?)`;
    const { username, id, tag} = req.body;
    pool.query(sql, [ username, id, tag], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};


const joinSwarm = async (req, res, next) => {
    let sql = `CALL join_swarm(?,?,?)`;
    const { id, tag, leaderTag} = req.body;
    pool.query(sql, [ id, tag, leaderTag], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const leaveSwarm = async (req, res, next) => {
    let sql = `CALL leave_swarm(?,?)`;
    const { id, tag} = req.body;
    pool.query(sql, [ id, tag], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const loadDrone = async (req, res, next) => {
    let sql = `CALL load_drone(?,?,?,?,?)`;
    const { id, tag, barcode, morepackage, price} = req.body;
    pool.query(sql, [ id, tag, barcode, morepackage, price], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const refuelDrone = async (req, res, next) => {
    let sql = `CALL refuel_drone(?,?,?)`;
    const { id, tag, morefuel} = req.body;
    pool.query(sql, [ id, tag, morefuel], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const flyDrone = async (req, res, next) => {
    let sql = `CALL fly_drone(?,?,?)`;
    const { id, tag, destination} = req.body;
    pool.query(sql, [ id, tag, destination], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const purchaseIngredient = async (req, res, next) => {
    let sql = `CALL purchase_ingredient(?,?,?,?,?)`;
    const { longname, id, tag, barcode, quantity} = req.body;
    pool.query(sql, [longname, id, tag,barcode, quantity], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const removeIngredient = async (req, res, next) => {
    let sql = `CALL remove_ingredient(?)`;
    const { barcode} = req.body;
    pool.query(sql, [barcode], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const removeDrone = async (req, res, next) => {
    let sql = `CALL remove_drone(?,?)`;
    const { id, tag} = req.body;
    pool.query(sql, [ id, tag], (err, result) => {
        if (err) return next(new Error(err.message));
        return res.status(201)
                  .json({ success: true });
    });
};

const displayServiceView = async (req, res, next) => {
    let sql = `select * FROM restaurant_supply_express.display_service_view`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({result});
        console.log(result.length);
    })
};

const displayIngredientView = async (req, res, next) => {
    let sql = `select * FROM restaurant_supply_express.display_ingredient_view`;
    pool.query(sql, (err, result) => {
        if (err) return next(new HttpError(err.message, 500));
        res.status(200).json({result});
        console.log(result.length);
    })
};

exports.addIngredient = addIngredient;
exports.addDrone = addDrone;
exports.addService = addService;
exports.manageService = manageService;
exports.takeoverDrone = takeoverDrone;
exports.joinSwarm = joinSwarm;
exports.leaveSwarm = leaveSwarm;
exports.loadDrone = loadDrone;
exports.refuelDrone = refuelDrone;
exports.flyDrone = flyDrone;
exports.purchaseIngredient = purchaseIngredient;
exports.removeIngredient = removeIngredient;
exports.removeDrone = removeDrone;
exports.displayServiceView = displayServiceView;
exports.displayIngredientView = displayIngredientView;