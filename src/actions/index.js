import axios from 'axios';
import {
    FETCH_ACCOUNT_LOGIN,
    FETCH_USERS,
    FETCH_USER,
    FETCH_PERMISSIONS
} from './types';

// const serverURI = "http://192.168.0.101:8087";
const serverURI = "http://192.168.43.238:8087"

var token = null;

export const fetchAccountLogin = (data) => async dispatch => {

    await axios.get(serverURI + "/serv/auth/authenticate?login=" 
        + data.login + "&password=" + data.password)
        .then(
            (res) => {
                console.log(res);
                token = res.data.token;
                dispatch({ type: FETCH_ACCOUNT_LOGIN, payload: res.data, status: res.status });
            },
            (error) => {
                console.log("deu ruim");
                console.log(error);
                dispatch({ type: FETCH_ACCOUNT_LOGIN, payload: null, status: error });
            }
        );
};

export const fetchLogoff = () => async dispatch => {
    token = null;
    dispatch({ type: FETCH_ACCOUNT_LOGIN, payload: null, status: undefined });
};

export const fetchUsers = (data) => async dispatch => {
    let address = serverURI + "/serv/user";
    if (data !== undefined && data.id !== undefined)
        address += "?userId=" + data.id;

    console.log(address, { headers: { "X-Auth-Token": token } });

    await axios.get(address,
        { headers: { "X-Auth-Token": token } })
        .then(
            (res) => {
                console.log(res);
                dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
            },
            (error) => {
                dispatch({ type: FETCH_USERS, payload: null, status: error });
            }
        );
};

export const deleteUser = (data) => async dispatch => {
    let address = serverURI + "/serv/user/" + data.id;

    console.log(address, { headers: { "X-Auth-Token": token } });

    await axios.delete(address,
        { headers: { "X-Auth-Token": token } })
        .then(
            (res) => {
                console.log(res);
                dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
            },
            (error) => {
                dispatch({ type: FETCH_USERS, payload: null, status: error });
            }
        );
}

export const sendUser = (data) => async dispatch => {
    console.log("vai enviar isso", data);
    // se tiver id quer dizer que um put
    if (data.id !== undefined && data.id !== null && data.id !== 0) {
        await axios.put(serverURI + "/serv/user",
            data,
            { headers: { "X-Auth-Token": token } })
        .then(
            (res) => {
                console.log(res);
                dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
            },
            (error) => {
                console.log(error);
                dispatch({ type: FETCH_USERS, payload: null, status: error });
            }
        );
    } else {
        await axios.post(serverURI + "/serv/user",
            data,
            { headers: { "X-Auth-Token": token } })
        .then(
            (res) => {
                dispatch({ type: FETCH_USERS, payload: res.data, status: res.status });
            },
            (error) => {
                dispatch({ type: FETCH_USERS, payload: null, status: error });
            }
        );
    }

};

export const fetchPermissions = (data) => async dispatch => {
    let address = serverURI + "/serv/permission";

    console.log(address, { headers: { "X-Auth-Token": token } });

    await axios.get(address,
        { headers: { "X-Auth-Token": token } })
        .then(
            (res) => {
                console.log(res);
                dispatch({ type: FETCH_PERMISSIONS, payload: res.data, status: res.status });
            },
            (error) => {
                dispatch({ type: FETCH_PERMISSIONS, payload: null, status: error });
            }
        );
};

