const http = require("http");
const fs = require("fs");
const { signup } = require("./api/signup");



const route = (response,path,status_code,type) =>{
    fs.readFile(path,(error,dataRes)=>{
        if(error){
            throw error;
        }
        else{
            response.writeHead(status_code,{
                "Content-Type" : type
            });
            response.write(dataRes);
            response.end();
        }
    })
};


const server = http.createServer((request,response)=>{

    /* Html pages */
    if(request.url == "/" || request.url == "/home"){
        let path = "html/homepage.html";
        let status_code = 200;
        let type = "text/html";
        route(response,path,status_code,type);
    }

    /* all css route */
    else if(request.url == "/css/homepage.css"){
        let path = "css/homepage.css";
        let status_code = 200;
        let type = "text/css";
        route(response,path,status_code,type);
    }

    /* all js route on html static pages */
    else if(request.url == "/js/homepage.js"){
        let path = "js/homepage.js";
        let status_code = 200;
        let type = "text/javascript";
        route(response,path,status_code,type);
    }

    /* node-api */
    else if(request.url == "/api/signup"){
        signup(request,response)
    }

    else{
        let path = "html/not-found.html";
        let status_code = 404;
        let type = "text/html";
        route(response,path,status_code,type)
    }
});

server.listen(8080);