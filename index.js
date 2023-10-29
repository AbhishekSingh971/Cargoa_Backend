const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connect = require('./db/db');
const auth = require("./routes/authRoutes");
const manufacturerRoutes = require("./routes/manufacturerRoutes");
const transporterRoutes = require("./routes/transporterRouter");
const cors = require('cors')

//configure env
dotenv.config();

connect();

// rest object
const app = express();

//middelware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", auth)
app.use("/api/v1/manufacturer", manufacturerRoutes)
app.use("/api/v1/transporter",transporterRoutes )

//REST api
app.get('/', (req,res)=>{
    res.send("<h1>This is for a testing</h1>");
});

const port = process.env.Backend_PORT||7001;
app.listen(port,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} Port ${port}`);
});