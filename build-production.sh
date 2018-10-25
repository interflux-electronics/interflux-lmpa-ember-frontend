#!/bin/bash

set -e
set -o pipefail

echo "----------"
echo "GIT POST RECEIVE HOOK"
echo "User: $USER"
echo "Host: $HOSTNAME"
echo "Path: $PWD"

echo "\$ git fetch"
git fetch

echo "\$ git checkout feature/deploy-pipeline -f"
git checkout feature/deploy-pipeline -f

# echo "\$ nvm install"
# nvm install

echo "\$ yarn install"
yarn install

echo "\$ ember build -prod"
ember build -prod

echo "----------"
