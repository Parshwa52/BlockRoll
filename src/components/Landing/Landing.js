//import logo from './logo.svg';
//import './App.css';

import freelance from './../../abis/freelance.json';
import React, { Component } from 'react';

import Web3 from 'web3';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './navigation';
import Header from './header.js';
import Features from './features';
import About from './about';


import Contact from './contact';
import JsonData from './../../data/data.json';

import './App.css';

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          landingPageData: {}
        }
      }
      async componentDidMount()
  {
    this.getlandingPageData();
  }



  
  getlandingPageData() {
    this.setState({landingPageData : JsonData})
  }

  render() {
    return (
     
      <div>
        
        
        <Navigation />
        <Header data={this.state.landingPageData.Header} />
        
        <Features data={this.state.landingPageData.Features} />
        
        <About data={this.state.landingPageData.About} />
        
        <Contact data={this.state.landingPageData.Contact} />
        
      </div>
     
      
        
    );
  }
}

export default Landing;
