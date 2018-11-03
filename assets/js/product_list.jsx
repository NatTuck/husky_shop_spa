import React from 'react';
import _ from 'lodash';

export default function ProductList(props) {
  let {root, products, counts} = props;
  let prods = _.map(products, (pp) => 
      <Product root={root} key={pp.id} product={pp} count={counts.get(pp.id)} />);
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {product, root, count} = props;
  function changed(ev) {
    root.set_item_count(product.id, ev.target.value);
  }
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      <p className="card-text">
        {product.desc} <br />
        price: {product.price}
      </p>
      <p className="form-inline">
        <input className="form-control" value={count||1} type="number"
               style={{width: "8ex"}} onChange={changed} />
        <button className="btn btn-primary"
                onClick={() => root.add_to_cart(product.id)}>
          Add to Cart
        </button>
      </p>
    </div>
  </div>;
}
