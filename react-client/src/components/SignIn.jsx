import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";//


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }


  }
  handleChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    })

  }
  submitForm(evt) {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    axios
      .get("http://localhost:3333/login",
        {
          params: {
            username: this.state.username,
            password: this.state.password
          }
        },
        config)
      .then(response => {
        //

        if (response.data) {

          localStorage.setItem('idUser', response.data._id);
          localStorage.setItem('username', response.data.username);
          console.log(response.data.type)
          if (response.data.type === 'Hiker') {
            this.props.history.push('/HomeUser')
          }
          else {
            this.props.history.push('/HomeOrg')
          }
        }
      });

  }

  render() {
    return (
      <div className='sign'>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label >Username</label>
          <input type="text" id="username" name="username" placeholder="Your Username.." alue={this.state.username} onChange={(e) => this.handleChangeUsername(e)} />

          <label >Password</label>
          <input type="password" id="password" name="password" placeholder="Your password.." alue={this.state.password} onChange={(e) => this.handleChangePassword(e)} />

          <input type="submit" value="Submit" />


        </form>
      </div >
    )
  }
}
export default SignIn