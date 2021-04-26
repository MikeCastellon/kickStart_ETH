import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    web3 = new Web3(window.web3.currentProvider);
} else {
    const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/aaa697ff9b38438585c95dc555c75afa"
    );
    web3 = new Web3(provider);
    }
export default web3;

