import web3 from './web3';
import CompiledFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CompiledFactory.abi,
    '0x81A985D0086E15DB563EBefCddbA2C0693E5aA98'
);

export default instance;