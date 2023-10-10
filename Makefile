ifneq (,$(wildcard ./.env))
include .env
export 
ENV_FILE_PARAM = --env-file .env

endif

build:
	docker build -t bidout-auction-react .

up:
	docker run -it -p 3000:3000 bidout-auction-react