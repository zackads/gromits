#!/bin/bash
trap 'docker-compose down' INT
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up