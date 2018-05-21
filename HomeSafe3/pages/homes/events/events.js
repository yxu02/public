//Author: Yu Xu @ sjsu May2018


import React, {Component} from 'react';
import Layout from '../../../components/layout';
import Home from '../../../ethereum/homeSafe';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import TableRow from '../../../components/tableRow';

class Events extends Component{
  
  static async getInitialProps(props){
    const home = Home(props.query.address);
    const eventsCount = await home.methods.getEventsCount().call();
    
    const events = await Promise.all(
      Array(parseInt(eventsCount)).fill()
      .map((element, index)=>{
        return home.methods.doorBellEvents(index).call();
      })
    );
    return {
      address: props.query.address,
      events: events,
      eventsCount: eventsCount
    }; 
  }
  
  renderRows(){
    return this.props.events.map((event, index)=>{
      return (
        <TableRow 
          key = {index}
          id = {index}
          event = {event}
          address = {this.props.address}
        />
      );
    });
  }
  render(){
    const {Header, Row, HeaderCell, Body} = Table;
    return (
      <Layout>
        <h3>Home Events</h3>
        <Link route={`/homes/${this.props.address}/events/new/`}>
            <a>
            <Button floated = "right" primary style={{marginBottom:10}}>New Event</Button>
            </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>Row</HeaderCell>
              <HeaderCell>Event ID</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Secret</HeaderCell>
              <HeaderCell>Time</HeaderCell>

            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <div>Found {this.props.eventsCount} Requests </div>
      </Layout>
    );
  }
}

export default Events;