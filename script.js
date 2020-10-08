class Tally {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.ties = 0;
        this.roundWon = false;
        this.nextPlayer = "";
    }

    changeNextPlayer(next) {
        let x = Math.floor(Math.random() * 8);
        if (next) {
            this.nextPlayer = next;
            document.querySelector(`.tile${x}`).children[0].classList.add(`${next}`);
        } else {
            document.getElementById("player").innerHTML = tally.playerScore;
            document.getElementById("computer").innerHTML = tally.computerScore;

            document.querySelector(`.tile${x}`).children[0].classList.add("circle");
        }
    }

    updatePlayerScore() {
        this.playerScore += 1;
    }
    updateComputerScore() {
        this.computerScore += 1;
    }
    updateTies() {
        this.ties += 1;
    }
}

const tally = new Tally();
tally.changeNextPlayer();

var empty = [];

function addSign(tile) {
    document.querySelector(`.${tile}`).children[0].classList.add("circle");
    const list = document.querySelector("#board").children;
    const newList = Object.assign({}, list);

    for (const key in newList) {
        if (newList[key].firstElementChild.classList.length < 1) {
            empty.push(parseInt(key));
        }
    }
    let x = Math.floor(Math.random() * empty.length);

    document
        .querySelector(`.tile${empty[x]}`)
        .children[0].classList.add("square");

    empty = [];
}

function clearAll() {
    document.querySelectorAll(".circle").forEach((element) => {
        if (element.classList.contains("circle")) {
            element.classList.remove("circle");
        }
    });

    document.querySelectorAll(".square").forEach((element) => {
        if (element.classList.contains("square")) {
            element.classList.remove("square");
        }
    });
}
document.querySelector("#board").addEventListener("click", function(e) {
    var emptyy = [];

    function test() {
        setTimeout(function() {
            const list = document.querySelector("#board").children;
            const newList = Object.assign({}, list);

            for (const key in newList) {
                newList[key].firstElementChild.className;
                emptyy.push(newList[key].firstElementChild.className);
            }

            test2();
        }, 10);
    }

    test();
    const scenerios = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    function checkScore(arr, check1, check2, check3) {
        if (arr[check1] + arr[check2] + arr[check3] === "circlecirclecircle") {
            return "circle";
        }
    }

    function checkScore2(arr, check1, check2, check3) {
        if (arr[check1] + arr[check2] + arr[check3] === "squaresquaresquare") {
            return "square";
        }
    }

    function test2() {
        //console.log(emptyy);
        const a = document.querySelectorAll(".square").length;
        const b = document.querySelectorAll(".circle").length;
        const c = a + b;
        //console.log(c);
        const functionArr = [
            checkScore(emptyy, 0, 1, 2),
            checkScore(emptyy, 3, 4, 5),
            checkScore(emptyy, 6, 7, 8),
            checkScore(emptyy, 1, 4, 7),
            checkScore(emptyy, 2, 5, 8),
            checkScore(emptyy, 0, 3, 6),
            checkScore(emptyy, 2, 4, 6),
            checkScore(emptyy, 0, 4, 8),

            checkScore2(emptyy, 0, 1, 2),
            checkScore2(emptyy, 3, 4, 5),
            checkScore2(emptyy, 6, 7, 8),
            checkScore2(emptyy, 1, 4, 7),
            checkScore2(emptyy, 2, 5, 8),
            checkScore2(emptyy, 0, 3, 6),
            checkScore2(emptyy, 2, 4, 6),
            checkScore2(emptyy, 0, 4, 8),
        ];

        //console.log(functionArr);
        const allEqual = (arr) => arr.every((v) => v === arr[0]);
        for (i = 0; i < functionArr.length; i++) {
            console.log(allEqual(functionArr));
            if (functionArr.indexOf("circle") !== -1) {
                alert(
                    "Player Wins! You get to choose the first tile for the next game"
                );
                tally.updatePlayerScore();
                document.getElementById("player").innerHTML = tally.playerScore;
                clearAll();
                break;
            } else if (functionArr.indexOf("square") !== -1) {
                alert("Computer Wins! Computer will pick the next game");
                tally.updateComputerScore();
                document.getElementById("computer").innerHTML = tally.computerScore;
                clearAll();
                tally.changeNextPlayer("square");
                break;
            }
        }
        if (allEqual(functionArr) && c === 9) {
            alert("This round ends in a tie! Player picks first in next round");
            tally.updateTies();
            document.getElementById("ties").innerHTML = tally.ties;
            clearAll();
        }
    }
    test2();

    console.log(scenerios);

    if (e.target.className === "tile tile0") {
        addSign(e.target.classList[1]);
    }

    if (e.target.className === "tile tile1") {
        addSign(e.target.classList[1]);
    }
    if (e.target.className === "tile tile2") {
        addSign(e.target.classList[1]);
    }
    if (e.target.className === "tile tile3") {
        addSign(e.target.classList[1]);
    }
    if (e.target.className === "tile tile4") {
        addSign(e.target.classList[1]);
    }
    if (e.target.className === "tile tile5") {
        addSign(e.target.classList[1]);
    }
    if (e.target.className === "tile tile6") {
        addSign(e.target.classList[1]);
    }
    if (e.target.className === "tile tile7") {
        addSign(e.target.classList[1]);
    }
    if (e.target.className === "tile tile8") {
        addSign(e.target.classList[1]);
    }
});