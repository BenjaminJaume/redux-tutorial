const redux = require("redux");
const axios = require("axios");
const thunkMiddleWare = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const API_URL = "http://numbersapi.com/6/27/date?json";

const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAIL = "FETCH_DATA_FAIL";

const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

const fetchDataFail = (error) => {
  return {
    type: FETCH_DATA_FAIL,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };

    case FETCH_DATA_FAIL:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchData = () => {
  return function (dispatch) {
    dispatch(fetchDataRequest());
    axios
      .get(API_URL)
      .then((response) => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchDataFail(error));
      });
  };
};

const store = redux.createStore(reducer, applyMiddleware(thunkMiddleWare));

const unsubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});

store.dispatch(fetchData());

console.log("Updated state", store.getState().data);

// unsubscribe();
