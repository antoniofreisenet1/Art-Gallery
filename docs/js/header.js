"use strict"

import {sessionManager} from "/js/utils/session.js";

function main(){
    addLoggedUsername();
    addLogoutHandler();
    hideMenuElements();

}

function addLoggedUsername(){
    let username;
    let headerTitle = document.getElementById("header-username");

    if(sessionManager.isLogged()){
        //Si tiene la sesion iniciada
        let userData = sessionManager.getLoggedUser();
        username = "@" + userData.username;
        headerTitle.href = `profile.html?userId=${userData.userId}`;
    }
    else{
        //Invitado
        username = "Guest";
    }
    console.log(username);
    headerTitle.textContent = username;

}

function addLogoutHandler(){
    let logoutBtn = document.getElementById("header-logout");
    logoutBtn.onclick = function(event){
        sessionManager.logout();
        window.location.href = "index.html";
    };
}

function hideMenuElements(){
    let loginBtn = document.getElementById("header-login");
    let logoutBtn = document.getElementById("header-logout");
    let registerBtn = document.getElementById("header-register");
    let createPhotoBtn = document.getElementById("header-create-photo");

    if (sessionManager.isLogged()){
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";

    }else{
        logoutBtn.style.display = "none";
        createPhotoBtn.style.display = "none";
    }
    

}

document.addEventListener("DOMContentLoaded", main)