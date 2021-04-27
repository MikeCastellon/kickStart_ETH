import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class NewCampaign extends Component {
    state = { 
                minimumContribution: '',
                errorMessage: '',
                isLoading: false 
            };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true, errorMessage: '' })
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({ from: accounts[0] });
            Router.pushRoute('/');
        } catch(e){
            this.setState({ errorMessage: e.message });
        };

        this.setState({ isLoading: false })
    };
    render(){
        return(
            <Layout>
                <h3>New Campaigns Page</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label> Minimum Contribution </label>
                        <Input 
                            label='Wei'  
                            labelPosition='right' 
                            value={this.state.minimumContribution}
                            onChange={ event => {
                                this.setState({ minimumContribution: event.target.value })
                            } }
                        />
                    </Form.Field>
                    <Message error header='Oops!!!' content={this.state.errorMessage} />
                    <Button primary loading={this.state.isLoading}>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default NewCampaign;