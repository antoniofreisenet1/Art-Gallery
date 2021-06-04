"use strict";

import{BASE_URL, requestOptions} from "/js/api/common.js";

const scoreAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/score", requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        });
    },

    getById: function(scoreId) {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/score/" + scoreId, requestOptions)
            .then(response => resolve(response.data[0]))
            .catch(err => reject(err.response.data.message));
        });
    },

    getByPhotoId: function(photoId) {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/score/" + photoId, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));

        });
    },


    create: function(formData) {
        return new Promise(function(resolve, reject){
            axios.post(BASE_URL + "/score", formData, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        })

    },


};

export {scoreAPI};