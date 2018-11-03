
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import UserList from './user_list';
import ProductList from './product_list';
import Cart from './cart';

export default function root_init(node) {
  ReactDOM.render(<Root products={window.products} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      users: [],
      cart: [],
      session: null,
      add_item_forms: new Map(),
    }

    this.fetch_products();
    this.fetch_users();
    this.fetch_cart();
    this.create_session("bob@example.com", "pass1");
  }

  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_products() {
    this.fetch_path(
      "/api/v1/products",
      (resp) => {
        let counts1 = new Map(this.state.add_cart_forms);
        _.each(resp.data, (pp) => {
          if (!counts1.has(product.id)) {
            counts1.set(product.id, 1);
          }
        });
        let state1 = _.assign({}, this.state, { 
            products: resp.data,
            add_item_forms: counts1,
        });
        this.setState(state1);
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    );
  }

  fetch_cart() {
    // TODO: Pass user_id to server
    this.fetch_path(
      "/api/v1/cart_items",
      (resp) => {
        let state1 = _.assign({}, this.state, { cart: resp.data });
        this.setState(state1);
      }
    );
  }

  set_item_count(id, count) {
    let counts1 = new Map(this.state.add_item_forms);
    counts1.set(id, count);
    let state1 = _.assign({}, this.state, { add_item_forms: counts1 });
    this.setState(state1);
  }

  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
      }
    });
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  add_to_cart(product_id) {
    let user_id = this.state.session.user_id;
    let count = $('#item-count-' + product_id).val();
    this.send_post(
      "/api/v1/cart_items",
      {cart_item: {product_id, user_id, count}},
      (resp) => {
        // Plan A
        this.fetch_cart();

        // Plan B
        // Just add this one item.
      },
    );
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header root={this} />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <ProductList root={this} counts={this.state.add_item_forms} 
                             products={this.state.products} />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList users={this.state.users} />
              } />
            </div>
            <div className="col-4">
                <Cart root={this} cart={this.state.cart} />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  let {root} = props;
  function fetch_users() {
    root.fetch_users();
  }

  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"}>Husky Shop</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={fetch_users}>Users</Link></p>
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


