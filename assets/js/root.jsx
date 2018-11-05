
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import api from './api';
import UserList from './user_list';
import ProductList from './product_list';
import Cart from './cart';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root products={window.products} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    api.create_session("bob@example.com", "pass1");
    api.fetch_products();
    api.fetch_users();
    api.fetch_cart();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <ProductList />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
            </div>
            <div className="col-4">
              <Cart />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"} onClick={() => api.fetch_products()}>Husky Shop</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={() => api.fetch_users()}>Users</Link></p>
    </div>
    <div className="col-6">
      <div className="form-inline my-2">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </div>;
}


