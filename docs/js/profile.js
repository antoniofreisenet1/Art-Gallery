"use strict";
import {galleryRenderer} from "/js/renderers/gallery.js";
import {photosAPI} from "/js/api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";
import {usersAPI} from "/js/api/users.js";
import {parseHTML} from "/js/utils/parseHTML.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

function main() {
    let galleryContainer = document.getElementById("divGallery");
        UserData();
        if(sessionManager.getLoggedId()===null){
            window.location.href = "login.html";
        }else{
            if(sessionManager.getLoggedId()!==userId){
                photosAPI.getUsuario(userId)
                .then(photos => {
                    let gallery = galleryRenderer.asCardGallery(photos);
                    galleryContainer.appendChild(gallery);
                    let cards = document.querySelectorAll("div.card");
                    
                    
                })
                .catch(error => messageRenderer.showErrorMessage(error));

            }
            else{
                photosAPI.getInvitado(userId)
                .then(photos => {
                    let gallery = galleryRenderer.asCardGallery(photos);
                    galleryContainer.appendChild(gallery);
                    
                    
                })
                .catch(error => messageRenderer.showErrorMessage(error));
            }
        }
}

function UserData() {
    usersAPI.getById(userId)
    .then(users =>{
        console.log(userId);
        console.log(users);
        let usuarios = Object.values(users)
        console.log(usuarios);
        if(usuarios[0] === null) {
            let html = `<div class = "row">
                            <img src = "/images/default_profile.png" alt = "pfp"
                            class = "img-thumbnail" id = "pfp"></div>`;
            let code = parseHTML(html);
            document.getElementById("pfp").replaceWith(code);
        }else{
        document.getElementById("pfp").src= `${usuarios[0]}`;
        };
        document.getElementById("firstname").innerHTML= `nombre: ${usuarios[2]}`;
        document.getElementById("surname").innerHTML= `apellido: ${usuarios[3]}`;
        document.getElementById("email").innerHTML= `email: ${usuarios[1]}`;
        document.getElementById("telephone").innerHTML=`teléfono: ${usuarios[5]}`;
        document.getElementById("username").innerHTML= `@${usuarios[7]}`;
    })
};




document.addEventListener( "DOMContentLoaded", main);