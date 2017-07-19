import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ListTodoRow extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
        <tr>
          <td>
            <button id={this.props.obj._id} onClick={this.props.onDelete} type="button" value="Delete" className="btn btn-danger btn-xs">X</button>
            <a id={this.props.obj._id} onClick={this.props.onUpdate} href="">{this.props.obj.desc}</a>
          </td>
        </tr>
    );
  }
}
