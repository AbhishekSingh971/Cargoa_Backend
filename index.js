const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connect = require('./db/db');
const auth = require("./routes/authRoutes");
const manufacturerRoutes = require("./routes/manufacturerRoutes");
const transporterRoutes = require("./routes/transporterRouter");
const cors = require('cors')
const path = require('path');


//configure env
dotenv.config();

connect();

// rest object
const app = express();

//middelware
var corsOptions = {
    origin: 'https://ecommerce-frontend-five-omega.vercel.app',
    optionsSuccessStatus: 200,
    AccessControlAllowOrigin: "https://ecommerce-frontend-five-omega.vercel.app"
// some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../build')))


//routes
app.use("/api/v1/auth", auth)
app.use("/api/v1/manufacturer", manufacturerRoutes)
app.use("/api/v1/transporter",transporterRoutes )

//REST api
app.get('/', (req,res)=>{
    res.send("This is for a testing");
});

const port = process.env.Backend_PORT;
app.listen(port,()=>{
    console.log(`Server Running `);
});