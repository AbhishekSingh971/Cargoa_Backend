export default smsController = (req,res)=>{
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
    
    return postData = JSON.stringify({
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
        ],
    },
    );
};
