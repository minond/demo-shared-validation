'use strict';

var schema = require('validate'),
    lodash = require('lodash');

// just like in server.js
var user_validate = schema(CONSTRAINTS);

$(function () {
    var $user = $('#user');

    function validate_form() {
        var model = {
            first_name: $user.find('[name="first_name"]').val(),
            last_name: $user.find('[name="last_name"]').val(),
            age: $user.find('[name="age"]').val()
        };

        return user_validate.validate(model);
    }

    $('#validate').click(function (ev) {
        var errors = validate_form();

        if (!errors || !errors.length) {
            alert('form is valid');
        } else {
            alert('errors: ' + JSON.stringify(errors));
        }

        ev.preventDefault();
    });

    $('#validate_and_submit').click(function (ev) {
        var errors = validate_form();

        if (errors && errors.length) {
            alert('errors: ' + JSON.stringify(errors));
            ev.preventDefault();
        }
    });
});
