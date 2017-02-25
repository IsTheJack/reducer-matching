# reducer-matching
A functional redux utility to replace the switch case statement.

Get the pattern below as alternative to switch case statement

```javascript
import reducerMatching from 'reducer-matching';

const appInitialState = {};

const app = (state = appInitialState, action) => reducerMatching(
  [ types.INC_COUNT,            incrementCounter  ],
  [ types.DEC_COUNT,            decrementCounter  ],
  [ types.FETCH_USERS,          fetchUsers        ],
  [ types.FETCH_USERS_SUCCESS,  fetchUsersSuccess ],
  [ types.FETCH_USERS_FAILURE,  fetchUsersFailure ]
)(state, action);
```

## Comming soon:
* Tests
* More examples and documentation
