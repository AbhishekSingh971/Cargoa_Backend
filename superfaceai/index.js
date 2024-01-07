// var https = require('follow-redirects').https;
const http = require('http')
var fs = require('fs');

var options = {
    'method': 'POST',
    'hostname': 'https://www.pw92ll.api.infobip.com',
    'path': '/sms/2/text/advanced',
    'headers': {
        'Authorization': '34d23ae2769d6a587d1a753b68a110c7-f3964584-1c46-44aa-999c-1ab1753083f4',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

var postData = JSON.stringify({
    "messages": [
        {
            "destinations": [
                {
                    "to": "+91 9717932760"
                }
            ],
            "from": "Infobip",
            "text": "This is a sample message",
            "language":{
                "languageCode": "ES"
            }

        }
    ]
});

req.write(postData);

req.end();