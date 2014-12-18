install:
	npm install

reset:
	[ -d node_modules ] && rm -rf node_modules

server: install
	NODE_ENV=development DEBUG=* node index.js
