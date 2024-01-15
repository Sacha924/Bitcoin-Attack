import React, { useState } from 'react';
import './App.css';

function App() {
  const [honestBlocks, setHonestBlocks] = useState(0);
  const [attackerBlocks, setAttackerBlocks] = useState(0);
  const [roundNumber, setroundNumber] = useState(0);
  const [bobProbability, setBobProbability] = useState(0.5);
  

  const launchRound = async () => {
    const rawResponse = await fetch('http://localhost:8080/makeRound', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p: bobProbability })
    });
    const {honest_blocks_mined, attacker_blocks_mined} = await rawResponse.json();

    setHonestBlocks(honestBlocks + honest_blocks_mined)
    setAttackerBlocks(attackerBlocks + attacker_blocks_mined)
    setroundNumber(roundNumber + 1)
  }

  return (
    <div className="App">
      <div className="alice-part">
        <p className='status'>Honest Miner</p>
        <img src="Alice.JPG" />
        <p>Number of blocks mined: {honestBlocks}</p>
      </div>

      <div className="params-part">
        <label>Bob's probability of mining a block :</label>
        <input
          type="number"
          value={bobProbability}
          min={0}
          max={1}
          onChange={e => setBobProbability(parseFloat(e.target.value))}
        />
        <p>Round number {roundNumber}</p>
        <button onClick={launchRound}>Launch 1 round</button>
      </div>

      <div className="bob-part">
        <p className='status'>Attacker</p>
        <img src="Bob.JPG" />
        <p>Number of blocks mined: {attackerBlocks}</p>
      </div>

    </div>
  );
}

export default App;
