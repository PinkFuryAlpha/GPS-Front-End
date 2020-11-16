import React from 'react'
import './App.scss';
import axios from 'axios';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import GPS from './components/GPS';
import Home from './components/Home';



class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       loggedInStatus: false,
       user: {}
    };

    this.handleLogin=this.handleLogin.bind(this);
}


  handleLogin(data){
    this.setState({
      loggedInStatus: true,
      user: data
    });
  }

  render(){
    return(
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route
          exact path={"/gps"} 
          render={props => (
            // this.state.loggedInStatus ? 
            // (<GPS 
            //   {... props} 
            //   loggedInStatus={this.state.loggedInStatus}
            //   user={this.state.user}/>) : (<Redirect to={{pathname: "/"}}/>)
            <GPS 
              {... props} 
              loggedInStatus={this.state.loggedInStatus}
              user={this.state.user}/>
          )}/>
          <Route 
          exact path={"/"}
          render={props => (
            <Home
            {... props} 
            handleLogin={this.handleLogin}/>
          )}/>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
  
}

export default App