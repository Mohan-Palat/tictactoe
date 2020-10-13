localStorage["personTile"] = "circle";
localStorage["otherTile"] = "square";

document.querySelectorAll(".tile").forEach((element, index) => {
  element.children[0].className = localStorage[`tile${index}`];
});

document.querySelectorAll(".tile").forEach((element, index) => {
  if (parseInt(localStorage.wins1) === index) {
    element.children[0].id = "win";
  } else if (parseInt(localStorage.wins2) === index) {
    element.children[0].id = "win";
  } else if (parseInt(localStorage.wins3) === index) {
    element.children[0].id = "win";
  }
});
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
    if (nextt) {
      this.nextPlayer = nextt;
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
    if (localStorage.mode === "self") {
      localStorage.otherPersonName = "Other Person";
    } else if (localStorage.mode === "comp") {
      localStorage.otherPersonName = "Computer";
    }

    document.querySelector("#playerName").innerHTML = localStorage.name;
    document.querySelector("#otherName").innerHTML =
      localStorage.otherPersonName;
    document.querySelector("#playerMode").innerHTML =
      localStorage.mode === "self"
        ? "Player vs Other Person"
        : localStorage.mode === "comp"
        ? "Player vs Computer"
        : "";
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
      ).innerHTML = `<h1>What mode do you want to play?</h1><button type="button" id="self">Play against Others/Myself</button></button><button type="button" id="comp">Play against Computer</button></button>`;
    } else {
      return;
    }
  }
  chooseModeWithoutName() {
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
        document.querySelector(`${blockTiles[index]}`).children[0].className =
          "square";
        const tileClass = blockTiles[index].substring(1);
        localStorage[`${tileClass}`] = localStorage.otherTile;
        break;
      }
    }
  } else {
    document.querySelector(`.tile${empty[x]}`).children[0].className = "square";

    localStorage[`tile${empty[x]}`] = localStorage.otherTile;
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
      document.querySelector(`.${tile}`).children[0].className =
        localStorage.personTile;
      next = !next;
      localStorage[`${tile}`] = localStorage.personTile;
    } else {
      {
        document.querySelector(`.${tile}`).children[0].className =
          localStorage.otherTile;

        next = !next;
        localStorage[`${tile}`] = localStorage.otherTile;
      }
    }
  } else {
    document.querySelector(`.${tile}`).children[0].className =
      localStorage.personTile;

    localStorage[`${tile}`] = localStorage.personTile;
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

    if (tile === "tile0") {
      let blockTiles = [".tile2", ".tile8", ".tile1"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile1") {
      let blockTiles = [".tile2", ".tile7", ".tile0"];
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
      let blockTiles = [".tile5", ".tile6", ".tile4", ".tile7", ".tile8"];
      nextTile(blockTiles, emptyClasses, empty);
    } else if (tile === "tile8") {
      let blockTiles = [".tile0", ".tile6", ".tile2"];
      nextTile(blockTiles, emptyClasses, empty);
    } else {
      document.querySelector(`.tile${empty[x]}`).children[0].className =
        "square";

      localStorage[`tile${empty[x]}`] = localStorage.otherTile;
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
  document.querySelectorAll("#win").forEach((element) => {
    element.id = "";
  });

  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((one, index) => {
    localStorage[`tile${one}`] = "";
  });

  localStorage.wins1 = "";
  localStorage.wins2 = "";
  localStorage.wins3 = "";
}
const notEmpty = [];

const numWins = document.querySelectorAll("#win").forEach((element) => {
  if (element !== "") {
    notEmpty.push(element);
  }
});

document.querySelector("#board").addEventListener("click", function (e) {
  if (e.target.className === "circle" || e.target.className === "square") {
    return;
  } else if (
    e.target.firstElementChild.classList[0] === "circle" ||
    e.target.firstElementChild.classList[0] === "square"
  ) {
    return;
  } else {
    if (!tally.boardClear || notEmpty > 0) {
      tally.showWarning();
    } else {
      setTimeout(() => {
        for (let index = 0; index < 9; index++) {
          if (e.target.className === `tile tile${index}`) {
            addSign(e.target.classList[1]);
          }
        }
      }, 10);

      var tileElements = [];

      function getTiles() {
        setTimeout(function () {
          const list = document.querySelector("#board").children;
          const newList = Object.assign({}, list);
          for (const key in newList) {
            tileElements.push(newList[key].firstElementChild.className);
          }

          scoreTiles();
        }, 10);
      }

      getTiles();

      let winningTileValues = [];

      function checkScoreCircles(arr, check1, check2, check3) {
        if (arr[check1] + arr[check2] + arr[check3] === "circlecirclecircle") {
          winningTileValues.push(check1);
          winningTileValues.push(check2);
          winningTileValues.push(check3);
          return "circle";
        }
      }

      function checkScoreSquares(arr, check1, check2, check3) {
        if (arr[check1] + arr[check2] + arr[check3] === "squaresquaresquare") {
          winningTileValues.push(check1);
          winningTileValues.push(check2);
          winningTileValues.push(check3);
          return "square";
        }
      }

      function scoreTiles() {
        const a = document.querySelectorAll(".square").length;
        const b = document.querySelectorAll(".circle").length;
        const c = a + b;

        const functionArr = [
          checkScoreCircles(tileElements, 0, 1, 2),
          checkScoreCircles(tileElements, 3, 4, 5),
          checkScoreCircles(tileElements, 6, 7, 8),
          checkScoreCircles(tileElements, 1, 4, 7),
          checkScoreCircles(tileElements, 2, 5, 8),
          checkScoreCircles(tileElements, 0, 3, 6),
          checkScoreCircles(tileElements, 2, 4, 6),
          checkScoreCircles(tileElements, 0, 4, 8),

          checkScoreSquares(tileElements, 0, 1, 2),
          checkScoreSquares(tileElements, 3, 4, 5),
          checkScoreSquares(tileElements, 6, 7, 8),
          checkScoreSquares(tileElements, 1, 4, 7),
          checkScoreSquares(tileElements, 2, 5, 8),
          checkScoreSquares(tileElements, 0, 3, 6),
          checkScoreSquares(tileElements, 2, 4, 6),
          checkScoreSquares(tileElements, 0, 4, 8),
        ];

        const allEqual = (arr) => arr.every((v) => v === arr[0]);
        for (i = 0; i < functionArr.length; i++) {
          if (functionArr.indexOf("circle") !== -1) {
            document.querySelector(
              `.tile${winningTileValues[0]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[1]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[2]}`
            ).children[0].id = "win";
            localStorage.wins1 = winningTileValues[0];
            localStorage.wins2 = winningTileValues[1];
            localStorage.wins3 = winningTileValues[2];
            setTimeout(() => {
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
                  ? `<p>${localStorage.otherPersonName} gets to start the next turn </p>`
                  : ""
              } <button type="button" id="next">Next Round</button></button><a href="#">Go back to board</a>`;
            }, 400);

            localStorage.playerScore++;

            document.getElementById("player").innerHTML =
              localStorage.playerScore;

            tally.changeNextPlayer(localStorage.personTile);

            break;
          } else if (functionArr.indexOf("square") !== -1) {
            document.querySelector(
              `.tile${winningTileValues[0]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[1]}`
            ).children[0].id = "win";
            document.querySelector(
              `.tile${winningTileValues[2]}`
            ).children[0].id = "win";

            localStorage.wins1 = winningTileValues[0];
            localStorage.wins2 = winningTileValues[1];
            localStorage.wins3 = winningTileValues[2];
            setTimeout(() => {
              document
                .querySelectorAll("body :not(.congrats")
                .forEach((element) => {
                  element.classList.add("dim");
                });
              document.querySelector(".congrats").classList.add("alert");

              document.querySelector("#congrats").innerHTML = `<h1>${
                localStorage.otherPersonName
              } Wins this round!</h1><p>${
                localStorage.mode === "self"
                  ? localStorage.name
                  : localStorage.otherPersonName
              } gets to start the next turn</p><button type="button" id="next">Next Round</button></button><a href="#">Go back to board</a>`;
            }, 400);

            localStorage.computerScore++;

            tally.updateComputerScore();
            document.getElementById("computer").innerHTML =
              localStorage.computerScore;
            if (localStorage.mode === "comp") {
              tally.changeNextPlayer(localStorage.otherTile);
            }

            break;
          }
        }
        if (allEqual(functionArr) && c === 9) {
          document
            .querySelectorAll("body :not(.congrats")
            .forEach((element) => {
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
      scoreTiles();
    }
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
      document.querySelector(
        `.tile${x}`
      ).children[0].className = `${tally.nextPlayer}`;
      localStorage[`tile${x}`] = tally.nextPlayer;
    }
  } else if (e.target.tagName === "A") {
    document.querySelectorAll("body :not(.congrats").forEach((element) => {
      element.classList.remove("dim");
    });
    document.querySelector(".congrats").classList.remove("alert");
    tally.updateBoardClear(false);
    document.querySelector("#clear").classList.add("button-anim");
  } else if (e.target.id === "self") {
    tally.updateMode("self");
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
    tally.boardClear = true;
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
    tally.boardClear = true;
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
    if (e.target.classList.contains("button-anim")) {
      e.target.classList.remove("button-anim");
    }
    tally.updateBoardClear(true);
  } else if (e.target.id === "changeName") {
    tally.askPlayer();
    if (!tally.boardClear) {
      clearAll();
      tally.boardClear = !tally.boardClear;
    }
  } else if (e.target.id === "changeMode") {
    tally.chooseModeWithoutName();
    clearAll();
  }
});

document.querySelector("#newGame").addEventListener("click", function (e) {
  tally.resetAll();
  localStorage.removeItem("mode");
  tally.chooseMode();
});
