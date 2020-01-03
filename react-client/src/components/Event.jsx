import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";//


class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      password: '',
      type: 'Organizer'

    }
    //
  }

  handleChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    })

  }

  handleChangeType(e) {
    this.setState({
      type: e.target.value
    })
  }
  submitForm(evt) {
    event.preventDefault();

    console.log('post')
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    axios
      .post("http://localhost:3333/user",
        {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          type: this.state.type
        },
        config)
      .then(response => {
        console.log(response.data)
        if (response.data) {
          this.props.history.push('/signin')
        }
      });

  }
  render() {
    return (


      <div className='sign' >
        <h1>SignUp</h1>
        <form onSubmit={(e) => this.submitForm(e)}>
          <label >Name</label>
          <input type="text" id="name" name="name" placeholder="Your name.." value={this.state.name} onChange={(e) => this.handleChangeName(e)} />

          <label >Username</label>
          <input type="text" id="username" name="username" placeholder="Your Username.." value={this.state.username} onChange={(e) => this.handleChangeUsername(e)} />

          <label >Password</label>
          <input type="password" id="password" name="password" placeholder="Your password.." value={this.state.password} onChange={(e) => this.handleChangePassword(e)} />

          <label >Type</label>
          <select id="type" name="type" value={this.state.type} onChange={(e) => this.handleChangeType(e)}>
            <option value="Organizer">Organizer </option>
            <option value="Hiker" >Hiker</option>

          </select>
          <input type="submit" value="Submit" />

          <Link to="/signin">SignIn </Link>

        </form>
      </div >
    )
  }
}
export default Event