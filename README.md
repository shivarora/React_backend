# Cromwell Ordertrack SNS Handler

Polls the database on an event to send messages to Distributed AWS Simple Notification Service

## Config

> The package `dotenv` is a development dependency and only included during `npm run debug`

## To run in development mode

If you look in `package.json` there are plenty of npm scripts to run.  The ones you will be mostly be interested in
during development are:

 - **npm run debug**: Runs the server in debug mode. This autoreloads on changes to the source code
 - **npm test**: Runs all the linting and unit tests
 - **npm run watch:test**: Runs the unit tests, watching for changes
 - **npm run coverage**: Runs the coverage tests and produces a report (available to view in
    `./coverage/lcov-report/index.html`)

## To run in deployed mode

Build and run the project using the following commands:
    npm run build

