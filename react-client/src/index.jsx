import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import Event from './components/Event.jsx';
import HomeUser from './components/HomeUser.jsx';
import HomeOrg from './components/HomeOrg.jsx';
import { BrowserRouter, Route, Switch } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }



  render() {
    // return (<div>
    //   <h1>SignUp</h1>
    //   <SignUp />
    //   <SignIn />
    // </div>)

    return (
      <div>
        <Switch>
          <Route path="/" component={SignUp} exact />
          <Route path="/HomeUser" component={HomeUser} exact />
          <Route path="/HomeOrg" component={HomeOrg} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
//ReactDOM.render(<App />, document.getElementById('app'));