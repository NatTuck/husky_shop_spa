
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 Our application state is:

 {
  products: [],    // List of Product
  users: [],       // List of User
  cart: [],        // List of CartItem
  session: null,   // Maybe<SessionInfo>
  add_item_forms: new Map(),   // Map<product_id => count>
 }

*/

function products(state0 = [], action) {
  switch (action.type) {
  case 'PRODUCT_LIST':
    return action.data;
  default:
    return state0;
  }
}

function users(state0 = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state0;
  }
}

function cart(state0 = [], action) {
  switch (action.type) {
  case 'CART_LIST':
    return action.data;
  default:
    return state0;
  }
}

function session(state0 = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  default:
    return state0;
  }
}

function add_item_forms(state0 = new Map(), action) {
  switch(action.type) {
  case 'UPDATE_ADD_CART_FORM':
    let state1 = new Map(state0);
    state1.set(action.product_id, action.count);
    return state1;
  default:
    return state0;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({products, users, cart, session, add_item_forms});
  let state1 = reducer(state0, action);

  console.log("state1", state1);
  return state1;
}

let store = createStore(root_reducer);
export default store;

