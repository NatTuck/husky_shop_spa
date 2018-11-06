import store from './store';

class TheServer {
  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_products() {
    this.fetch_path(
      "/api/v1/products",
      (resp) => {
        store.dispatch({
          type: 'PRODUCT_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_cart() {
    // TODO: Pass user_id to server
    this.fetch_path(
      "/api/v1/cart_items",
      (resp) => {
        store.dispatch({
          type: 'CART_LIST',
          data: resp.data,
        });
      }
    );
  }

  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    });
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  remove_cart(item_id) {
    $.ajax(('/api/v1/cart_items/' + item_id), {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        this.fetch_cart();
      }
    });
  }

  add_to_cart(product_id) {
    // FIXME: Maybe passing in user_id and count is better?
    let state = store.getState();
    let user_id = state.session.user_id;
    let count = state.add_item_forms.get(product_id) || 1;
    let token = state.session.token;
    this.send_post(
      "/api/v1/cart_items",
      {cart_item: {product_id, user_id, count}, token: token},
      (resp) => {
        // Plan A
        this.fetch_cart();

        // Plan B
        // Just add this one item.
      },
    );
  }
}

export default new TheServer();
