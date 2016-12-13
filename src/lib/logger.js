"use strict";

/* Third-party modules */
var bunyan = require("bunyan");

export class Logger {

    constructor() {
        this._log = bunyan.createLogger({
            name: "Cromwell Order Track SNS Handler"
        });
    }

    info(message) {
        this._log.info(message);
    }

    warn(message) {
        this._log.warn(message);
    }

    error(message) {
        this._log.error(message);
    }

    fatal(message) {
        this._log.fatal(message);
    }
}
