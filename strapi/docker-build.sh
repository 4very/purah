#!/bin/sh

source .env
docker build -t strapi --build-arg EXTRA_PACKAGE=$EXTRA_PACKAGE -f Dockerfile.dev .