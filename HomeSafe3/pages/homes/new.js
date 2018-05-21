//Author: Yu Xu @ sjsu May2018


import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class HomeNew extends Component {
  state = {
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event)=>{
    event.preventDefault();
    this.setState({loading:true, errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createHomeSafe()
        .send({
          from: accounts[0]
        });
      Router.pushRoute('/');
    } catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:false});
  };
  render (){
    return (
      <Layout>
        <h3>Create an User HomeSafe</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

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

export default HomeNew;