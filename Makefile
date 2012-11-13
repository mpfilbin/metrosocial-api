MOCHA_OPTS=
REPORTER = dot

check: test

test: test-unit test-acceptance

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-acceptance:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--bail \
		test/acceptance/*.js

test-cov: lib-cov
	@METROVELLUM_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib lib-cov

benchmark:
	@./support/bench

clean:
	rm -f coverage.html
	rm -fr lib-cov
	rm -f npm-shrinkwrap.json
	rm -rf node_modules
	npm cache clean

build:
	@npm install -f && npm shrinkwrap

rebuild: clean build

.PHONY: test test-unit test-acceptance benchmark clean
