
import React from 'react';
import _ from 'lodash';

export default function ProductList(props) {
  let {root, products, counts} = props;
  let prods = _.map(products, (pp) =>
    <Product key={pp.id} product={pp} root={root} count={counts.get(pp.id)||1} />);
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {root, product, count} = props;
  let changed = (ev) => {
    root.update_add_cart_count(product.id, ev.target.value);
  };

  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      <p className="card-text">
        {product.desc} <br />
        price: {product.price}
      </p>
      <p className="form-inline">
        <input className="form-control" style={{width: "8ex"}}
               type="number" value={count} onChange={changed} />
        <button className="btn btn-primary"
                onClick={() => root.add_to_cart(product.id)}>
          Add to Cart
        </button>
      </p>
    </div>
  </div>;
}

