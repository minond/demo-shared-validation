install:
	npm install
	bower install

reset:
	[ -d bower_components ] && rm -rf bower_components
	[ -d node_modules ] && rm -rf node_modules

server: install
	NODE_ENV=development DEBUG=* node index.js
