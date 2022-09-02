const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const statisticService = require('./statistic.service');
const { statId, statistics } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const userStats = await statisticService.getAll(req.userId);
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
