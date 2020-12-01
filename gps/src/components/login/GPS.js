import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/gps.scss';
import '../styles/style.scss';
import MapsV2 from './MapsV2.js'
import { Container, Row, Col, Dropdown, DropdownButton, Button, Form} from 'react-bootstrap';
import { SPRING } from '.';


export default class GPS extends Component {
    constructor(props) {
        super(props)

        this.state={
            users: [],
            username:"",
            userId: "",
            startDate: '',
            endDate: '',
            dates:[]
        };

       this.changeHandler=this.changeHandler.bind(this)
       this.handleGet=this.handleGet.bind(this)
       this.handleUserId=this.handleUserId.bind(this)
       this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
        return(
            this.handleGet()  
        )
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleGet(){
        axios.get(`${SPRING}/users`,{
            headers: {
                'Authorization': `Basic ${localStorage.getItem('token')}`
            },
        })
        .then((res) => {
            console.log(res.data)
            this.setState({
                users:res.data
            })
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const regexDate=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
        const startDate=new Date(this.state.startDate);
        const endDate=new Date(this.state.endDate);

        if(!regexDate.test(this.state.startDate) || !regexDate.test(this.state.endDate)){
            this.setState({
                startDate:"",
                endDate:""
            })
            return (
                alert("Date doesn't respect given format!")
            )
        }

        if(startDate>endDate){
            this.setState({
                startDate:"",
                endDate:""
            })
            return (
                alert("Start Date can't be greater than End Date!")
            )
        }

        if(!this.state.userId){
            this.setState({
                startDate:"",
                endDate:""
            })
            return (
                alert("Please select a user, you little troll!")
            )
        }
        
        axios.get(`${SPRING}/locations`,{
            headers: {
                'Authorization': `Basic ${localStorage.getItem('token')}`
            },
            params:{
                userId: this.state.userId,
                startDate:this.state.startDate,
                endDate:this.state.endDate
            }
        })
        .then((res) => {
            console.log(res.data)
            this.setState({
                dates:res.data
            })
        })
        .catch((error) =>{
            console.error(error)
        })   
    }

    handleUserId(user){
        this.setState({
            username:user.firstName + user.secondName,
            userId: user.id
        });
    }
    
    render(){
        const{startDate, endDate} = this.state
        return (
        <Container>    
            <Container>
                <h1 className="textTitle">Welcome to the website, {this.props.user.firstName} {this.props.user.secondName}!</h1>
                <h2 className="textTitle">Status: {this.props.loggedInStatus}</h2>
                <h3 className="textTitle">Selected user: {this.state.username}</h3>
            </Container>
            <Container className="flex-box-container"> 
                        <Row className="row">
                            <Col sm={4} className="collumns">
                                <Container>
                                    <DropdownButton 
                                    id="dropdown-button" 
                                    title="Users" 
                                    className="dropbtn">
                                    <Container className="dropDownUsers">
                                        {this.state.users.map((user)=>{
                                            return(
                                            <Dropdown.Item key={user.id} onClick={() =>this.handleUserId(user)}>{user.firstName} {user.secondName}</Dropdown.Item>
                                            );
                                        })}
                                    </Container> 
                                    </DropdownButton>
                                </Container>
                                <Container>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group className="startDate">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control 
                                            size="lg" 
                                            type="text"
                                            name="startDate" 
                                            placeholder="yyyy-mm-ddThh-mm-ss"
                                            value={startDate}
                                            onChange={this.changeHandler}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group className="endDate">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control 
                                            size="lg" 
                                            type="text" 
                                            name="endDate"
                                            placeholder="yyyy-mm-ddThh:mm:ss"
                                            value={endDate}
                                            onChange={this.changeHandler}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button className="button" variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Container>
                            </Col>
                            <Col sm={8} className="map-style">
                                <MapsV2 
                                locations={this.state.dates} 
                                coordinates={this.state.dates.map((date) =>{return({lat:date.latitude, lng: date.longitude})})}></MapsV2>
                            </Col>
                        </Row>
            </Container>
        </Container>    
        )
    }
}

