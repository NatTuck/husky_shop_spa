
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import Header from './header';
import Cart from './cart';
import UserList from './user_list';

export default function root_init(node) {
  ReactDOM.render(<Root products={window.products} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      users: [],
      session: null,
      cart: [],
    };

    //this.fetch_products();
    this.fetch_users();
    this.fetch_cart();
    this.create_session("bob@example.com", "pass1");
  }

  fetch_path(path, on_success) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: on_success,
    });
  }

  fetch_cart() {
    this.fetch_path(
      "/api/v1/cart_items",
      (resp) => {
        let state1 = _.assign({}, this.state, { cart: resp.data });
        this.setState(state1);
      }
    );
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
      }
    });
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

  remove_cart_item(id) {
    $.ajax("/api/v1/cart_items/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (_resp) => {
        let cart1 = _.filter(this.state.cart, (item) => item.id != id);
        let state1 = _.assign({}, this.state, { cart: cart1 });
        this.setState(state1);
      }
    });
  }

  send_post(path, req, on_success) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(req),
      success: on_success,
    });
  }

  add_to_cart(product_id) {
    let user_id = this.state.session.user_id;
    let count = $('#item-count-' + product_id).val();
    this.send_post(
      "/api/v1/cart_items",
      {cart_item: {product_id, user_id, count}},
      (resp) => {
        let cart1 = _.concat(this.state.cart, [resp.data]);
        let state1 = _.assign({}, this.state, { cart: cart1 });
        this.setState(state1);
      }
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
                <ProductList root={this} products={this.state.products} />
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

function ProductList(props) {
  let {root, products} = props;
  let prods = _.map(products, (pp) => <Product key={pp.id} product={pp} root={root} />);
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {root, product} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      <p className="card-text">
        {product.desc} <br />
        price: {product.price}
      </p>
      <p className="form-inline">
        <input className="form-control" style={{width: "8ex"}}
               type="number" defaultValue="1" id={"item-count-" + product.id} />
        <button className="btn btn-primary"
                onClick={() => root.add_to_cart(product.id)}>
          Add to Cart
        </button>
      </p>
    </div>
  </div>;
}
