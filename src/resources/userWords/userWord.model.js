const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const UserWordsSchema = new Schema(
  {
    wordId: { type: mongoose.Schema.Types.ObjectID, required: true },
    userId: { type: mongoose.Schema.Types.ObjectID, required: true },
    wasPlayed: { type: Boolean, required: false },
    correctGuessCount: { type: Number, required: false },
    wrongGuessCount: { type: Boolean, required: false },
    isDifficult: { type: Boolean, required: false },
    isLearned: { type: Boolean, required: false },
    optional: {
      type: Object,
      required: false
    }
  },
  { collection: 'userWords' }
);

UserWordsSchema.index({ wordId: 1, userId: 1 }, { unique: true });

addMethods(UserWordsSchema);

module.exports = mongoose.model('UserWords', UserWordsSchema);
