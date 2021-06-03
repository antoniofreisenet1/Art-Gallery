"use strict"

import {messageRenderer} from "/js/renderers/messages.js";
import {userValidator} from "/js/users.js";
import {sessionManager} from "/js/utils/session.js"
import {authAPI} from "/js/api/auth.js";

function main() {
    
    let form = document.getElementById("form-register");
    form.onsubmit = registerSubmit;


}



function registerSubmit(event){
    event.preventDefault();

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let form = event.target;
    let formData = new FormData(form);
    let errors = userValidator.validateRegister(formData);

    if(errors.length > 0){
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        }
        
    }else{
        authAPI.register(formData)
            .then(resp => {
                let token = resp.sessionToken;
                let userData = resp.user;
                sessionManager.login(token, userData);
                window.location.href = "index.html";
            })
            .catch(err => messageRenderer.showErrorMessage(err));
    }

    console.log(firstName + " " + lastName);
}

document.addEventListener("DOMContentLoaded", main);