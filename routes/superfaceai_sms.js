// var https = require('follow-redirects').https;
const express = require('express');
const http = require('http')
var fs = require('fs');
const { default: smsController } = require('../controllers/smsController');
const router = express.Router();

var options = {
    // 'method': 'POST',
    'hostname': 'https://www.pw92ll.api.infobip.com',
    'path': '/sms/2/text/advanced',
    'headers': {
        'Authorization': '34d23ae2769d6a587d1a753b68a110c7-f3964584-1c46-44aa-999c-1ab1753083f4',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

var req = router.post(options,function(req,res){ smsController(res)});

req.write(postData);

req.end();

module.exports = router;