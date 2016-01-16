const D = require('date-fp');
const S = require('sanctuary');
const $ = require('sanctuary-def');

const a = $.TypeVariable('a');
const b = $.TypeVariable('b');

const $TimeUnit = $.NullaryType(
  'sanctuary-date-poc/TimeUnit',
  x => typeof x === 'string' && ['milliseconds',
    'seconds',
    'minutes',
    'hours',
    'days'].indexOf(x) !== -1
);

const $TimeUnitFull = $.NullaryType(
  'sanctuary-date-poc/TimeUnitFull',
  x => typeof x === 'string' && ['milliseconds',
    'seconds',
    'minutes',
    'hours',
    'days',
    'months',
    'years'].indexOf(x) !== -1
);

const $Either = $.NullaryType(
  'sanctuary-date-poc/Either',
  x => x.isRight || x.isLeft
);

const env = $.env.concat([$.ValidDate, $.ValidNumber, $TimeUnit, $TimeUnitFull, $Either]);
const def = $.create(env);

const add = (step, count, date) => {
  const add = D.add(step, count, date);
  return D.isValid(add) ? S.Right(add) : S.Left(add)
};

module.exports = {
  add: def('add', {}, [$TimeUnitFull, $.Number, $.ValidDate, $Either], add),
  convertTo: def('convertTo', {}, [$TimeUnit, $.ValidDate, $.ValidNumber], D.convertTo),
  diff: def('diff', {}, [$TimeUnitFull, $.ValidDate, $.ValidDate, $.ValidNumber], D.diff),
  equals: def('equals', {}, [$.ValidDate, $.ValidDate, $.Boolean], D.equals)
};