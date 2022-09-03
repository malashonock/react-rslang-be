const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const StatisticSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    source: {
      type: String,
      required: false
    },
    newWords: {
      type: Number,
      required: false
    },
    learnedWords: {
      type: Number,
      required: false
    },
    guessedWords: {
      type: Number,
      required: false
    },
    totalWords: {
      type: Number,
      required: true
    },
    maxGuessedSeries: {
      type: Number,
      required: false
    },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'statistic' }
);

StatisticSchema.index(
  { userId: 1, gameDate: 1, gameType: 1 },
  { unique: true }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);
