import Web3 from 'web3';
     
let web3;
 
const ethEnabled = () => {
    if (typeof window !== 'undefined'){
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        web3 = window.web3
        window.ethereum.enable();
        return true;
        }
        return false;
    } else {
        const provider = new Web3.providers.HttpProvider(
            'https://rinkeby.infura.io/v3/af195d9e463741d8b84cf841d12b0b8c'
            );
        web3 = new Web3(provider);
    }
}
ethEnabled()
 
export default web3;