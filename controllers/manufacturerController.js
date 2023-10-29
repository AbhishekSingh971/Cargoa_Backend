const manufacturerModel = require('../Model/Manufacturer');

// for CREATING THE ORDER
const createOrderController =async (req, res)=>{
 try {
    const {to, from,  quantity, transporter} = req.body;

    if(!to || !from || !quantity || !transporter){
        return res.status(404).send({message: "Parameters can't be blank"})
    }

    const order = await new manufacturerModel({to, from , quantity, transporter,userId: req.user.id}).save();
    res.status(201).send({
        success: true,
        message: 'manufacturer order created successfully',
        order
    })
 } catch (error) {
    res.status(500).send({
        success:false,
        message: 'Something went wrong in creating order',
        error
    })
    console.log(error)
 }
}

//FOR UPDATING THE ORDER
const updateOrderController = async (req, res)=>{
    try{
    const {id} = req.params;
    const {to, from, quantity, transporter} = req.body;

    const order =await manufacturerModel.findByIdAndUpdate(
        id,{to, from, quantity, transporter},{new:true}
    );

    res.status(200).send({
        success: true,
        message: "order updated successfully",
        order
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message: "error in updateing order",
        error
    })
}
}

//FOR GET ALL THE  MANUFACTURER
const getOrderController = async (req, res)=>{
    try{
    // const {id} = req.params;
    const total = await manufacturerModel.find({userId: req.user.id}).estimatedDocumentCount(); //to count the total number of product
    const order =await manufacturerModel.find({userId: req.user.id});
    res.status(200).send({
        success: true, 
        message: "Get all the order of Manufacturer",
        total,
        order
    });
}catch(error){
    console.log(error)
    res.status(500).send({
        success: false, 
        message: "Errro in get order of manufacturer",
        error
    })
}
}

//For DELETING THE ORDERS
const deleteOrderController = async (req, res)=>{
    try{
    const {id} = req.params;
    await manufacturerModel.findByIdAndDelete(id)
     res.status(200).send({
    success: true,
    message: "order is deleted successfully"
 })
}catch(errro){
    res.status(500).send({
        success: false,
        message: "Error in deleteing order"
    })
}
}

// search product
const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await manufacturerModel
        .find({
          $or: [
            { to: { $regex: keyword, $options: "i" } },
            { from: { $regex: keyword, $options: "i" } },
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

module.exports = {createOrderController,updateOrderController,getOrderController,deleteOrderController,searchProductController}