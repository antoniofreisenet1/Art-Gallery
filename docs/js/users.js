"use strict"

const userValidator = {
    validateRegister: function(formData){
        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password1 = formData.get("password");
        let password2 = formData.get("password2");

        return errors;
    }
};

export {userValidator};
