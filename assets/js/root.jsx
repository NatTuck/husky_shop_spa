
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function root_init(node) {
  let prods = window.products;
  ReactDOM.render(<Root products={prods} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_form: {email: "", password: ""},
      session: null,
      products: props.products,
    };

    //this.fetch_products();
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
      }
    });
  }

  update_login_form(data) {
    let form1 = _.assign({}, this.state.login_form, data);
    let state1 = _.assign({}, this.state, { login_form: form1 });
    this.setState(state1);
  }

  render() {
    return <div>
      <Header session={this.state.session} root={this} />
      <ProductList products={this.state.products} />
    </div>;
  }
}

function Header(props) {
  let {root, session} = props;
  let session_info;
  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input type="email" placeholder="email"
             onChange={(ev) => root.update_login_form({email: ev.target.value})} />
      <input type="password" placeholder="password"
             onChange={(ev) => root.update_login_form({password: ev.target.value})} />
      <button className="btn btn-secondary" onClick={() => root.login()}>Login</button>
    </div>;
  }
  else {
    session_info = <div className="my-2">
      <p>Logged in as {session.user_id}</p>
    </div>
  }

  return <div className="row my-2">
    <div className="col-6">
      <h1>Husky Shop</h1>
    </div>
    <div className="col-6">
      {session_info}
    </div>
  </div>;
}

function ProductList(props) {
  let prods = _.map(props.products, (p) => <Product key={p.id} product={p} />);
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {product} = props;
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      <p className="card-text">{product.desc} <br/>
      price: {product.price}</p>
    </div>
  </div>;
}

