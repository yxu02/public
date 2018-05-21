//Author: Yu Xu @ sjsu May2018


import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/layout';
import Home from '../../../ethereum/homeSafe';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class EventNew extends Component {
  static async getInitialProps(props){
    return {
      address: props.query.address
    }; 
  }
  
  state = {
    id: '',
    name: '',
    secret: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event)=>{
    event.preventDefault();
    this.setState({loading:true, errorMessage:''});
    const home = Home(this.props.address);
    try{
      const accounts = await web3.eth.getAccounts();
      await home.methods
        .addNewDoorBellEvent(this.state.id, this.state.name, this.state.secret)
        .send({
          from: accounts[0] 
        });
      Router.pushRoute(`/homes/${this.props.address}/events`);
    } catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:false});
  };
  render (){
    return (
      <Layout>
        <Link route={`/homes/${this.props.address}/events`}>
          <a>Back</a>
        </Link>
        <h3>Create a Event</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Event ID</label>
            <Input placeholder = "Enter a number as ID"
              value = {this.state.id}
              onChange = {(event)=>{
                this.setState({id: event.target.value})
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Visitor Name</label>
            <Input placeholder = "Enter names"
              value = {this.state.name}
              onChange = {(event)=>{
                this.setState({name: event.target.value})
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Secret</label>
            <Input type = "password"
              value = {this.state.secret}
              onChange = {(event)=>{
                this.setState({secret: event.target.value})
              }}
            />
          </Form.Field>
          <Message
            error
            header="Error occurred!"
            content={this.state.errorMessage}/>
          <Button loading={this.state.loading} primary type='submit'>Create</Button>

        </Form>
      </Layout>
    );
  }
}

export default EventNew;