import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [honestBlocks, setHonestBlocks] = useState(0);
  const [attackerBlocks, setAttackerBlocks] = useState(0);
  const [roundNumber, setroundNumber] = useState(0);
  const [bobProbability, setBobProbability] = useState(0.5);
  const [minedBy, setMinedBy] = useState('');
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const launchRound = async () => {
    const rawResponse = await fetch('http://localhost:8080/makeRound', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ p: bobProbability })
    });
    const { honest_blocks_mined, attacker_blocks_mined } = await rawResponse.json();

    if (honest_blocks_mined > 0) {
      setMinedBy('honest');
      setTimeout(() => setMinedBy(''), 1000);
    } else if (attacker_blocks_mined > 0) {
      setMinedBy('attacker');
      setTimeout(() => setMinedBy(''), 1000);
    }

    setHonestBlocks(prevHonestBlocks => prevHonestBlocks + honest_blocks_mined);
    setAttackerBlocks(prevAttackerBlocks => prevAttackerBlocks + attacker_blocks_mined);
    setroundNumber(prevRoundNumber => prevRoundNumber + 1);
  }

  const toggleAutoLaunch = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(() => {
        launchRound();
      }, 1100);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="App">
      <div className={`alice-part ${minedBy === 'honest' ? 'mined' : ''}`}>
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
        <button onClick={toggleAutoLaunch}>
          {intervalId ? 'Stop Auto Launch' : 'Start Auto Launch'}
        </button>
      </div>

      <div className={`bob-part ${minedBy === 'attacker' ? 'mined' : ''}`}>
        <p className='status'>Attacker</p>
        <img src="Bob.JPG" />
        <p>Number of blocks mined: {attackerBlocks}</p>
      </div>

    </div>
  );
}

export default App;
