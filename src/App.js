import React from 'react';
import axios from 'axios';
//import { Redirect } from 'react-router-dom';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
      errormessage: ''
    };
    if (localStorage.getItem('token')) {      
      this.props.history.push('/home');
    }
  }
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'username') {
      this.setState({ username: value });
    }
    if (name === 'pass') {
      this.setState({ pass: value });
    }

  }

  mySubmitHandler = (e) => {
    e.preventDefault();

    console.log('on submit+++++++', process.env)
    var that = this;
    var apiBaseUrl = process.env.REACT_APP_API_KEY + "login";
    var payload = {
      "name": this.state.username,
      "pass": this.state.pass
    }

    axios.post(apiBaseUrl, payload).then(function (response) {
      console.log("response=====", response)
      if (response && response.data.code === "1") {
        localStorage.setItem('token', response.data.access_token)
        that.props.history.push('/home');
        
      }
    }).catch(function (error) {
      console.log("error++++++++", error);
    });


  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.mySubmitHandler}>
          <p>Username:</p>
          <input type="text" name='username' onChange={this.myChangeHandler} />
          <p>Password:</p>
          <input type="password" name='pass' onChange={this.myChangeHandler} /><br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
