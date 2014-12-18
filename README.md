### shared validation code demo

validation code shared on your server (node.js) and client
(angular.js/vanilla).

```bash
git clone https://github.com/minond/demo-shared-validation.git
make server
```

then go to [http://localhost:5000/](http://localhost:5000/)

#### library

validation is done using [`validate`](https://www.npmjs.com/package/validate)
(not validate.js), but in theory this could be done with any library that can
work on a browser and in node (validate.js cannot)

once you have your validation library installed, make sure it can be accesed by
node and by your browser. `validate` is installed with `npm`, so it works in
node out of the box (`require('validate')`). to use it in a browser I had to
install it using `component` (see `component.json`).

```js
// in server.js *and* client.js
var schema = require('validate'),
    validator = schema({
        first_name: {
            type: 'string',
            required: true
        }
    });
```

#### build

you will have to build your client code if you end up using a CommonJS module.
`component` can also take care of that (or `browserify`, but it won't work with
`validate` because of the way the author of `validate` is loading some of his
dependencies). run `component build` and this will compile all of the scripts
you have listed in your `scripts` entry in the `component.json` file. this will
generate a `build/build.js` file that can be included in your browser.

#### schema/constraints

constraint definitions can be defined in one place and loaded in your server
and sent down to your client. in this example I am defining the constraings in
`constraints.js` which I require in node and include in the build for my client
code.
