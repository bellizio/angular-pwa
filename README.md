# Angular PWA

An Angular PWA starter kit with [Workbox](https://developers.google.com/web/tools/workbox/)

## Getting Started

### Dependencies
* [Node](https://nodejs.org/) (>= 8.0.0)

### Setup
1. `git clone https://github.com/bellizio/angular-pwa.git`
1. `cd angular-pwa`
1. `npm install`

## Overview

This is an Angular PWA starter kit based on the official [Angular Webpack guide](https://angular.io/docs/ts/latest/guide/webpack.html). It includes everything detailed in the guide with a few modifications in order to incorporate the following:

* [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) (for development)
* [Ahead-of-Time Compilation](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) (for production)
* [Service Worker via Workbox](https://developers.google.com/web/tools/workbox/) (for production)
* Sass

## Scripts

### Development

```npm start``` - builds and serves the app at localhost:8080

### Production

```npm run build:prod``` - builds the app for production

```npm run serve:prod``` - builds the app for production and starts a local server at localhost:8080

### Testing

```npm test``` - runs all unit tests
