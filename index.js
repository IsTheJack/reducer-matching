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

// Array (conditions) -> Object (state) -> Object (action) -> Object (new state)
export const reducerMatching = (...conditions) => curry((state, action) => {
  // * -> Boolean
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
