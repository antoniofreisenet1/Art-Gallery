"use strict"

import {messageRenderer} from "/js/renderers/messages.js";
import {userValidator} from "/js/users.js";
import {sessionManager} from "/js/utils/session.js"
import {authAPI} from "/js/api/auth.js";

function main() {
    addRegisterSubmitHandler();

}

function addRegisterSubmitHandler(){
    let form = document.getElementById("register-form");
    form.onsubmit = registerSubmit;
}

function registerSubmit(event){
    event.preventDefault();

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    messageRenderer.showWarningMessage("Soy un warning");
    messageRenderer.showSuccessMessage("Soy un success");


    let form = event.target;
    let formData = new FormData(form);
    let errors = userValidator.validateRegister(formData);



    if(password1 !== password2){
        errors.push("Passwords do not match");
    }

    if(firstName.length < 3){
        errors.push("The first name must have more than 2 characters");

    }

    if(lastName.length < 3){
        errors.push("The last name must have more than 2 characters");

    }

    if(errors.length > 0){
        for(let error of errors){
            messageRenderer.showErrorMessage();
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