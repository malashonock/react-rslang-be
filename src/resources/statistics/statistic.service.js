const statisticRepo = require('./statistic.db.repository');

const getAll = async (userId, conditions) =>
  statisticRepo.getAll(userId, conditions);

const get = async (userId, statId) => statisticRepo.get(userId, statId);

const save = async (userId, statistic) =>
  statisticRepo.save({ userId, ...statistic });

const update = async (userId, statId, statistic) =>
  statisticRepo.update(statId, { userId, ...statistic });

const remove = async statId => statisticRepo.remove(statId);

module.exports = { getAll, get, save, update, remove };
