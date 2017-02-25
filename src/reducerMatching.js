/**
* reducerMatching
* @class
* @author Roberto Oliveira
* @see {@link http://github.com/wouterbulten/kalmanjs}
* @version 0.5.0
* @license MIT
* @preserve
*/

import {
  append,
  cond,
  equals,
  always,
  T,
  curry,
  head,
  last,
  pipe,
  type,
  unless,
  call
} from 'ramda';

/**
  * A curried function for reducer matching
  * @param  {Array} ...conditions An array of arrays. The children has the pattern [TYPE, reducer(state, action)]
  * @param  {Object} state The state of redux
  * @param  {Object} action The Action of Redux
  * @return {Object} The new state
  */
const reducerMatching = (...conditions) => curry((state, action) => {
  const isNotAFunction = value => type(value) !== 'Function';

  //  Object|Function -> Object
  const callIfIsAFunction = unless(
    isNotAFunction,
    func => func(state, action)
  );

  // Array -> String
  const premise = pipe(head, equals);

  // Array -> Object
  const reaction = pipe(last, callIfIsAFunction, always);

  // Array -> false | Object
  const computeReactionOnlyWhenNecessary = condition => (
    premise(condition)(action.type) &&
    reaction(condition)
  );

  // Array -> Array
  const byPremiseAndReaction = condition => [
    premise(condition),
    computeReactionOnlyWhenNecessary(condition)
  ];

  const mappedConditions = conditions.map(pipe(
    callIfIsAFunction,
    byPremiseAndReaction
  ));

  const returnDefault = [T, always(state)];
  const conditionsWithDefaultReturn = append(returnDefault, mappedConditions);

  return cond(conditionsWithDefaultReturn)(action.type);
});

export default reducerMatching;
