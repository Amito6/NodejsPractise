window.onload = () =>{
    signupRequest();
};


const signupRequest = () =>{
    let signupForm = document.querySelector("#signup-form");
    signupForm.onsubmit = (e) =>{
        e.preventDefault();

        /* Preparing FormData */
        const formData = JSON.stringify({
            name : document.querySelector("#name").value,
            email : document.querySelector("#email").value,
            mobile : document.querySelector("#mobile").value,
            password : document.querySelector("#password").value
        });

        
        const ajax = new XMLHttpRequest();
        ajax.open("POST","/api/signup",true);
        ajax.send(formData);

        ajax.onreadystatechange = () =>{
            if(ajax.readyState == 4){
                console.log(JSON.parse(ajax.response).data);
                //window.location = "https://google.com"
            }
        }
    }
}