const express = require('express');
const {registerController, loginController, currentController, forgotPasswordController,getAllTransporters, getAllManufacturers,getTransporter} = require('../controllers/authControllers')
const {requireSignIn, isManufacturer, isTransporter} = require('../middleware/authMiddleware')
const router = express.Router();

// routing
//REGISTER || Method POST
router.post('/register', registerController);

//LOGIN || Method POST
router.post('/login', loginController);

//CURRENT || Method GET
router.get('/current',requireSignIn ,currentController);

//FORGOT || Method GET
router.put('/forgot', forgotPasswordController);

//Protected route auth -- for manufacturer
router.get('/manufacturer-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok: true})
} )

//Protected route auth -- for Transporter
router.get('/transporter-auth',requireSignIn,isTransporter,(req,res)=>{
    res.status(200).send({ok: true})
} )

//get All transporters 
router.get('/getAllTransporters',requireSignIn, getAllTransporters);
//get one transporter
router.get('/getTransporter/:id',requireSignIn, getTransporter);

//get All manufacturers 
router.get('/getAllManufacturers',requireSignIn, getAllManufacturers);

module.exports = router;