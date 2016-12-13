'use strict';

import _        from 'lodash';
import When     from 'when';
import Mongoose from 'mongoose';

Mongoose.Promise = When.Promise;

export default class MongoDbConnectionHandler {
    constructor() {
        this._connectionList = [];
    }

    /**
     * Get Mongo DB connection by provided connection string
     *
     * @param connectionString Connection sting
     * @returns {Promise}
     */
    getConnection(connectionString) {

        // Check if connections string provided
        if(_.isEmpty(connectionString)) {
            return When.reject('Connection string is missing');
        }

        var connection = _.find(this._connectionList, {connectionString: connectionString});

        return When.promise((resolve, reject) => {
            if(_.isUndefined(connection)) {

                var self = this;

                // Initialize connection
                var newConnection = Mongoose.createConnection(connectionString);

                newConnection.on('error', function(err) {
                    err.name = 'MongoDB';
                    reject(err);
                });

                newConnection.once('open', function() {
                    self._connectionList.push({connectionString: connectionString, db: newConnection});
                    console.log("New MongoDB connection established");
                    resolve(newConnection);
                });
            } else {
                console.log("Using existing MongoDb Connection");
                resolve(connection.db);
            }
        });
    }
}
