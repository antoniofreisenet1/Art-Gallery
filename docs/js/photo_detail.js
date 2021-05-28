"use strict"

import { photosAPI } from "./api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";

const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("photoId");
let currentPhoto = null;

function _(id) {
    return document.getElementById(id);
}

function main(){

    let deleteBtn = document.getElementById("delete-photo-button");
    deleteBtn.onclick = handleDeletePhoto;

    if(photoId !== null) {
            loadPhotoInfo();
    }

}


function loadPhotoDetails(){
    photosAPI
        .getById(photoId)
        .then(photo => {
            let detailColumn = document.getElementById("photo-detail");
            let photoDetail = photoRenderer.asDetails(photo);
            detailColumn.appendChild(photoDetail);
        })
        .catch(err => messageRenderer.showErrorMessage(err));
}

function handleDeletePhoto(event){
    let answer = confirm("Are you sure you want to delete this photo?");
    if(answer){
        photosAPI.delete(photoId)
        .then(resp => window.location.html = "index.html")
        .catch(err => messageRenderer.showErrorMessage(err));
    }
}

function handelEditPhoto(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
}

document.addEventListener("DOMContentLoaded", main);