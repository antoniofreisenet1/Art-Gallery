"use strict"

import { photosAPI } from "/js/api/photos.js";
import {scoreAPI} from "/js/api/score.js";

import {photoRenderer} from "/js/renderers/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";

const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("photoId");




function main(){

    loadPhotoDetails();
    hideActionsColumn();

    let deleteBtn = document.getElementById("delete-photo-button");
    deleteBtn.onclick = handleDeletePhoto;

    let editBtn = document.getElementById("edit-photo-button");
    editBtn.onclick = handleEditPhoto;

    let rateform = document.getElementById("form-rating")
    rateform.onsubmit = handleRatePhoto;

}

function hideActionsColumn(){
    if(!sessionManager.isLogged()){
        let actionColumn = document.getElementById("actions-col");
        actionColumn.style.display = "none";
        
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
        .then(resp => window.location.href = "index.html")
        .catch(err => messageRenderer.showErrorMessage(err));
    }
}

function handleEditPhoto(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
}

function handleRatePhoto(event) {
    event.preventDefault();
    let ratingForm = event.target;
    let ratingData = new FormData(ratingForm);

    let userId = sessionManager.getLoggedId();
        ratingData.append("userId", userId);
        ratingData.append("photoId", photoId);

    scoreAPI.create(ratingData)
        .then(resp => messageRenderer.showSuccessMessage("The picture has been rated correctly"))
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);