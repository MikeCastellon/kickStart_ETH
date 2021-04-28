import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaigns';

class RequestRow extends Component {
    onApprove = async () => {
        const accounts = await web3.eth.getAccounts()
        const campaign = Campaign(this.props.address)
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
    };

    finalize = async () => {
        const accounts = await web3.eth.getAccounts()
        const campaign = Campaign(this.props.address)
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })
    };

    render() {
        const { id, request, approversCount} = this.props;
        const readyToFinalize = request.approvalCount > approversCount / 2
        return (
            <Table.Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{request.description}</Table.Cell>
                <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
                <Table.Cell>{request.recipient}</Table.Cell>
                <Table.Cell>{request.approvalCount} / {approversCount}</Table.Cell>
                <Table.Cell>
                  { request.complete ? null : (<Button color='green'  onClick={this.onApprove}>Approve</Button>)}
                </Table.Cell>
                <Table.Cell>
                    { request.complete ? <Icon name='check' size='big' color='green'/> : (<Button  color='teal' onClick={this.finalize}>Finalize</Button>)}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;