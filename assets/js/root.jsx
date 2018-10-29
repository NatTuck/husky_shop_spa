
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function root_init(node) {
  ReactDOM.render(<Root />, node);
}

class Root extends React.Component {
  render() {
    return <p>Hi</p>;
  }
}

