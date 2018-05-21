//Author: Yu Xu @ sjsu May2018


import React from 'react';
import Header from './header';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';

export default (props)=>{
  return (
    <Container>
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
      </Head>
    
      <Header/>
      {props.children}
    </Container>
  );
}