const pool = require("../database");

const addIngredient = async (req, res, next) => {
    let sql = `CALL add_ingredient(?,?,?)`;
    const { barcode, name, weight} = req.body;
    pool.query(sql, [barcode, name, weight], (err, result) => {
        if (err) return next(new Error("Ingredient creation error"));
        return res.status(201)
                  .json({ success: true });
    });
};

exports.addIngredient = addIngredient;