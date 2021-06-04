"use strict";

import {parseHTML} from "/js/utils/parseHTML.js";



const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class = "col-md-4">
        <div class="card text-center">
            <a href="photo_detail.html?photoId=${photo.photoId}">
                <img src=${photo.url} class = "card-img-top" alt = "${photo.description}">
            </a>
            <div class = "card-body">
              <h5 class="card-title">${photo.title}</h5>
              <p class="card-text">${photo.description}</p>
            </div>
        </div>
    </div>`;


    let card = parseHTML(html);
    return card;
    },
    

    asDetails: function(photo){
        let html = `<div>
        
        <h2>${photo.title}</h2>
        <h4>${photo.description}</h4>
        <p>Uploaded by <a href="profile.html?userId=${photo.userId}" class="user-link">${photo.userId}</a> on ${photo.date}</p>
        <hr>

        <img src="${photo.url}" class="card-img-top" alt="${photo.description}">

        </div>`;

        let details = parseHTML(html);
        return details;
    },

};

export {photoRenderer};