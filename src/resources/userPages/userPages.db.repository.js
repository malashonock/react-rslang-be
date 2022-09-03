const Word = require('../words/word.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getUserPages = async (userId, conditions) => {
  const filter = {};

  for (const searchParamKey in conditions) {
    if (Object.hasOwnProperty.call(conditions, searchParamKey)) {
      const searchParamValue = conditions[searchParamKey];

      if (searchParamValue !== null) {
        filter[searchParamKey] = searchParamValue;
      }
    }
  }

  return Word.aggregate()
    .match(filter)
    .lookup({
      from: 'userWords',
      localField: '_id',
      foreignField: 'wordId',
      pipeline: [
        {
          $match: {
            userId: new ObjectId(userId)
          }
        }
      ],
      as: 'userWords'
    })
    .addFields({
      userWord: {
        $first: '$userWords'
      }
    })
    .project({
      word: '$word',
      group: '$group',
      page: '$page',
      isLearned: '$userWord.isLearned'
    })
    .group({
      _id: {
        group: '$group',
        page: '$page'
      },
      totalWords: {
        $count: {}
      },
      learnedWords: {
        $sum: {
          $cond: [
            {
              $eq: ['$isLearned', true]
            },
            1,
            0
          ]
        }
      }
    })
    .addFields({
      isLearned: {
        $eq: ['$totalWords', '$learnedWords']
      }
    })
    .project({
      _id: 0,
      group: '$_id.group',
      page: '$_id.page',
      isLearned: '$isLearned'
    })
    .sort({
      group: 1,
      page: 1
    });
};

module.exports = { getUserPages };
