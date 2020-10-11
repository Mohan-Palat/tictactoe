console.log(localStorage.getItem("mode"));
class Tally {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.ties = 0;
        this.roundWon = false;
        this.nextPlayer = "";
        this.mode = localStorage.mode;
        this.boardClear = true;
        this.names = [
            localStorage.name,
            this.mode === "self" ? "Other Person" : "Computer",
        ];
    }

    changeNextPlayer(nextt) {
        let x = Math.floor(Math.random() * 8);
        if (nextt) {
            console.log(nextt);
            this.nextPlayer = nextt;
            document.querySelector(`.tile${x}`).children[0].classList.add(`${nextt}`);
        }
    }
    resetAll() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.ties = 0;
        this.roundWon = false;
        this.nextPlayer = "";
        this.mode = "";
        this.boardClear = true;
        this.names = ["", ""];
        clearAll();
        this.changeNextPlayer();
        this.chooseMode();
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
    updateBoardClear(update) {
        this.boardClear = update;
    }
    updatePlayerNames(update) {
        document.querySelector("#playerName").innerHTML = localStorage.name;
        document.querySelector("#otherName").innerHTML =
            localStorage.mode === "self" ?
            "Other Person" :
            localStorage.mode === "comp" ?
            "Computer" :
            "";
        document.querySelector("#playerMode").innerHTML =
            localStorage.mode === "self" ?
            "Player vs Other Person" :
            localStorage.mode === "comp" ?
            "Player vs Computer" :
            "";
        document.getElementById("player").innerHTML = localStorage.playerScore;
        document.getElementById("computer").innerHTML = localStorage.computerScore;
        document.getElementById("ties").innerHTML = localStorage.ties;
    }
    chooseMode() {
        if (localStorage.getItem("mode") === null) {
            document.querySelectorAll("body :not(.congrats").forEach((element) => {
                element.classList.add("dim");
            });
            document.querySelector(".congrats").classList.add("alert");

            document.querySelector(
                "#congrats"
            ).innerHTML = `<h1>Welcome to TicTacToe!</h1><p>What mode do you want to play?</p><button type="button" id="self">Play against Others/Myself</button></button><button type="button" id="comp">Play against Computer</button></button>`;
        } else {
            return;
        }
    }
    chooseModeWithoutName() {
        console.log(this.mode);

        document.querySelectorAll("body :not(.congrats").forEach((element) => {
            element.classList.add("dim");
        });
        document.querySelector(".congrats").classList.add("alert");

        document.querySelector(
            "#congrats"
        ).innerHTML = `<h1>Welcome to TicTacToe!</h1><p>What mode do you want to play?</p><button type="button" id="selfUpdate">Play against Others/Myself</button></button><button type="button" id="compUpdate">Play against Computer</button></button>`;
    }
    showWarning() {
        document.querySelectorAll("body :not(.congrats").forEach((element) => {
            element.classList.add("dim");
        });
        document.querySelector(".congrats").classList.add("alert");

        document.querySelector(
            "#congrats"
        ).innerHTML = `<h1>This Round is over. Click the next round button to go to the next round</h1><button type="button" id="confirm">OK</button></button>`;
    }
    askPlayer() {
        document.querySelectorAll("body :not(.congrats").forEach((element) => {
            element.classList.add("dim");
        });
        document.querySelector(".congrats").classList.add("alert");

        document.querySelector(
            "#congrats"
        ).innerHTML = `<h1>What is your name?</h1><input type="text" placeholder="enter name" autocomplete=${"off"} id="nameInput"><button type="button" id="submitName">Submit</button>`;
    }
    updateMode(mode) {
        this.mode = mode;
    }
}

const tally = new Tally();

tally.chooseMode();
tally.changeNextPlayer();
tally.updatePlayerNames();

const nextTile = (blockTiles, emptyClasses, empty) => {
    let none = 0;
    let x = Math.floor(Math.random() * empty.length);

    for (let index = 0; index < blockTiles.length; index++) {
        if (emptyClasses.indexOf(blockTiles[index]) !== -1) {
            none += 1;
        }
    }
    if (none > 0) {
        for (let index = 0; index < blockTiles.length; index++) {
            if (emptyClasses.indexOf(blockTiles[index]) !== -1) {
                document
                    .querySelector(`${blockTiles[index]}`)
                    .children[0].classList.add("square");
                break;
            }
        }
    } else {
        document
            .querySelector(`.tile${empty[x]}`)
            .children[0].classList.add("square");
    }
};

var empty = [];
let next = false;
let is;

function addSign(tile) {
    const a = document.querySelectorAll(".square").length;
    const b = document.querySelectorAll(".circle").length;
    const c = a + b;

    if (localStorage.mode === "self") {
        if (next === false) {
            document.querySelector(`.${tile}`).children[0].classList.add("circle");
            next = !next;
        } else {
            {
                document.querySelector(`.${tile}`).children[0].classList.add("square");

                next = !next;
            }
        }
    } else {
        document.querySelector(`.${tile}`).children[0].classList.add("circle");
        const list = document.querySelector("#board").children;
        const newList = Object.assign({}, list);

        for (const key in newList) {
            if (newList[key].firstElementChild.classList.length < 1) {
                empty.push(parseInt(key));
            }
        }

        let emptyClasses = empty.map((each) => {
            return `.tile${each}`;
        });

        if (tile === "tile0" || tile === "tile1") {
            let blockTiles = [".tile2", ".tile0", ".tile1", ".tile4"];
            nextTile(blockTiles, emptyClasses, empty);
        } else if (tile === "tile3" || tile === "tile6") {
            let blockTiles = [".tile0", ".tile6", ".tile3", ".tile4", ".tile2"];
            nextTile(blockTiles, emptyClasses, empty);
        } else if (tile === "tile2" || tile === "tile5") {
            let blockTiles = [".tile8", ".tile5", ".tile2", ".tile4", ".tile6"];
            nextTile(blockTiles, emptyClasses, empty);
        } else if (tile === "tile7") {
            let blockTiles = [".tile8", ".tile6", ".tile4", ".tile7", ".tile2"];
            nextTile(blockTiles, emptyClasses, empty);
        } else if (tile === "tile4") {
            let blockTiles = [".tile2", ".tile6", ".tile4", ".tile7", ".tile2"];
            nextTile(blockTiles, emptyClasses, empty);
        } else if (tile === "tile8") {
            let blockTiles = [".tile0", ".tile6", ".tile2"];
            nextTile(blockTiles, emptyClasses, empty);
        } else {
            document
                .querySelector(`.tile${empty[x]}`)
                .children[0].classList.add("square");
        }

        empty = [];
        emptyClasses = [];
    }
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
    document.querySelectorAll(".win").forEach((element) => {
        if (element.classList.contains("win")) {
            element.classList.remove("win");
        }
    });
}
document.querySelector("#board").addEventListener("click", function(e) {
            console.log(tally.boardClear);
            if (tally.boardClear) {
                setTimeout(() => {
                    for (let index = 0; index < 9; index++) {
                        if (e.target.className === `tile tile${index}`) {
                            addSign(e.target.classList[1]);
                        }
                    }
                }, 10);

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
                let values = [];

                function checkScore(arr, check1, check2, check3) {
                    if (arr[check1] + arr[check2] + arr[check3] === "circlecirclecircle") {
                        values.push(check1);
                        values.push(check2);
                        values.push(check3);
                        return "circle";
                    }
                }

                function checkScore2(arr, check1, check2, check3) {
                    if (arr[check1] + arr[check2] + arr[check3] === "squaresquaresquare") {
                        values.push(check1);
                        values.push(check2);
                        values.push(check3);
                        return "square";
                    }
                }

                function test2() {
                    const a = document.querySelectorAll(".square").length;
                    const b = document.querySelectorAll(".circle").length;
                    const c = a + b;

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
                    const playerName = document.querySelector("#playerName").innerHTML;
                    const otherPersonName = document.querySelector("#otherName").innerHTML;
                    const allEqual = (arr) => arr.every((v) => v === arr[0]);
                    for (i = 0; i < functionArr.length; i++) {
                        if (functionArr.indexOf("circle") !== -1) {
                            document
                                .querySelector(`.tile${values[0]}`)
                                .children[0].classList.add("win");
                            document
                                .querySelector(`.tile${values[1]}`)
                                .children[0].classList.add("win");
                            document
                                .querySelector(`.tile${values[2]}`)
                                .children[0].classList.add("win");

                            document
                                .querySelectorAll("body :not(.congrats")
                                .forEach((element) => {
                                    element.classList.add("dim");
                                });
                            document.querySelector(".congrats").classList.add("alert");

                            document.querySelector("#congrats").innerHTML = `<h1>${
            localStorage.name
          } Wins this round!</h1>${
            localStorage.mode === "self"
              ? `<p>${tally.names[1]} gets to start the next turn </p>`
              : ""
          } <button type="button" id="next">Next Round</button></button><a href="#">Go back to board</a>`;

          localStorage.playerScore++;

          document.getElementById("player").innerHTML =
            localStorage.playerScore;

          tally.changeNextPlayer("circle");

          break;
        } else if (functionArr.indexOf("square") !== -1) {
          document
            .querySelector(`.tile${values[0]}`)
            .children[0].classList.add("win");
          document
            .querySelector(`.tile${values[1]}`)
            .children[0].classList.add("win");
          document
            .querySelector(`.tile${values[2]}`)
            .children[0].classList.add("win");

          document
            .querySelectorAll("body :not(.congrats")
            .forEach((element) => {
              element.classList.add("dim");
            });
          document.querySelector(".congrats").classList.add("alert");

          document.querySelector("#congrats").innerHTML = `<h1>${
            tally.names[1]
          } Wins this round!</h1><p>${
            localStorage.mode === "self" ? localStorage.name : tally.names[1]
          } gets to start the next turn</p><button type="button" id="next">Next Round</button></button><a href="#">Go back to board</a>`;
          localStorage.computerScore++;

          tally.updateComputerScore();
          document.getElementById("computer").innerHTML =
            localStorage.computerScore;
          if (localStorage.mode === "comp") {
            tally.changeNextPlayer("square");
          }

          break;
        }
      }
      if (allEqual(functionArr) && c === 9) {
        document.querySelectorAll("body :not(.congrats").forEach((element) => {
          element.classList.add("dim");
        });

        document.querySelector(".congrats").classList.add("alert");

        document.querySelector(
          "#congrats"
        ).innerHTML = `<h1>This round ends in a tie!!</h1><p>${localStorage.name} gets to start the next turn</p><button type="button" id="next">start next round now</button></button><a href="#">Go back to board</a>`;

        localStorage.ties++;
        document.getElementById("ties").innerHTML = localStorage.ties;
      }
    }
    test2();
  } else {
    tally.showWarning();
  }
});

document.querySelector("#congrats").addEventListener("click", function (e) {
  if (e.target.id === "next") {
    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");
    clearAll();
    let x = Math.floor(Math.random() * 8);
    if (tally.nextPlayer === "square" && localStorage.mode === "comp") {
      document
        .querySelector(`.tile${x}`)
        .children[0].classList.add(`${tally.nextPlayer}`);
    }
  } else if (e.target.tagName === "A") {
    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");
    tally.updateBoardClear(false);
  } else if (e.target.id === "self") {
    tally.updateMode("self");
    console.log(tally.mode);
    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");
    document.getElementById("playerMode").innerHTML =
      "Player vs Other Player/Self";
    localStorage.setItem("mode", "self");
    localStorage.setItem(
      "otherName",
      localStorage.mode === "self"
        ? "Other Person"
        : localStorage.mode === "comp"
        ? "Computer"
        : ""
    );

    tally.askPlayer();
  } else if (e.target.id === "comp") {
    tally.updateMode("comp");
    console.log(tally.mode);
    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");
    document.getElementById("playerMode").innerHTML = "Player vs Computer";
    localStorage.setItem("mode", "comp");
    localStorage.setItem(
      "otherName",
      localStorage.mode === "self"
        ? "Other Person"
        : localStorage.mode === "comp"
        ? "Computer"
        : ""
    );
    tally.askPlayer();
  } else if (e.target.id === "selfUpdate") {
    localStorage.mode = "self";

    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");

    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;
    tally.updatePlayerNames();
    //tally.askPlayer();
  } else if (e.target.id === "compUpdate") {
    localStorage.mode = "comp";

    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");

    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;
    tally.updatePlayerNames();
  } else if (e.target.id === "confirm") {
    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");
  } else if (e.target.id === "submitName") {
    const value = document.querySelector("#nameInput").value;
    localStorage.name = value;
    localStorage.playerScore = 0;
    localStorage.computerScore = 0;
    localStorage.ties = 0;

    tally.updatePlayerNames();
    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");
  }
});

document.querySelector("#space").addEventListener("click", function (e) {
  if (e.target.id === "clear") {
    clearAll();

    tally.updateBoardClear(true);
  } else if (e.target.id === "changeName") {
    tally.askPlayer();
    if (!tally.boardClear) {
      clearAll();
      tally.boardClear = !tally.boardClear;
    }
  } else if (e.target.id === "changeMode") {
    //tally.mode = "";
    tally.chooseModeWithoutName();

    clearAll();
  }
});

document.querySelector("#newGame").addEventListener("click", function (e) {
  tally.resetAll();
  localStorage.removeItem("mode");
  tally.chooseMode();
  console.log(localStorage.getItem("mode"));
});