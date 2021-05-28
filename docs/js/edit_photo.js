"use strict";

import {photosAPI} from "/js/api/photos.js"
import {messageRenderer} from "/js/renderers/messages.js"

function main(){
    let photoForm = document.getElementById("form-upload-photo");
    photoForm.onsubmit = handleFormSubmit;
}

function loadPhotoInfo(){
    let titleInput = document.getElementById("input-title");
    let descInput = document.getElementById("input-description");
    let urlInput = document.getElementById("input-url");
    let visibInput = document.getElementById("input-visibility");

    let pageTitle = document.getElementById("page-title");
    pageTitle.textContent = "Editing a photo";

    photosAPI.getById(photoId)
    .then(photo => {
        currentPhoto = photo;
        titleInput.value = currentPhoto.title;
        descInput.value = currentPhoto.description;
        urlInput.value = currentPhoto.url;
        visibInput.value = currentPhoto.visbility;
    })
    .catch(err => messageRenderer.showErrorMessage(err));
}

function handleFormSubmit(event){
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    let errors = [] //TODO: hacer la validacion con un validador

    if (errors.length > 0){
        //TODO: Mostrar los errores.
    } else{
        //Enviar el formulario
        if(photoId == null){
            //Creando una foto
            formData.append("userId", 1);
            photosAPI.create(formData)
            .then(resp => window.location.href = "index.html")
            .catch(err => messageRenderer.showErrorMessage(err));
        } else {
            //Editando una foto
            formData.append("userId", currentPhoto.userId);
            photosAPI.update(photoId, formData)
            .then(resp => window.location.href = "photo_detail.html?photoId=" + photoId)
            .catch(err => messageRenderer.showErrorMessage(err));
        }
    }
}

document.addEventListener("DOMContentLoaded", main);