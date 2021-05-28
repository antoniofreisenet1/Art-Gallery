"use strict";

import {messageRenderer} from "/js/renderers/messages.js";
import {photosAPI} from "/js/api/photos.js";

import {parseHTML} from "/js/utils/parseHTML.js";

import {photoRenderer} from "/js/renderers/photos.js";
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
    addButtonHandler();
    

}


function cardMouseHandler(){
    let card = document.querySelector("div.card");
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

function addButtonHandler(){
    let button = document.getElementById("button-test");
    button.onclick = function(event){
        let target = event.target;
        target.style.backgroundColor = "red";

    };
}

function loadGallery() {

    let galleryDiv = document.getElementById("gallery");

    photosAPI.getAll()
        .then(photos =>{
            let gallery = gelleryRenderer.asCardGallery(photos);
            galleryDiv.appendChild(gallery);
            cardMouseHandler();
        })
        .catch(err => messageRenderer.showErrorMessage(err));


    let photoData = {
        title:"Dog",
        description:"A picture of a dog",
        url:"https://cnnespanol.cnn.com/wp-content/uploads/2020/07/200703104728-labrador-retriever-stock-super-169.jpg?quality=100&strip=info"
    }


    let html = `<div class = "col-md-4">
    <div class="card text-center">
        <img src=${photoData.url}>
            <a href="photo_detail.html"></a>
          <h5 class="card-title">${photoData.title}</h5>
          <p class="card-text">${photoData.description}</p>
        </div>
    </div>
</div>`

let card = photoRenderer.asCard(photoData);
galleryDiv.appendChild(card);
}
document.addEventListener("DOMContentLoaded", main);