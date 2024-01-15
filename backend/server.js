const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.post('/makeRound', (req, res) => {
    let round_finished = false
    let state = 0
    let honest_blocks_mined = 0
    let attacker_blocks_mined = 0
    let {p} = req.body

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
    }
    res.json({
        honest_blocks_mined,
        attacker_blocks_mined
    });
});

const mine_block = (p) =>{
    return Math.random() < 1 - p ? "honest" : "attacker";
}


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});