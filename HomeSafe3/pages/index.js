//Author: Yu Xu @ sjsu May2018


import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import { Link } from '../routes';

class HomeSafeIndex extends Component{

  static async getInitialProps(){
    const homes = await factory.methods.getDeployedHomeSafes().call();
    
    return { homes };
  }
  
  renderHomes(){

    const items = this.props.homes.map((address, index) =>{
      return {
        header: address,
        description: (
          <Link route={`/homes/${address}/events`}>
          <a>View HomeSafe Product {index+1}</a>
          </Link>
          ),
        fluid: true
      };
    });
    
    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <div>
          
          <h3>HomeSafe Dashboard</h3>
          <Link route="/homes/new">
            <a>
            <Button
              floated = "right"
              content = "Create User"
              icon = "add"
              primary
            />
            </a>
          </Link>
          {this.renderHomes()}
        </div>
      </Layout>
    );
  }
}

export default HomeSafeIndex;