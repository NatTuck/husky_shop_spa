
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  Application state layout
  {
    // Session
    session: null, // { token, user_id }

    // DB Caches
    products: props.products, // List of Product
    users: [], // List of User
    cart: [], // List of CartItem

    // Forms
    login_form: { email: "", password, "" },
    add_item_forms: new Map(), // { product_id => count }
  }
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function products(state = [], action) {
  switch (action.type) {
  case 'PRODUCT_LIST':
    return action.data;
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state;
  }
}

function cart(state = [], action) {
  switch (action.type) {
  case 'CART_LIST':
    return action.data;
  case 'CART_DELETE':
    return _.filter(state, (item) => item.id != action.cart_item_id);
  default:
    return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  default:
    return state;
  }
}

let login_form0 = {email: "", password: ""};
function login_form(state = login_form0, action) {
  return state;
}

function add_item_forms(state = new Map(), action) {
  switch (action.type) {
  case 'UPDATE_ADD_CART_FORM':
    let state1 = new Map(state);
    state1.set(action.product_id, action.count);
    return state1;
  default:
    return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({products, users, cart, session,
                                 login_form, add_item_forms});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;

