const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

let input = {
    language: "Solidity",
    sources: {
      "Campaign.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
    },
  };

  console.log(input);
  // const output = solc.compile(output, 1);
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  
   
  // create build folder
  fs.ensureDirSync(buildPath);


if (output.errors) {
    output.errors.forEach((err) => {
      console.log(err.formattedMessage);
    });
  } else {
    const contracts = output.contracts["Campaign.sol"];
    for (let contractName in contracts) {
      const contract = contracts[contractName];
      fs.writeFileSync(
        path.resolve(buildPath, `${contractName}.json`),
        JSON.stringify(contract.abi, null, 2),
        "utf8"
      );
    }
  }




