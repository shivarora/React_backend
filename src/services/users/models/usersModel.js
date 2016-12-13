"use Strict";

import Mongoose from "mongoose";

const Schema = Mongoose.Schema;
const Mixed  = Schema.Types.Mixed;

let addressSchema = new Schema({
    "_id": Schema.Types.Mixed,
    "addressNickName": String,
    "title": String,
    "companyName": String,
    "firstName": String,
    "lastName": String,
    "addressLine1": String,
    "addressLine2": String,
    "city": String,
    "state": String,
    "postalCode": String,
    "countryCode": String, //default to UK
    "addressPhoneNumber": String,
    "isDefaultShippingAddress": {type: Boolean, default: 0},
    "isDefaultBillingAddress": {type: Boolean, default: 0}
});

let userSchema = new Schema({
        title: { type: String, required:true },
        customerId: { type: String, required:true , unique: true },
        firstName: { type: String, required:true },
        lastName: { type: String, required:true },
        allowPromotions: { type: Boolean, default: 0 },
        email: { type: String, unique: true, required:true, index: true },
        password: { type: String, required:true },
        roles: Array,
        salt:  { type: String, required:true },
        telephone: String,
        additionalTelephone: String,
        vatRegistered: { type: Boolean, default: 0 },
        companyName: String,
        vatNumber: String,
        securityQuestion: String,
        securityAnswer: String,
        deleted: { type: Boolean, default: 0 },
        userConversion: { type: Boolean, default: 1 },
        createdAt    : { type: Date },
        "internalStatus" : {
            userRegistration : { type: Boolean, default: 1 },
            updatePassword : { type: Boolean, default: 0 }
        },
        updatedAt : { type: Date },
        forgotPassword: {
            token: String,
            expiryDate: Date,
            sendMessage: { type: Boolean, default: 0 }
        },
        addresses: [addressSchema]
    },
    {
        shardKey: {
            "customerId": 1
        }
    }
);

userSchema.pre('save', function (next) {
    let now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export default {name: 'users', 'schema': userSchema};
