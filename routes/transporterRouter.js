const express = require("express");
const { requireSignIn, isTransporter } = require("../middleware/authMiddleware");
const {createReplayController, updateReplayController,getAllReplayController,deleteReplayController,searchProductController} = require('../controllers/trnasporterController');

const router = express.Router();

router.post("/create-replay", requireSignIn,isTransporter, createReplayController);
router.put("/update-replay/:id", requireSignIn,isTransporter, updateReplayController);
router.get("/getAll-replay", requireSignIn, getAllReplayController);
//search product
router.get('/search/:keyword', searchProductController);
router.delete("/delete-replay/:id", requireSignIn,isTransporter, deleteReplayController,searchProductController);

module.exports = router;