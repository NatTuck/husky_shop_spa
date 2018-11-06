import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function ProductList(props) {
  let {root, products, counts, dispatch} = props;
  let prods = _.map(products, (pp) =>
    <Product root={root} key={pp.id} product={pp}
             count={counts.get(pp.id)} dispatch={dispatch} />);
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {product, root, count, dispatch} = props;
  function changed(ev) {
    dispatch({
      type: 'UPDATE_ADD_CART_FORM',
      product_id: product.id,
      count: ev.target.value,
    });
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
                onClick={() => api.add_to_cart(product.id)}>
          Add to Cart
        </button>
      </p>
    </div>
  </div>;
}

function state2props(state) {
  console.log("render ProductList", state);

  return {
    products: state.products,
    counts: state.add_item_forms,
  };
}

export default connect(state2props)(ProductList);
