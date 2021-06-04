"use strict"

import {parseHTML} from "/js/utils/parseHTML.js";

const scoreRenderer = {

    asScore: function(score){
        let html = `<div class = "col-md" id = "score-block">
        Rating: ${score.value}
        </div>`;

        let score = parseHTML(html);
        return score;

    },
};

export{scoreRenderer};