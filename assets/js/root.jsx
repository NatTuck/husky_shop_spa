
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import Header from './header';
import UserList from './user_list';
import ProductList from './product_list';
import Cart from './cart';

export default function root_init(node) {
  let prods = window.products;
  ReactDOM.render(<Root products={prods} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_form: {email: "alice@example.com", password: "password"},
      add_cart_forms: new Map(),
      session: null,
      products: props.products,
      users: [],
      cart: [],
    };

    this.login();
    this.fetch_products();
    this.fetch_users();
  }

  fetch_products() {
    $.ajax("/api/v1/products", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { products: resp.data });
        this.setState(state1);
      },
    });
  }

  login() {
    $.ajax("/api/v1/auth", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(this.state.login_form),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data });
        this.setState(state1);
        this.fetch_cart();
      }
    });
  }

  update_login_form(data) {
    let form1 = _.assign({}, this.state.login_form, data);
    let state1 = _.assign({}, this.state, { login_form: form1 });
    this.setState(state1);
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    });
  }

  fetch_cart() {
    if (this.state.session == null) {
      return;
    }
    let user_id = this.state.session.user_id || -1;
    $.ajax(`/api/v1/cart_items?user_id=${user_id}`, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { cart: resp.data });
        this.setState(state1);
      }
    });
  }

  update_add_form_count(product_id, count) {
    let counts1 = new Map(this.state.add_cart_forms);
    counts1.set(product_id, count);
    let state1 = _.assign({}, this.state, { add_cart_forms: counts1 });
    this.setState(state1);
  }

  add_to_cart(product_id) {
    let user_id = this.state.session.user_id;
    let count = this.state.add_cart_forms.get(product_id) || 1;
    $.ajax("/api/v1/cart_items", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({cart_item: {product_id, user_id, count}}),
      success: (resp) => {
        //let cart1 = _.concat(this.state.cart, [resp.data]);
        //let state1 = _.assign({}, this.state, { cart: cart1 });
        //this.setState(state1);
        this.fetch_cart();
      }
    });
  }

  delete_from_cart(item_id) {
    $.ajax(`/api/v1/cart_items/${item_id}`, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        this.fetch_cart();
      }
    });
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header session={this.state.session} root={this} />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <ProductList root={this} products={this.state.products} />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList root={this} users={this.state.users} />
              } />
            </div>
            <div className="col-4">
              <Cart root={this} items={this.state.cart} />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}

