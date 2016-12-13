/**
 * Created by aroras on 15/10/2016.
 */
'use strict';
import elasticSearch from 'elasticsearch';
import When          from 'when';

class ElasticSearch {

    constructor(serverAddress) {
        this._serverAddress = serverAddress;
    }

    search(index, type, queryBody, limits) {
        let searchParams = {
            index: index,
            type: type,
            body: queryBody,
            size: 10000
        };

        if (limits != undefined) {
            searchParams.from = limits.from;
            searchParams.size = limits.size;
        }

        var client = this._connect();
        return client.search(searchParams)
            .catch(err => {
                err.name = "Elasticsearch";
                return When.reject(err);
            });
    }

    suggest(index, type, queryBody) {
        let searchParams = {
            index: index,
            type: type,
            body: queryBody
        };

        var client = this._connect();
        return client.suggest(searchParams)
            .catch(err => {
                err.name = "Elasticsearch";
                return When.reject(err);
            });
    }

    _connect() {
        return new elasticSearch.Client({host: this._serverAddress});
    }
}

export default ElasticSearch;
