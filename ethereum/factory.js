import web3 from './web3';
import CompiledFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CompiledFactory.abi,
    '0xCe424cfF1900323b43b6192c2c433d8E04fdE300'
);

export default instance;