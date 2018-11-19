# lmpa-interflux-com

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

Please make sure these CLIs are available:

```
nvm --version
yarn --version
ember --version
```

## Installation

```
git clone git@github.com:janwerkhoven/lmpa.interflux.com.git
cd lmpa.interflux.com
nvm install
yarn install
```

## Starting local server

```
ember s
open http://localhost:4200
```

## Deploying to production

```
git remote add server ssh://jw@sg1.nabu.io/var/www/lmpa.interflux.com
```

```
git push server production
open https://lmpa.interflux.com
```

## Building

```
ember build
ember build --environment production
```

## Testing

```
ember test
```

```
ember test --server
```

```
ember s
open http://localhost:4200/tests
```

## Fastboot

```
ember build --environment production
node fastboot-server.js
```

## Linting

```
yarn lint:hbs
yarn lint:js
yarn lint:js --fix
```

## Generating Ember files

```
ember generate --help
ember g -h
ember g component foo
```

## Fastboot

sudo systemctl status lmpa.interflux.com.fastboot.service
