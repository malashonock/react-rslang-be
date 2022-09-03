const { OK, NO_CONTENT } = require('http-status-codes');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const router = require('express').Router({ mergeParams: true });
const statisticService = require('./statistic.service');
const { statId, statistics } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');
const extractQueryParam = require('../../utils/getQueryDateParameter');

router.get('/', async (req, res) => {
  const date = extractQueryParam(req.query.date, null);

  if (date && date.toString() === 'Invalid Date') {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the date must be a valid ISO date string'
    );
  }

  const userStats = await statisticService.getAll(req.userId, {
    date
  });

  res.status(OK).send(userStats.map(statistic => statistic.toResponse()));
});

router.get('/:statId', validator(statId, 'params'), async (req, res) => {
  const statistic = await statisticService.get(req.userId, req.params.statId);
  res.status(OK).send(statistic.toResponse());
});

router.post('/', validator(statistics, 'body'), async (req, res) => {
  const statistic = await statisticService.save(req.userId, req.body);
  res.status(OK).send(statistic.toResponse());
});

router.put(
  '/:statId',
  validator(statId, 'params'),
  validator(statistics, 'body'),
  async (req, res) => {
    const statistic = await statisticService.update(
      req.userId,
      req.params.statId,
      req.body
    );
    res.status(OK).send(statistic.toResponse());
  }
);

router.delete('/:statId', validator(statId, 'params'), async (req, res) => {
  await statisticService.remove(req.params.statId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
