import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function ProductList(props) {
  let {products, counts, dispatch} = props;
  let prods = _.map(products, (pp) =>
    <Product key={pp.id} dispatch={dispatch}
             product={pp} count={counts.get(pp.id)} />
  );
  return <div className="row">
    {prods}
  </div>;
}

function Product(props) {
  let {product, root, count, dispatch} = props;
  function count_changed(ev) {
    let action = {
      type: 'UPDATE_ADD_CART_FORM',
      product_id: product.id,
      count: ev.target.value,
    };
    dispatch(action);
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
               style={{width: "8ex"}} onChange={count_changed} />
        <button className="btn btn-primary"
                onClick={() => api.add_to_cart(product.id)}>
          Add to Cart
        </button>
      </p>
    </div>
  </div>;
}

function state2props(state) {
  console.log("rerender", state);
  return {
    products: state.products,
    counts: state.add_item_forms,
  };
}

// Export result of curried function call.
export default connect(state2props)(ProductList);
