const bcrypt = require("bcrypt");
const { createData, findResData } = require("./db");


const sendResponse = (response,status_code,message) =>{
    response.writeHead(status_code,{
        "Content-Type" : "application/json"
    });
    const resMsg = JSON.stringify(message);
    response.write(resMsg);
    response.end();
}


exports.signup = (request,response)=>{

    let userData = "";
    request.on("data",(chunks)=>{
         userData += chunks;
         
        });
        request.on("end",async ()=>{
            let formData = JSON.parse(userData);
            let hashedPass = await bcrypt.hash(formData.password,10);
            formData["password"] = hashedPass;
            formData["createdAt"] = new Date();
            formData["updatedAt"] = new Date();
            formData["email_verified"] = false;
            formData["password_verified"] = false
            let {email} = formData;
            let query = {email};
            const findResDatabase = await findResData(query,"signupData");
            if(findResDatabase.length != 0){
                let msg = {
                    message : "USER ALREADY EXISTED",
                    data : findResDatabase
                }
                sendResponse(response,200,msg)
            }
            else{
                const resDatabase = await createData(formData,"signupData");
                let msg = {
                    message : "User has been created",
                    data : resDatabase
                }
                sendResponse(response,201,msg)
            }
            
        });
    
};

