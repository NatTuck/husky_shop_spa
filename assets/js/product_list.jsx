
import React from 'react';
import _ from 'lodash';

export default function ProductList(props) {
  let {products, root} = props;
  let prods = _.map(products, (p) => <Product key={p.id} product={p} root={root} />);
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {product, root} = props;
  let count = root.state.add_cart_forms.get(product.id) || 1;

  function update(ev) {
    root.update_add_form_count(product.id, ev.target.value);
  }
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      <p className="card-text">
        {product.desc} <br/>
        price: {product.price}
      </p>
      <div className="form-inline">
        <div className="form-group">
          <input type="number" className="form-control col-3 m-1" value={count}
                 onChange={update} />
          <button className="btn btn-primary m-1"
                 onClick={() => root.add_to_cart(product.id)}>Add</button>
        </div>
      </div>
    </div>
  </div>;
}

