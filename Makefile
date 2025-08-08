install:
	npm ci
test:
	npx playwright test
lint:
	npx eslint .