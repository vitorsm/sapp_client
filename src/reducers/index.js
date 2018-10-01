import { combineReducers } from 'redux';
import accountLoginReducer from './accountLoginReducer';
import usersReducer from './usersReducer';
import userReducer from './usersReducer';
import permissionsReducer from './permissionsReducer';
import controlModulesReducer from './controlModulesReducer';
import placesReducer from './placesReducer';
import placeReducer from './placeReducer';
import pinTypesReducer from './pinTypesReducer';

export default combineReducers({
    accountLogin: accountLoginReducer,
    users: usersReducer,
    user: userReducer,
    permissions: permissionsReducer,
    controlModules: controlModulesReducer,
    places: placesReducer,
    place: placeReducer,
    pinTypes: pinTypesReducer
});
