import { combineReducers } from 'redux';
import accountLoginReducer from './accountLoginReducer';
import usersReducer from './usersReducer';
import userReducer from './usersReducer';
import permissionsReducer from './permissionsReducer';

export default combineReducers({
    accountLogin: accountLoginReducer,
    users: usersReducer,
    user: userReducer,
    permissions: permissionsReducer
});
