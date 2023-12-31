"use strict"

const userValidator = {
    validateRegister: function(formData){
        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password1 = formData.get("password");
        let password2 = formData.get("password2");

        if(firstName.length <2){
            errors.push("The first name is too short.");
        }

        if(lastName.length <2){
            errors.push("THe last name is too short.");
        }

        if(password1 !== password2){
            errors.push("The passwords do not match.");
        }

        return errors;
    },

    validateLogin: function(formData){
        let errors = [];

        let username = formData.get("username");
        let password = formData.get("password");

        if(username.length < 3){
            errors.push("The username must have more than 2 characters");
        }

        if(password.length <3){
            errors.push("The password is too short");
        }
        return errors;

    },
};

export {userValidator};
