import React, { Component} from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaigns';

class CampaignShow extends Component { 
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            managerAddress: summary[4],
        }
    }
    render(){
        return(
            <Layout>
                <div>Campaign show</div>
            </Layout>
        );
    };
};

export default CampaignShow;