const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

let honestBlocks = 0;
let attackerBlocks = 0;
let state = 0;

app.post('/makeRound', (req, res) => {
    let round_finished = false
    let state = 0
    let honest_blocks_mined = 0
    let attacker_blocks_mined = 0

    while (!round_finished) {
        let result = mine_block(p)

        if (state === 0) {
            if (result === "honest") {
                honest_blocks_mined += 1
                round_finished = true
            }
            else {
                state = 1
            }
        }

        else if (state === 1) {
            if (result === "honest") {
                state = 3
            }
            else { state = 2 }
        }

        else if (state === 2) {
            if (result === "honest") {
                attacker_blocks_mined += 2
                round_finished = true
            }
            else {
                attacker_blocks_mined += 3
                round_finished = true
            }
        }
        else if (state == 3) {
            if (result === "honest") {
                honest_blocks_mined += 2
                round_finished = true
            }
            else {
                attacker_blocks_mined += 2
                round_finished = true
            }
        }

        res.json({
            honestBlocks,
            attackerBlocks
        });
    }
});

const mine_block = (p) =>{
    return Math.random() < 1 - p ? "honest" : "attacker";
}


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});