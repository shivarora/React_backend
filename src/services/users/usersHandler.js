"use Strict";

export class UsersHandler {
    constructor(logger, usersStore){
        this._logger = logger;
        this._usersStore = usersStore;
    }

    createUser(data){
        return this._usersStore.createUser(data)
            .then(result => {
                return result;
            })
    }

    /**
     * @param data
     * @returns {*[]}
     */
    getUser(id){
        this._usersStore.getUserById(id)
            .then(result => {
                return result;
            });
    }
}
