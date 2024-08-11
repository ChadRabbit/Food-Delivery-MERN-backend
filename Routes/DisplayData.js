const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        res.status(200).json({
            food_items: global.food_items,
            food_cateogary: global.food_category
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
