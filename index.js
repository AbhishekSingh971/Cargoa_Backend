const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv');
const connect = require('./db/db');
const auth = require("./routes/authRoutes");
const manufacturerRoutes = require("./routes/manufacturerRoutes");
const transporterRoutes = require("./routes/transporterRouter");
const cors = require('cors')
const path = require('path');

const bodyParser = require('body-parser');
const http = require('http');



//configure env
dotenv.config();

connect();

// rest object
const app = express();

//middelware
var corsOptions = {
    origin: 'https://cargoa-frontend-mu.vercel.app',
    optionsSuccessStatus: 200,
    AccessControlAllowOrigin: "https://cargoa-frontend-mu.vercel.app"
// some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../build')))
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
    const options = {
        method: 'POST',
        hostname: 'https://pw92ll.api.infobip.com',
        path: '/sms/2/text/advanced',
        headers: {
            'Authorization': '34d23ae2769d6a587d1a753b68a110c7-f3964584-1c46-44aa-999c-1ab1753083f4',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        maxRedirects: 20
    };

    const apiRequest = http.request(options, (apiResponse) => {
        let chunks = [];

        apiResponse.on('data', (chunk) => {
            chunks.push(chunk);
        });

        apiResponse.on('end', () => {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            res.send(body.toString());
        });

        apiResponse.on('error', (error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
    });

    const postData = JSON.stringify({
        messages: [
            {
                destinations: [
                    {
                        to: '+91-9717932760'
                    }
                ],
                from: 'Infobip',
                text: 'This is a sample message',
                language: {
                    languageCode: 'ES'
                }
            }
        ]
    });

    apiRequest.write(postData);
    apiRequest.end();
});


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