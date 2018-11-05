import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

function UserList(props) {
    let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
    return <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>;
}

function User(props) {
    let {user} = props;
    return <tr>
        <td>{user.email}</td>
        <td>{user.admin ? "yes" : "no"}</td>
    </tr>;
}

export default connect((state) => {return {users: state.users};})(UserList);

