const express = require("express");
const router = express.Router();

const Sponsor = require("../truffle/build/contracts/Sponsor.json");
const Web3 = require("web3");
let web3 = new Web3();
let accounts = null;
let contract = null;

router.post("/add", async (req, res) => {
  try {
    web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));
    accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId(); //5777
    const deployedNetwork = Sponsor.networks[networkId];
    contract = new web3.eth.Contract(
      Sponsor.abi,
      deployedNetwork && deployedNetwork.address
    );
    let amount = parseInt(req.body.amount, 10);
    console.log(req.body.amount, amount, req.body.address);

    await web3.eth.sendTransaction({
      from: accounts[0],
      to: req.body.address,
      value: req.body.amount * 1000000000000000000,
    });

    await contract.methods.add(amount).send({ from: accounts[0] });
    // const total = await contract.methods.get().call();

    const total = await web3.eth.getBalance(accounts[0]);

    const total_eth = web3.utils.fromWei(total, "ether");

    const total_to = await web3.eth.getBalance(req.body.address);

    const total_eth_to = web3.utils.fromWei(total_to, "ether");

    res.send({ msg: total_eth, msgTo: total_eth_to });
  } catch (error) {
    console.error(error);
    res.send({ msg: error.message });
  }
});

module.exports = router;
