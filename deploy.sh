#!/usr/bin/env bash

set -e
set -o pipefail

branch=$(git rev-parse --abbrev-ref HEAD)
revision=$(git rev-parse --short HEAD)

echo "----------"
echo "Deploying:"
echo $branch
echo $revision
echo "----------"
echo "scp install.sh deploy@server-singapore.interflux.com:/var/www/lmpa.interflux.com"
scp install.sh deploy@server-singapore.interflux.com:/var/www/lmpa.interflux.com
echo "----------"
echo 'ssh deploy@server-frankfurt.nabu.io "/var/www/lmpa.interflux.com/install.sh $branch $revision"'
ssh deploy@server-frankfurt.nabu.io "/var/www/lmpa.interflux.com/install.sh $branch $revision"
