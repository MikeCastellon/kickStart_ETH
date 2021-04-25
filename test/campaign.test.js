
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000"
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("Factory and Campaign are deployed", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  
  it('marks caller as campaign manager', async () => {
      const manager = await campaign.methods.manager().call();
      assert.strictEqual( accounts[0], manager );
  } )

  it('allows people to contribute money and marks them as approvers', async () => {
      await campaign.methods.contribute().send({
        value: '200',
        from: accounts[1]
      });

      const isContributer = await campaign.methods.approvers(accounts[1]).call();
      assert.ok(isContributer)
  })

  it('requires a minimum contribution', async () => {
      try {
        await campaign.methods.contribute().send({
            value: '2',
            from : accounts[1]
        });

        assert.ok(false);
      } catch(err) {
          assert.ok(err);
      }
  })

  it('allows manager to make a request', async () => {
    await campaign.methods
     .createRequest('Buy batteries', '100', accounts[1])
     .send({
         from: accounts[0],
         gas: '1000000'
     });

     const request = await campaign.methods.requests(0).call();
     
     assert.strictEqual('Buy batteries', request.description);
  });

  it('processes request', async () => {
      await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei('10', 'ether')
      });

      await campaign.methods
        .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
        .send({
            from: accounts[0], 
            gas:'1000000'
        });

        await campaign.methods.approveRequest(0).send({
          from: accounts[0],
          gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
          from:accounts[0],
          gas: '1000000'  
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');

        balance = parseFloat(balance);
        console.log(balance)
        assert(balance > 104);
  } )
});