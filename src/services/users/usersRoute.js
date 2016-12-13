"use strict";

export class UsersRoute {
    constructor(logger, usersHandler){
        this._logger = logger;
        this._usersHandler = usersHandler;
    }

    /**
     * Create New User
     *
     * @param username
     * @param password
     * @returns {*[]}
     */

    createUser(){
        return [
            (req, res) => {
                console.log(req.body);
                this._usersHandler.createUser(req.body)
                    .then(result => {
                        let row = result.rows;
                        res.send({success : 1, message : "completed", data : {row}, retry: 0});
                    })
                    .catch(err => {
                        this._logger.error(err);
                        res.send({success : 0, message : "Error!", data : err, retry: 1});
                    });
            }
        ];
    }

    /**
     * @param username
     * @password password
     * @returns {*[]}
     */
    getUser(){
        return [
            (req, res) => {
                this._usersHandler.getUser(req.params.id)
                    .then(result => {
                        let row = result.rows;
                        res.send({success : 1, message : "completed", data : {row}, retry: 0});
                    })
                    .catch(err => {
                        this._logger.error(err);
                        res.send({success : 0, message : "Error!", data : JSON.stringify(err), retry: 1});
                    });
            }
        ];
    }
}
