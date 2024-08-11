const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    const orderDate = req.body.order_date;

    // Insert order date at the beginning of the data array
    data.splice(0, 0, { Order_date: orderDate });

    try {
        let eId = await Order.findOne({ email: req.body.email });

        if (eId === null) {
            // Create a new order entry if one does not exist
            await Order.create({
                email: req.body.email,
                order_data: [data],
            });
            res.json({ success: true });
        } else {
            // Update existing order entry
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: "Server Error", error: error.message });
    }
});

module.exports = router;
