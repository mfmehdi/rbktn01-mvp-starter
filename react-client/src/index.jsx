import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios'
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import { BrowserRouter, Route, Switch } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {

  }

  render() {
    // return (<div>
    //   <h1>SignUp</h1>
    //   <SignUp />
    //   <SignIn />
    // </div>)

    return (
      <div>
        <CreateEvent></CreateEvent>
        <Switch>
          <Route path="/" component={SignUp} exact />
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