![Status of the main branch](https://github.com/mahata/ts-uploader/actions/workflows/main.yml/badge.svg)

## Prerequisites

* Node.js (version 20.x or higher)
* Docker
* direnv

## Getting Started

Setup the appropriate env vars:

```bash
$ copy .envrc.copy .envrc
$ vim .envrc

(You might need to run `direnv allow` afterwards)
```

```bash
$ docker compose up
$ npm i
$ npm run dev
```
