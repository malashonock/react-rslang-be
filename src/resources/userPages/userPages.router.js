const { OK } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const wordService = require('./userPages.service');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

router.get('/', async (req, res) => {
  const page = extractQueryParam(req.query.page, null);
  const group = extractQueryParam(req.query.group, null);

  if (isNaN(page) || isNaN(group)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: the group, page numbers should be valid integers'
    );
  }

  if (group === null && page !== null) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters: if page number is specified, group number must be specified, too'
    );
  }

  const pages = await wordService.getUserPages(req.userId, { group, page });
  res.status(OK).send(pages);
});

module.exports = router;
