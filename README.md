# reducer-matching
A functional redux util to replace the switch case statement.

Get the pattern below as alternative to switch case statement.

## Instalation

The `reducerMatching` is a useful function and can replace the switch statement in the project, assuming a functional posture in the code.

``` npm install --save reducer-matching  ```

## reducerMatching(conditions: Array<reducerMatch>) : newState: Object

```javascript
var reducerMatch: [string, function] = [types.INC_COUNT, (state, action) => 'do something...'];
```

In case of no matches, the reducer matching will return the state without changes.

```javascript
import reducerMatching from 'reducer-matching';

const initialState = {};

const reducer = (state = initialState, action) => reducerMatching(
  [ types.INC_COUNT,            incrementCounter  ],
  [ types.DEC_COUNT,            decrementCounter  ],
  [ types.FETCH_USERS,          fetchUsers        ],
  [ types.FETCH_USERS_SUCCESS,  fetchUsersSuccess ],
  [ types.FETCH_USERS_FAILURE,  fetchUsersFailure ]
)(state, action);

// ... some reducers

function fetchUsersSuccess(state, action) {
  return {
    ...state,
    isFetchingUsers: false,
    users: action.payload,
  };
}

// ... other reducers

export default reducer;
```

## Running the Tests

The tests was make in Jest.

```
npm run test
```

## Contributing
Any PR is welcome! :D

## Built With
* [Ramda](http://ramdajs.com/) - A practical functional library for JavaScript programmers.

## Motivation
 * Before:
 ```javascript
 const reducer = (state = appInitialState, action) => {
  switch (action.type) {
    case types.INC_COUNT:
    return { ...state, count: state.count + 1 };
    case types.DEC_COUNT:
    return { ...state, count: state.count - 1 };
    case types.INC_TEN_COUNT:
    return { ...state, count: state.count + 10};
    case types.DEC_TEN_COUNT:
    return { ...state, count: state.count - 10 };
    case types.FETCH_USERS:
    return { ...state, isFetchingUsers: true };
    case types.FETCH_USERS_SUCCESS:
    return {
      ...state,
      isFetchingUsers: false,
      users: action.payload,
    };
    case types.FETCH_USERS_FAILURE:
    return {
      ...state,
      isFetchingUsers: false,
      users: null,
    };
    default:
    return state;
  }
};
 ```

 * After:
 ```javascript
 const reducer = (state = appInitialState, action) => reducerMatching(
  [ types.INC_COUNT,            incrementCounter  ],
  [ types.DEC_COUNT,            decrementCounter  ],
  [ types.INC_TEN_COUNT,        sumTenToCounter   ],
  [ types.DEC_TEN_COUNT,        subTenToCounter   ],
  [ types.FETCH_USERS,          fetchUsers        ],
  [ types.FETCH_USERS_SUCCESS,  fetchUsersSuccess ],
  [ types.FETCH_USERS_FAILURE,  fetchUsersFailure ]
)(state, action);
 ```

## Author
* [Roberto Oliveira](https://twitter.com/roliveiradev) - [IsTheJack](https://github.com/IsTheJack)

## Comming soon:
* More examples and documentation
