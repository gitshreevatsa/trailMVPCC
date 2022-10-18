import "./App.css";
import React from "react";
import Web3 from "web3";
import abi from "../src/MyToken.json";
import { useState } from "react";

function App() {
  const [ acc, accountConnected ] = useState("");
  const contractAddress = "0x9be122204EBCe3c80D9cC6a3aC9344746cF3Ea97";

  const accountsCreated = async () => {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      console.log(account);
      accountConnected(account);
    }
  };

  const freeMint = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi.abi, contractAddress);
    var tokenId = Number(document.querySelector("[name=tokenId]").value);
    var amount = Number(document.querySelector("[name=amount]"));
    var mintRate = Number(await contract.methods.mintRate().call());
    var totalAmount = mintRate * amount;
    contract.methods
      .freemint(acc, tokenId, amount)
      .send({ from: acc, value: 0 });
  };
  return (
    <div>
      Hey
      <button onClick={accountsCreated}>Connect</button>
      <label>Token ID</label>
      <input type="number" name="tokenId" />
      <br />
      <label>Amount</label>
      <input type="number" name="Amount" />
      <br></br>
      <button onClick={freeMint}>FreeMint</button>
    </div>
  );
}

export default App;
