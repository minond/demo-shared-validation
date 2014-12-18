'use strict';

var express = require('express'),
    schema = require('validate'),
    body = require('body-parser'),
    swig = require('swig'),
    app = express();

var user_constraints = {
    first_name: {
        type: 'string',
        required: true
    },
    last_name: {
        type: 'string',
        required: true
    },
    age: {
        type: 'string',
        required: true
    }
};

// just like in client.js
var user_validate = schema(user_constraints);

// middleware
app.use(body.json());
app.use(body.urlencoded({ extended: true }));

// routes
app.get('/', user_index);
app.post('/', user_submit);
app.use('/build', express.static('build'));
app.use('/public', express.static('components'));

// config
app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

if (process.env.NODE_ENV === 'development') {
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
}

app.listen(process.env.PORT || 5000);

// handlers
function user_index(req, res) {
    res.render('index', {
        constraints: user_constraints,
        model: {
            first_name: 'Marcos',
            last_name: 'Minond',
            age: 25
        }
    });
}

function user_submit(req, res) {
    var errors = user_validate.validate(req.body);

    res.json({
        valid: !errors || !errors.length,
        errors: errors,
        data: req.body,
        constraints: user_constraints
    });
}
