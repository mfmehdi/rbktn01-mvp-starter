import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'



class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  click() {
    this.props.onClickEvent(this)
  }

  render() {
    return (
      <div id={this.props.event._id} onClick={() => this.click()}
        className="event" >
        <img src="img_avatar.png" />
        <div className="container">
          <h4 ><b>{this.props.event.des}</b></h4>
          <p>{this.props.event.date}</p>
          <p>{this.props.event.nb}</p>
        </div>
      </div>
    )
  }
}
export default Event