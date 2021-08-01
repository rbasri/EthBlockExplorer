const ethers = require('ethers');
const express = require('express');
const cors = require('cors');
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
    console.log('got here2');
    const {address} = req.params;
    const balance = await provider.getBalance(address);
    const mybalance = balance._hex;
    console.log( {mybalance} );
    res.send({ mybalance });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});