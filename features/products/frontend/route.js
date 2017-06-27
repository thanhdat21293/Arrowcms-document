'use strict';

module.exports = function (component) {
    let comp = component.controllers.frontend;

    return {

        //Route o day
        "/cart/:pid([0-9]+)": {
            get: {
                handler: comp.add_cart
            }
        },
        "/cart": {
            get: {
                handler: comp.view_cart
            }
        },

    }
};