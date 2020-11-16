import React, { Component } from 'react'
import axios from 'axios'

export class Login extends Component {

constructor(props) {
    super(props)

    this.state = {
         email:'',
         password: ''
    }
}

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value},
         () => {localStorage.setItem('token',window.btoa(`${this.state.email}:${this.state.password}`))})
    }
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('/users/login',
        this.state,
        {withCredentials: true})
        .then(response => {
            console.log(response)
            if (response.request.status === 200){
                this.props.handleSuccessfulAuth(response.data)
          }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    render() {
        const {email, password} = this.setState
        return (
            <div className="login">
                <div className="container">
                <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <form className="form" onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="text" 
                            name="email" 
                            placeholder="email" 
                            value={email}
                            onChange={this.changeHandler}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                            type="text" 
                            name="password" 
                            placeholder="password" 
                            value ={password}
                            onChange={this.changeHandler}/>
                        </div>
                        <div className="footer">
                        <button type="submit" className="btn">
                            Login
                        </button>
                </div>
                    </form>
                </div>
            </div>
                </div>
            </div>
        )
    }
}


