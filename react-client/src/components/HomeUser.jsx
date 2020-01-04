import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";//
import Event from './Event.jsx';


class HomeUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentEvent: {}
    }
    //
  }
  componentDidMount() {
    this.getEvents()
  }
  getEvents() {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    axios
      .get("http://localhost:3333/events",
        {},
        config)
      .then(response => {
        console.log(response.data)
        this.setState({
          events: response.data
        })
      });

  }

  hundleClickEvent(that) {
    console.log(that)
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    axios
      .put("http://localhost:3333/addUserEvent",
        { idEvent: that.props.event._id, user: localStorage.getItem('idUser') },
        config)
      .then(response => {
        this.getEvents()

      });

  }
  HudlerReload() {
    this.getEvents()
  }
  render() {
    return (
      <div className='listEvent'>
        <button onClick={() => this.HudlerReload()}>Reload</button>
        <h1>welcome {localStorage.getItem('username')}</h1>
        <div className='sign' >
          {this.state.events.map((event) => {
            return (<Event onClickEvent={this.hundleClickEvent.bind(this)} event={event}></Event>
            )
          })}
        </div >
      </div>
    )
  }
}
export default HomeUser