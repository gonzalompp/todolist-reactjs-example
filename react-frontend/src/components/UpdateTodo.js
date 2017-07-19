import React, { Component } from 'react';
import axios from 'axios';
import TodoService from './TodoService';

export default class UpdateTodo extends Component {

  constructor(props) {
      super(props);
      this.todoService = new TodoService();

      //bind the instance to each method
      // (So you can use the THIS statement. Otherwise, it will be null)
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCancel = this.handleCancel.bind(this);

      //set the initial state
      this.state = {
        _id: '',
        desc: ''
      };
  }

  componentDidMount(){
    //the parameter ID
    let id =this.props.match.params.id;

    //call the service
    axios.get('http://localhost:6200/todo/'+id)
    .then(response => {
      //set the response data as the state (It has the same format)
      this.setState(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleChange(event) {
    //updates the state only for this parameter
    //(_id stays the same)
    this.setState({desc: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    //reference to the component "this"
    var thisRef = this;
    //Update in database
    this.todoService.update(
      this.state.desc,
      this.state._id,
      function() {
        thisRef.props.history.push('/');
      }
    );
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="panel panel-default">
            <div className="panel-heading">Edit Task</div>
            <div className="panel-body">
            <p>Task description</p>
              <input type="hidden" value={this.state._id} />
                  <input type="text" value={this.state.desc} onChange={this.handleChange}  className="form-control"/>
            </div>
            <div className="panel-footer">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
