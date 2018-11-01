
import React from 'react';
import _ from 'lodash';

export default function Cart(props) {
  let {root, cart} = props;
  let items = _.map(cart, (item) => <CartItem key={item.id} item={item} root={root} />);
  return <div>
    <h2>Shopping Cart</h2>
    <ul>
      {items}
    </ul>
    <button className="btn btn-primary">Check Out</button>
  </div>;
}

function CartItem(props) {
  let {root, item} = props;
  return <li>
    {item.count} - {item.product.name} (
    <button className="btn btn-default"
             onClick={() => root.remove_cart_item(item.id)}>remove</button>)
  </li>;
}

