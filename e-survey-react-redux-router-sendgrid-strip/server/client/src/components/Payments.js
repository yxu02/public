import React, {Component} from 'react';
import {connect} from 'react-redux';
import StripeCheckOut from 'react-stripe-checkout';
import * as actions from '../actions';

class Payments extends Component {
  render(){
    return (
      <StripeCheckOut
        name="e-Survey"
        description="Pay $5 for 5 e-survey credits"
      //default currency is USD, unit is cents
        amount={500}
        //stripe sent back a token to represent the txn charge
        token={token=>this.props.onReceiveToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
      >
        <button className='btn' style={{padding:'0 10px'}}>Add Credits</button>
      </StripeCheckOut>
    );
  }
}

export default connect(null, actions)(Payments)