"use Strict";

import UserSchema from './models/usersModel.js';
export class UsersStore {
    constructor(logger, dataModelProvider, dbConnectionString){
        this._logger = logger;
        this._dataModelProvider = dataModelProvider;
        this._dbConnectionString = dbConnectionString;
    }

    getUser(email) {
        return this._dataModelProvider.getModel(UserSchema, this._dbConnectionString)
            .then((UserModel) => {
                return UserModel.findOne({email: new RegExp('^'+this.stripSpecialChars(email)+'$', "i")}).exec();
            })
    }

    stripSpecialChars(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    createUser(user) {
        return this._dataModelProvider.getModel(UserSchema, this._dbConnectionString)
            .then((UserModel) => {
                return this.getUser(user.email)
                    .then((result) => {
                        if (result) {
                            /* Uh-oh, we're already registered */
                            let err = new Error('User already registered');
                            err.code = 11000;
                            throw err;
                        }
                        return UserModel;
                    });
            })
            .then((UserModel) => {
                let registeredUser = new UserModel({
                    title: user.title,
                    email: user.email,
                    salt: user.salt,
                    customerId: user.customerId,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    companyName: user.businessDetails.companyName,
                    vatNumber: user.businessDetails.vatNumber
                });

                return registeredUser.save();

            })

    }

    getUserById(customerId) {
        return this._dataModelProvider.getModel(UserSchema, this._dbConnectionString)
            .then((UserModel) => {
                return UserModel.findOne({customerId: customerId}).exec();
            })
    }
}
