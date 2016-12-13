"use strict";
import config from "./config.json";
import express from "express";
import  bodyParser from "body-parser";

/* Files */
import {Logger} from "./lib/logger";
import MongoDbConnectionHandler from "./lib/MongoDbHandler/MongoDbConnectionHandler";
import MongoDbDataModelProvider from "./lib/MongoDbHandler/MongoDbDataModelProvider";
import {UsersStore} from "./services/users/usersStore";
import {UsersHandler} from "./services/users/usersHandler";
import {UsersRoute} from "./services/users/usersRoute";


let logger = new Logger();
let mongoDbConnectionHandler  = new MongoDbConnectionHandler();
let mongoDbDataModelProvider = new MongoDbDataModelProvider(mongoDbConnectionHandler);
let usersStore = new UsersStore(logger, mongoDbDataModelProvider, config.db.mongo.string);
let usersHandler = new UsersHandler(logger, usersStore);
let usersRoute = new UsersRoute(logger,usersHandler);


var app = express();

app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '50mb',
    extended: true
}));

//MiddelWare
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//User
app.get("/user/:id", usersRoute.getUser());
app.post("/createUser", usersRoute.createUser());

app.listen(7000, () => {
    logger.info("System Listen on port " + 7000);
});



