import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function Cart(props) {
    let {cart} = props;
    let rows = _.map(cart, (ci) => <CartItem key={ci.id} item={ci} />);
    return <div>
        <h2>Shopping Cart</h2>
        <table className="table table-striped">
          <tbody>
            {rows}
          </tbody>
        </table>
    </div>;
}

export default connect(({cart}) => ({cart}))(Cart);

function CartItem(props) {
    let {item} = props;
    return <tr>
        <td>{item.product.name}</td>
        <td>{item.count}</td>
        <td><button className="btn btn-default"
            onClick={() => api.remove_cart(item.id)}>Remove</button></td>
    </tr>;
}

