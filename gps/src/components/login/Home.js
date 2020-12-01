import React, { Component } from 'react'
import { Login } from '.';

export default class Home extends Component {

    constructor(props) {
        super(props)
    
        this.handleSuccessfulAuth= this.handleSuccessfulAuth.bind(this);
    }
    
    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/gps"); 
     }

    render() {
        return (
            <div>
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        )
    }
}


