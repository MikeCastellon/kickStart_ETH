import React, { Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaigns';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';
import { Link } from '../../routes';



class CampaignShow extends Component { 
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            managerAddress: summary[4],
        };
    };

    renderCards(){
        const {
            minimumContribution,
            balance,
            requestCount,
            approversCount,
            managerAddress
        } = this.props
           
         const items = [
             {
             header: managerAddress,
             meta: 'Address of Manager',
             description: 'The Manager created this campaign and can create requests to withdraw money',
             style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much to vote',
               },
               {
                header: requestCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract. Reuqests must be approved.'
               },
               {
                header: approversCount,
                meta: 'Number of approvals for a request.',
                description: 'The number of people who already donated to the campaign.'
               },
               {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money the campaign has left to spend.'
               }
        ];
        
        return <Card.Group items={items}/>;
    };

    

  

    

    render(){
        return(
            <Layout>
            <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                            
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    };
};

export default CampaignShow;