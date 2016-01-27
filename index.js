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

const $Either = $.BinaryType(
  'sanctuary/Either',
  function(x) { return x != null && x['@@type'] === 'sanctuary/Either'; },
  function(either) { return either.isLeft ? [either.value] : []; },
  function(either) { return either.isRight ? [either.value] : []; }
);

const $InvalidDate = $.NullaryType(
  'sanctuary-date-poc/Either',
  function(x) {return !D.isValid(x)}
);

const env = $.env.concat([$.ValidDate, $InvalidDate, $.ValidNumber, $.Integer, $TimeUnit,
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

const parse = (format, dateStr) => {
  const date = D.parse(format, dateStr);
  return D.isValid(date) ? S.Right(date) : S.Left(date)
};

module.exports = {
  add: def('add', {}, [$TimeUnitFull, $.Integer, $.ValidDate, $Either($InvalidDate, $.ValidDate)], add),
  convertTo: def('convertTo', {}, [$TimeUnit, $.ValidDate, $.ValidNumber], D.convertTo),
  diff: def('diff', {}, [$TimeUnitFull, $.ValidDate, $.ValidDate, $.Integer], D.diff),
  equals: def('equals', {}, [$.ValidDate, $.ValidDate, $.Boolean], D.equals),
  format: def('format', {}, [$.String, $.ValidDate, $.String], D.format),
  get: def('get', {}, [$TimeUnitGet, $.ValidDate, $.Integer], D.get),
  isLeapYear: def('isLeapYear', {}, [$.ValidDate, $.Boolean], D.isLeapYear),
  isValid: def('isValid', {}, [$.Any, $.Boolean], D.isValid),
  max: def('max', {}, [$.Array($.ValidDate), $.ValidDate], D.max),
  min: def('min', {}, [$.Array($.ValidDate), $.ValidDate], D.min),
  parse: def('parse', {}, [$.String, $.String, $Either($InvalidDate, $.ValidDate)], parse),
  set: def('set', {}, [$TimeUnitGet, $.Integer, $.ValidDate, $Either($InvalidDate, $.ValidDate)], set),
  unixTime: def('unixTime', {}, [$.ValidDate, $.Integer], D.unixTime)
};

console.log(D.parse('q', '2010-01-01'));
console.log(D.parse('MMM Do, YYYY', 'January 1st, 2015'));