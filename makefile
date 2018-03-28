MONGODB_URI="mongodb://localhost:27017"

.PHONY: help clean-container dev

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

dev: clean-container ## compile and start the app
	bash -c "docker run -d --name mongodb -p 27017:27017 mongo" && \
	./node_modules/.bin/tsc && \
	MONGODB_URI=${MONGODB_URI} node ./dist/index.js
