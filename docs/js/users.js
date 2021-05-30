"use strict"

const userValidator = {
    validateRegister: function(formData){
        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password1 = formData.get("password");
        let password2 = formData.get("password2");

        if(firstName.length <1){
            errors.push("The first name must not be empty.");
        }

        if(lastName.length <1){
            errors.push("THe last name must not be empty.");
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

        return errors;

    },
};

export {userValidator};
