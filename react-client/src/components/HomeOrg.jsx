import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";//
import Event from './Event.jsx';
import CreateEvent from './CreateEvent.jsx'


class HomeOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      count: 0

    }
    //
  }
  componentDidMount() {
    this.getEvents()
  }

  getEvents() {
    // event.preventDefault();

    console.log('post')
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    axios
      .get("http://localhost:3333/eventsByO",
        { params: { id: localStorage.idUser } },
        config)
      .then(response => {
        console.log(response.data)
        this.setState({
          events: response.data
        })
      });

  }

  HudlerClick() {
    this.setState({
      count: 1
    })
  }
  refrech() {
    console.log('ffffffff', this)
    this.getEvents()
  }

  render() {
    return (
      <div>
        <button onClick={() => this.HudlerClick()}>New Event</button>
        {this.state.count === 1 && <CreateEvent refre={this.refrech.bind(this)} />}
        <div className='sign' >
          {this.state.events.map((event) => {
            return (<Event event={event}></Event>
            )
          })}
        </div >
      </div>
    )
  }
}
export default HomeOrg