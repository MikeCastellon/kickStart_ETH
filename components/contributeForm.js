import React, { Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaigns'
import { Router } from '../routes';


class ContributeForm extends Component {
    state={
        value: '',
        errorMessage: '',
        isLoading: false
    };

    onChange = (e) => {
        this.setState({ value: e.target.value})
    };

    onSubmit = async (e) => {
        e.preventDefault();

        this.setState({ isLoading: true , errorMessage: '' })
        
        const campaign = Campaign(this.props.address)
        try {
            const accounts = await web3.eth.getAccounts() 
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ isLoading: false })
    };
    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <label>Amount to Contribute</label>
                    <Input
                        label='ether'
                        labelPosition='right'
                        onChange={this.onChange}
                    />
                <Message error header='Oops!!!' content={this.state.errorMessage}/>
                <Button  primary loading={this.state.isLoading} >Contribute!</Button>
            </Form> 
                
        
        );
    };
};

export default ContributeForm;