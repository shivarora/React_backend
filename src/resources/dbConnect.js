"use import";

import Mongoose from "mongoose";
import When from "when";
import _ from "lodash";

export default class dbConnect {

    constructor(){
        this._connectionList = [];
    }
    /**
    * Get MongoDb connection by providing connectionString
    * @params connectionString
    * @retruns {Promise}
     */

    getConnection(connectionString){

        if(_.isEmpty(connectionString)){
            return When.reject('Connection String is missing');
        }

        var connection = _.find(this._connectionList, {connectionString: connectionString});

        return When.promise((resolve, reject) => {
            //check if connection is exists
            if(_.isUndefined(connection)) {

                var self = this;
                var newConnection = Mongoose.createConnection(connectionString, {
                    mongos: true,
                    server: {socketOptions: {connectTimeoutMS: 30000}}
                });

                //Initialize the Connection
                newConnection.on('error', function (err) {
                    err.name = 'MongoDB';
                    reject(err);
                });

                newConnection.open('once', function () {
                    self._connectionList.push({connectionString: connectionString, db: newConnection});
                    resolve(newConnection);
                });
            }
            else{
                resolve(connection.db);
            }
        })
    }
}

