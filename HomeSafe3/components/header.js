//Author: Yu Xu @ sjsu May2018

import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default ()=>{
  return (
    <Menu style = {{ marginTop: '10px'}}>
      <Link route='/'>
        <a className='item'>HomeSafe</a>
      </Link>
      <Menu.Menu position = 'right'>
        <Link route='/'>
          <a className='item'>Homes</a>
        </Link>
        <Link route='/homes/new'>
          <a className='item'>+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}