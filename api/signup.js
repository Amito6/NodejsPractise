const { createData } = require("./db");



exports.signup = (request,response)=>{

    let userData = "";
    request.on("data",(chunks)=>{
         userData += chunks;
         
        });
        request.on("end",async ()=>{
            let formData = JSON.parse(userData);
            const resDatabase = await createData(formData,"signupData");
            response.writeHead(200,{
                "Content-Type" : "application/json"
            });
            const resMsg = JSON.stringify({
                message : "DATA Inserted",
                data : resDatabase
            });
            response.write(resMsg);
            response.end();
            
        })
    /* response.writeHead(200,{
        "Content-Type" : "application/json"
    });

    

    let resMsg = JSON.stringify({
        message : "just for Code"
    })
    response.write(resMsg); */
    
};

