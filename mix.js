'use strict';

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(process.env.algolia_index, process.env.algolia_key);
const mixes = algolia.initIndex('essential_mixes')

mixes.setSettings({
  paginationLimitedTo: 1500
});

const errorHandler = (err) => {
  return {
    statusCode: err.statusCode,
    message: err.message
  }
}

module.exports.list = (event, context, callback) => {
  var browseMixes = mixes.browseAll();
  var listofMixes = [];

  browseMixes.on('result', function onResult(content){
    listofMixes = listofMixes.concat(content.hits);
  });
  browseMixes.on('end', function onEnd(){
    const response = {
      statusCode: 200,
      body: JSON.stringify(listofMixes)
    };

    callback(null, response);
  });

};

module.exports.get = (event, context, callback) => {
  const params =  {
    id: event.pathParameters.id
  }

  mixes.getObject(params.id, function(err, content) {

    if (err) {
      const response = {
        statusCode: errorHandler(err).statusCode,
        body: {
          status: errorHandler(err).statusCode,
          message: errorHandler(err).message
        }
      }
      callback(null, response);
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(content)
      }
      callback(null, response);
    }

  });
};

module.exports.create = (event, context, callback) => {
  mixes.addObjects(event, function(err, content) {
    if (err) {
      const response = {
        statusCode: errorHandler(err).statusCode,
        body: {
          status: errorHandler(err).statusCode,
          message: errorHandler(err).message
        }
      }
      callback(null, response);
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(content)
      }
      callback(null, response);
    }
  });

};

module.exports.update = (event, context, callback) => {
  mixes.partial_update_object(event, function(err, content) {
    if (err) {
      const response = {
        statusCode: errorHandler(err).statusCode,
        body: {
          status: errorHandler(err).statusCode,
          message: errorHandler(err).message
        }
      }
      callback(null, response);
    } else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(content)
      }
      callback(null, response);
    }
  });

};
