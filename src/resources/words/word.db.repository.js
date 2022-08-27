const Word = require('./word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';

const getAll = async conditions => {
  const filter = {};

  for (const searchParamKey in conditions) {
    if (Object.hasOwnProperty.call(conditions, searchParamKey)) {
      const searchParamValue = conditions[searchParamKey];

      if (searchParamValue !== null) {
        filter[searchParamKey] = searchParamValue;
      }
    }
  }

  return Word.find(filter);
};

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

module.exports = { getAll, get };
