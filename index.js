const D = require('date-fp');
const S = require('sanctuary');
const $ = require('sanctuary-def');

const a = $.TypeVariable('a');
const b = $.TypeVariable('b');

const $TimeUnit = $.EnumType([
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days']);

const $TimeUnitFull = $.EnumType([
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
  'years']);

const $TimeUnitGet = $.EnumType([
  'milliseconds',
  'seconds',
  'minutes',
  'hours',
  'date',
  'month',
  'year']);

const $Either = $.NullaryType(
  'sanctuary-date-poc/Either',
  x => x.isRight || x.isLeft
);

const env = $.env.concat([$.ValidDate, $.ValidNumber, $.Integer, $TimeUnit,
  $TimeUnitFull, $TimeUnitGet, $Either]);
const def = $.create(env);

const add = (step, count, date) => {
  const add = D.add(step, count, date);
  return D.isValid(add) ? S.Right(add) : S.Left(add)
};

const set = (step, count, date) => {
  const set = D.set(step, count, date);
  return D.isValid(set) ? S.Right(set) : S.Left(set)
};

module.exports = {
  add: def('add', {}, [$TimeUnitFull, $.Number, $.ValidDate, $Either], add),
  convertTo: def('convertTo', {}, [$TimeUnit, $.ValidDate, $.ValidNumber], D.convertTo),
  diff: def('diff', {}, [$TimeUnitFull, $.ValidDate, $.ValidDate, $.ValidNumber], D.diff),
  equals: def('equals', {}, [$.ValidDate, $.ValidDate, $.Boolean], D.equals),
  get: def('get', {}, [$TimeUnitGet, $.ValidDate, $.ValidNumber], D.get),
  isLeapYear: def('isLeapYear', {}, [$.ValidDate, $.Boolean], D.isLeapYear),
  isValid: def('isValid', {}, [$.Any, $.Boolean], D.isValid),
  max: def('max', {}, [$.Array($.ValidDate), $.ValidDate], D.max),
  min: def('min', {}, [$.Array($.ValidDate), $.ValidDate], D.min),
  set: def('set', {}, [$TimeUnitGet, $.Number, $.ValidDate, $Either], set),
  unixTime: def('unixTime', {}, [$.ValidDate, $.Integer], D.unixTime)
};