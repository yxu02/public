//Author: Yu Xu @ sjsu May2018

require('datejs');
import React, {Component} from 'react';
import { Table, Button } from 'semantic-ui-react';

class TableRow extends Component{
  
  render(){
    const {Row, Cell}=Table;
    const {doorBellEventId, name, timestamp, secret} = this.props.event;
    const tstamp = new Date(timestamp*1000).toLocaleString(); 
    return (
      <Row>
        <Cell>{this.props.id+1}</Cell>
        <Cell>{doorBellEventId}</Cell>
        <Cell>{name}</Cell>
        <Cell>{secret}</Cell>
        <Cell>{tstamp}</Cell>
      </Row>
    );
  }
}

export default TableRow;