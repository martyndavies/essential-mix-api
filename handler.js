'use strict';

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch(process.env.algolia_index, process.env.algolia_key);
const mixes = algolia.initIndex('essential_mixes')

mixes.setSettings({
  paginationLimitedTo: 1500
});

module.exports.mixes = (event, context, callback) => {
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
