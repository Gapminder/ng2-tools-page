# ToolsPage

## Quickstart
  - clone this project (or download as a zip)
  - cd `project directory`
  - `npm i`
  - `npm start`
  - access application on http://localhost:4200

## Build
  - `npm run build:prod` - builds application for a production environment.
  - `npm run build:stage` - builds application for a stage environment.
  - `npm run build:dev` - builds application for a development environment. Development does'n mean local! For local development have a look at [Quickstart](#quickstart).
  - `npm run build:docker` - builds application for a distribution via docker image. This one is used by [Waffle Server](https://github.com/Gapminder/waffle-server) in its [standalone mode](https://github.com/Gapminder/waffle-server/wiki/Standalone-Waffle-Server).

## Testing
  - `npm run lint` - checks code style compliance against tslint rules.
  - `npm run test` - runs all the tests.
  - `npm run test:w` - runs all the tests and watches for changes, once changes occurred - reruns the tests.
  - `npm run cover` - runs all the tests and calculates coverage report, that will be stored in a `coverage` directory.
  
## Run
  - `npm run local` - builds application with local env settings and makes it accessible on http://localhost:4200
  - `npm run dev` - builds application with dev env settings and makes it accessible on http://localhost:4200
  - `npm run stage` - builds application with stage env settings and makes it accessible on http://localhost:4200
  - `npm run prod` - builds application with prod env settings and makes it accessible on http://localhost:4200
  - `npm run start:dev` - builds application in a dist folder with dev env settings and serves static content using [local-web-server](https://www.npmjs.com/package/local-web-server) on port 3011. 
    This mode is interesting cause it rewrites urls so that app is accessible on http://localhost:3011/tools
