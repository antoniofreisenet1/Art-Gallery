"use strict";

import {parseHTML} from "/js/utils/parseHTML.js";


const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class = "col-md-4">
        <div class="card text-center">
            <img src=${photoData.url}>
                <a href="photo_detail.html?photoId=${photo.photoId}"></a>
              <h5 class="card-title">${photoData.title}</h5>
              <p class="card-text">${photoData.description}</p>
            </div>
        </div>
    </div>`;


    let card = parseHTML(html);
    galleryDiv.appendChil(card);
    },
    

    asDetails: function(photo){
        let html = `<div>
        
        <h2>${photo.title}</h2>
        <h4>${photo.description}</h4>
        <p>Uploaded by <a href="">@user1</a> on ${photo.date}</p>
        <hr>

        <img src="${photo.url}" class="card-img-top" alt="${photo.description}">

        </div>`;

        let details = parseHTML(html);
        return details;
    },

};

export {photoRenderer};