MONGODB_URI="mongodb://localhost:27017"

.PHONY: help clean-container infra dev test

help:
	@echo
	@echo "make targets :"
	@echo
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m##/[33m/'
	@echo


clean-container: ## remove all docker containers
	bash -c "docker rm -f $$(docker ps -aq)" || echo "no container"

infra: clean-container ## set up infra containers
	bash -c "docker run -d --name mongodb -p 27017:27017 mongo"


dev: infra ## compile and start the app
	./node_modules/.bin/tsc && \
	MONGODB_URI=${MONGODB_URI} node ./dist/index.js

test: infra ## unit testing
	MONGODB_URI=${MONGODB_URI} npm run test
