
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function root_init(node) {
  ReactDOM.render(<Root products={window.products} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      session: null,
    };

    //this.fetch_products();
    this.create_session("bob@example.com", "pass1");
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


  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} render={() =>
            <ProductList products={this.state.products} />
          } />
          <Route path="/users" exact={true} render={() =>
            <p>Users page</p>
          } />
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"}>Husky Shop</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"}>Users</Link></p>
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

function ProductList(props) {
  let prods = _.map(props.products, (pp) => <Product key={pp.id} product={pp} />);
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {product} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      <p className="card-text">
        {product.desc} <br />
        price: {product.price}
      </p>
    </div>
  </div>;
}
