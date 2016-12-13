import When from 'when';
import _ from 'lodash';

export default class MongoDbDataModelProvider {

    constructor(mongoDbConnectionHandler){
        this._mongoDbConnectionHandler = mongoDbConnectionHandler;
    }

    /**
     * Get Moongoose Data Model
     *
     * @param dataModel
     * @param connectionString
     * @returns  {Promise}
     */

    getModel(dataModel, connectionString){
        return When()
            .then(() => {
                //check if connectionString is empty
                if(_.isEmpty(connectionString)){
                    throw new Error('ConnectionString is missing');
                }

                if(_.isEmpty(dataModel.name)){
                    throw new Error('DataModel name is missing');
                }

                if(_.isEmpty(dataModel.schema)){
                    throw new Error('DataModel schema is missing');
                }
                return this._mongoDbConnectionHandler.getConnection(connectionString);
            })
            .then( connection => {
                return connection.model(dataModel.name, dataModel.schema);
            })
    }
}
