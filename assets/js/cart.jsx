import React from 'react';
import _ from 'lodash';

export default function Cart(props) {
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

function CartItem(props) {
    let {item} = props;
    return <tr>
        <td>{item.product.name}</td>
        <td>{item.count}</td>
        <td><button className="btn btn-default">Remove</button></td>
    </tr>;
}

