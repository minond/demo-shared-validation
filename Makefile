build: install
	./node_modules/.bin/component build

install:
	npm install
	./node_modules/.bin/component install

reset:
	[ -d node_modules ] && rm -rf node_modules
	[ -d components ] && rm -rf components

server: install build
	NODE_ENV=development DEBUG=* node server
