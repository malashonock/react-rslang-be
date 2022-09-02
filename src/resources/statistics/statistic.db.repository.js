const Statistics = require('./statistic.model');
const { NOT_FOUND_ERROR, ENTITY_EXISTS } = require('../../errors/appErrors');
const ENTITY_NAME = 'statistic';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const getAll = async userId => Statistics.find({ userId });

const get = async (userId, statId) => {
  const statistic = await Statistics.findOne({ _id: statId, userId });
  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `statId: ${statId}`);
  }

  return statistic;
};

const save = async statistic => {
  try {
    return await Statistics.create(statistic);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new ENTITY_EXISTS(`such ${ENTITY_NAME} already exists`);
    } else {
      throw err;
    }
  }
};

const update = async (statId, statistic) =>
  Statistics.findOneAndUpdate(
    { _id: statId },
    { $set: statistic },
    { new: true }
  );

const remove = async statId => Statistics.deleteOne({ _id: statId });

module.exports = { getAll, get, save, update, remove };
