"use strict";

import{BASE_URL, requestOptions} from "/js/api/common.js";

const commentsAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/comnt", requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        });
    },

    getById: function(comntId) {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/comnt" + comntId, requestOptions)
            .then(response => resolve(response.data[0]))
            .catch(err => reject(err.response.data.message));
        });
    },

    create: function(formData) {
        return new Promise(function(resolve, reject){
            axios.post(BASE_URL + "/comnt", formData, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        })

    },

    update: function(comntId, formData) {
        return new Promise(function(resolve, reject){
            axios.put(BASE_URL + "/comnt" + comntId, formData, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        })

    },

    delete: function(comntId) {
        return new Promise(function(resolve, reject){
            axios.delete(BASE_URL + "/comnt" + comntId, formData, requestOptions)
            .then(response => resolve(response.data))
            .catch(err => reject(err.response.data.message));
        })

    },
};
