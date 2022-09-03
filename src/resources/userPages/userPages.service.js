const userPagesRepo = require('./userPages.db.repository');

const getUserPages = async (userId, conditions) =>
  userPagesRepo.getUserPages(userId, conditions);

module.exports = { getUserPages };
