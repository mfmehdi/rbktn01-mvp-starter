import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Moment from 'react-moment';


class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeDep: '',
      nb: '',
      des: '',
      date: '',
      file: '',
      startDate: new Date()
    }


  }

  handleChangePdep(e) {
    this.setState({
      placeDep: e.target.value
    })
  }
  handleChangeDes(e) {
    this.setState({
      des: e.target.value
    })
  }
  handleChangeNbPlace(e) {
    this.setState({
      nb: e.target.value
    })

  }

  handleChangeDate(e) {
    this.setState({
      date: e.target.value
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
      .post("http://localhost:3333/event",
        {

          placeDep: this.state.placeDep,
          nb: this.state.nb,
          des: this.state.des,
          date: this.state.date,
          //file: this.state.file,
          organizerId: localStorage.getItem('idUser')
        },
        config)
      .then(response => {
        console.log(response.data)
        if (response.data) {
          console.log(true)
          // this.props.history.push('/signin')
        }
      });

  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  handleChangeDate(e) {
    this.setState({
      date: e.target.value
    });
    console.log(e.target.value)
  };
  render() {
    const dateToFormat = '1976-04-19T12:59-0500';
    return (
      <div className='sign'>
        <form onSubmit={(e) => this.submitForm(e)}>

          <label >Place of Departure </label>
          <input type="text" id="username" name="username" placeholder="Your Username.." value={this.state.placeDep} onChange={(e) => this.handleChangePdep(e)} />

          <label >Date</label>
          <input type="password" id="password" name="password" placeholder="Your password.." value={this.state.date} onChange={(e) => this.handleChangeDate1(e)} />

          <label >Number of Place</label>
          <input type="password" id="password" name="password" placeholder="Your password.." value={this.state.nb} onChange={(e) => this.handleChangeNbPlace(e)} />

          <label >Description</label>
          <input type="text" id="des" name="des" placeholder="Description" value={this.state.des} onChange={(e) => this.handleChangeDes(e)} />

          <input type="file" onChange={this.handleChange} />
          <img src={this.state.file} />

          <input type="date" name="bday" value={this.state.date} onChange={(e) => this.handleChangeDate(e)} ></input>

          <input type="submit" value="Submit" />


        </form>
      </div >
    )
  }
}
export default CreateEvent