"use strict";

import{BASE_URL, requestOptions} from "/js/api/common.js";

const photosAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/photos", requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        });
    },

    create: function(formData) {
        return new Promise(function(resolve, reject){
            axios.post(BASE_URL + "/photos", formData, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        })

    },

    update: function(photoId, formData) {
        return new Promise(function(resolve, reject){
            axios.post(BASE_URL + "/photos", photoId, formData, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        })

    },

    delete: function(formData) {
        return new Promise(function(resolve, reject){
            axios.post(BASE_URL + "/photos", formData, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        })

    },
};

export {photosAPI};
