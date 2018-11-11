import axios from 'axios';
import {
    FETCH_ACCOUNT_LOGIN,
    FETCH_USERS,
    FETCH_USER,
    FETCH_PERMISSIONS,
    FETCH_CONTROL_MODULES,
    FETCH_PLACES,
    FETCH_PLACE,
    FETCH_PIN_TYPES,
    FETCH_CONTROL_MODULE,
    FETCH_INSTRUMENTS
} from './types';

const serverURI = "http://192.168.0.101:8087";
// const serverURI = "http://192.168.43.238:8087"
// const serverURI = "http://172.16.252.236:8087";


const methodType = {
    GET: 1,
    DELETE: 2,
    POST: 3,
    PUT: 4,
    POST_OR_PUT: 5,
    LOGOFF: 6,
    DEBUG_LOGIN: 7
};

export const request = {

    fetchUsers: {
        methodType: methodType.GET,
        address: serverURI + "/serv/user",
        params: [],
        variables: [],
        fetchType: FETCH_USERS
    },
    fetchControlModules: {
        methodType: methodType.GET,
        address: serverURI + "/serv/control-module",
        params: [],
        variables: [],
        fetchType: FETCH_CONTROL_MODULES
    },
    fetchAccountLogin: {
        methodType: methodType.GET,
        address: serverURI + "/serv/auth/authenticate",
        params: ["login", "password"],
        variables: [],
        fetchType: FETCH_ACCOUNT_LOGIN
    },
    deleteUser: {
        methodType: methodType.DELETE,
        address: serverURI + "/serv/user",
        params: [],
        variables: ["id"],
        fetchType: FETCH_USER
    },
    sendControlModule: {
        methodType: methodType.POST_OR_PUT,
        address: serverURI + "/serv/control-module",
        params: [],
        variables: [],
        fetchType: FETCH_CONTROL_MODULE
    },
    sendUser: {
        methodType: methodType.POST_OR_PUT,
        address: serverURI + "/serv/user",
        params: [],
        variables: [],
        fetchType: FETCH_USERS
    },
    fetchPermissions: {
        methodType: methodType.GET,
        address: serverURI + "/serv/permission",
        params: [],
        variables: [],
        fetchType: FETCH_PERMISSIONS
    },
    fetchLogoff: {
        methodType: methodType.LOGOFF,
        address: "",
        params: [],
        variables: [],
        fetchType: FETCH_ACCOUNT_LOGIN
    },
    fetchDebugLogin: {
        methodType: methodType.DEBUG_LOGIN,
        address: "",
        params: [],
        variables: [],
        fetchType: FETCH_ACCOUNT_LOGIN
    },
    fetchPlaces: {
        methodType: methodType.GET,
        address: serverURI + "/serv/place",
        params: [],
        variables: [],
        fetchType: FETCH_PLACES
    },
    sendPlace: {
        methodType: methodType.POST_OR_PUT,
        address: serverURI + "/serv/place",
        params: [],
        variables: [],
        fetchType: FETCH_PLACE
    },
    fetchPinTypes: {
        methodType: methodType.GET,
        address: serverURI + "/serv/pin-type",
        params: [],
        variables: [],
        fetchType: FETCH_PIN_TYPES
    },
    deletePlace: {
        methodType: methodType.DELETE,
        address: serverURI + "/serv/place",
        params: [],
        variables: ["id"],
        fetchType: FETCH_PLACE
    },
    fetchInstruments: {
        methodType: methodType.GET,
        address: serverURI + "/serv/pin",
        params: [],
        variables: [],
        fetchType: FETCH_INSTRUMENTS
    }
};

var token = null;

export const fetchDefault = (requestType, data) => async dispatch => {

    console.log("esse", requestType, data);

    let address = requestType.address;

    if (requestType.variables.length > 0) {
        address += "/";
        requestType.variables.map(variableName => {
            address += data[variableName] + "/";
        });
    }

    if (requestType.params.length > 0) {
        address += "?";
        requestType.params.map(paramName => {
            address += paramName + "=" + data[paramName] + "&";
        });
    }

    if (requestType.methodType === methodType.GET) {
        await axios.get(address,
            { headers: { "X-Auth-Token": token } })
            .then(
                (res) => {
                    if (requestType.fetchType === FETCH_ACCOUNT_LOGIN) {
                        token = res.data.token;
                    }
                    dispatch({ type: requestType.fetchType, payload: res.data, status: res.status });
                },
                (error) => {
                    dispatch({ type: requestType.fetchType, payload: null, status: error });
                }
            );
    } else if (requestType.methodType === methodType.DELETE) {
        await axios.delete(address,
            { headers: { "X-Auth-Token": token } })
            .then(
                (res) => {
                    dispatch({ type: requestType.fetchType, payload: res.data, status: res.status });
                },
                (error) => {
                    dispatch({ type: requestType.fetchType, payload: null, status: error });
                }
            );
    } else if (requestType.methodType === methodType.POST || 
        (requestType.methodType === methodType.POST_OR_PUT && data !== undefined && data.id !== undefined && data.id === 0)) {
        
        await axios.post(address,
            data,
            { headers: { "X-Auth-Token": token } })
        .then(
            (res) => {
                dispatch({ type: requestType.fetchType, payload: res.data, status: res.status });
            },
            (error) => {
                dispatch({ type: requestType.fetchType, payload: null, status: error });
            }
        );

    } else if (requestType.methodType === methodType.PUT || 
        (requestType.methodType === methodType.POST_OR_PUT && data !== undefined && data.id !== undefined && data.id !== 0)) {
        
        await axios.put(address,
            data,
            { headers: { "X-Auth-Token": token } })
        .then(
            (res) => {
                dispatch({ type: requestType.fetchType, payload: res.data, status: res.status });
            },
            (error) => {
                dispatch({ type: requestType.fetchType, payload: null, status: error });
            }
        );
    } else if (requestType.methodType === methodType.LOGOFF) {
        token = null;
        dispatch({ type: requestType.fetchType, payload: null, status: undefined });
    } else if (requestType.methodType === methodType.DEBUG_LOGIN) {
        
        let res = {
            data: {
                id: 1,
                name: "Usuário de debug",
                login: "login",
                password: null
            }
        };
        
        dispatch({ type: requestType.fetchType, payload: res.data, status: res.status });
    }
};

// export const fetchDebugLogin = (data) => async dispatch => {
//     let res = {
//         data: {
//             id: 1,
//             name: "Usuário de debug",
//             login: "login",
//             password: null
//         }
//     };
    
//     dispatch({ type: FETCH_ACCOUNT_LOGIN, payload: res.data, status: res.status });
// }

// export const fetchAccountLogin = (data) => async dispatch => {

//     console.log(serverURI + "/serv/auth/authenticate?login=" 
//     + data.login + "&password=" + data.password);
//     await axios.get(serverURI + "/serv/auth/authenticate?login=" 
//         + data.login + "&password=" + data.password)
//         .then(
//             (res) => {
//                 console.log(res);
//                 token = res.data.token;

//                 dispatch({ type: FETCH_ACCOUNT_LOGIN, payload: res.data, status: res.status });
//             },
//             (error) => {
//                 console.log("deu ruim");
//                 console.log(error);

//                 dispatch({ type: FETCH_ACCOUNT_LOGIN, payload: null, status: error });
//             }
//         );
// };

// export const fetchLogoff = () => async dispatch => {
//     token = null;
//     dispatch({ type: FETCH_ACCOUNT_LOGIN, payload: null, status: undefined });
// };

// export const fetchUsers = (data) => async dispatch => {
//     let address = serverURI + "/serv/user";
//     if (data !== undefined && data.id !== undefined)
//         address += "?userId=" + data.id;

//     await axios.get(address,
//         { headers: { "X-Auth-Token": token } })
//         .then(
//             (res) => {
//                 dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
//             },
//             (error) => {
//                 dispatch({ type: FETCH_USERS, payload: null, status: error });
//             }
//         );
// };

// export const deleteUser = (data) => async dispatch => {
//     let address = serverURI + "/serv/user/" + data.id;

//     console.log(address, { headers: { "X-Auth-Token": token } });

//     await axios.delete(address,
//         { headers: { "X-Auth-Token": token } })
//         .then(
//             (res) => {
//                 console.log(res);
//                 dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
//             },
//             (error) => {
//                 dispatch({ type: FETCH_USERS, payload: null, status: error });
//             }
//         );
// }

// export const sendControlModule = (data) => async dispatch => {
//     let address = serverURI + "/serv/control-module";

//     if (data.id !== undefined && data.id !== null && data.id !== 0) {
//         await axios.put(address,
//             data,
//             { headers: { "X-Auth-Token": token }})
//         .then(
//             (res) => {
//                 dispatch({ type: FETCH_CONTROL_MODULES, payload: res.data, status: res.status });
//             }, 
//             (error) => {
//                 dispatch({ type: FETCH_CONTROL_MODULES, payload: null, status: error });
//         });
//     } else {
//         await axios.post(address,
//             data,
//             { headers: { "X-Auth-Token": token }})
//         .then(
//             (res) => {
//                 dispatch({ type: FETCH_CONTROL_MODULES, payload: res.data, status: res.status });
//             }, 
//             (error) => {
//                 dispatch({ type: FETCH_CONTROL_MODULES, payload: null, status: error });
//         });
//     }
// }

// export const sendUser = (data) => async dispatch => {
//     // se tiver id quer dizer que um put
//     if (data.id !== undefined && data.id !== null && data.id !== 0) {
//         await axios.put(serverURI + "/serv/user",
//             data,
//             { headers: { "X-Auth-Token": token } })
//         .then(
//             (res) => {
//                 console.log(res);
//                 dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
//             },
//             (error) => {
//                 console.log(error);
//                 dispatch({ type: FETCH_USERS, payload: null, status: error });
//             }
//         );
//     } else {
//         await axios.post(serverURI + "/serv/user",
//             data,
//             { headers: { "X-Auth-Token": token } })
//         .then(
//             (res) => {
//                 dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
//             },
//             (error) => {
//                 dispatch({ type: FETCH_USERS, payload: null, status: error });
//             }
//         );
//     }

// };


// export const fetchPermissions = (data) => async dispatch => {
//     let address = serverURI + "/serv/permission";

//     console.log(address, { headers: { "X-Auth-Token": token } });

//     await axios.get(address,
//         { headers: { "X-Auth-Token": token } })
//         .then(
//             (res) => {
//                 console.log(res);
//                 dispatch({ type: FETCH_PERMISSIONS, payload: res.data, status: res.status });
//             },
//             (error) => {
//                 dispatch({ type: FETCH_PERMISSIONS, payload: null, status: error });
//             }
//         );
// };
