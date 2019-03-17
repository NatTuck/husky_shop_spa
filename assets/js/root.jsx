
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import api from './api';

import Header from './header';
import UserList from './user_list';
import ProductList from './product_list';
import Cart from './cart';

export default function root_init(node, store) {
  let prods = window.products;
  ReactDOM.render(
    <Provider store={store}>
      <Root products={prods} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    api.create_session("bob@example.com", "password");
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

