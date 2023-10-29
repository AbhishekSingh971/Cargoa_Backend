const Transporter = require("../Model/Transporter");

const createReplayController = async (req, res)=>{
    try{
    const {transporterId, price, message} = req.body;

    if(!transporterId || !price || !message){
        return res.status(404).send({
            success: false,
            message: "Parameter can't be blank"
        })
    }

    const replay =await new Transporter({transporterId, price, message}).save();
    res.status(200).send({
        success: true,
        message: "replay send successfully",
        replay
    })
}catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message: "error in getting replay",
        error
    })
}
}

const updateReplayController = async (req,res)=>{
    try{
        const {id} = req.params;
    const {transporterId, price, message} = req.body;

    if(!transporterId || !price || !message){
        res.status(404).send({
            success:false,
            message: "Parameters can't be blank"
        })
    }

    const replay =await Transporter.findByIdAndUpdate(id,{transporterId, price, message},{new:true});
    res.status(200).send({
        success: true,
        message: "replay updated successfully",
        replay
    })
}catch(error){
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Error while updating the replay",
        error
    })
}
}

const getAllReplayController = async (req, res)=>{
    try{
    const getAll  = await Transporter.find({});
    const total = await Transporter.find({}).estimatedDocumentCount(); //to count the total number of product

    res.status(200).send({
        success: true,
        total: total,
        message: "Get all replay",
        getAll
    })
    }catch(error){
        res.status(500).send({
            success: false,
            message: "error in getting all replay"
        })
    }
}

const deleteReplayController = async (req,res)=>{
    try{
    const {id} = req.params;

    const match = await Transporter.find({_id: id});
    if(!match){
        return res.status(404).send({
            success: false,
            message: "Replay with this id not exist"
        })
    }

    await Transporter.findByIdAndDelete(id);
    res.status(200).send({
        success: true,
        message: "Replay deleted successfully"
    })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting the replay",
            error
        })
    }
}

// search product
const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await Transporter
        .find({
          $or: [
            { price: { $regex: keyword, $options: "i" } },
            { message: { $regex: keyword, $options: "i" } },
          ],
        })
      res.status(200).json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };

module.exports = {createReplayController, updateReplayController,getAllReplayController,deleteReplayController,searchProductController}