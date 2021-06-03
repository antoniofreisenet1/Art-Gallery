"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI }  from "/js/api/users.js";

const profileRenderer = {

    asInfo: function(user){
        let html = `<div class="card">
        <div class="card-body row m-2">
            <div class="col-3">
                <img class="card-img" id="profile-image"src="${user.avatarUrl}" alt="Avatar">
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col-2 center">
                        <p class="card-text text-dark font-weight-bold">FirstName:</p>
                        <p class="card-text text-dark" id="name">${user.firstName}</p>
                    </div>
                    <div class="col-2 center">
                        <p class="card-text text-dark font-weight-bold">LastName:</p>
                        <p class="card-text text-dark"  id="surname">${user.lastName}</p>
                    </div>
                    <div class="col-2 center">
                        <p class="card-text text-dark font-weight-bold">User:</p>
                        <p class="card-text text-dark" id="username">${user.username}</p>
                    </div>
                    <div class="col-2 center">
                        <p class="card-text text-dark font-weight-bold">Email:</p>
                        <p class="card-text text-dark" id="email">${user.email}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>`;
        let info = parseHTML(html);

        return info;
    }
}

export{profileRenderer}