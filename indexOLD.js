const redux = require("redux");
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const BUY_CAKE = "BUY_CAKE";
const CHANGE_SHOPKEEPER_NAME = "CHANGE_SHOPKEEPER_NAME";
const BUY_ICECREAM = "BUY_ICECREAM";

// Action creators (Function that returns an action)
function buyCakes() {
  return {
    type: BUY_CAKE,
    info: "Action to buy a cake",
  };
}

function changeShopkeeperName({ shopkeeperName, age }) {
  return {
    type: CHANGE_SHOPKEEPER_NAME,
    info: "Action to change the name of the shopkeeper",
    shopkeeperName,
    age,
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "Action to decrement icecream number",
  };
}

const initialCakesState = {
  numberOfCakes: 10,
  shopkeeperName: "Mathis",
  age: 25,
};

const initialIceCreamState = {
  numberOfIceCreams: 20,
};

const cakesReducer = (state = initialCakesState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case CHANGE_SHOPKEEPER_NAME:
      return {
        ...state,
        shopkeeperName: action.shopkeeperName,
        age: action.age,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  cake: cakesReducer,
  iceCream: iceCreamReducer,
});

const store = redux.createStore(rootReducer, applyMiddleware(logger));

console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCakes());
store.dispatch(buyCakes());
store.dispatch(buyCakes());

store.dispatch(changeShopkeeperName({ shopkeeperName: "Alex", age: 40 }));

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

store.dispatch(buyCakes());

unsubscribe();
