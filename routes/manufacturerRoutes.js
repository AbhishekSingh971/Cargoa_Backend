const express = require('express');
const { requireSignIn, isManufacturer } = require('../middleware/authMiddleware');
const { createOrderController, updateOrderController, getOrderController,deleteOrderController, searchProductController } = require('../controllers/manufacturerController');
const router = express.Router();

router.post("/create-order",requireSignIn,isManufacturer,createOrderController);
router.put("/update-order/:id",requireSignIn, isManufacturer, updateOrderController);
router.get("/getorder",requireSignIn, getOrderController);
//search product
router.get('/search/:keyword', searchProductController);
router.delete("/delete-order/:id",requireSignIn,isManufacturer, deleteOrderController);

module.exports = router;