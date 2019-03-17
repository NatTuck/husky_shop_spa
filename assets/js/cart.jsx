
import React from 'react';
import _ from 'lodash';

export default function Cart(props) {
  let { root, items } = props;

  let rows = _.map(items, (item) =>
    <tr key={item.id}>
      <td>{ item.product.name }</td>
      <td>{ item.count }</td>
      <td>
        <button onClick={() => root.delete_from_cart(item.id)}
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
}

