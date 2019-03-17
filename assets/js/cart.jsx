
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import api from './api';

export default connect((state) => {return {cart: state.cart};})((props) => {
  let { cart } = props;

  let rows = _.map(cart, (item) =>
    <tr key={item.id}>
      <td>{ item.product.name }</td>
      <td>{ item.count }</td>
      <td>
        <button onClick={() => api.delete_cart_item(item.id)}
                className="btn btn-danger">
          Remove
        </button>
      </td>
    </tr>
  );

  return <div>
    <h2>Cart</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Item</th>
          <th>Count</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
  </div>;
});

