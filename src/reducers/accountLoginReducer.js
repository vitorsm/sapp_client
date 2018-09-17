import { FETCH_ACCOUNT_LOGIN } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
      case FETCH_ACCOUNT_LOGIN:
        if (action.status !== undefined && action.status.response !== undefined) {
          var obj = {
            error: action.status.response.status,
            date: new Date()
          };
  
          return obj;
        }
        return action.payload || false;
      default:
        return state;
    }
  }
  