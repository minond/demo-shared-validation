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
var schema = require('validate');
```

#### build

you will have to build your client code if you end up using a CommonJS module.
`component` can also take care of that (or `browserify`, but it won't work with
`validate` because of who the author of `validate` is loading some of its
dependencies). run `component build` and it will compile all of the scripts you
have listed in your `scripts` entry in the `component.json` file. this will
generate a `build/build.js` file that can be included in your browser.

#### constraints

constraint definitions can be defined in one place and loaded in your server
and sent down to your client. in this example I am defining the constraings in
`server.js` (`user_constraints` variable) which I use when generating the
schema used in node and also make available in my views when they're compiled
(see `user_index` in `server.js`). these client constraints are saved to a
global variable like so:

```html
<script> window.CONSTRAINTS = {{constraints | safe}}; </script>
```

since they're in a global your client code can now create validation functions
like this:

```js
var user_validate = schema(CONSTRAINTS);
```

#### caveat

if your constraints include funcitons and/or regular expressions (or anything
that's not a plain object, array, or any scalar), you won't be able to
stringify them and merge them into your views. you can either inject them into
your view as plain javascript, or build them using `component` or `browserify`
and include it in your client code that way.
