import React, { Component } from 'react';
import './App.css';
import { Switch as Router_Switch, Route } from "react-router-dom";
import Test from "../Test/Test";
import Dashboard from "../Dashboard/Dashboard";
import Checkout from "../Forms/Checkout";
import Landing from "../Landing/Landing";
import Web3 from 'web3';
import freelance from './../../abis/freelance.json';
import DirectSend from "../DirectForm/Checkout";

let web3provider;
class App extends Component
 {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      landingPageData: {}
    }
  }
  
  async componentDidMount()
  {
    await this.loadWeb3();
    await this.loadBlockchainData();
    //this.getlandingPageData();
  }
  async loadWeb3()
  {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        console.log(window.web3);
        //console.log(web3.eth.getAccounts());
        // Acccounts now exposed
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log(window.web3);
      // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData()
  {
    const web3=window.web3;
    const accounts=await web3.eth.getAccounts();
    //var paccount = accounts[0];
    //var oldaccount=this.state.account;
    this.setState({account:accounts[0]});
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      this.setState({account:accounts[0]});
    }.bind(this));

    console.log(web3);
    console.log(accounts);
   // 
   const networkId=await web3.eth.net.getId();
   console.log(networkId);
   console.log(freelance);
    const networkdata=freelance.networks[networkId];
    console.log(networkdata);
    if(networkdata)
    {
      const abi=freelance.abi;
      //console.log(freelance.abi);
      const freelancecon=new web3.eth.Contract(abi,networkdata.address);

      console.log(freelancecon);
      const balance=await freelancecon.methods.getBalance("0x5431ED8e4E4f6D36E993e72083D6AE8e00Ca269b").call();
      console.log(balance);

    }
    
    
  }
  

  render() {
    return (
     
      <div>
       <React.Fragment>
            <Router_Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/test/" component={Test} />
                <Route path="/dash/" component={Dashboard} />
                <Route path="/payroll/" component={Checkout} />
                <Route path="/send/" component={DirectSend} />
            </Router_Switch>
        </React.Fragment>
        
        
        
      </div>
     
      
        
    );
  }
}




export default App;
