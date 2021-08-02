const ethers = require('ethers');
const express = require('express');
const cors = require('cors');
const { parseEther } = require('ethers/lib/utils');
const port = 3042;
const app = express();

INFURA_ENDPOINT = 'https://mainnet.infura.io/v3/2beb3efa190b442da3d287d71218f63e'

//Connect to full node with Infura
const provider = new ethers.providers.JsonRpcProvider(INFURA_ENDPOINT);

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

//Simple method for getting the balance of an address
app.get('/balance/:address', async (req, res) => {
    const {address} = req.params;
    const balance = await provider.getBalance(address);
    // const mybalance = ethers.utils.parseEther(balance._hex);
    const mybalance = ethers.utils.formatEther(BigInt(balance._hex)).toString(10).substring(0,4);
    res.send({ mybalance });
});

app.get('/latest-block', async (req, res) => { 
    const lastBlock = provider.getBlockNumber();
    const block = await provider.getBlock(lastBlock);
    res.send({ block })
});

app.get('/gas-estimate', async (req, res) => {
    const lastBlock = provider.getBlockNumber();
    let gas = 0;
    const block = await provider.getBlockWithTransactions(lastBlock);
    const transactions = block.transactions;
    const transactionCount = transactions.length
    for(let i=0; i<transactionCount; i++){
        gas += parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(transactions[i].gasPrice),"gwei"));
    }
    const result = (gas / transactionCount).toString().substring(0,4);
    res.send({ result })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});