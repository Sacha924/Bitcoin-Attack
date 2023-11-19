# Bitcoin Attack

The markov_chain is a simulation of a specific attack strategy on the Bitcoin network, known as the 1+2 attack strategy. Let's break down how this attack works and what the code is doing:

<br/>


## Purpose of the Code
Simulate an Attack on Bitcoin: The code models a scenario where an attacker attempts to gain more rewards than honest miners in the Bitcoin network by using a specific attack strategy.
Comparison of Actual vs. Theoretical Results: It compares the actual results of the simulation with the theoretical outcome, providing insight into the effectiveness of the attack under given conditions.

<br/>


## The 1+2 Attack Strategy
Two Players: There are two players in the system - honest miners and an attacker.
Mining Blocks: In each round, either an honest miner or an attacker mines a block. This is simulated by the mine_block(p) function, where p is the probability of the attacker mining a block.
States of the Attack: The attack progresses through different states (0, 1, 2, 3), representing different stages of the attack.

<br/>


## Code Breakdown
Function mine_block(p): Simulates the mining of a block. It randomly chooses between an honest miner and an attacker, based on their respective probabilities.

Function AttackStrategy_1(p, rounds): Simulates the 1+2 attack strategy over a specified number of rounds.

State 0: If an honest miner mines a block, the round ends, and the system resets.
State 1: If the attacker mines a block, the state advances. If an honest miner mines next, it moves to a competition state (State 3).
State 2: If the attacker mines another block, they have two options based on the next block miner:
    If honest miner mines next, the attacker publishes their two blocks, winning two rewards.
    If the attacker mines, they publish all three blocks, winning three rewards.
State 3: This is a competition state where the next block determines the outcome:
    If an honest miner mines, they publish two blocks and win two rewards.
    If the attacker mines, they publish their version and win two rewards.


<br/>


## How the Attack Works
Advantage to Attacker: The strategy involves the attacker withholding their mined blocks and only publishing them strategically to invalidate the honest miner's blocks.
Rewards Maximization: By doing so, the attacker aims to maximize their rewards compared to honest miners.

<br/>


## Key Notes
Dependence on Mining Power: The effectiveness of this attack heavily depends on the mining power (p) of the attacker. Typically, such attacks become more feasible as the attacker's mining power approaches or exceeds 50% of the total network mining power.
Simulation vs. Real-World Scenario: This simulation provides an insight into the attack's potential but may not capture all the complexities and dynamics of the actual Bitcoin network.


<br/>
<br/>
<hr/>

The egoist_miner simulates a different kind of attack on the Bitcoin network, commonly referred to as the "Selfish Mining" or "Egoistic Miner Strategy." Let's break down how this strategy works and what the code is doing:

<br/>



## Purpose of the Code
Simulate Selfish Mining Attack: The code models a scenario where an attacker (selfish miner) attempts to gain more rewards than honest miners by manipulating the blockchain mining process.
Evaluating Attack Success: It assesses the effectiveness of the attack by comparing the number of blocks mined by honest miners and the attacker over a series of rounds.

<br/>


## Selfish Mining Strategy
Two Participants: There are honest miners and an attacker (selfish miner).
Mining Process: Blocks are mined by either an honest miner or the attacker, with probabilities determined by their relative mining power.
Strategy Dynamics: The strategy involves the attacker withholding their successfully mined blocks and selectively publishing them to gain an advantage.

<br/>


## Code Breakdown
Function mine_block(p): Randomly selects who mines the next block ('honest' or 'attacker'), based on their mining power (p).

Function egoistic_miner_strategy(p, rounds): Simulates the selfish mining strategy over a given number of rounds.

State 0: If an honest miner mines a block, the round ends, and the system resets.
State 1: If the attacker mines a block, they move to a state where they might lead the chain.
State 2: If the attacker mines another block, they wait to see if an honest miner finds the next block. If so, the attacker publishes their two blocks, claiming the rewards. Otherwise, they continue extending their private chain.
Competition State: If an honest miner mines a block while the attacker has a hidden block, a competition state is entered. The next block decides who gets to publish and claim rewards.
Other States: If the attacker's private chain extends beyond two blocks, they continue mining secretly, only publishing when the honest miners are close to catching up.


<br/>


## How the Attack Works
Withholding Blocks: The attacker mines blocks but does not immediately publish them, creating a secret fork of the blockchain.
Strategic Release: The attacker releases their secret blocks to invalidate the honest miner's work, maximizing their own rewards.

<br/>


## Key Notes
Dependence on Mining Power: The effectiveness of this strategy depends on the attacker's mining power. Generally, the strategy becomes more effective as the attacker's power approaches 50%.
Game Theory Application: Selfish mining involves strategic decision-making based on the state of the network and the actions of other miners.
Impact on Network: Such attacks can potentially lead to reduced trust in the blockchain, as they undermine the principle of fair rewards based on computational contributions.

<br/>


## Difference from the 1+2 Attack
Attack Strategy: While both involve strategic block publication, the 1+2 attack specifically targets situations of potential blockchain forks, whereas selfish mining is more about creating and exploiting a secret fork.
State Transitions: The selfish mining strategy involves more complex state transitions based on the ongoing competition between the honest miners and the attacker.