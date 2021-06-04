"use strict";

import {messageRenderer} from "/js/renderers/messages.js";
import {photosAPI} from "/js/api/photos.js";

import {sessionManager} from "/js/utils/session.js";
import {usersAPI} from "/js/api/users.js";
import {galleryRenderer} from "/js/renderers/gallery.js";



function main() {
   //let myDiv = document.getElementById("test-div");
   //myDiv.textContent("Esto esta hecho con JS");
   //myDiv.style.backgroundColor = "blue";
   //myDiv.style.color = "red";
   //myDiv.style.fontFamily = "monospaced";

   //Hasta aqui el contenido de estilos
    
  //let container = document.getElementById("container");

  //let myP = document.createElement("p");
  //myP.textContent = "Esto es un nuevo parrafo";

  //container.appendChild(myP);

  //let myImg = document.createElement("img");
  //myImg.src = "no me apetece pegarlo asi que asume que esta aqui";
  //myImg.title = "Imagen de ejemplo";

  //let html = '<img src = "no me apetece pegarlo asi que asume que esta aqui" title = "imagen de ejemplo">';
  //let myImg = parseHTML(html);
  //
  //container.appendChild(myImg);


  //hasta aqui el contenido de js con imagenes html

  
    loadGallery();
    cardMouseHandler();


}



function cardMouseHandler(){
    let cards = document.querySelectorAll("div.card");
    for(let card of cards){
        card.onMouseEnter = handleMouseEnterCard;
        card.onmMouseLeave = handleMouseLeaveCard;
    }
}

function handleMouseLeaveCard(event){
    let targetCard = event.target;
    targetCard.style.backgroundColor = "white";
    targetCard.style.color = "black";
}


function handleMouseEnterCard(event) {
    let targetCard = event.target;
    targetCard.style.backgroundColor = "black";
    targetCard.style.color = "white";
}



function loadGallery() {

    let galleryContainer = document.getElementById("gallery");

    if(sessionManager.getLoggedId() !== null){
        photosAPI.getAll()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            let cards = document.querySelectorAll("div.card");
            
            
        })
        .catch(error => messageRenderer.showErrorAsAlert(error));

    }
    else{
        photosAPI.getAllPublic()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            
            
        })
        .catch(error => messageRenderer.showErrorAsAlert(error));
    }


}
document.addEventListener("DOMContentLoaded", main);

