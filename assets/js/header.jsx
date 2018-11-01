
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  let {root} = props;

  let session_view = <div className="form-inline my-2">
    <input id="login-email" type="email" placeholder="email" />
    <input id="login-pass" type="password" placeholder="password" />
    <button className="btn btn-secondary">Login</button>
  </div>;

  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"} onClick={root.fetch_products.bind(root)}>Husky Shop</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
    </div>
    <div className="col-6">
    </div>
  </div>;
}

